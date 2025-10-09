import { industries } from '../data/industries';
import { getAllPosts, POSTS_PER_PAGE } from '@/lib/blog';
import { ciudades } from '@/lib/data/ciudad-data';
import { servicesMetadata } from '@/app/servicios/serviceMetadata';
import { serviciosPorIndustria, esCombinacionValida } from '../data/servicios-por-industria';

// Priorización de industrias según enfoque B2B
const INDUSTRIAS_PRIORITARIAS = [
  'mineria', 
  'bodegas', 
  'transporte-y-logistica', 
  'edificios-corporativos', 
  'construccion', 
  'parques-industriales',
  'manufactura',
  'sector-energetico'
];

const INDUSTRIAS_SECUNDARIAS = [
  'retail', 
  'salud', 
  'sector-financiero', 
  'centros-comerciales',
  'puertos-terminales',
  'centros-de-datos',
  'farmaceutica',
  'agroindustria',
  'instituciones-publicas',
  'infraestructura-critica'
];

const INDUSTRIAS_BAJA_PRIORIDAD = [
  'eventos-y-espectaculos', 
  'hoteleria-y-turismo', 
  'condominios-residenciales',
  'educacion',
  'instalaciones-deportivas'
];

// Función helper para obtener prioridad y frecuencia por industria
function getIndustriaPriority(industriaSlug: string): { priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' } {
  if (INDUSTRIAS_PRIORITARIAS.includes(industriaSlug)) {
    return { priority: 0.95, changeFrequency: 'weekly' };
  }
  if (INDUSTRIAS_SECUNDARIAS.includes(industriaSlug)) {
    return { priority: 0.75, changeFrequency: 'monthly' };
  }
  return { priority: 0.5, changeFrequency: 'yearly' };
}

// Función para generar las URLs del sitemap optimizada
async function generateSitemap() {
  const baseUrl = 'https://www.gard.cl';
  
  // Páginas estáticas principales con prioridades ajustadas
  const staticPages = [
    { route: '', priority: 1.0, changeFreq: 'weekly' as const },
    { route: '/servicios', priority: 0.9, changeFreq: 'weekly' as const },
    { route: '/industrias', priority: 0.9, changeFreq: 'weekly' as const },
    { route: '/cotizar', priority: 0.95, changeFreq: 'weekly' as const }, // Página de conversión
    { route: '/sobre-nosotros', priority: 0.8, changeFreq: 'monthly' as const },
    { route: '/tecnologia-seguridad', priority: 0.75, changeFreq: 'monthly' as const },
    { route: '/contacto', priority: 0.85, changeFreq: 'monthly' as const },
    { route: '/blog', priority: 0.7, changeFreq: 'weekly' as const },
    { route: '/privacidad', priority: 0.3, changeFreq: 'yearly' as const },
    { route: '/terminos', priority: 0.3, changeFreq: 'yearly' as const },
    { route: '/politica-ambiental', priority: 0.4, changeFreq: 'yearly' as const },
    { route: '/reclutamiento', priority: 0.6, changeFreq: 'monthly' as const },
  ].map(({ route, priority, changeFreq }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: changeFreq,
    priority,
  }));

  // Landing pages ultra-específicas para keywords comerciales (MÁXIMA PRIORIDAD)
  const landingPagesEspecificas = [
    { route: '/mejor-empresa-seguridad-chile', priority: 0.99, changeFreq: 'weekly' as const }, // GEO optimization
    { route: '/calculadora-costo-guardias-chile', priority: 0.97, changeFreq: 'weekly' as const }, // High conversion
    { route: '/guardias-seguridad-mineria-chile', priority: 0.98, changeFreq: 'weekly' as const },
    { route: '/seguridad-bodegas-logistica-chile', priority: 0.98, changeFreq: 'weekly' as const },
    { route: '/guardias-edificios-corporativos-santiago', priority: 0.98, changeFreq: 'weekly' as const },
  ].map(({ route, priority, changeFreq }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: changeFreq,
    priority,
  }));

  // Páginas de servicios principales (prioridad alta para conversión)
  const servicePages = servicesMetadata.map(servicio => ({
    url: `${baseUrl}/servicios/${servicio.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.85, // Alta prioridad para páginas de servicios
  }));

  // Páginas de industrias dinámicas con prioridades diferenciadas
  const industryPages = industries.map((industry) => {
    const slug = industry.name.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
    
    const { priority, changeFrequency } = getIndustriaPriority(slug);
    
    return {
      url: `${baseUrl}/industrias/${slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency,
      priority,
    };
  });
  
  // URLs de servicio-por-industria con prioridades diferenciadas por industria
  const servicioIndustriaPages = [];
  
  for (const servicio of servicesMetadata) {
    for (const industria of industries) {
      const industriaSlug = industria.name.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');
      
      if (esCombinacionValida(servicio.slug, industriaSlug)) {
        const { priority: basePriority, changeFrequency } = getIndustriaPriority(industriaSlug);
        // Las páginas servicio+industria tienen +0.05 de prioridad sobre las páginas de industria sola
        const priority = Math.min(basePriority + 0.05, 1.0);
        
        servicioIndustriaPages.push({
          url: `${baseUrl}/servicios-por-industria/${servicio.slug}/${industriaSlug}`,
          lastModified: new Date().toISOString(),
          changeFrequency,
          priority,
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
  
  // Landing pages dinámicas de ciudad/servicio - EXPANDIDO para SEO local
  const ciudadServicioPages = [];
  
  // Ciudades principales (metropolitanas y mineras)
  const ciudadesPrincipales = ['santiago', 'antofagasta', 'valparaiso', 'concepcion'];
  
  // Servicios principales para SEO local
  const serviciosPrincipales = [
    'guardias-de-seguridad',
    'seguridad-electronica',
    'central-monitoreo',
    'seguridad-perimetral'
  ];
  
  for (const ciudad of ciudades) {
    const esCiudadPrincipal = ciudadesPrincipales.includes(ciudad.slug);
    
    for (const servicioSlug of serviciosPrincipales) {
      ciudadServicioPages.push({
        url: `${baseUrl}/${ciudad.slug}/${servicioSlug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: esCiudadPrincipal ? 'weekly' as const : 'monthly' as const,
        priority: esCiudadPrincipal ? 0.92 : 0.80, // Mayor prioridad para ciudades principales
      });
    }
  }

  // Combinamos todas las URLs (orden por prioridad)
  return [
    ...staticPages,
    ...landingPagesEspecificas, // Landing pages de conversión primero
    ...servicePages, 
    ...servicioIndustriaPages,
    ...ciudadServicioPages,
    ...industryPages,
    ...blogPostPages, 
    ...blogPaginationPages,
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