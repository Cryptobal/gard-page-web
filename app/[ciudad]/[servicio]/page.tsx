import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCiudadServicioContent } from '@/lib/data/getCiudadServicioContent';
import { ciudades } from '@/lib/data/ciudad-data';
import { servicesMetadata } from '@/app/servicios/serviceMetadata';
import CiudadServicioLanding from './components/CiudadServicioLanding';
import CiudadServicioGold from './components/CiudadServicioGold';
import { getServicioCiudadCopy } from '@/lib/data/servicio-ciudad-copy';

interface PageProps {
  params: Promise<{
    ciudad: string;
    servicio: string;
  }>;
}

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const canonicalUrl = `https://www.gard.cl/${resolvedParams.ciudad}/${resolvedParams.servicio}`;

  // Si hay copy verificado para esta combinación, la metadata se construye
  // desde el heroH1 y el intro de la plantilla de oro; sino cae al contenido
  // genérico anterior.
  const verifiedCopy = getServicioCiudadCopy(
    resolvedParams.ciudad,
    resolvedParams.servicio,
  );
  if (verifiedCopy) {
    const description = verifiedCopy.introParagraph.slice(0, 180);
    return {
      title: `${verifiedCopy.heroH1} | Gard Security`,
      description,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: verifiedCopy.heroH1,
        description,
        type: 'website',
        locale: 'es_CL',
        url: canonicalUrl,
        siteName: 'Gard Security',
      },
    };
  }

  const content = getCiudadServicioContent(
    resolvedParams.ciudad,
    resolvedParams.servicio,
  );

  if (!content) {
    return {
      title: 'Página no encontrada | Gard Security',
      description: 'Lo sentimos, no pudimos encontrar el servicio que estás buscando.',
    };
  }

  return {
    title: content.title,
    description: content.metaDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: content.title,
      description: content.metaDescription,
      type: 'website',
      locale: 'es_CL',
      url: canonicalUrl,
      siteName: 'Gard Security',
    },
  };
}

export default async function CiudadServicioPage({ params }: PageProps) {
  const resolvedParams = await params;

  // Preferir el template "gold standard" cuando exista copy verificado
  // para esta combinación ciudad × servicio. Fallback silencioso al
  // template genérico anterior para el resto.
  const verifiedCopy = getServicioCiudadCopy(
    resolvedParams.ciudad,
    resolvedParams.servicio,
  );
  if (verifiedCopy) {
    return <CiudadServicioGold copy={verifiedCopy} />;
  }

  const content = getCiudadServicioContent(
    resolvedParams.ciudad,
    resolvedParams.servicio,
  );

  if (!content) {
    notFound();
  }

  return <CiudadServicioLanding content={content} params={resolvedParams} />;
}
