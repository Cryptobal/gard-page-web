import type { Metadata } from 'next';
import { companyStats } from '@/lib/data/company-stats';

const PAGE_URL = 'https://www.gard.cl/guardias-de-seguridad-privada-para-empresas';
const OG_IMAGE_URL = 'https://imagedelivery.net/gGw8cfmEZedi85dYm6qcFw/4824f8b9-abb0-4e77-c654-efe920697b00/public';

export const metadata: Metadata = {
  title: 'Guardias de Seguridad Privada para Empresas en Chile | Gard Security',
  description: `Servicio de guardias de seguridad privada para empresas en Chile. ${companyStats.activeGuards} guardias certificados OS10, cobertura en ${companyStats.citiesCovered} ciudades. Soluciones B2B para minería, logística, retail, corporativo y construcción. Cotización en menos de 12 horas.`,
  keywords: [
    'guardias de seguridad privada para empresas',
    'guardias de seguridad para empresas',
    'servicio de guardias privados Chile',
    'empresa de guardias de seguridad B2B',
    'contratar guardias seguridad empresas',
    'guardias OS10 Chile',
    'seguridad empresarial Chile',
    'guardias privados para industrias',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'es-CL': PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    title: 'Guardias de Seguridad Privada para Empresas en Chile | Gard Security',
    description: `Servicio B2B de guardias de seguridad certificados OS10 para empresas en Chile. Cobertura en ${companyStats.citiesCovered} ciudades, especialistas en minería, logística, retail y corporativo.`,
    url: PAGE_URL,
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Guardias de Seguridad Privada para Empresas — Gard Security Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guardias de Seguridad Privada para Empresas en Chile | Gard Security',
    description: 'Servicio B2B de guardias de seguridad certificados OS10. Cotiza sin compromiso.',
    images: [OG_IMAGE_URL],
  },
};

export default function GuardiasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
