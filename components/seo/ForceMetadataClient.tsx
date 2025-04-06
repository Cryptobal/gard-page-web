'use client';

import { useEffect } from 'react';
import { forceMetadataImport } from '@/app/force-metadata';

export default function ForceMetadataClient() {
  useEffect(() => {
    // Ejecutar la función forceMetadataImport en el cliente
    try {
      console.log('Forzando importación de metadatos para desarrollo (componente cliente)');
      
      // Esta función ahora incluye lógica para prevenir duplicados
      forceMetadataImport();
      
      // Removemos la lógica adicional que estaba duplicando metadatos
      // y solo dejamos que la función forceMetadataImport se encargue
    } catch (err) {
      console.error('Error al forzar importación de metadatos:', err);
    }
  }, []);

  // Este componente no renderiza nada visible
  return null;
} 