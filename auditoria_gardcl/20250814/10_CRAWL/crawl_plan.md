### Plan de crawl

- Opción 1: `npx @lhci/cli collect --url-list=sitemap --start-server-command` (si local) + parse.
- Opción 2: Node + `sitemap-xml-parser` para volcar URLs a `crawl.csv` y enriquecer con `fetch` (status, x-robots-tag, title, h1).
- Opción 3: `simplecrawler` con límites de profundidad y domain filter.
