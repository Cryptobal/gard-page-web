'use client';

import dynamic from 'next/dynamic';

// Componente nulo para usar cuando no estamos en desarrollo
const NullComponent = () => null;

// Cargar dinámicamente el SEODevPanelWrapper
export const SEODevPanelWrapper = dynamic(
  () => import('@/components/seo/SEODevPanelWrapper'),
  { ssr: false }
);

// Cargar dinámicamente ForceMetadataClient solo en desarrollo
export const ForceMetadataClientComponent = process.env.NODE_ENV === 'development'
  ? dynamic(() => import('@/components/seo/ForceMetadataClient'), { ssr: false })
  : NullComponent; 