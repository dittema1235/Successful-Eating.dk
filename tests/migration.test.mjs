import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { load } from 'cheerio';
const posts = JSON.parse(await readFile('src/data/archive.json', 'utf8'));
const inventory = JSON.parse(await readFile('docs/legacy-url-inventory.json', 'utf8'));
const library = JSON.parse(await readFile('src/data/library-pages.json', 'utf8'));
const migrations = JSON.parse(await readFile('src/data/article-migrations.json', 'utf8'));
const consolidated = JSON.parse(await readFile('src/data/consolidated-articles.json', 'utf8'));
test('all old blog URLs retain an article or a relevant permanent redirect; traffic leaders keep their URL', () => {
  const originals = inventory.urls.filter((u) => /^\/blog\/\d/.test(new URL(u).pathname));
  assert.equal(posts.length + migrations.length, originals.length);
  assert.equal(new Set(posts.map((p) => p.slug)).size, posts.length);
  for (const url of originals)
    assert.ok(
      posts.some((p) => p.slug === decodeURIComponent(new URL(url).pathname).slice(1)) ||
        migrations.some((m) => m.source === decodeURIComponent(new URL(url).pathname)),
      url,
    );
  for (const id of [
    '101752',
    '50527',
    '50249',
    '50318',
    '50601',
    '59762',
    '56441',
    '50484',
    '50565',
    '50253',
    '50375',
    '50216',
    '89204',
    '50441',
    '59618',
    '50254',
    '50507',
    '50636',
  ])
    assert.ok(
      posts.some((p) => p.slug.startsWith(`blog/${id}-`)),
      id,
    );
});
test('imported content contains no old forms, executable scripts, event handlers or tracking frames', () => {
  for (const p of [...posts, ...library]) {
    const $ = load(p.body);
    assert.equal($('script,style,form,iframe,object,embed,input').length, 0, p.slug);
    $('*').each((_, el) => {
      for (const name of Object.keys(el.attribs))
        assert.ok(!name.startsWith('on'), `${p.slug}: ${name}`);
    });
    assert.ok(!/javascript\s*:/i.test(p.body), p.slug);
  }
});
test('flagged legacy claims and weight-focused acquisition links are removed', () => {
  const p = (id) => posts.find((p) => p.slug.includes(`/${id}-`));
  assert.ok(!p('50419').body.includes('Louise'));
  const christmas = consolidated.find((p) => p.slug === 'julefrokost-uden-madstress');
  assert.ok(christmas);
  assert.ok(!JSON.stringify(christmas).includes('Undersøgelser viser'));
  assert.ok(!p('50257').body.includes('2%'));
  for (const id of ['50249', '50253', '50636']) {
    assert.equal(p(id).salesCta, false);
    assert.ok(!/href="[^"]*(forloebet|checkout|products)/.test(p(id).body));
  }
});
test('retired articles disappear from listings/search and have exact, one-hop replacement rules', async () => {
  const index = JSON.parse(await readFile('public/search-index.json', 'utf8'));
  const rules = (await readFile('public/_redirects', 'utf8')).split('\n').map((l) => l.trim());
  const targets = new Set(consolidated.map((p) => '/madro-biblioteket/' + p.slug));
  assert.equal(new Set(migrations.map((m) => m.source)).size, migrations.length);
  for (const { source, target } of migrations) {
    assert.ok(targets.has(target), `Missing replacement: ${target}`);
    assert.ok(!posts.some((p) => '/' + p.slug === source), source);
    assert.ok(!index.some((p) => '/' + p.slug === source), source);
    assert.equal(rules.filter((r) => r === `${source} ${target} 301`).length, 1, source);
    assert.ok(!migrations.some((m) => m.source === target), `Redirect chain: ${source}`);
  }
  for (const target of targets)
    assert.ok(
      index.some((p) => '/' + p.slug === target),
      target,
    );
});
test('both current offers and every old sitemap URL have a concrete migration destination', async () => {
  const rules = (await readFile('public/_redirects', 'utf8'))
    .split('\n')
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => l.split(/\s+/));
  const staticPaths = new Set([
    '/',
    '/forloebet',
    '/kropsglaede',
    '/om-ditte',
    '/resultater',
    '/sulteneller',
    '/terms',
    '/kontakt',
    '/blog',
    '/madro-biblioteket',
    ...posts.map((p) => '/' + p.slug),
    ...library.map((p) => '/' + p.slug),
  ]);
  for (const u of inventory.urls) {
    const url = new URL(u);
    if (url.hostname !== 'www.successfuleating.dk') continue;
    const pathname = decodeURIComponent(url.pathname);
    assert.ok(
      staticPaths.has(pathname) ||
        rules.some(([from]) => {
          from = decodeURIComponent(from);
          return from.endsWith('*') ? pathname.startsWith(from.slice(0, -1)) : from === pathname;
        }),
      pathname,
    );
  }
});
