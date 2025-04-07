export function GET() {
  const content = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Secciones específicas que queremos que sean indexadas
Allow: /servicios-por-industria/
Allow: /servicios/
Allow: /industrias/
Allow: /blog/

# Archivos específicos a no indexar
Disallow: /*.json$
Disallow: /*_buildManifest.js$
Disallow: /*_ssgManifest.js$
Disallow: /*.js.map$

# Sitemap
Sitemap: https://www.gard.cl/sitemap.xml
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    },
  });
} 