import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { load } from 'cheerio';

const read = async (file) => JSON.parse(await readFile(file, 'utf8'));
const report = await read('docs/simplero-blog-migration.json');
const originals = await read('src/data/legacy-posts.json');
const archive = await read('src/data/archive.json');
const library = await read('src/data/library-pages.json');
const consolidated = await read('src/data/consolidated-articles.json');
const migrations = await read('src/data/article-migrations.json');

test('every captured Simplero blog article has its own page or a documented merge', () => {
  const originalsByPath = new Map(originals.map((post) => [`/${post.slug}`, post]));
  const archiveByPath = new Map(archive.map((post) => [`/${post.slug}`, post]));
  const migrationsByPath = new Map(migrations.map((item) => [item.source, item]));
  const destinations = new Set([
    ...archiveByPath.keys(),
    ...library.map((post) => `/${post.slug}`),
    ...consolidated.map((post) => `/madro-biblioteket/${post.slug}`),
  ]);
  assert.equal(report.entries.length, originals.length);
  assert.equal(new Set(report.entries.map((entry) => entry.source)).size, report.entries.length);
  for (const entry of report.entries) {
    const source = new URL(entry.source);
    const destination = new URL(entry.destination);
    assert.equal(source.hostname, 'ditte-munch-andersen.simplero.com');
    assert.equal(destination.hostname, 'www.successfuleating.dk');
    assert.ok(originalsByPath.has(source.pathname), entry.source);
    assert.equal(
      new Date(entry.sourceLastModified).getTime(),
      new Date(originalsByPath.get(source.pathname).modified).getTime(),
      entry.source,
    );
    assert.ok(destinations.has(destination.pathname), entry.destination);
    if (entry.mode === 'merged') {
      assert.equal(migrationsByPath.get(source.pathname)?.target, destination.pathname);
      assert.ok(entry.reason, entry.source);
    } else {
      assert.equal(entry.mode, 'same-url');
      assert.equal(destination.pathname, source.pathname);
      assert.ok(archiveByPath.has(source.pathname));
    }
  }
  assert.equal(report.summary.sameUrl, archive.length);
  assert.equal(report.summary.sourceRevisionsMatching, originals.length);
  assert.equal(report.summary.merged, migrations.length);
  assert.equal(
    report.summary.editorialRevisions,
    archive.filter((post) => post.editorialUpdated).length,
  );
});

test('non-rewritten one-to-one pages retain the source article text', () => {
  const sourceBySlug = new Map(originals.map((post) => [post.slug, post]));
  const words = (html) => {
    const counts = new Map();
    for (const word of load(html)
      .text()
      .toLocaleLowerCase('da-DK')
      .match(/[\p{L}\p{N}]+/gu) || [])
      counts.set(word, (counts.get(word) || 0) + 1);
    return counts;
  };
  for (const post of archive) {
    if (post.editorialUpdated) continue;
    const source = words(sourceBySlug.get(post.slug).body);
    const published = words(post.body);
    const sourceCount = [...source.values()].reduce((sum, n) => sum + n, 0);
    const retained = [...source].reduce(
      (sum, [word, n]) => sum + Math.min(n, published.get(word) || 0),
      0,
    );
    assert.ok(
      sourceCount > 0 && retained / sourceCount >= 0.9,
      `${post.slug}: ${retained}/${sourceCount} words retained`,
    );
  }
});
