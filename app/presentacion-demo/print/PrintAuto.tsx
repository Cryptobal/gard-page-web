'use client';

import { useEffect } from 'react';

export default function PrintAuto() {
  useEffect(() => {
    // Dar un frame para que carguen los iframes antes de imprimir
    const id = requestAnimationFrame(() => {
      window.print();
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return null;
}
