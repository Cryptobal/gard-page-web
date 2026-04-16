import { Metadata } from 'next';
import { cloudflareImages } from '@/lib/images';

// Función para generar metadatos
export function generateMetadata(): Metadata {
  // Título y descripción optimizados para SEO - Cobertura Nacional
  const title = "Cobertura Nacional de Seguridad Privada | Gard Security";
  const description = "Gard Security opera en 10 ciudades de Chile: Santiago, Antofagasta, Valparaíso, Concepción, Iquique, Puerto Montt, Rancagua, Chillán, Temuco y Viña del Mar. Guardias certificados OS10, monitoreo 24/7 y cotización local.";
  
  // URL canónica
  const url = "https://www.gard.cl/ciudades";
  
  // Imagen OG
  const ogImage = `https://imagedelivery.net/gGw8cfmEZedi85dYm6qcFw/${cloudflareImages.hero.services}/public`;
  
  // Keywords específicas
  const keywords = [
    'seguridad ciudades Chile', 
    'soluciones de seguridad locales', 
    'guardias de seguridad ciudades', 
    'cámaras de seguridad ciudades',
    'seguridad por ciudad',
    'servicios seguridad personalizada',
    'seguridad adaptada',
    'Gard Security ciudades'
  ].join(', ');
  
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
          alt: 'Servicios de seguridad en ciudades de Chile - Gard Security',
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
    alternates: {
      canonical: url,
      languages: {
        'es-CL': url,
        'x-default': url,
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    keywords,
    // Metaetiquetas adicionales para SEO
    other: {
      'theme-color': '#1e3a8a',
      'format-detection': 'telephone=no',
      'geo.region': 'CL',
      'geo.placename': 'Chile',
      'og:locale': 'es_CL',
      'og:type': 'website',
      'twitter:site': '@GardSecurity',
      'og:title': `${title} | Empresa Líder en Seguridad`,
      'og:image:alt': 'Servicios de seguridad en ciudades de Chile - Gard Security',
      'twitter:title': `${title} | Seguridad Profesional`,
      'twitter:image:alt': 'Servicios de seguridad en ciudades de Chile - Gard Security',
      'author': 'Gard Security Chile',
      'og:site_name': 'Gard Security Chile',
    },
  };
}

export default generateMetadata; 