import { MetadataRoute } from 'next';
import { industriesMetadata } from './industrias/industryMetadata';
import { getAllPosts, POSTS_PER_PAGE, getAllTags, getPostsByTag } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.gard.cl';
  
  // Páginas estáticas
  const staticPages = [
    '',
    '/servicios',
    '/industrias',
    '/sobre-nosotros',
    '/contacto',
    '/politica-de-privacidad',
    '/terminos-de-servicio',
    '/blog',
    '/tecnologia-seguridad',
    '/cotizar',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Páginas de servicios
  const servicePages = [
    '/servicios/seguridad-perimetral',
    '/servicios/monitoreo',
    '/servicios/prevencion-intrusiones',
    '/servicios/auditoria-seguridad',
    '/servicios/consultoria',
    '/servicios/guardias-de-seguridad',
    '/servicios/drones-seguridad',
    '/servicios/seguridad-electronica',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Páginas de industrias dinámicas (usar slugs de industryMetadata para coincidir con rutas)
  const industryPages = industriesMetadata.map((industry) => ({
    url: `${baseUrl}/industrias/${industry.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  
  // Páginas de blog dinámicas (posts individuales) - incluye OPAI automáticamente
  const blogPosts = await getAllPosts();
  const blogPostPages = blogPosts.map((post) => {
    const date = post.date ? new Date(post.date) : new Date();
    const lastModified = isNaN(date.getTime()) ? new Date() : date;
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    };
  });
  
  // Páginas de paginación del blog
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const blogPaginationPages = Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    url: `${baseUrl}/blog/page/${i + 2}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));
  
  // Páginas de etiquetas del blog
  const allTags = await getAllTags();
  const blogTagPages = allTags.map((tag) => ({
    url: `${baseUrl}/blog/tag/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Páginas de paginación por etiqueta
  const blogTagPaginationPages = [];
  for (const tag of allTags) {
    const { totalPages } = await getPostsByTag(tag);
    
    if (totalPages > 1) {
      const pages = Array.from({ length: totalPages - 1 }, (_, i) => ({
        url: `${baseUrl}/blog/tag/${encodeURIComponent(tag)}/page/${i + 2}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      }));
      
      blogTagPaginationPages.push(...pages);
    }
  }

  return [
    ...staticPages, 
    ...servicePages, 
    ...industryPages, 
    ...blogPostPages, 
    ...blogPaginationPages,
    ...blogTagPages,
    ...blogTagPaginationPages
  ];
}
