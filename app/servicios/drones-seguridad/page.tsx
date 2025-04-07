import React from 'react';
import type { Metadata } from 'next';
import ServicioPage from '../[slug]/page';

export const metadata: Metadata = {
  title: 'Drones de Seguridad | Gard Security',
  description: 'Vigilancia aérea avanzada para grandes áreas y terrenos complejos con tecnología de drones y transmisión en tiempo real.',
  alternates: {
    canonical: 'https://www.gard.cl/servicios/drones-seguridad',
  },
  openGraph: {
    title: 'Drones de Seguridad | Gard Security',
    description: 'Vigilancia aérea avanzada para grandes áreas y terrenos complejos con tecnología de drones y transmisión en tiempo real.',
    url: 'https://www.gard.cl/servicios/drones-seguridad',
    siteName: 'Gard Security',
    type: 'article',
    locale: 'es_CL',
  },
};

export default function DronesSeguridad() {
  // Utiliza el componente dinámico con el slug correspondiente
  return <ServicioPage params={{ slug: 'drones-seguridad' }} />;
} 