'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Componente nulo para usar cuando no estamos en desarrollo
const NullComponent = () => null;

// Cargar dinámicamente el SEODevPanelWrapper
const SEODevPanelWrapper = dynamic(
  () => import('@/components/seo/SEODevPanelWrapper'),
  { ssr: false }
);

// Cargar dinámicamente ForceMetadataClient solo en desarrollo
const ForceMetadataClient = dynamic(
  () => import('@/components/seo/ForceMetadataClient'), 
  { ssr: false }
);

export default function ClientDynamicComponents() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <ForceMetadataClient />
      <SEODevPanelWrapper />
    </>
  );
} 