import { readFile, writeFile } from 'node:fs/promises';
import { load } from 'cheerio';
const posts = JSON.parse(await readFile('src/data/legacy-posts.json', 'utf8'));
const migrations = JSON.parse(await readFile('src/data/article-migrations.json', 'utf8'));
const consolidated = JSON.parse(await readFile('src/data/consolidated-articles.json', 'utf8'));
const overrides = JSON.parse(await readFile('src/data/editorial-overrides.json', 'utf8'));
const overrideMap = new Map(overrides.map((p) => [p.slug, p]));
if (
  overrideMap.size !== overrides.length ||
  overrides.some((p) => !posts.some((o) => o.slug === p.slug))
)
  throw Error('Invalid editorial override');
const redirects = new Map(migrations.map(({ source, target }) => [source, target]));
const targets = new Set([
  ...consolidated.map(({ slug }) => `/madro-biblioteket/${slug}`),
  ...posts.filter((p) => !redirects.has('/' + p.slug)).map((p) => '/' + p.slug),
]);
if (redirects.size !== migrations.length) throw Error('Duplicate article migration source');
for (const { source, target } of migrations) {
  if (!posts.some((p) => '/' + p.slug === source) || !targets.has(target))
    throw Error(`Invalid article migration: ${source} -> ${target}`);
}
const edits = [];
const treatment =
  /forloeb|forløb|\/products|\/cart|checkout|systeme\.io|\/adhd|\/wegovy|slankepsykologen|dittema\.dk/i;
