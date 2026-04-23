import React from 'react';
import { Metadata } from 'next';
import { companyStats } from '@/lib/data/company-stats';

export const metadata: Metadata = {
  title: 'Sobre Nosotros - Gard Security',
  description: `Conoce quiénes somos en Gard Security. Un equipo fundador con más de ${companyStats.leadershipYearsExperience} años de experiencia protegiendo empresas con presencia en terreno y tecnología avanzada.`,
  keywords: 'empresa de seguridad privada, seguridad para empresas, expertos en protección operativa, guardias de seguridad para industria',
};

export default function SobreNosotrosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
} 