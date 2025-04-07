import React from 'react';
import type { Metadata } from 'next';
import ServicioPage from '../[slug]/page';

export const metadata: Metadata = {
  title: 'Monitoreo 24/7 | Gard Security',
  description: 'Vigilancia constante de sus instalaciones con sistemas de monitoreo en tiempo real y respuesta inmediata.',
  alternates: {
    canonical: 'https://www.gard.cl/servicios/monitoreo',
  },
  openGraph: {
    title: 'Monitoreo 24/7 | Gard Security',
    description: 'Vigilancia constante de sus instalaciones con sistemas de monitoreo en tiempo real y respuesta inmediata.',
    url: 'https://www.gard.cl/servicios/monitoreo',
    siteName: 'Gard Security',
    type: 'article',
    locale: 'es_CL',
  },
};

export default function Monitoreo() {
  // Utiliza el componente dinámico con el slug correspondiente
  return <ServicioPage params={{ slug: 'central-monitoreo' }} />;
} 