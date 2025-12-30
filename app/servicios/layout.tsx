import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Servicios de Seguridad Privada | Gard Security',
  description: 'Descubre nuestra completa gama de servicios de seguridad privada: guardias, monitoreo, seguridad electrónica y más. Soluciones adaptadas a empresas e industrias.',
  alternates: {
    canonical: 'https://www.gard.cl/servicios',
  },
};

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}