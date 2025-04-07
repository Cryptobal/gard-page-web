import React from 'react';
import type { Metadata } from 'next';
import ServicioPage from '../[slug]/page';

export const metadata: Metadata = {
  title: 'Guardias de Seguridad | Gard Security',
  description: 'Personal altamente capacitado para la protección física de instalaciones, personas y activos de su empresa.',
  alternates: {
    canonical: 'https://www.gard.cl/servicios/guardias-de-seguridad',
  },
  openGraph: {
    title: 'Guardias de Seguridad | Gard Security',
    description: 'Personal altamente capacitado para la protección física de instalaciones, personas y activos de su empresa.',
    url: 'https://www.gard.cl/servicios/guardias-de-seguridad',
    siteName: 'Gard Security',
    type: 'article',
    locale: 'es_CL',
  },
};

export default function GuardiasDeSeguridad() {
  return (
    <>
      {/* Página de servicio estándar */}
      <ServicioPage params={{ slug: 'guardias-de-seguridad' }} />
    </>
  );
} 