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
    'Forstå din overspisning. Og lær at gøre noget andet.',
  );
  await expect(page.locator('main')).toHaveCount(1);
  await expect(page.locator('#det-faar-du')).toContainText('på egen hånd');
  const modules = page.locator('#moduler .se-module-grid > li');
  await expect(modules).toHaveCount(8);
  await expect(modules.first()).toContainText('Fundamentet');
  await expect(modules.last()).toContainText('Sådan holder du fast i dine nye vaner');
  await expect(page.locator('#priser')).toContainText('3.499 kr.');
  await expect(page.locator('#priser')).toContainText('Livslang adgang');
  await expect(page.locator('#priser')).toContainText('Individuelle samtaler');
  const buttons = page.locator('.se-sales a.button');
  expect(await buttons.count()).toBeGreaterThan(2);
  for (const button of await buttons.all()) {
    await expect(button).toContainText('Start dit Successful Eating-forløb');
    await expect(button).toHaveAttribute('href', 'https://successfuleating.systeme.io/onlineforloeb');
  }
  await page.goto('/');
  await page.getByRole('link', { name: 'Se dine muligheder', exact: true }).click();
  await expect(page.locator('#forloeb')).toBeInViewport();
  await page.getByRole('link', { name: 'Læs om individuel kropsaccept' }).click();
  await expect(page).toHaveURL(/kropsglaede/);
  await expect(page.locator('main')).toContainText('særskilt psykologisk behandlingstilbud');
  await expect(page.locator('.closing-cta .button')).toHaveAttribute('href', '/individuelt-forloeb/');
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
  const question = page.locator('summary').filter({ hasText: 'Hvad er Successful Eating?' });
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
test('header search stays available on informational pages and opens fuzzy results', async ({ page }) => {
  for (const route of [
    '/',
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
test('self-study checkout, separate sessions and terms have honest destinations', async ({ page }) => {
  await page.goto('/forloebet');
  const offer = await page.locator('script[type="application/ld+json"]').evaluate((el) => {
    const product = JSON.parse(el.textContent || '{}')['@graph'].find(
      (entry: { '@type': string }) => entry['@type'] === 'Product',
    );
    return product.offers;
  });
  expect(offer.price).toBe(3499);
  expect(offer.priceCurrency).toBe('DKK');
  expect(offer.priceSpecification.valueAddedTaxIncluded).toBe(true);
  expect(offer.url).toBe('https://successfuleating.systeme.io/onlineforloeb');
  await expect(page.locator('#priser')).toContainText('ikke inkluderet');
  await page.goto('/kontakt');
  const contactBooking = page.getByRole('link', { name: /Se pris og booking hos klinikken/ }).first();
  await expect(contactBooking).toHaveAttribute('href', 'https://dittemunchandersen.dk/kontakt/');
  await expect(page.locator('.booking-price')).toContainText('1.295 kr.');
  await expect(page.locator('.booking-price')).toContainText('50 minutter');
  await expect(page.locator('main')).toContainText('ikke inkluderet i prisen for Successful Eating');
  const bookingPosition = await contactBooking.boundingBox();
  const contactPosition = await page.locator('#skriv').boundingBox();
  expect(bookingPosition).not.toBeNull();
  expect(contactPosition).not.toBeNull();
  if (page.viewportSize()!.width > 650) {
    expect(bookingPosition!.y).toBeLessThan(page.viewportSize()!.height);
  }
  expect(bookingPosition!.y).toBeLessThan(contactPosition!.y);
  await page.goto('/terms');
  await expect(page.locator('main')).toContainText('3.499 kr. inkl. moms');
  await expect(page.locator('main')).toContainText('livslang adgang');
  await expect(page.locator('main')).toContainText('14 dages fortrydelsesret');
  await expect(page.locator('main')).not.toContainText('12 uger');
  await expect(page.locator('main')).not.toContainText('forsamtalegaranti');
  await page.goto('/sulteneller');
  const request = page.getByRole('link', { name: 'Ja tak, send mig guiden' });
  await expect(request).toHaveAttribute('href', /^https:\/\/successfuleating.systeme.io\/public\//);
  await expect(page.locator('main')).toContainText('guide og e-mails fra Ditte om overspisning');
});
test('the portrait and both participant videos load', async ({ page }) => {
  await page.goto('/forloebet');
  const portrait = page.locator('.se-about-image img');
  await portrait.scrollIntoViewIfNeeded();
  await expect(portrait).toBeVisible();
  const image = await portrait.evaluate((element: HTMLImageElement) => ({
    width: element.naturalWidth,
    height: element.naturalHeight,
  }));
  expect(image.width).toBeGreaterThan(0);
  expect(image.height).toBeGreaterThan(image.width);

  const videos = page.locator('.se-video-grid video');
  await expect(videos).toHaveCount(2);
  for (const video of await videos.all()) {
    await video.scrollIntoViewIfNeeded();
    const info = await video.evaluate(async (element: HTMLVideoElement) => {
      element.preload = 'metadata';
      element.load();
      await new Promise<void>((resolve, reject) => {
        if (element.readyState >= HTMLMediaElement.HAVE_METADATA) return resolve();
        element.addEventListener('loadedmetadata', () => resolve(), { once: true });
        element.addEventListener('error', () => reject(new Error('Video failed to load')), { once: true });
      });
      return { duration: element.duration, width: element.videoWidth, height: element.videoHeight };
    });
    expect(info.duration).toBeGreaterThan(0);
    expect(info.width).toBeGreaterThan(0);
    expect(info.height).toBeGreaterThan(0);
  }
});
test('results page presents outcomes and a clear path to purchase', async ({ page }) => {
  await page.goto('/resultater');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Hvad oplevede tidligere deltagere');
  await expect(page.locator('.results-evidence')).toContainText('78 %');
  await expect(page.locator('.results-evidence')).toContainText('86 %');
  await expect(page.locator('.results-evidence')).toContainText('43 %');
  await expect(page.locator('.results-evidence')).toContainText('29 %');
  await expect(page.locator('.results-evidence')).toContainText(
    'Brugerundersøgelse før/efter Successful Eating (2024)',
  );
  await expect(page.locator('.participant-testimonials')).toContainText(
    'Sådan beskriver tidligere deltagere deres oplevelse',
  );
  await expect(
    page
      .locator('.participant-testimonials')
      .getByRole('link', { name: 'Se også anmeldelser på Trustpilot' }),
  ).toHaveAttribute('href', 'https://dk.trustpilot.com/review/successfuleating.dk');
  await expect(page.locator('main')).toContainText('online selvstudieforløb');
  await expect(page.locator('main')).toContainText('ikke personlig vurdering');
  await expect(page.getByRole('link', { name: 'Se deltagernes videoer' })).toHaveAttribute(
    'href', '/forloebet/#erfaringer',
  );
  await expect(page.locator('.closing-cta .button')).toHaveAttribute(
    'href',
    'https://successfuleating.systeme.io/onlineforloeb',
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
    '/individuelt-forloeb',
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
    await expect(page.locator('.se-hero').getByRole('link', { name: 'Start dit Successful Eating-forløb' })).toBeVisible();
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
