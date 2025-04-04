import React from 'react';
import type { Metadata } from 'next';
import ClientDarkMode from './client-dark-mode';
import './landing-styles.css';

export const metadata: Metadata = {
  title: 'Cotizador Inteligente | Gard Security',
  description: 'Calcula el costo mensual estimado de tu servicio de guardias de seguridad según tus necesidades. 100% online y automatizado.',
};

export default function LayoutLandingCotizadorInteligente({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col">
      <ClientDarkMode />
      <div className="flex-1">{children}</div>
    </main>
  );
} 