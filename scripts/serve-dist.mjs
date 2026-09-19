/** Static build preview with Cloudflare-style redirects and genuine 404 responses. */
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist');
const rules = (await readFile('public/_redirects', 'utf8'))
  .split('\n')
  .filter((l) => l && !l.startsWith('#'))
  .map((l) => l.split(/\s+/));
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
};
http
  .createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost'),
        pathname = decodeURIComponent(url.pathname);
      const rule = rules.find(([from]) =>
        from.endsWith('*')
          ? pathname.startsWith(decodeURIComponent(from).slice(0, -1))
          : pathname.replace(/\/$/, '') === decodeURIComponent(from).replace(/\/$/, ''),
      );
      if (rule) {
        res.writeHead(Number(rule[2]), { Location: rule[1] });
        return res.end();
      }
      let file = path.resolve(root, '.' + pathname);
      if (!file.startsWith(root + path.sep) && file !== root) {
        res.writeHead(403);
        return res.end();
      }
      try {
        if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
        const data = await readFile(file);
        res.writeHead(200, {
          'Content-Type': types[path.extname(file)] || 'application/octet-stream',
        });
        res.end(data);
      } catch {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(
          await readFile(path.join(root, '404.html')).catch(() =>
            readFile(path.join(root, '404/index.html')),
          ),
        );
      }
    } catch {
      res.writeHead(400);
      res.end();
    }
  })
  .listen(4321, '127.0.0.1', () => console.log('Static site: http://127.0.0.1:4321'));
