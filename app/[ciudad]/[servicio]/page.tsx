import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCiudadServicioContent } from '@/lib/data/getCiudadServicioContent';
import { ciudades } from '@/lib/data/ciudad-data';
import { servicesMetadata } from '@/app/servicios/serviceMetadata';
import CiudadServicioLanding from './components/CiudadServicioLanding';

interface PageProps {
  params: {
    ciudad: string;
    servicio: string;
  };
}

// Validar parámetros de URL para evitar páginas innecesarias
export function generateStaticParams() {
  const params = [];
  
  for (const ciudad of ciudades) {
    for (const servicio of servicesMetadata) {
      params.push({
        ciudad: ciudad.slug,
        servicio: servicio.slug,
      });
    }
  }
  
  return params;
}

// Generar metadata dinámicamente para SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const content = getCiudadServicioContent(params.ciudad, params.servicio);
  
  if (!content) {
    return {
      title: 'Página no encontrada | Gard Security',
      description: 'Lo sentimos, no pudimos encontrar el servicio que estás buscando.',
    };
  }
  
  return {
    title: content.title,
    description: content.metaDescription,
    openGraph: {
      title: content.title,
      description: content.metaDescription,
      type: 'website',
      locale: 'es_CL',
      url: `https://gard.cl/${params.ciudad}/${params.servicio}`,
      siteName: 'Gard Security',
    },
  };
}

export default function CiudadServicioPage({ params }: PageProps) {
  // Obtener contenido dinámico combinando datos de ciudad y servicio
  const content = getCiudadServicioContent(params.ciudad, params.servicio);
  
  // Si la combinación ciudad-servicio no existe, retornar 404
  if (!content) {
    notFound();
  }
  
  return <CiudadServicioLanding content={content} params={params} />;
} 