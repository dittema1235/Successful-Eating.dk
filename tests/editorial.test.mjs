import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { load } from 'cheerio';
const read = async (p) => JSON.parse(await readFile(p, 'utf8'));
const overrides = await read('src/data/editorial-overrides.json');
const archive = await read('src/data/archive.json');
const index = await read('public/search-index.json');
test('editorial revisions retain original publication dates and expose matching searchable metadata', async () => {
  const originals = await read('src/data/legacy-posts.json');
  assert.equal(overrides.length, 10);
  for (const o of overrides) {
    const p = archive.find((p) => p.slug === o.slug);
    assert.ok(p, o.slug);
    assert.equal(p.published, originals.find((x) => x.slug === o.slug).published);
    assert.equal(p.editorialAuthor, 'Successful Eating');
    assert.equal(p.editorialUpdated, '2026-09-19');
    assert.equal(p.title, o.title);
    assert.equal(index.find((x) => x.slug === o.slug).description, o.description);
    const $ = load(p.body);
    assert.ok($('h2').length >= 4);
    assert.ok($('a[href^="https://"]').length >= 1, `Sources: ${o.slug}`);
  }
});
test('evening introduction consolidates directly into the preserved original article', async () => {
  const rules = await readFile('public/_redirects', 'utf8');
  assert.equal(
    rules
      .split('\n')
      .filter(
        (l) =>
          l ===
          '/madro-biblioteket/overspisning-om-aftenen /blog/101752-saadan-stopper-du-med-at-overspise-om 301',
      ).length,
    1,
  );
  assert.ok(
    !(await readFile('src/data/articles.ts', 'utf8')).includes("slug: 'overspisning-om-aftenen'"),
  );
});
