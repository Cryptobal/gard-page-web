"use client";

import { useRef, useEffect } from 'react';
import CotizacionForm from '../cotizar/components/CotizacionForm';

interface FormularioCotizacionSeccionProps {
  className?: string;
  id?: string;
  prefillServicio?: string;
  prefillIndustria?: string;
}

export default function FormularioCotizacionSeccion({ 
  className = "", 
  id = "cotizar", 
  prefillServicio, 
  prefillIndustria 
}: FormularioCotizacionSeccionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Añadir un efecto para manejar scrolls automáticos al formulario
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Función centralizada para manejar el scroll
    const handleHashChange = () => {
      // Si el hash es #cotizar, hacer scroll
      if (window.location.hash === '#cotizar') {
        // Pequeño retraso para asegurar que los elementos estén cargados
        setTimeout(() => {
          scrollToFormPosition();
        }, 200);
      }
    };

    // Verificar si hay un parámetro 'scroll' en la URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('scroll') === 'form') {
      // Esperar un momento para que la página se cargue completamente
      setTimeout(() => {
        scrollToFormPosition();
      }, 500);
    }
    
    // Verificar el hash inicial
    handleHashChange();
    
    // Agregar listeners para manejar cambios de hash y eventos de navegación
    window.addEventListener('hashchange', handleHashChange);
    
    // Comprobar también después de que la página esté completamente cargada
    window.addEventListener('load', handleHashChange);
    
    // Para manejar navegación interna de Next.js
    const handleNextJsRouteChange = () => {
      if (window.location.hash === '#cotizar') {
        setTimeout(scrollToFormPosition, 300);
      }
    };
    
    // Registrar un MutationObserver para detectar cambios en el DOM
    // Esto ayuda con la navegación de cliente en Next.js
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && window.location.hash === '#cotizar') {
          setTimeout(scrollToFormPosition, 300);
          break;
        }
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Limpiar los event listeners y observer al desmontar
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('load', handleHashChange);
      observer.disconnect();
    };
  }, []);

  // Función para hacer scroll a una posición óptima del formulario
  const scrollToFormPosition = () => {
    if (!sectionRef.current) return;
    
    console.log("📜 Scrolling to form position...");
    
    try {
      // Detectar si es móvil
      const isMobile = window.innerWidth < 768;
      
      // En móvil, hacemos scroll a un punto un poco por encima del formulario
      // para que sea inmediatamente visible
      if (isMobile) {
        const offset = 100; // Offset en píxeles para móviles
        const elementPosition = sectionRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        // En desktop, comportamiento normal
        sectionRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } catch (error) {
      console.error("Error al hacer scroll:", error);
      
      // Método alternativo si falla el scroll
      if (sectionRef.current) {
        window.scrollTo({
          top: sectionRef.current.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id={id}
      className={`gard-section py-16 md:py-24 bg-[#0A0C12] ${className}`}
      data-section="formulario-cotizacion"
      // Aumentar el margen de scroll para mejorar la posición en móviles
      style={{ scrollMarginTop: '100px' }}
    >
      {/* Textura de fondo */}
      <div className="absolute inset-0 bg-[url('/images/textures/noise-pattern.png')] opacity-5"></div>
      
      {/* Indicador visual semi-transparente para el ancla de scroll - Solo visible en desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary/30 text-white text-xs px-3 py-1 rounded-full pointer-events-none">
          #cotizar
        </div>
      )}
      
      <div className="gard-container">
        {/* Cambiamos de grid a flex-col para poder reordenar en móvil */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Columna del formulario - Mostrar primero en móvil */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="pt-4 md:pt-0"> {/* Añadir padding top en móvil */}
              <CotizacionForm 
                prefillServicio={prefillServicio}
                prefillIndustria={prefillIndustria}
              />
            </div>
          </div>
          
          {/* Columna de texto - Mostrar después en móvil */}
          <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-center mt-8 lg:mt-0">
            <h2 className="text-heading-2 text-white mb-6">¿Necesitas servicios de seguridad profesionales?</h2>
            <p className="text-body-lg text-gray-300 mb-8">
              En Gard Security te ofrecemos soluciones adaptadas específicamente a tus necesidades. Completa el formulario y nuestro equipo te contactará en menos de 12 horas hábiles.
            </p>
            
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl mb-8 border border-gray-800">
              <h3 className="text-heading-4 text-white mb-4">Ventajas de Gard Security</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary text-3xl">•</span>
                  <span className="text-gray-300">Especialistas en seguridad con más de 15 años de experiencia</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-3xl">•</span>
                  <span className="text-gray-300">Soluciones personalizadas para cada industria y necesidad</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-3xl">•</span>
                  <span className="text-gray-300">Atención 24/7 con central de monitoreo propia</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-3xl">•</span>
                  <span className="text-gray-300">Guardias de seguridad profesionales y certificados</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 