import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://www.successfuleating.dk',
  devToolbar: { enabled: false },
  trailingSlash: 'never',
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404') })],
  build: { format: 'directory' },
  server: { host: '127.0.0.1', port: 4321 },
});
