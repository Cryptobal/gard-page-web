export function GET() {
  const content = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Permitir explícitamente landing pages dinámicas
Allow: /landing-dinamico/
Allow: /landing-dinamico/*/*
Allow: /ciudades/
Allow: /ciudades/*

# Archivos específicos a no indexar
Disallow: /*.json$
Disallow: /*_buildManifest.js$
Disallow: /*_ssgManifest.js$
Disallow: /*.js.map$
Disallow: /*.css.map$

# No indexar páginas de paginación más allá de la página 2
Disallow: /blog/page/[3-9]
Disallow: /blog/page/[1-9][0-9]
Disallow: /blog/tag/*/page/

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