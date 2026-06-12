import React from 'react';
import './landing-styles.css';
import '@/app/globals.css';
import ClientWrapper from './client-wrapper';

export const metadata = {
  title: 'Cotizador Inteligente de Seguridad Privada | Gard Security',
  description: 'Cotiza guardias de seguridad y servicios de seguridad privada para tu empresa en línea. Respuesta en menos de 12 horas hábiles.',
  alternates: {
    canonical: 'https://www.gard.cl/cotizador-inteligente',
    languages: {
      'es-CL': 'https://www.gard.cl/cotizador-inteligente',
      'x-default': 'https://www.gard.cl/cotizador-inteligente',
    },
  },
};

export default function LayoutLandingCotizadorInteligente({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col w-full">
      <ClientWrapper>
        <div className="flex-1">{children}</div>
      </ClientWrapper>
    </main>
  );
} 