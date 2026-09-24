import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import migrations from '../../src/data/article-migrations.json' with { type: 'json' };

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
  await expect(page).toHaveURL(/\/forloebet$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Behandling af overspisning online',
  );
  await expect(page.locator('#det-faar-du')).toContainText('4 live gruppesamtaler');
  const modules = page.locator('#moduler .module-list > li');
  await expect(modules).toHaveCount(8);
  await expect(modules.first()).toContainText('Fundamentet');
  await expect(modules.first()).toContainText('sult- og mæthedssignaler');
  await expect(modules.last()).toContainText('Fasthold forandringen');
  await expect(modules.last()).toContainText('de nye mønstre holder');
  await expect(page.locator('.adhd-focus')).toContainText('ADHD er indtænkt i Successful Eating');
  await expect(page.locator('.adhd-focus')).toContainText('mange kvinder med ADHD/ADD');
  await expect(page.locator('.adhd-focus')).toContainText('odds for BED cirka fire gange højere');
  await expect(
    page.locator('.adhd-focus').getByRole('link', {
      name: 'Nazar et al. (2016), International Journal of Eating Disorders',
    }),
  ).toHaveAttribute('href', 'https://doi.org/10.1002/eat.22643');
  await page.getByRole('link', { name: 'Se pris og tilmelding', exact: true }).click();
  await expect(page.locator('#priser')).toBeInViewport();
  await expect(
    page.locator('#priser').getByRole('link', { name: 'Køb forløbet · 4.499 kr.' }),
  ).toHaveAttribute('href', 'https://successfuleating.systeme.io/4b00a70d');
  await page.goto('/');
  await page.getByRole('link', { name: 'Find den rette hjælp', exact: true }).click();
  await expect(page.locator('#forloeb')).toBeInViewport();
  await page.getByRole('link', { name: 'Læs om kropsaccept' }).click();
  await expect(page).toHaveURL(/kropsglaede/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Mindre kropskritik');
  await expect(page.locator('.closing-cta .button')).toHaveAttribute('href', '/kontakt');
  await expect(page.locator('.closing-cta')).not.toContainText('4.499');
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
test('search handles Danish typos, ranks results and keeps topic filters', async ({ page }) => {
  await page.goto('/blog');
  const query = page.getByLabel('Søg i alle artikler');
  const results = page.locator('#archive-results');
  await query.fill('overspisnig');
  await expect(results).toContainText('Hjælp til overspisning');
  await expect(page.locator('#search-count')).toContainText('Bedste match først');

  await query.fill('sukertrang');
  await expect(results).toContainText('ADHD hos kvinder: Derfor får du sukkertrang om aftenen');
  await page.getByLabel('Emne', { exact: true }).selectOption('adhd');
  await expect(results.locator('article')).toHaveCount(2);
  await expect(results).toContainText('ADHD hos kvinder: Derfor får du sukkertrang om aftenen');
  await expect(results).not.toContainText('Hvad lærer du på');

  await page.getByLabel('Emne', { exact: true }).selectOption('');
  await query.fill('De der kærestekilo');
  await expect(results.locator('h2').first()).toHaveText('De der kærestekilo');
  await query.clear();
  await expect(page.locator('#archive-pagination')).toBeVisible();
  await expect(results.locator('article')).toHaveCount(24);
});
test('consolidated articles preserve old links and replace retired search results', async ({
  page,
  request,
}) => {
  const sitemap = await (await request.get('/sitemap-0.xml')).text();
  for (const { source, target } of migrations) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status(), source).toBe(301);
    expect(response.headers().location, source).toBe(target);
    const replacement = await request.get(target, { maxRedirects: 0 });
    expect(replacement.status(), target).toBe(200);
    expect(await replacement.text()).toContain(`href="https://www.successfuleating.dk${target}"`);
    expect(sitemap).not.toContain(`https://www.successfuleating.dk${source}<`);
    expect(sitemap).toContain(`https://www.successfuleating.dk${target}<`);
  }
  await page.goto(migrations[0].source);
  await expect(page).toHaveURL(new RegExp(migrations[0].target));
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Trøstespisning');
  await page.goto('/blog');
  await page.getByLabel('Søg i alle artikler').fill('julefrokost');
  await expect(page.locator('#archive-results')).toContainText('Julefrokost uden madstress');
  for (const { source } of migrations) {
    await expect(page.locator(`#archive-results a[href="${source}"]`)).toHaveCount(0);
  }
});
test('search failure is recoverable', async ({ page }) => {
  await page.route('**/search-index.json', (route) => route.abort());
  await page.goto('/blog');
  await page.getByLabel('Søg i alle artikler').fill('mad');
  await expect(page.locator('#search-count')).toContainText('kunne ikke indlæses');
  await expect(page.locator('#archive-pagination')).toBeVisible();
  await page.unroute('**/search-index.json');
  await page.locator('#archive-search').getByRole('button', { name: 'Søg', exact: true }).click();
  await expect(page.locator('#search-count')).toContainText('fundet i hele arkivet');
});
test('header search is visible across pages and opens fuzzy results', async ({ page }) => {
  for (const route of [
    '/',
    '/forloebet',
    '/kontakt',
    '/madro-biblioteket/troestespisning',
    '/blog/50213-modeldetox-og-kropsbillede',
    '/blog/2',
    '/404',
  ]) {
    await page.goto(route);
    await expect(
      page.getByRole('searchbox', { name: 'Søg i artiklerne', exact: true }),
    ).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  const headerSearch = page.getByRole('search', { name: 'Søg i artikler', exact: true });
  await headerSearch.getByRole('searchbox').fill('overspisnig');
  await headerSearch.getByRole('button', { name: 'Søg', exact: true }).click();
  await expect(page).toHaveURL(/\/blog\?q=overspisnig#archive-search$/);
  await expect(page.getByLabel('Søg i alle artikler')).toHaveValue('overspisnig');
  await expect(page.locator('#archive-results')).toContainText('Hjælp til overspisning');
  await expect(page.locator('#archive-search')).toBeInViewport();
  await page.getByLabel('Emne', { exact: true }).selectOption('adhd');
  await expect(page).toHaveURL(/topic=adhd/);
  await page.reload();
  await expect(page.getByLabel('Søg i alle artikler')).toHaveValue('overspisnig');
  await expect(page.getByLabel('Emne', { exact: true })).toHaveValue('adhd');
  await expect(page.locator('#archive-results')).toContainText('ADHD');
  await expect(page.locator('#search-count')).toContainText('fundet i hele arkivet');
  const scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(scan.violations).toEqual([]);
});
test('booking, checkout and guide have honest working destinations', async ({ page }) => {
  await page.goto('/forloebet');
  const offer = await page.locator('script[type="application/ld+json"]').evaluate((el) => {
    const service = JSON.parse(el.textContent || '{}')['@graph'].find(
      (entry: { '@type': string }) => entry['@type'] === 'Service',
    );
    return service.offers;
  });
  expect(offer.price).toBe(4499);
  expect(offer.priceCurrency).toBe('DKK');
  expect(offer.url).toBe('https://successfuleating.systeme.io/4b00a70d');
  const buy = page.getByRole('link', { name: 'Køb forløbet · 4.499 kr.' }).first();
  await expect(buy).toHaveAttribute('href', 'https://successfuleating.systeme.io/4b00a70d');
  const options = page.locator('#priser');
  await expect(options).toContainText('Alle pengene tilbage ved et dårligt match');
  await expect(options).toContainText('645 kr. / 50 minutter');
  await expect(options).toContainText('3.854 kr. mere');
  await expect(options).toContainText('4.499 kr. i alt');
  await expect(options.getByRole('link', { name: /Book forsamtale · 645 kr\./ })).toHaveAttribute(
    'href',
    'https://dittemunchandersn.onlinebooq.dk/',
  );
  await expect(options).toContainText('Du fortsætter til booking og betaling');
  await page.goto('/kontakt');
  await expect(page.getByRole('link', { name: /Book forsamtale · 645 kr\./ })).toHaveAttribute(
    'href',
    'https://dittemunchandersn.onlinebooq.dk/',
  );
  await expect(page.locator('main')).toContainText('50 minutter med Ditte til 645 kr.');
  await expect(page.locator('main')).toContainText('Vælg Successful Eating, når du booker');
  await page.goto('/terms');
  await expect(page.locator('main')).toContainText('50 minutter, 645 kr.');
  await expect(page.locator('main')).toContainText('100 % af dit indbetalte beløb retur');
  await expect(page.locator('main')).toContainText('Restbeløbet er dermed 3.854 kr.');
  await expect(page.locator('main')).not.toContainText('30-minutters');
  await page.goto('/sulteneller');
  const request = page.getByRole('link', { name: 'Ja tak, send mig guiden' });
  await expect(request).toHaveAttribute('href', /^https:\/\/successfuleating.systeme.io\/public\//);
  await expect(page.locator('main')).toContainText('guide og e-mails fra Ditte om overspisning');
});
test('results page presents outcomes and a clear path to purchase', async ({ page }) => {
  await page.goto('/resultater');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Når maden fylder mindre');
  await expect(page.locator('main')).toContainText('Mindre kontroltab');
  await expect(page.locator('main')).toContainText('Mindre skyld og selvkritik');
  await expect(page.locator('main')).toContainText('En mere stabil spisning');
  await expect(page.locator('.results-evidence')).toContainText('78%');
  await expect(page.locator('.results-evidence')).toContainText('43%');
  await expect(page.locator('.results-evidence')).toContainText('29%');
  await expect(page.locator('.results-evidence')).toContainText(
    'Brugerundersøgelse før/efter Successful Eating (2024)',
  );
  await expect(page.locator('.participant-testimonials')).toContainText(
    'Sådan beskriver tidligere deltagere forandringen',
  );
  await expect(page.locator('.participant-testimonials')).toContainText(
    'voldsomme overspisninger i mange år',
  );
  await expect(page.locator('.participant-testimonials')).toContainText(
    'ændre mit forhold til mad',
  );
  await expect(
    page
      .locator('.participant-testimonials')
      .getByRole('link', { name: 'Se også anmeldelser på Trustpilot' }),
  ).toHaveAttribute('href', 'https://dk.trustpilot.com/review/successfuleating.dk');
  await expect(page.locator('.participant-testimonials')).not.toContainText('kg');
  await expect(page.locator('main')).toContainText('Prisen er momsfritaget');
  await expect(page.locator('main')).toContainText('50 minutter · 645 kr.');
  await expect(page.locator('main')).not.toContainText('Det tidligere website');
  await expect(page.locator('main')).not.toContainText('kontrolgruppe');
  await expect(page.locator('main')).not.toContainText('7.495 kr.');
  await expect(page.locator('main')).not.toContainText('12.995 kr.');
  await expect(page.locator('main')).not.toContainText('Tilmelding åbner snart');
  await expect(page.locator('main')).not.toContainText('6-måneders');
  await expect(page.getByRole('link', { name: 'Se forløbet og pris' })).toHaveAttribute(
    'href',
    '/forloebet#priser',
  );
  await expect(page.locator('.results-offer')).toContainText('4.499 kr.');
  await expect(page.locator('.closing-cta .button')).toHaveAttribute(
    'href',
    'https://successfuleating.systeme.io/4b00a70d',
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(scan.violations).toEqual([]);
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
    '/resultater',
    '/madro-biblioteket',
    '/sulteneller',
    '/madro-biblioteket/troestespisning',
    '/madro-biblioteket/madro-og-vaegt',
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
test.describe('without JavaScript', () => {
  // Keep each project's device settings and avoid a Linux Chromium actionability
  // race while smooth scrolling with page scripts disabled.
  test.use({ javaScriptEnabled: false, reducedMotion: 'reduce' });
  test('content and acquisition routes work without JavaScript', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Mindre madstøj');
    await page.locator('.hero a.button').click();
    await expect(page).toHaveURL(/forloebet/);
    await expect(
      page.getByRole('link', { name: 'Køb forløbet · 4.499 kr.' }).first(),
    ).toBeVisible();
  });
});

test('contact form sends the message to the mail endpoint and confirms', async ({ page }) => {
  let posted = '';
  await page.route('https://script.google.com/**', async (route) => {
    posted = route.request().postData() ?? '';
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: { 'access-control-allow-origin': '*' },
      body: '{"ok":true}',
    });
  });
  await page.goto('/kontakt');
  await page.getByLabel('Dit navn').fill('Test Testesen');
  await page.getByLabel('Din e-mail').fill('test@example.com');
  await page.getByLabel('Din besked').fill('Jeg har et spørgsmål om forløbet.');
  await page.getByRole('button', { name: 'Send besked' }).click();
  await expect(page.getByRole('status')).toContainText('Tak for din besked');
  const fields = new URLSearchParams(posted);
  expect(fields.get('name')).toBe('Test Testesen');
  expect(fields.get('email')).toBe('test@example.com');
  expect(fields.get('website')).toBe('');
  expect(Number(fields.get('elapsed'))).toBeGreaterThan(0);
});

test('contact form shows the phone number if sending fails', async ({ page }) => {
  await page.route('https://script.google.com/**', (route) => route.abort());
  await page.goto('/kontakt');
  await page.getByLabel('Dit navn').fill('Test Testesen');
  await page.getByLabel('Din e-mail').fill('test@example.com');
  await page.getByLabel('Din besked').fill('Hej');
  await page.getByRole('button', { name: 'Send besked' }).click();
  await expect(page.getByRole('status')).toContainText('Beskeden kunne ikke sendes');
  await expect(page.getByRole('status')).toContainText('+45 71 41 59 69');
});
