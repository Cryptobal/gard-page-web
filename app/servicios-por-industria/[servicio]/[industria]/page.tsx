import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServicioIndustriaContent } from '@/lib/data/getServicioIndustriaContent';
import { industriesMetadata } from '@/app/industrias/industryMetadata';
import { servicesMetadata } from '@/app/servicios/serviceMetadata';
import { serviciosPorIndustria, esCombinacionValida } from '@/app/data/servicios-por-industria';
import ServicioIndustriaLanding from './components/ServicioIndustriaLanding';

// Next.js 15: params es ahora una Promise
interface PageProps {
  params: Promise<{
    servicio: string;
    industria: string;
  }>;
}

// Validar parámetros de URL para evitar páginas innecesarias
export function generateStaticParams() {
  const params = [];
  
  // Para cada servicio en nuestro catálogo
  for (const servicio of servicesMetadata) {
    // Para cada industria en nuestro catálogo
    for (const industria of industriesMetadata) {
      // Verificar si la combinación servicio-industria es válida
      if (esCombinacionValida(servicio.slug, industria.slug)) {
        params.push({
          servicio: servicio.slug,
          industria: industria.slug,
        });
      }
    }
  }
  
  console.log(`Generando ${params.length} combinaciones de servicio-industria`);
  return params;
}

// Generar metadata dinámicamente para SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const content = getServicioIndustriaContent(resolvedParams.servicio, resolvedParams.industria);
  
  if (!content) {
    return {
      title: 'Página no encontrada | Gard Security',
      description: 'Lo sentimos, no pudimos encontrar el servicio que estás buscando.',
    };
  }
  
  // Obtener información del servicio e industria para mejorar los metadatos
  const servicio = servicesMetadata.find(s => s.slug === resolvedParams.servicio)?.title || resolvedParams.servicio;
  const industria = industriesMetadata.find(i => i.slug === resolvedParams.industria)?.title || resolvedParams.industria;
  
  // Construir la URL correcta con el prefijo servicios-por-industria
  const url = `https://www.gard.cl/servicios-por-industria/${resolvedParams.servicio}/${resolvedParams.industria}`;
  
  return {
    title: content.title,
    description: content.metaDescription,
    keywords: [`seguridad ${industria}`, `${servicio} para ${industria}`, 'seguridad privada', 'servicios de seguridad', 'gard security'],
    openGraph: {
      title: content.title,
      description: content.metaDescription,
      type: 'website',
      locale: 'es_CL',
      url: url,
      siteName: 'Gard Security',
      images: [
        {
          url: content.imageId 
            ? `https://imagedelivery.net/cGbMPRg9wt8jvG6HDuBzVQ/${content.imageId}/public` 
            : 'https://www.gard.cl/opengraph-image.jpg',
          width: 1200,
          height: 630,
          alt: `${servicio} para ${industria} | Gard Security`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.metaDescription,
      images: content.imageId 
        ? [`https://imagedelivery.net/cGbMPRg9wt8jvG6HDuBzVQ/${content.imageId}/public`] 
        : ['https://www.gard.cl/opengraph-image.jpg'],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ServicioIndustriaPage({ params }: PageProps) {
  const resolvedParams = await params;
  // Obtener contenido dinámico combinando datos de servicio e industria
  const content = getServicioIndustriaContent(resolvedParams.servicio, resolvedParams.industria);
  
  // Si la combinación servicio-industria no existe, retornar 404
  if (!content) {
    notFound();
  }
  
  return <ServicioIndustriaLanding content={content} params={resolvedParams} />;
} 