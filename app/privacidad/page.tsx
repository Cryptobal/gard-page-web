import { permanentRedirect } from 'next/navigation';
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de Gard Security. Cómo recopilamos, usamos y protegemos su información.',
};

export default function PrivacidadRedirect() {
  // permanentRedirect emite 308; redirect() emitía 307 temporal y Semrush
  // lo marcaba en cada página que linkea al footer.
  permanentRedirect('/politica-de-privacidad');
} 