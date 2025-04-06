'use client';

import React from 'react';
import { Providers } from './providers';
import dynamic from 'next/dynamic';
import ClientUtmCapture from './ClientUtmCapture';

// Carga dinámica de componentes que deben ser de cliente
const SEODevPanelWrapper = dynamic(
  () => import('@/components/seo/SEODevPanelWrapper'),
  { ssr: false }
);

// Cargar el componente UTMTracker con carga dinámica
const UTMTracker = dynamic(
  () => import('./components/UTMTracker'),
  { ssr: false }
);

// Definimos un componente nulo para usarlo cuando no estamos en desarrollo
const NullComponent = () => null;

// Carga dinámica del componente que fuerza metadatos (solo desarrollo)
const ForceMetadataClient = process.env.NODE_ENV === 'development'
  ? dynamic(() => import('@/components/seo/ForceMetadataClient'), { ssr: false })
  : NullComponent;

// Detección de entorno
const isDevelopment = process.env.NODE_ENV === 'development';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <>
      {/* Componente cliente para capturar UTMs */}
      <ClientUtmCapture />
      
      {/* Componente para capturar parámetros UTM */}
      <UTMTracker />
      
      <Providers>
        {/* Componente para forzar metadatos (solo en desarrollo) */}
        {isDevelopment && <ForceMetadataClient />}
        
        {children}
        
        {/* Panel de depuración SEO (solo en desarrollo) */}
        {isDevelopment && <SEODevPanelWrapper />}
      </Providers>
    </>
  );
} 