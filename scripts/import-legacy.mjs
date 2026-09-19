/** Read-only, rate-limited import of the public article archive. Does not log in or submit forms. */
import { load } from 'cheerio';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
const origin = 'https://www.successfuleating.dk';
await mkdir('.research/posts', { recursive: true });
let xml;
try {
  xml = await readFile('.research/sitemap.xml.html', 'utf8');
} catch {
  const r = await fetch(`${origin}/sitemap.xml`);
  if (!r.ok) throw Error(`Sitemap HTTP ${r.status}`);
  xml = await r.text();
  await writeFile('.research/sitemap.xml.html', xml);
}
const $xml = load(xml, { xml: true });
const urls = $xml('loc')
  .map((_, el) => $xml(el).text())
  .get();
const articleUrls = urls.filter(
  (url) => new URL(url).origin === origin && /^\/blog\/\d/.test(new URL(url).pathname),
);
const posts = [],
  errors = [];
let next = 0;
async function worker() {
  while (next < articleUrls.length) {
    const index = next++,
      url = articleUrls[index],
      slug = decodeURIComponent(new URL(url).pathname).replace(/^\//, '');
    const cache = `.research/posts/${slug.replaceAll('/', '__')}.html`;
    try {
      let html;
      try {
        html = await readFile(cache, 'utf8');
      } catch {
        const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
        if (response.status === 429) {
          console.log('Rate limit reached; stopping live reads. Re-run later using the cache.');
          next = articleUrls.length;
          throw new Error('HTTP 429; retry later');
        }
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        html = await response.text();
        await writeFile(cache, html);
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      const $ = load(html);
      const rawSchema = $('script[type="application/ld+json"]')
        .map((_, e) => {
          try {
            return JSON.parse($(e).text());
          } catch {
            return [];
          }
        })
        .get()
        .flat();
      const schema = rawSchema.find((s) => s['@type'] === 'BlogPosting') || {};
      const body = $('.blog-post__body').first();
      const title = $('.blog-post__title').first().text().trim();
      if (!title || body.text().trim().length < 25) throw new Error('Missing article body/title');
      body
        .find('.blog-post__meta,.blog-post__navigation,.blog-post__comments,.social-share')
        .remove();
      body.find('script,style,form,input,button,iframe,object,embed,link,meta').remove();
      const allowed = new Set([
        'p',
        'h2',
        'h3',
        'h4',
        'ul',
        'ol',
        'li',
        'strong',
        'em',
        'b',
        'i',
        'a',
        'img',
        'br',
        'hr',
        'blockquote',
        'table',
        'thead',
        'tbody',
        'tr',
        'th',
        'td',
        'figure',
        'figcaption',
        'div',
        'span',
        'section',
        'picture',
        'source',
      ]);
      body.find('*').each((_, el) => {
        if (!allowed.has(el.tagName)) {
          if (el.tagName === 'h1') el.tagName = 'h2';
          else {
            $(el).replaceWith($(el).contents());
            return;
          }
        }
        for (const name of Object.keys(el.attribs || {}))
          if (
            ![
              'href',
              'src',
              'srcset',
              'sizes',
              'alt',
              'width',
              'height',
              'colspan',
              'rowspan',
              'type',
            ].includes(name)
          )
            $(el).removeAttr(name);
        for (const attr of ['href', 'src']) {
          const v = $(el).attr(attr);
          if (!v) continue;
          const safe = /^(https?:|mailto:|tel:|\/|#)/i.test(v.trim());
          if (!safe) $(el).removeAttr(attr);
          else if (v.startsWith(origin)) $(el).attr(attr, v.slice(origin.length) || '/');
        }
        if (el.tagName === 'img') {
          $(el).attr('loading', 'lazy').attr('decoding', 'async');
          if (!$(el).attr('alt')) $(el).attr('alt', 'Illustration til artiklen');
        }
        if (el.tagName === 'a' && /^https?:/.test($(el).attr('href') || ''))
          $(el).attr('rel', 'noopener');
      });
      const category = $('.blog-post__category a').first();
      posts.push({
        slug,
        title,
        description: String(
          schema.description ||
            $('meta[name="description"]').attr('content') ||
            body.text().trim().replace(/\s+/g, ' ').slice(0, 155),
        ),
        published: schema.datePublished || null,
        modified: schema.dateModified || schema.datePublished || null,
        category: category.text().trim() || 'Madro og spisemønstre',
        categoryPath: category.attr('href') || null,
        body: body.html(),
        source: url,
      });
    } catch (error) {
      errors.push({ url, error: String(error) });
    }
    if ((index + 1) % 50 === 0) console.log(`Processed ${index + 1}/${articleUrls.length}`);
  }
}
await Promise.all(Array.from({ length: 1 }, worker));
posts.sort(
  (a, b) => String(b.published).localeCompare(String(a.published)) || a.slug.localeCompare(b.slug),
);
await writeFile('src/data/legacy-posts.json', JSON.stringify(posts));
await writeFile(
  'docs/legacy-url-inventory.json',
  JSON.stringify(
    { capturedAt: new Date().toISOString(), source: `${origin}/sitemap.xml`, urls },
    null,
    2,
  ),
);
await writeFile(
  'docs/legacy-import-report.json',
  JSON.stringify({ expected: articleUrls.length, imported: posts.length, errors }, null, 2),
);
console.log({ expected: articleUrls.length, imported: posts.length, errors });
if (errors.length) process.exitCode = 1;
