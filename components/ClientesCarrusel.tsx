'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useKeenSlider } from 'keen-slider/react';
import "keen-slider/keen-slider.min.css";
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Building2 } from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import { CLIENTES } from '@/app/data/clientes';
import { cn } from '@/lib/utils';

export default function ClientesCarrusel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  
  // Función para determinar cuántas diapositivas mostrar según el ancho de la ventana
  const slidesPerView = () => {
    if (typeof window === 'undefined') return 3; // Default para SSR
    if (window.innerWidth < 640) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3; // desktop
  };
  
  // Detectar si estamos en mobile
  useEffect(() => {
    const checkIfMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
      }
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    slides: {
      perView: slidesPerView,
      spacing: 16,
    },
    created() {
      setLoaded(true);
    },
    dragSpeed: 1.2,
    loop: true,
    mode: "snap",
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2, spacing: 16 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 16 },
      },
    },
    rubberband: true,
    renderMode: "performance",
  });

  // Maneja la navegación del carrusel
  const handlePrev = () => {
    if (instanceRef.current) {
      instanceRef.current.prev();
    }
  };

  const handleNext = () => {
    if (instanceRef.current) {
      instanceRef.current.next();
    }
  };

  // Manejo de navegación por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === sliderContainerRef.current || 
          sliderContainerRef.current?.contains(document.activeElement)) {
        if (e.key === 'ArrowLeft') {
          handlePrev();
          e.preventDefault();
        } else if (e.key === 'ArrowRight') {
          handleNext();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <section className="gard-section-md w-full bg-gray-50 dark:bg-[hsl(var(--gard-background))]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-heading-2 mb-4 text-primary dark:text-white">
            Empresas que confían en nosotros
          </h2>
          <p className="text-body-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Brindamos soluciones de seguridad a líderes de diversas industrias en todo Chile
          </p>
        </div>
        
        <div 
          className="relative px-12 md:px-16"
          ref={sliderContainerRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          tabIndex={0}
          aria-label="Carrusel de clientes"
          role="region"
        >
          {/* Botones de navegación */}
          {loaded && instanceRef.current && (
            <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between z-10 pointer-events-none">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 rounded-full bg-white dark:bg-gray-900 shadow-md flex items-center justify-center text-primary dark:text-accent hover:scale-105 transition-all pointer-events-auto border border-gray-100 dark:border-gray-700"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-white dark:bg-gray-900 shadow-md flex items-center justify-center text-primary dark:text-accent hover:scale-105 transition-all pointer-events-auto border border-gray-100 dark:border-gray-700"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
          
          {/* Carrusel */}
          <div className="keen-slider-container">
            <div 
              ref={sliderRef} 
              className="keen-slider"
            >
              {CLIENTES.map((cliente) => (
                <div
                  key={cliente.imageId}
                  className="keen-slider__slide h-full"
                >
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="h-full bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col"
                  >
                    <div className="flex flex-col h-full">
                      {/* Logo del cliente - Contenedor estandarizado */}
                      <div className="relative h-24 mb-6 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl p-4 overflow-hidden">
                        {cliente.link ? (
                          <Link
                            href={cliente.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${cliente.nombre} - Visitar sitio web`}
                            className="w-full h-full flex items-center justify-center"
                          >
                            <CloudflareImage 
                              imageId={cliente.imageId}
                              alt={`Logo de ${cliente.nombre}`}
                              width={160}
                              height={64}
                              className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300 max-w-full max-h-full"
                            />
                          </Link>
                        ) : (
                          <CloudflareImage 
                            imageId={cliente.imageId}
                            alt={`Logo de ${cliente.nombre}`}
                            width={160}
                            height={64}
                            className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300 max-w-full max-h-full"
                          />
                        )}
                      </div>
                      
                      <div className="mb-4 flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary dark:text-accent flex-shrink-0" />
                        <span className="text-sm font-medium text-primary dark:text-accent">
                          {cliente.industria}
                        </span>
                      </div>
                      
                      <h3 className="text-heading-4 text-gray-900 dark:text-white font-title mb-4 min-h-[3rem] flex items-center">
                        {cliente.nombre}
                      </h3>
                      
                      <div className="flex-grow bg-gray-50 dark:bg-gray-800 rounded-xl p-5 mb-2 relative mx-2 min-h-[5rem] flex items-center">
                        <Quote className="absolute -top-3 -left-3 h-6 w-6 text-primary dark:text-accent bg-white dark:bg-gray-900 rounded-full p-1" />
                        <p className="text-sm italic text-gray-600 dark:text-gray-300 leading-relaxed">
                          "{cliente.frase}"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Indicadores (dots) */}
          {loaded && instanceRef.current && (
            <div className="flex justify-center mt-8 gap-4">
              {Array.from(
                { length: Math.max(1, instanceRef.current.track.details.slides.length - slidesPerView() + 1) },
                (_, idx) => (
                  <button
                    key={idx}
                    onClick={() => instanceRef.current?.moveToIdx(idx)}
                    className={cn(
                      "w-6 h-6 rounded-full transition-all flex items-center justify-center",
                      currentSlide === idx 
                        ? "bg-primary dark:bg-accent w-8" 
                        : "bg-gray-300 dark:bg-zinc-700"
                    )}
                    aria-label={`Slide ${idx + 1}`}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 