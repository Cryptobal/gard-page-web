export function GET() {
  const content = `# https://www.robotstxt.org/robotstxt.html

# Bots de IA - Permitir acceso explícito para GEO
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: FacebookBot
Allow: /

User-agent: cohere-ai
Allow: /

# Todos los demás bots
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

# Sitemap
Sitemap: https://www.gard.cl/sitemap.xml
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
