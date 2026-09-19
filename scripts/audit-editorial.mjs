/** Planning inventory only. Signals nominate a manual review; they never remove content. */
import { readFile, writeFile } from 'node:fs/promises';
import { load } from 'cheerio';
const posts = JSON.parse(await readFile('src/data/archive.json', 'utf8'));
const firstBatch = [
  '101752',
  '59618',
  '59762',
  '50527',
  '50375',
  '50318',
  '50601',
  '56441',
  '50507',
  '50565',
];
const protectedIds = new Set([
  ...firstBatch,
  '50249',
  '50484',
  '50253',
  '50216',
  '89204',
  '50441',
  '50254',
  '50636',
]);
const patterns = [
  [
    'kampagnetekst',
    /rabat|black friday|tilmelding.{0,30}lukker|tilbuddet.{0,35}(?:slutter|gælder)/iu,
  ],
  [
    'vaegttabsloefte',
    /tab(?:e|er)? (?:dig )?\d+ (?:kg|kilo)|\d+\s*(?:kg|kilo).{0,60}(?:uge|måned|mdr)|den (?:virkelige )?årsag til (?:din )?overvægt/iu,
  ],
  ['fagligt_udsagn', /dopamin|kortisol|nervesystem|undersøgelser viser|forskning viser/iu],
];
const segmenter = new Intl.Segmenter('da', { granularity: 'word' });
const entries = posts.map((p) => {
  const $ = load(p.body);
  $('br').replaceWith(' ');
  $('p,div,h1,h2,h3,h4,li,blockquote').append(' ');
  const text = $.text().replace(/\s+/g, ' ').trim();
  const words = [...segmenter.segment(text)].filter((s) => s.isWordLike).length;
  const signals = patterns.flatMap(([code, regex]) => {
    const match = regex.exec(p.title + ' ' + text);
    if (!match) return [];
    const offset = match.index;
    return [
      {
        code,
        excerpt: (p.title + ' ' + text).slice(
          Math.max(0, offset - 60),
          offset + match[0].length + 90,
        ),
      },
    ];
  });
  if (words < 200)
    signals.push({
      code: 'kort_tekst',
      excerpt: `${words} ord; ikke i sig selv et kvalitetsproblem.`,
    });
  if (/\[video\]|\bvideo\b/i.test(p.title))
    signals.push({
      code: 'medieomtale',
      excerpt: 'Kontrollér at læserens forventede video eller erstatning faktisk findes.',
    });
  const id = p.slug.match(/blog\/(\d+)/)?.[1];
  return {
    url: 'https://www.successfuleating.dk/' + p.slug,
    title: p.title,
    topic: p.topic,
    words,
    priority: firstBatch.includes(id)
      ? 'A: første artikelrunde'
      : signals.some((s) => ['kampagnetekst', 'vaegttabsloefte'].includes(s.code))
        ? 'B: gennemgå tilbud og løfter før lancering'
        : signals.length
          ? 'C: redaktionel gennemgang'
          : 'D: øvrigt arkiv',
    preserveUrl: protectedIds.has(id),
    status: 'Afventer manuel vurdering',
    signals,
  };
});
const count = (fn) => entries.filter(fn).length;
const result = {
  date: '2026-09-19',
  source: 'src/data/archive.json',
  method:
    'Automatisk indholdsscreening af alle resterende artikler. Signaler er læseprioriteter, ikke verificerede fejl, kliniske vurderinger eller slettebeslutninger. Ukendte trafik- og backlinkdata er ikke sat til nul.',
  summary: {
    articles: entries.length,
    under200Words: count((p) => p.words < 200),
    campaignSignals: count((p) => p.signals.some((s) => s.code === 'kampagnetekst')),
    weightClaimSignals: count((p) => p.signals.some((s) => s.code === 'vaegttabsloefte')),
    scientificClaimSignals: count((p) => p.signals.some((s) => s.code === 'fagligt_udsagn')),
    mediaSignals: count((p) => p.signals.some((s) => s.code === 'medieomtale')),
    firstBatch: count((p) => p.priority.startsWith('A')),
    priorities: Object.fromEntries(
      ['A', 'B', 'C', 'D'].map((k) => [k, count((p) => p.priority.startsWith(k))]),
    ),
  },
  entries,
};
await writeFile('docs/editorial-inventory.json', JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result.summary, null, 2));
