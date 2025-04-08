import React from 'react';
import type { Metadata } from 'next';
import ServicioPage from '../[slug]/page';

export const metadata: Metadata = {
  title: 'Seguridad Electrónica | Gard Security',
  description: 'Sistemas tecnológicos avanzados de CCTV, control de acceso y alarmas para proteger instalaciones con detección inteligente.',
  alternates: {
    canonical: 'https://www.gard.cl/servicios/seguridad-electronica',
  },
  openGraph: {
    title: 'Seguridad Electrónica | Gard Security',
    description: 'Sistemas tecnológicos avanzados de CCTV, control de acceso y alarmas para proteger instalaciones con detección inteligente.',
    url: 'https://www.gard.cl/servicios/seguridad-electronica',
    siteName: 'Gard Security',
    type: 'article',
    locale: 'es_CL',
  },
};

export default function SeguridadElectronica() {
  // Utiliza el componente dinámico con el slug correspondiente
  return <ServicioPage params={{ slug: 'seguridad-electronica' }} />;
} 