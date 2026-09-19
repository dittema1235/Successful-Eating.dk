import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage, course journey and accessible layout', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Mindre madstøj.');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(scan.violations).toEqual([]);
  await page.locator('.hero a.button').click();
  await expect(page.locator('#forloeb')).toBeInViewport();
  await page.getByRole('link', { name: 'Læs om kropsaccept' }).click();
  await expect(page).toHaveURL(/kropsglaede/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Mindre kropskritik');
  expect(errors).toEqual([]);
});
test('menu, keyboard and FAQ work', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) {
    const toggle = page.getByRole('button', { name: 'Menu', exact: true });
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    await page
      .getByRole('navigation', { name: 'Hovednavigation' })
      .getByRole('link', { name: 'Om Ditte' })
      .click();
    await expect(page).toHaveURL(/om-ditte/);
    await page.goto('/');
  }
  const question = page.locator('summary').filter({ hasText: 'Hvad er madro?' });
  await question.click();
  await expect(question.locator('..')).toHaveAttribute('open', '');
  await expect(question.locator('..').locator('p')).toBeVisible();
});
test('search covers the entire archive and handles no results', async ({ page }) => {
  await page.goto('/blog');
  await page.getByLabel('Søg i alle artikler').fill('kærestekilo');
  await expect(page.locator('#search-count')).toContainText('fundet i hele arkivet');
  await expect(page.locator('#archive-results')).toContainText('De der kærestekilo');
  await page.getByLabel('Søg i alle artikler').fill('xyzfindesikkexyz');
  await expect(page.locator('#search-empty')).toBeVisible();
  await page.getByLabel('Søg i alle artikler').clear();
  await expect(page.locator('#archive-pagination')).toBeVisible();
  await page.getByLabel('Emne', { exact: true }).selectOption('adhd');
  await expect(page.locator('#search-count')).toContainText('fundet i hele arkivet');
  expect(await page.locator('#archive-results article').count()).toBeGreaterThan(0);
});
test('search failure is recoverable', async ({ page }) => {
  await page.route('**/search-index.json', (route) => route.abort());
  await page.goto('/blog');
  await page.getByLabel('Søg i alle artikler').fill('mad');
  await expect(page.locator('#search-count')).toContainText('kunne ikke indlæses');
  await expect(page.locator('#archive-pagination')).toBeVisible();
  await page.unroute('**/search-index.json');
  await page.getByRole('button', { name: 'Søg', exact: true }).click();
  await expect(page.locator('#search-count')).toContainText('fundet i hele arkivet');
});
test('booking, checkout and guide have honest working destinations', async ({ page }) => {
  await page.goto('/forloebet');
  const buy = page.getByRole('link', { name: 'Se pris og tilmelding' }).first();
  await expect(buy).toHaveAttribute('href', 'https://successfuleating.systeme.io/4b00a70d');
  await page.goto('/kontakt');
  await expect(page.getByRole('link', { name: 'Find en tid i kalenderen' })).toHaveAttribute(
    'href',
    'https://calendar.app.google/BFPj4aAbpdadtkB28',
  );
  await page.goto('/sulteneller');
  const request = page.getByRole('link', { name: 'Bed om guiden via e-mail' });
  await expect(request).toHaveAttribute('href', /^mailto:hello@successfuleating.com\?subject=/);
  await expect(page.locator('main')).toContainText('ikke automatisk tilmeldt');
});
test('cookie choices are Danish, optional tracking starts denied and stays local', async ({
  page,
}) => {
  const external: string[] = [];
  page.on('request', (r) => {
    if (!r.url().startsWith('http://127.0.0.1:4321')) external.push(r.url());
  });
  await page.goto('/');
  await page.locator('#stcm-icon').click();
  await expect(page.getByText('Dine cookieindstillinger', { exact: true })).toBeVisible();
  const scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(scan.violations).toEqual([]);
  await page.getByRole('button', { name: 'Afvis valgfrie cookies' }).click();
  expect(external).toEqual([]);
  await page.reload();
  await page.locator('#stcm-icon').click();
  await expect(page.getByText('Dine cookieindstillinger', { exact: true })).toBeVisible();
});
test('key pages fit the viewport and pass accessibility checks', async ({ page }) => {
  for (const url of [
    '/forloebet',
    '/kropsglaede',
    '/kontakt',
    '/madro-biblioteket',
    '/sulteneller',
  ]) {
    await page.goto(url);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), url).toBe(
      true,
    );
    const scan = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(scan.violations, url).toEqual([]);
  }
});
test('content and acquisition routes work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Mindre madstøj');
  await page.locator('.hero a.button').click();
  await page.getByRole('link', { name: 'Læs om forløbet', exact: true }).click();
  await expect(page).toHaveURL(/forloebet/);
  await expect(page.getByRole('link', { name: 'Se pris og tilmelding' }).first()).toBeVisible();
  await context.close();
});