for (const post of posts) {
  if (redirects.has('/' + post.slug)) continue;
  const $ = load(post.body, null, false);
  // Historical sales language is not the current service. Remove legacy calls to purchase.
  const weight =
    /vaegttab|vægttab|slank|kilo|overvægt/i.test(post.title + ' ' + post.slug) ||
    /\/(50249|50253|50636)-/.test(post.slug);
  post.salesCta = !weight;
  $('a').each((_, el) => {
    const a = $(el),
      href = a.attr('href') || '';
    if (treatment.test(href)) {
      const p = a.closest('p');
      if (p.length && p.text().length < 400) p.remove();
      else a.replaceWith(a.text());
    }
  });
  const id = post.slug.match(/\/(\d+)-/)?.[1];
  if (id === '50257') {
    let html = $.html();
    html = html
      .replace(
        /Det tynde\s*(?:&nbsp;)?\s*model-kropsideal matcher ca\s*2% af normalbefolkningen\./g,
        'Kropsidealerne er ikke nødvendigvis realistiske for den enkelte.',
      )
      .replace(
        /de 2% af befolkningen der er model-tynde/g,
        'dem, der matcher det tynde modelideal',
      );
    post.body = html;
    edits.push({ slug: post.slug, change: 'Udokumenteret 2 %-påstand fjernet.' });
  } else if (id === '50416') {
    $('li,p').each((_, el) => {
      const t = $(el).text();
      if (t.includes('Undersøgelser viser'))
        $(el).html(
          '<strong>Orienter dig.</strong> Se, hvad der er at vælge imellem, og læg mærke til, hvad du har lyst til. Du behøver ikke spise noget, bare fordi det står på bordet.',
        );
      else if (t.includes('Her er undersøgelserne'))
        $(el).html(
          '<strong>Giv plads til at mærke efter.</strong> Tag en portion, der passer til din sult. Du må gerne tage mere, hvis du stadig er sulten.',
        );
    });
    post.body = $.html();
    edits.push({
      slug: post.slug,
      change: 'Usikre buffet-/portionsstudier erstattet med tydeligt praktiske forslag.',
    });
  } else if (id === '50419') {
    post.body =
      '<h2>En pause kan være et sted at begynde</h2><p>Når hverdagen føles presset, kan en pause være en måde at lægge mærke til, hvad du har brug for. Stress og spisning hænger ikke sammen på én bestemt måde for alle. Det er relevant at undersøge din egen situation.</p><h2>Fem idéer til en roligere stund</h2><ul><li>Find en behagelig stilling og mærk din vejrtrækning uden at presse den.</li><li>Prøv at lave én ting ad gangen i et kort tidsrum.</li><li>Hvil dig, hvis din krop har brug for hvile. Det kræver ikke en bestemt stilling.</li><li>Spis, hvis du er sulten. Chokolade eller andre fødevarer er ikke en behandling af stress.</li><li>Tal med en, du har tillid til, hvis du står med mere, end du kan rumme alene.</li></ul><h2>Når spisningen selv bliver en belastning</h2><p>Hvis madtanker og overspisning påvirker din trivsel, kan det være relevant at få faglig hjælp. Det er ikke et spørgsmål om at gøre pauser perfekt. En individuel vurdering kan hjælpe med at finde et passende næste skridt.</p><p>Generel faglig reference: <a href="https://www.nice.org.uk/guidance/ng69">NICE: Eating disorders – recognition and treatment</a>.</p>';
    edits.push({
      slug: post.slug,
      change: 'Louise-citat fjernet; udokumenterede fysiologiske råd omskrevet.',
    });
  } else post.body = $.html();
  if (edits.some((e) => e.slug === post.slug)) {
    post.editorialUpdated = '2026-09-19';
  }
  // Reclassify historic marketing categories into the six useful reader topics.
  const text = (post.category + ' ' + post.title).toLowerCase();
  post.topic = /adhd|add\b/.test(text)
    ? 'adhd'
    : /krop|selvværd|selvaerd|kropsideal/.test(text)
      ? 'kropsbillede'
      : /sukker|afhængig|afhaengig/.test(text)
        ? 'sukkertrang'
        : /jul|ferie|påske|paaske|fest|sommer|social|buffet/.test(text)
          ? 'social-spisning'
          : /trøst|troest|stress|følelse|foelelse|egenomsorg|skam/.test(text)
            ? 'madstoej'
            : 'overspisning';
  post.description = post.description.replace(/\s+/g, ' ').trim();
  if (post.description.length < 40)
    post.description = load(post.body).text().replace(/\s+/g, ' ').trim().slice(0, 155);
  if (['50488', '50502'].includes(id))
    post.title +=
      ' – en refleksion fra ' +
      new Date(post.published).toLocaleDateString('da-DK', { year: 'numeric', month: 'long' });
  const brokenImage = $('a[href*="93eba51f9293bb403a4cb568f4b691a0"]');
  if (brokenImage.length)
    post.body = post.body.replace(
      /<a[^>]*href="[^"]*93eba51f9293bb403a4cb568f4b691a0[^"]*"[^>]*>([\s\S]*?)<\/a>/g,
      '$1',
    );
  if (overrideMap.has(post.slug)) {
    Object.assign(post, overrideMap.get(post.slug));
    edits.push({
      slug: post.slug,
      change:
        'Redaktionelt omskrevet med direkte svar, kilder og afgrænsning. URL bevaret; faglig godkendelse afventer.',
    });
  }
  if (post.description.length > 160)
    post.description = post.description.slice(0, 157).replace(/\s+\S*$/, '') + '…';
}
const publishedPosts = posts.filter((p) => !redirects.has('/' + p.slug));
// Point retained articles straight at replacements, avoiding internal redirect chains.
for (const post of publishedPosts) {
  const $ = load(post.body, null, false);
  $('a[href]').each((_, el) => {
    const a = $(el);
    try {
      const url = new URL(a.attr('href'), 'https://www.successfuleating.dk');
      if (!['www.successfuleating.dk', 'successfuleating.dk'].includes(url.hostname)) return;
      const target = redirects.get(decodeURIComponent(url.pathname).replace(/\/$/, ''));
      if (target) a.attr('href', target); // Old section anchors no longer exist.
    } catch {
      /* Preserve unrelated legacy references for the normal link checker. */
    }
  });
  post.body = $.html();
}
await writeFile('src/data/archive.json', JSON.stringify(publishedPosts));
await writeFile(
  'public/search-index.json',
  JSON.stringify(
    [
      ...consolidated.map((p) => ({ ...p, slug: `madro-biblioteket/${p.slug}` })),
      ...publishedPosts,
    ].map(({ slug, title, description, topic, published }) => ({
      slug,
      title,
      description,
      topic,
      published,
    })),
  ),
);
await writeFile(
  'docs/editorial-changes.json',
  JSON.stringify(
    [
      ...edits,
      ...migrations.map(({ source, target, reason }) => ({
        slug: source.slice(1),
        change: reason,
        redirect: target,
      })),
    ],
    null,
    2,
  ),
);
const redirectFile = 'public/_redirects';
const base = (await readFile(redirectFile, 'utf8'))
  .split('# BEGIN ARTICLE CONSOLIDATION')[0]
  .trimEnd();
await writeFile(
  redirectFile,
  `${base}\n\n# BEGIN ARTICLE CONSOLIDATION — generated by scripts/prepare-archive.mjs\n${migrations.map(({ source, target }) => `${source} ${target} 301`).join('\n')}\n# END ARTICLE CONSOLIDATION\n`,
);
console.log(
  `Prepared ${publishedPosts.length} archived articles, ${consolidated.length} replacements and ${migrations.length} permanent redirects.`,
);
