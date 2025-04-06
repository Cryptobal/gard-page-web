import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tecnología para Seguridad Empresarial | Gard Security',
  description: 'Soluciones tecnológicas avanzadas para seguridad privada: sistemas de monitoreo, control de rondas, vigilancia inteligente y detección proactiva de amenazas.',
  alternates: {
    canonical: 'https://gard.cl/tecnologia-seguridad',
  },
};

export default function TecnologiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 