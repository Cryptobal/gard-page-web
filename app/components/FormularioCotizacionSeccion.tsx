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

    // Bandera para controlar los intentos de scroll
    let scrollAttempted = false;
    // Tiempo de espera para resetear la bandera de scroll
    let scrollResetTimeout: NodeJS.Timeout;

    // Función centralizada para manejar el scroll
    const handleHashChange = () => {
      // Si el hash es #cotizar, hacer scroll solo si no se ha intentado recientemente
      if (window.location.hash === '#cotizar' && !scrollAttempted) {
        // Marcar que ya se intentó hacer scroll para evitar múltiples intentos
        scrollAttempted = true;
        
        // Pequeño retraso para asegurar que los elementos estén cargados
        setTimeout(() => {
          scrollToFormPosition();
          
          // Resetear la bandera después de un tiempo para permitir futuros scrolls
          scrollResetTimeout = setTimeout(() => {
            scrollAttempted = false;
          }, 2000); // Esperar 2 segundos antes de permitir otro intento de scroll
        }, 200);
      }
    };

    // Verificar si hay un parámetro 'scroll' en la URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('scroll') === 'form' && !scrollAttempted) {
      scrollAttempted = true;
      // Esperar un momento para que la página se cargue completamente
      setTimeout(() => {
        scrollToFormPosition();
        
        // Resetear la bandera después de un tiempo
        scrollResetTimeout = setTimeout(() => {
          scrollAttempted = false;
        }, 2000);
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
      if (window.location.hash === '#cotizar' && !scrollAttempted) {
        scrollAttempted = true;
        setTimeout(() => {
          scrollToFormPosition();
          scrollResetTimeout = setTimeout(() => {
            scrollAttempted = false;
          }, 2000);
        }, 300);
      }
    };
    
    // Registrar un MutationObserver con limitación de frecuencia para evitar múltiples scrolls
    let mutationTimeout: NodeJS.Timeout;
    const observer = new MutationObserver((mutations) => {
      // Evitar múltiples llamadas rápidas utilizando debounce
      clearTimeout(mutationTimeout);
      
      // Solo procesar si no hemos intentado hacer scroll recientemente
      if (!scrollAttempted && window.location.hash === '#cotizar') {
        scrollAttempted = true;
        
        mutationTimeout = setTimeout(() => {
          scrollToFormPosition();
          
          // Resetear la bandera después de un tiempo
          scrollResetTimeout = setTimeout(() => {
            scrollAttempted = false;
          }, 2000);
        }, 300);
      }
    });
    
    // Configurar el observer para que solo observe lo necesario
    observer.observe(document.body, { 
      childList: true, 
      subtree: true, 
      attributes: false, 
      characterData: false 
    });
    
    // Limpiar los event listeners y observer al desmontar
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('load', handleHashChange);
      observer.disconnect();
      clearTimeout(scrollResetTimeout);
      clearTimeout(mutationTimeout);
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
        // Cambiar el valor del offset para evitar el problema
        const offset = 80; // Reducido de 100 para evitar problemas
        const elementPosition = sectionRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        // Usar autoScrolling para prevenir loops con el MutationObserver
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Eliminar el hash de la URL para evitar que se vuelva a disparar el evento
        if (window.history && window.history.replaceState) {
          // Mantener la URL actual pero quitar el fragmento
          window.history.replaceState(
            null, 
            document.title, 
            window.location.pathname + window.location.search
          );
        }
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
          top: sectionRef.current.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id={id}
      className={`gard-section py-16 md:py-24 bg-gray-50 dark:bg-[#0A0C12] ${className}`}
      data-section="formulario-cotizacion"
      // Aumentar el margen de scroll para mejorar la posición en móviles
      style={{ scrollMarginTop: '80px' }}
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
            <h2 className="text-heading-2 text-foreground dark:text-white mb-6">¿Necesitas servicios de seguridad profesionales?</h2>
            <p className="text-body-lg text-muted-foreground dark:text-gray-300 mb-8">
              En Gard Security te ofrecemos soluciones adaptadas específicamente a tus necesidades. Completa el formulario y nuestro equipo te contactará en menos de 12 horas hábiles.
            </p>
            
            <div className="bg-white dark:bg-white/5 dark:bg-gradient-to-br dark:from-white/10 dark:to-white/5 backdrop-blur-md p-6 rounded-2xl mb-8 border border-gray-200 dark:border-white/20 shadow-xl">
              <h3 className="text-heading-4 text-foreground dark:text-white mb-6 font-semibold">Ventajas de Gard Security</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4 group">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-125 transition-transform duration-300"></div>
                  <span className="text-muted-foreground dark:text-gray-200 group-hover:text-primary dark:group-hover:text-white transition-colors duration-300">Especialistas en seguridad con más de 15 años de experiencia</span>
                </li>
                <li className="flex items-start gap-4 group">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-125 transition-transform duration-300"></div>
                  <span className="text-muted-foreground dark:text-gray-200 group-hover:text-primary dark:group-hover:text-white transition-colors duration-300">Soluciones personalizadas para cada industria y necesidad</span>
                </li>
                <li className="flex items-start gap-4 group">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-125 transition-transform duration-300"></div>
                  <span className="text-muted-foreground dark:text-gray-200 group-hover:text-primary dark:group-hover:text-white transition-colors duration-300">Atención 24/7 con central de monitoreo propia</span>
                </li>
                <li className="flex items-start gap-4 group">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-125 transition-transform duration-300"></div>
                  <span className="text-muted-foreground dark:text-gray-200 group-hover:text-primary dark:group-hover:text-white transition-colors duration-300">Guardias de seguridad profesionales y certificados</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 