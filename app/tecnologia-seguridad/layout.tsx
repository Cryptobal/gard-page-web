import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tecnología de Seguridad Avanzada | Gard Security Chile',
  description: 'Sistemas de monitoreo inteligente, control de rondas, vigilancia con IA y soluciones tecnológicas de vanguardia para la seguridad de tu empresa.',
  alternates: {
    canonical: 'https://www.gard.cl/tecnologia-seguridad',
  },
  openGraph: {
    title: 'Tecnología de Seguridad Avanzada | Gard Security Chile',
    description: 'Sistemas de monitoreo inteligente, control de rondas, vigilancia con IA y soluciones tecnológicas de vanguardia para la seguridad de tu empresa.',
    url: 'https://www.gard.cl/tecnologia-seguridad',
    siteName: 'Gard Security',
    images: [{
      url: 'https://www.gard.cl/images/og-tecnologia.jpg',
      width: 1200,
      height: 630,
      alt: 'Tecnología de Vanguardia para Seguridad Privada'
    }],
    locale: 'es_CL',
    type: 'website',
  },
};

export default function TecnologiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 