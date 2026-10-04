import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

const readData = (name) =>
  JSON.parse(readFileSync(new URL(`./src/data/${name}`, import.meta.url), 'utf8'));
const articleLastModified = new Map([
  ...readData('archive.json').map((post) => [
    `/${post.slug}/`,
    post.editorialUpdated || post.modified,
  ]),
  ...readData('library-pages.json').map((post) => [
    `/${post.slug}/`,
    post.editorialUpdated || post.modified,
  ]),
  ...readData('consolidated-articles.json').map((article) => [
    `/madro-biblioteket/${article.slug}/`,
    article.updated,
  ]),
]);

export default defineConfig({
  site: 'https://www.successfuleating.dk',
  devToolbar: { enabled: false },
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => new URL(page).pathname.replace(/\/$/, '') !== '/404',
      serialize: (item) => {
        const lastmod = articleLastModified.get(decodeURIComponent(new URL(item.url).pathname));
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  build: { format: 'directory' },
  server: { host: '127.0.0.1', port: 4321 },
});
