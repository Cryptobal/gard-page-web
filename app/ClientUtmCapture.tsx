'use client';

import { useEffect } from 'react';
import { captureUtmParameters } from '@/lib/analytics/formTracking';

export default function ClientUtmCapture() {
  // Capturar UTMs en la carga inicial
  useEffect(() => {
    captureUtmParameters();
  }, []);

  // Este componente no renderiza nada
  return null;
} 