import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Empresa de Seguridad Privada Líder en Chile | Gard Security',
  description: 'Gard Security ofrece servicios profesionales de guardias, monitoreo y seguridad electrónica. Soluciones de protección para empresas y organizaciones en Chile.',
  alternates: {
    canonical: 'https://gard.cl',
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 