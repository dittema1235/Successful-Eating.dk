/** Compare the live, public Simplero blog sitemap with the checked-in migration. */
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { load } from 'cheerio';

const sourceSitemap = 'https://ditte-munch-andersen.simplero.com/sitemap.xml';
const destinationOrigin = 'https://www.successfuleating.dk';
const reportPath = 'docs/simplero-blog-migration.json';
const write = process.argv.slice(2).includes('--write');

const response = await fetch(sourceSitemap, { signal: AbortSignal.timeout(30000) });
if (!response.ok) throw Error(`Simplero sitemap returned HTTP ${response.status}`);
const $ = load(await response.text(), { xml: true });
const sourceRows = $('url')
  .toArray()
  .map((node) => {
    const parsed = new URL($(node).find('loc').text());
    return {
      path:
        parsed.origin === new URL(sourceSitemap).origin
          ? decodeURIComponent(parsed.pathname).replace(/\/$/, '')
          : '',
      lastModified: $(node).find('lastmod').text(),
    };
  })
  .filter(({ path }) => /^\/blog\/\d/.test(path))
  .sort((a, b) => a.path.localeCompare(b.path));
const sourcePaths = sourceRows.map(({ path }) => path);
if (new Set(sourcePaths).size !== sourceRows.length) throw Error('Duplicate Simplero blog URL');

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const originals = await readJson('src/data/legacy-posts.json');
const archive = await readJson('src/data/archive.json');
const library = await readJson('src/data/library-pages.json');
const consolidated = await readJson('src/data/consolidated-articles.json');
const migrations = await readJson('src/data/article-migrations.json');
const originalMap = new Map(originals.map((post) => [`/${post.slug}`, post]));
const archiveMap = new Map(archive.map((post) => [`/${post.slug}`, post]));
const migrationMap = new Map(migrations.map((item) => [item.source, item]));
const destinations = new Set([
  ...archiveMap.keys(),
  ...library.map((post) => `/${post.slug}`),
  ...consolidated.map((post) => `/madro-biblioteket/${post.slug}`),
]);

const missingFromImport = sourcePaths.filter((path) => !originalMap.has(path));
const noLongerOnSource = [...originalMap.keys()].filter((path) => !sourcePaths.includes(path));
if (missingFromImport.length || noLongerOnSource.length)
  throw Error(JSON.stringify({ missingFromImport, noLongerOnSource }, null, 2));
const modifiedMismatch = sourceRows.filter(
  ({ path, lastModified }) =>
    !lastModified ||
    new Date(lastModified).getTime() !== new Date(originalMap.get(path).modified).getTime(),
);
if (modifiedMismatch.length)
  throw Error(
    `Simplero articles changed since import: ${modifiedMismatch.map((row) => row.path).join(', ')}`,
  );

const entries = sourceRows.map(({ path, lastModified }) => {
  const migration = migrationMap.get(path);
  const destinationPath = migration?.target || path;
  if (!destinations.has(destinationPath))
    throw Error(`Missing destination: ${path} → ${destinationPath}`);
  if (!migration && !archiveMap.has(path)) throw Error(`Missing one-to-one page: ${path}`);
  return {
    source: `https://ditte-munch-andersen.simplero.com${path}`,
    destination: new URL(destinationPath, destinationOrigin).href,
    title: originalMap.get(path).title,
    sourceLastModified: lastModified,
    mode: migration ? 'merged' : 'same-url',
    ...(archiveMap.get(path)?.editorialUpdated ? { editorialRevision: true } : {}),
    ...(migration ? { reason: migration.reason } : {}),
  };
});
const report = {
  sourceSitemap,
  sourcePathSha256: createHash('sha256').update(sourcePaths.join('\n')).digest('hex'),
  sourceRevisionSha256: createHash('sha256')
    .update(
      sourceRows
        .map(({ path, lastModified }) => `${path}|${new Date(lastModified).toISOString()}`)
        .join('\n'),
    )
    .digest('hex'),
  summary: {
    sourceArticles: entries.length,
    sourceRevisionsMatching: entries.length,
    sameUrl: entries.filter((entry) => entry.mode === 'same-url').length,
    editorialRevisions: entries.filter((entry) => entry.editorialRevision).length,
    merged: entries.filter((entry) => entry.mode === 'merged').length,
  },
  entries,
};

if (write) {
  await writeFile(
    reportPath,
    JSON.stringify({ capturedAt: new Date().toISOString(), ...report }, null, 2) + '\n',
  );
  console.log(
    `Wrote ${reportPath}: ${report.summary.sourceArticles} source articles accounted for.`,
  );
} else {
  const snapshot = await readJson(reportPath);
  const { capturedAt, ...expected } = snapshot;
  if (JSON.stringify(expected) !== JSON.stringify(report))
    throw Error(
      `Live Simplero inventory differs from ${reportPath}; run with --write and review the diff.`,
    );
  console.log(
    `Verified ${report.summary.sourceArticles} live Simplero articles: ${report.summary.sameUrl} same-URL pages, ${report.summary.merged} merges.`,
  );
}
