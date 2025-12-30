import { Metadata } from 'next';
import { getCiudadBySlug } from '@/lib/data/ciudad-data';
import { cloudflareImages } from '@/lib/images';

// Tipos para los parámetros
type Props = {
  params: {
    ciudad: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Función para generar metadatos dinámicos
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { ciudad: ciudadSlug } = params;
  
  // Obtener datos de la ciudad
  const ciudad = getCiudadBySlug(ciudadSlug);
  
  // Si no existe la ciudad, usar metadatos generales
  if (!ciudad) {
    return {
      title: 'Servicios de Seguridad | Gard Security Chile',
      description: 'Soluciones de seguridad personalizadas para empresas en todo Chile. Guardias, cámaras de seguridad, monitoreo y más.'
    };
  }
  
  // Capitalizar y formatear para legibilidad
  const ciudadFormatted = ciudad.nombre;
  
  // Título dinámico optimizado para SEO
  const title = `Servicios de Seguridad en ${ciudadFormatted} | Gard Security`;
  
  // Descripción dinámica para SEO
  const description = `Soluciones de seguridad adaptadas para ${ciudadFormatted}: ${ciudad.descripcion.substring(0, 100)}...`;
  
  // URL canónica
  const url = `https://www.gard.cl/ciudades/${ciudadSlug}`;
  
  // Imagen OG - usar imagen por defecto ya que CiudadData no tiene imageId
  const ogImage = `https://imagedelivery.net/gGw8cfmEZedi85dYm6qcFw/${cloudflareImages.hero.services}/public`;
  
  // Generar alternates para diferentes versiones de la URL
  const canonicalUrl = url;
  
  const alternates = {
    canonical: canonicalUrl,
    languages: {
      'es-CL': canonicalUrl,
    },
  };
  
  // Generar keywords específicas basadas en la ciudad
  const baseKeywords = [
    'seguridad', 
    `${ciudadFormatted}`,
    'empresas de seguridad', 
    'protección', 
    'Chile', 
    'Gard Security',
    `seguridad en ${ciudadFormatted}`,
    `protección en ${ciudadFormatted}`,
    `empresa de seguridad ${ciudadFormatted}`
  ];
  
  // Añadir keywords específicas basadas en las industrias predominantes de la ciudad
  const industriasKeywords = ciudad.industriasClave.map(industria => 
    `seguridad para ${industria.replace(/-/g, ' ')} en ${ciudadFormatted}`
  );
  
  // Combinar y filtrar keywords duplicadas
  const allKeywords = [...baseKeywords, ...industriasKeywords];
  const uniqueKeywords = Array.from(new Set(allKeywords)).join(', ');
  
  return {
    title,
    description,
    openGraph: {
      title: `${title} | Empresa Líder en Seguridad`,
      description,
      url,
      siteName: 'Gard Security Chile',
      locale: 'es_CL',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Seguridad profesional en ${ciudadFormatted} - Gard Security Chile`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Seguridad Profesional`,
      description,
      images: [ogImage],
      creator: '@GardSecurity',
      site: '@GardSecurity',
    },
    alternates,
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    keywords: uniqueKeywords,
    // Metaetiquetas adicionales para SEO
    other: {
      'theme-color': '#1e3a8a',
      'format-detection': 'telephone=no',
      'geo.region': 'CL',
      'geo.placename': ciudad.nombre,
      'og:locale': 'es_CL',
      'og:type': 'website',
      'twitter:site': '@GardSecurity',
      'og:title': `${title} | Empresa Líder en Seguridad`,
      'og:image:alt': `Seguridad profesional en ${ciudadFormatted} - Gard Security Chile`,
      'twitter:title': `${title} | Seguridad Profesional`,
      'twitter:image:alt': `Seguridad profesional en ${ciudadFormatted} - Gard Security Chile`,
      'author': 'Gard Security Chile',
      'og:site_name': 'Gard Security Chile',
    },
  };
}

export default generateMetadata; 