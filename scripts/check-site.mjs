import { readdir, readFile, access, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';
await mkdir('.research', { recursive: true });
const root = path.resolve('dist'),
  origin = 'https://www.successfuleating.dk';
async function walk(dir) {
  return (
    await Promise.all(
      (await readdir(dir, { withFileTypes: true })).map((e) =>
        e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name),
      ),
    )
  ).flat();
}
const files = (await walk(root)).filter((f) => f.endsWith('.html'));
const redirects = (await readFile('public/_redirects', 'utf8'))
  .split('\n')
  .filter((l) => l && !l.startsWith('#'))
  .map((l) => {
    const [from, to, status] = l.split(/\s+/);
    return { from, to, status };
  });
function redirectFor(url) {
  return redirects.find((r) => {
    const f = decodeURIComponent(r.from);
    return f.endsWith('*')
      ? url.startsWith(f.slice(0, -1))
      : url.replace(/\/$/, '') === f.replace(/\/$/, '');
  });
}
const routes = new Map(
  files.map((f) => {
    const rel = path.relative(root, f).replaceAll(path.sep, '/');
    return ['/' + rel.replace(/(?:\/)?index\.html$/, '').replace(/\.html$/, ''), f];
  }),
);
const failures = [];
const links = new Map();
const titles = new Map();
for (const file of files) {
  const html = await readFile(file, 'utf8'),
    $ = load(html);
  const route = [...routes].find(([, f]) => f === file)[0];
  const check = (v, msg) => {
    if (!v) failures.push(`${route}: ${msg}`);
  };
  check($('html').attr('lang') === 'da', 'language must be Danish');
  check($('h1').length === 1, `expected one H1, found ${$('h1').length}`);
  check(
    $('meta[name="description"]').attr('content')?.trim().length > 30,
    'missing/short description',
  );
  check($('title').text().length > 10, 'missing title');
  const title = $('title').text();
  if (titles.has(title)) failures.push(`${route}: duplicate title with ${titles.get(title)}`);
  else titles.set(title, route);
  const canonical = $('link[rel="canonical"]').attr('href');
  check(
    canonical === new URL(route || '/', origin).href,
    `canonical ${canonical} disagrees with route`,
  );
  check($('meta[property="og:title"]').attr('content') === title, 'OG title mismatch');
  $('script[type="application/ld+json"]').each((_, e) => {
    try {
      const j = JSON.parse($(e).text());
      check(j['@context'] === 'https://schema.org', 'schema context');
      for (const n of j['@graph'] || []) {
        check(n['@type'] !== 'Product', 'unsupported Product schema');
        if (n['@type'] === 'BlogPosting') {
          const author = n.author?.['@id'];
          check(author === `${origin}/om-ditte#person`, 'blog author identity');
          check(
            n.mainEntityOfPage?.['@id'] === `${canonical}#webpage`,
            'mainEntityOfPage mismatch',
          );
        }
      }
    } catch {
      failures.push(`${route}: invalid JSON-LD`);
    }
  });
  for (const el of $('a[href],img[src],script[src],link[rel="stylesheet"]')) {
    const val = $(el).attr('href') || $(el).attr('src');
    if (!val || /^(mailto:|tel:|data:)/.test(val)) continue;
    let url;
    try {
      url = new URL(val, origin + route);
    } catch {
      failures.push(`${route}: invalid URL ${val}`);
      continue;
    }
    if (url.origin !== origin) continue;
    const target = decodeURIComponent(url.pathname).replace(/\/$/, '') || '/';
    if (!links.has(target)) links.set(target, []);
    links.get(target).push(route);
  }
}
for (const [target, from] of links) {
  if (routes.has(target) || redirectFor(target)) continue;
  try {
    await access(path.join(root, target));
  } catch {
    failures.push(`Missing local target ${target} (linked from ${from.slice(0, 2).join(', ')})`);
  }
}
for (const r of redirects) {
  if (
    r.to.startsWith('/') &&
    !r.to.endsWith('.xml') &&
    !routes.has(decodeURIComponent(r.to).split('?')[0].replace(/\/$/, '') || '/') &&
    !redirectFor(r.to)
  )
    failures.push(`Redirect target missing: ${r.from} → ${r.to}`);
}
const sitemap = await readFile('dist/sitemap-0.xml', 'utf8');
const $s = load(sitemap, { xml: true });
const sitemapUrls = $s('loc')
  .map((_, e) => $s(e).text())
  .get();
for (const url of sitemapUrls) {
  const route = decodeURIComponent(new URL(url).pathname).replace(/\/$/, '') || '/';
  if (!routes.has(route)) failures.push(`Sitemap route missing: ${route}`);
  if (route === '/404') failures.push('404 in sitemap');
}
for (const route of [
  '/',
  '/forloebet',
  '/kropsglaede',
  '/om-ditte',
  '/resultater',
  '/sulteneller',
  '/terms',
  '/kontakt',
  '/madro-biblioteket',
])
  if (!sitemapUrls.includes(new URL(route, origin).href))
    failures.push(`Key route missing from sitemap: ${route}`);
const report = {
  pages: files.length,
  sitemapUrls: sitemapUrls.length,
  localTargets: links.size,
  redirects: redirects.length,
  failures,
};
await writeFile('.research/site-check.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
