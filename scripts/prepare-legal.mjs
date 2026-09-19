import { readFile, writeFile } from 'node:fs/promises';
import { load } from 'cheerio';
const $ = load(await readFile('.research/terms.html', 'utf8'));
const body = $('.wysiwyg-content').first();
body.find('h1').remove();
body.find('*').each((_, el) => {
  for (const name of Object.keys(el.attribs))
    if (!['href', 'rel', 'target'].includes(name)) $(el).removeAttr(name);
});
await writeFile('src/data/original-terms.html', body.html());
