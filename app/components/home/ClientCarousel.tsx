'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useKeenSlider } from 'keen-slider/react';
import "keen-slider/keen-slider.min.css";
import CloudflareImage from '@/components/CloudflareImage';
import { CLIENTES } from '@/app/data/clientes';
import { ChevronLeft, ChevronRight, Quote, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function ClientCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  
  // Función para determinar cuántas diapositivas mostrar según el ancho de la ventana
  const slidesPerView = () => {
    if (typeof window === 'undefined') return 3; // Default para SSR
    if (window.innerWidth < 640) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3; // desktop
  };
  
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

  return (
    <section className="gard-section py-16 md:py-24 w-full bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-heading-2 text-gray-900 dark:text-white font-title mb-4">
            Empresas que confían en nosotros
          </h2>
          <p className="text-body-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Brindamos soluciones de seguridad a líderes de diversas industrias en todo Chile
          </p>
        </div>
        
        <div className="relative px-12 md:px-16">
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
            <div ref={sliderRef} className="keen-slider">
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
                      {/* Logo del cliente */}
                      <div className="relative h-20 mb-6 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                        <CloudflareImage 
                          imageId={cliente.imageId}
                          alt={`Logo de ${cliente.nombre}`}
                          width={180}
                          height={64}
                          className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                      
                      <div className="mb-4 flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary dark:text-accent flex-shrink-0" />
                        <span className="text-sm font-medium text-primary dark:text-accent">
                          {cliente.industria}
                        </span>
                      </div>
                      
                      <h3 className="text-heading-4 text-gray-900 dark:text-white font-title mb-4">
                        {cliente.nombre}
                      </h3>
                      
                      <div className="flex-grow bg-gray-50 dark:bg-gray-800 rounded-xl p-5 mb-2 relative mx-2">
                        <Quote className="absolute -top-3 -left-3 h-6 w-6 text-primary dark:text-accent bg-white dark:bg-gray-900 rounded-full p-1" />
                        <p className="text-sm italic text-gray-600 dark:text-gray-300">
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