'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CanonicalUrl() {
  const pathname = usePathname();
  const [canonicalCreated, setCanonicalCreated] = useState(false);

  useEffect(() => {
    // Esperamos a que el DOM esté completamente cargado
    const checkAndCreateCanonical = () => {
      // Verificar si ya existe una etiqueta canonical (definida por metadata.ts)
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      
      // MODIFICACIÓN SEO: Asegurar que siempre haya una URL canónica y que use www
      if (existingCanonical) {
        // Si existe, verificar que use www y actualizarla si no lo hace
        const currentHref = existingCanonical.getAttribute('href');
        if (currentHref && !currentHref.includes('www.gard.cl')) {
          console.log('[CanonicalUrl] Actualizando canonical sin www:', currentHref);
          const correctedHref = currentHref.replace('https://gard.cl', 'https://www.gard.cl');
          existingCanonical.setAttribute('href', correctedHref);
        }
        return null;
      } else if (!canonicalCreated) {
        // Si no existe, crear uno nuevo con www
        console.log('[CanonicalUrl] Creando nueva canonical para:', pathname);
        
        // Crear canonical basada en pathname, asegurando www
        const fallbackCanonical = `https://www.gard.cl${pathname || '/'}`;
        
        // Crear y añadir etiqueta
        const link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', fallbackCanonical);
        document.head.appendChild(link);
        
        setCanonicalCreated(true);
        
        return link;
      }
      
      return null;
    };
    
    // Esperamos 1 segundo para dar tiempo a que Next.js complete la hidratación
    const timer = setTimeout(() => {
      const createdLink = checkAndCreateCanonical();
      
      return () => {
        // Limpiar al desmontar el componente
        if (createdLink && document.contains(createdLink)) {
          document.head.removeChild(createdLink);
          setCanonicalCreated(false);
        }
      };
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [pathname, canonicalCreated]);

  // Este componente no renderiza nada visible
  return null;
} 