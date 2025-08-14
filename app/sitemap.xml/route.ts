import { industries } from '../data/industries';
import { getAllPosts, POSTS_PER_PAGE } from '@/lib/blog';
import { ciudades } from '@/lib/data/ciudad-data';
import { servicesMetadata } from '@/app/servicios/serviceMetadata';
import { serviciosPorIndustria, esCombinacionValida } from '../data/servicios-por-industria';

// Función para generar las URLs del sitemap optimizada
async function generateSitemap() {
  const baseUrl = 'https://www.gard.cl';
  
  // Páginas estáticas principales
  const staticPages = [
    '',
    '/servicios',
    '/industrias',
    '/sobre-nosotros',
    '/tecnologia-seguridad',
    '/contacto',
    '/cotizar',
    '/privacidad',
    '/terminos',
    '/politica-ambiental',
    '/reclutamiento',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Páginas de servicios principales
  const servicePages = servicesMetadata.map(servicio => ({
    url: `${baseUrl}/servicios/${servicio.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Páginas de industrias dinámicas
  const industryPages = industries.map((industry) => {
    const slug = industry.name.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
    
    return {
      url: `${baseUrl}/industrias/${slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });
  
  // URLs de servicio-por-industria (solo combinaciones válidas)
  const servicioIndustriaPages = [];
  
  for (const servicio of servicesMetadata) {
    for (const industria of industries) {
      const industriaSlug = industria.name.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');
      
      if (esCombinacionValida(servicio.slug, industriaSlug)) {
        servicioIndustriaPages.push({
          url: `${baseUrl}/servicios-por-industria/${servicio.slug}/${industriaSlug}`,
          lastModified: new Date().toISOString(),
          changeFrequency: 'weekly' as const,
          priority: 0.9,
        });
      }
    }
  }
  
  // Páginas de blog dinámicas (posts individuales)
  const blogPosts = await getAllPosts();
  const blogPostPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));
  
  // Páginas de paginación del blog (solo la primera página adicional)
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const blogPaginationPages = totalPages > 1 ? [
    {
      url: `${baseUrl}/blog/page/2`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }
  ] : [];
  
  // Landing pages dinámicas de ciudad/servicio (solo las más relevantes)
  const ciudadServicioPages = [];
  
  // Solo las 3 ciudades principales y 3 servicios más importantes para optimizar
  const ciudadesPrincipales = ciudades.slice(0, 3);
  const serviciosPrincipales = [
    'guardias-de-seguridad',
    'seguridad-electronica',
    'central-monitoreo'
  ];
  
  for (const ciudad of ciudadesPrincipales) {
    for (const servicioSlug of serviciosPrincipales) {
      ciudadServicioPages.push({
        url: `${baseUrl}/${ciudad.slug}/${servicioSlug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      });
    }
  }

  // Combinamos todas las URLs
  return [
    ...staticPages, 
    ...servicePages, 
    ...industryPages,
    ...servicioIndustriaPages,
    ...blogPostPages, 
    ...blogPaginationPages,
    ...ciudadServicioPages
  ];
}

// Generar el XML del sitemap
function generateSitemapXML(urls: {
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
}[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, lastModified, changeFrequency, priority }) => `<url>
  <loc>${url}</loc>
  <lastmod>${lastModified}</lastmod>
  <changefreq>${changeFrequency}</changefreq>
  <priority>${priority}</priority>
</url>`).join('\n')}
</urlset>`;
}

// Handler para la ruta sitemap.xml con cache optimizado
export async function GET() {
  const urls = await generateSitemap();
  const xml = generateSitemapXML(urls);
  
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400' // Cache por 24 horas
    },
  });
} 