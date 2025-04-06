import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gard Security | Empresa Líder en Seguridad Privada en Chile',
  description: 'Servicios profesionales de guardias de seguridad, monitoreo y tecnología de vigilancia para empresas. Soluciones integrales de protección a medida en Chile.',
  alternates: {
    canonical: 'https://gard.cl',
  },
  openGraph: {
    title: 'Gard Security | Empresa Líder en Seguridad Privada en Chile',
    description: 'Servicios profesionales de guardias de seguridad, monitoreo y tecnología de vigilancia para empresas. Soluciones integrales de protección a medida en Chile.',
    url: 'https://gard.cl',
    siteName: 'Gard Security',
    images: [{
      url: 'https://gard.cl/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Gard Security Chile - Seguridad Privada Profesional'
    }],
    locale: 'es_CL',
    type: 'website',
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 