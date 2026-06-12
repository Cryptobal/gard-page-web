import { permanentRedirect } from 'next/navigation';
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos de Servicio',
  description: 'Términos y condiciones de servicio de Gard Security. Normas que rigen el uso de nuestros servicios.',
};

export default function TerminosRedirect() {
  // permanentRedirect emite 308; redirect() emitía 307 temporal y Semrush
  // lo marcaba en cada página que linkea al footer.
  permanentRedirect('/terminos-de-servicio');
} 