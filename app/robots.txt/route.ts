export function GET() {
  const content = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Secciones específicas que queremos que sean indexadas
Allow: /servicios-por-industria/
Allow: /servicios/
Allow: /industrias/
Allow: /blog/
Allow: /cotizar

# Archivos específicos a no indexar para mejorar rendimiento
Disallow: /*.json$
Disallow: /*_buildManifest.js$
Disallow: /*_ssgManifest.js$
Disallow: /*.js.map$
Disallow: /api/
Disallow: /static/

# Permitir recursos estáticos críticos de Next.js
Allow: /_next/static/
Allow: /_next/image

# Bloquear build data innecesarios
Disallow: /_next/data/

# Crawl-delay para evitar sobrecarga del servidor
Crawl-delay: 1

# Sitemap
Sitemap: https://www.gard.cl/sitemap.xml
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400' // Cache por 24 horas
    },
  });
} 