import { test, expect } from '@playwright/test';
import overrides from '../../src/data/editorial-overrides.json' with { type: 'json' };
test('updated editorial articles render sources, attribution and canonical without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const post of overrides) {
    const response = await page.goto(`http://127.0.0.1:4321/${post.slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveText(post.title);
    await expect(page.locator('.article-byline')).toContainText('Redaktion: Successful Eating');
    await expect(page.getByRole('heading', { name: 'Kilder og afgrænsning' })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://www.successfuleating.dk/${post.slug}`,
    );
    const json = await page.locator('script[type="application/ld+json"]').allTextContents();
    const graphs = json.flatMap((t) => {
      const x = JSON.parse(t);
      return x['@graph'] || [x];
    });
    const article = graphs.find((x) => x['@type'] === 'Article');
    expect(article?.headline).toBe(post.title);
    expect(article?.dateModified).toBe(post.editorialUpdated);
  }
  await context.close();
});
test('retired evening introduction returns one permanent redirect to the original URL', async ({
  request,
}) => {
  const res = await request.get('/madro-biblioteket/overspisning-om-aftenen', { maxRedirects: 0 });
  expect(res.status()).toBe(301);
  const target = res.headers().location;
  expect(target).toBe('/blog/101752-saadan-stopper-du-med-at-overspise-om');
  expect((await request.get(target, { maxRedirects: 0 })).status()).toBe(200);
});
