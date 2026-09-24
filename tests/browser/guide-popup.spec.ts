import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { guideSignup } from '../../src/data/guide';

// Exercise the same policy Cloudflare applies; the local static server doesn't set it.
const policy = readFileSync('public/_headers', 'utf8').match(/Content-Security-Policy: (.*)/)![1];
test.beforeEach(async ({ page }) => {
  await page.route('http://127.0.0.1:4321/**', async (route) => {
    const response = await route.fetch();
    await route.fulfill({
      response,
      headers: { ...response.headers(), 'content-security-policy': policy },
    });
  });
});

test('guide buttons open on demand, close and reopen under the production CSP', async ({
  page,
}) => {
  let requests = 0;
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  // Keep CI independent of the provider. The real embed is checked separately before release.
  await page.route(guideSignup.scriptUrl, async (route) => {
    requests++;
    await route.fulfill({
      contentType: 'text/javascript',
      body: `
      window.onload = () => {
        document.querySelector('a').onclick = event => event.preventDefault();
        const form = document.createElement('iframe');
        form.id = 'systemeio-iframe-test';
        form.src = '${guideSignup.formUrl}';
        document.body.append(form);
      };
    `,
    });
  });
  await page.route(guideSignup.formUrl, (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: `<!doctype html><html lang="da"><title>Tilmelding</title>
      <label>E-mail<input type="email"></label><button>Nej tak</button>
      <script>
        parent.postMessage({ sender: 'systemeio-iframe-test', height: 300 }, '*');
        document.querySelector('button').onclick = () => parent.postMessage({ type: 'funnel_step_25559807_popup_close' }, '*');
      </script></html>`,
    }),
  );

  for (const [path, count] of [
    ['/', 1],
    ['/gratis-guide', 2],
    ['/sulteneller', 1],
  ] as const) {
    const before = requests;
    await page.goto(path);
    await expect(page.locator('[data-guide-signup]')).toHaveCount(count);
    expect(requests).toBe(before);
    await expect(page.getByRole('dialog')).not.toBeVisible();
    for (let index = 0; index < count; index++) {
      const trigger = page.locator('[data-guide-signup]').nth(index);
      const url = page.url();
      await trigger.click();
      const dialog = page.getByRole('dialog', { name: 'Få den gratis guide' });
      await expect(dialog).toBeVisible();
      const form = page.frameLocator('#guide-popup iframe').frameLocator('iframe');
      await expect(form.getByLabel('E-mail')).toBeVisible();
      await expect(page.locator('[data-guide-status]')).toBeEmpty();
      expect(page.url()).toBe(url);
      expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('hidden');
      // A same-origin message from the wrong window must not dismiss the form.
      await page.evaluate(() =>
        window.postMessage({ type: 'se:guide-popup', action: 'close' }, location.origin),
      );
      await expect(dialog).toBeVisible();
      await form.getByRole('button', { name: 'Nej tak' }).click();
      await expect(dialog).not.toBeVisible();
      await expect(trigger).toBeFocused();
      await expect
        .poll(() => page.evaluate(() => document.documentElement.style.overflow))
        .toBe('');
      await trigger.click();
      await expect(form.getByLabel('E-mail')).toBeVisible();
      await page.getByRole('button', { name: 'Luk tilmelding' }).click();
      await expect(dialog).not.toBeVisible();
      await expect(trigger).toBeFocused();
      await trigger.click();
      await expect(form.getByLabel('E-mail')).toBeVisible();
      await page.getByRole('button', { name: 'Luk tilmelding' }).focus();
      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
    }
  }
  expect(errors).toEqual([]);
});

test('blocked embed offers a direct fallback and can be dismissed', async ({ page }) => {
  await page.route(guideSignup.scriptUrl, (route) => route.abort());
  await page.goto('/sulteneller');
  await page.locator('[data-guide-signup]').click();
  await expect(page.getByRole('status')).toContainText('Formularen kunne ikke indlæses');
  const fallback = page.getByRole('link', { name: 'Åbn tilmeldingen i et nyt vindue' });
  await expect(fallback).toHaveAttribute('href', guideSignup.formUrl);
  await expect(fallback).toHaveAttribute('target', '_blank');
  await page.getByRole('button', { name: 'Luk tilmelding' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false, reducedMotion: 'reduce' });
  test('guide button opens the hosted form directly', async ({ page }) => {
    await page.route(guideSignup.formUrl, (route) =>
      route.fulfill({
        contentType: 'text/html',
        body: '<h1>Tilmelding til guiden</h1>',
      }),
    );
    await page.goto('/sulteneller');
    await page.locator('[data-guide-signup]').click();
    await expect(page).toHaveURL(guideSignup.formUrl);
    await expect(page.getByRole('heading')).toHaveText('Tilmelding til guiden');
  });
});
