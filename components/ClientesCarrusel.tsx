'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Building2 } from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import { CLIENTES } from '@/app/data/clientes';
import { testimonials } from '@/lib/data/testimonials';
import { cn } from '@/lib/utils';

/**
 * Carrusel de clientes usado en páginas de ciudad/servicio.
 *
 * Si hay al menos 3 testimonios verificados en `/lib/data/testimonials.ts`,
 * los renderiza con foto + quote + cargo. Si no, muestra la grilla de logos
 * de clientes (solo logos, sin quotes inventados).
 */
export default function ClientesCarrusel() {
  const hasVerifiedTestimonials = testimonials.length >= 3;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const slidesPerView = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

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
    mode: 'snap',
    breakpoints: {
      '(min-width: 640px)': {
        slides: { perView: 2, spacing: 16 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 3, spacing: 16 },
      },
    },
    rubberband: true,
    renderMode: 'performance',
  });

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement === sliderContainerRef.current ||
        sliderContainerRef.current?.contains(document.activeElement)
      ) {
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

  if (hasVerifiedTestimonials) {
    return (
      <section className="gard-section-md w-full bg-gray-50 dark:bg-[hsl(var(--gard-background))]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-2 mb-4 text-primary dark:text-white">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-body-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Testimonios verificados de responsables de operaciones que trabajan con Gard Security hoy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <article
                key={t.id}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700 flex flex-col"
              >
                <Quote className="h-8 w-8 text-primary dark:text-accent mb-4" />
                <p className="text-body-base text-gray-700 dark:text-gray-200 mb-6 flex-grow">
                  “{t.quote}”
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  {t.photoUrl ? (
                    <div className="relative h-14 w-14 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                      <CloudflareImage
                        imageId={t.photoUrl}
                        alt={`Foto de ${t.clientName}`}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-6 w-6 text-primary dark:text-accent" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                      {t.clientName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {t.clientRole} · {t.companyName}
                    </p>
                  </div>
                  <div className="ml-auto w-16 h-10 relative flex-shrink-0">
                    <CloudflareImage
                      imageId={t.companyLogo}
                      alt={`Logo de ${t.companyName}`}
                      width={64}
                      height={40}
                      className="object-contain filter grayscale w-full h-full"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="gard-section-md w-full bg-gray-50 dark:bg-[hsl(var(--gard-background))]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-heading-2 mb-4 text-primary dark:text-white">
            Empresas que ya confían en nosotros
          </h2>
          <p className="text-body-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Operamos con empresas líderes en minería, logística, industria e instituciones públicas en todo Chile.
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

          <div className="keen-slider-container">
            <div ref={sliderRef} className="keen-slider">
              {CLIENTES.map((cliente) => {
                const logo = (
                  <CloudflareImage
                    imageId={cliente.imageId}
                    alt={`Logo de ${cliente.nombre}`}
                    width={160}
                    height={64}
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300 max-w-full max-h-full"
                  />
                );

                return (
                  <div key={cliente.imageId} className="keen-slider__slide h-full">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="h-full bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center gap-4"
                    >
                      <div className="relative h-24 w-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl p-4 overflow-hidden">
                        {cliente.link ? (
                          <Link
                            href={cliente.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${cliente.nombre} — visitar sitio web`}
                            className="w-full h-full flex items-center justify-center"
                          >
                            {logo}
                          </Link>
                        ) : (
                          logo
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary dark:text-accent flex-shrink-0" />
                        <span className="text-sm font-medium text-primary dark:text-accent">
                          {cliente.industria}
                        </span>
                      </div>

                      <h3 className="text-heading-4 text-gray-900 dark:text-white font-title">
                        {cliente.nombre}
                      </h3>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {loaded && instanceRef.current && (
            <div className="flex justify-center mt-8 gap-4">
              {Array.from(
                {
                  length: Math.max(
                    1,
                    instanceRef.current.track.details.slides.length - slidesPerView() + 1,
                  ),
                },
                (_, idx) => (
                  <button
                    key={idx}
                    onClick={() => instanceRef.current?.moveToIdx(idx)}
                    className={cn(
                      'w-6 h-6 rounded-full transition-all flex items-center justify-center',
                      currentSlide === idx
                        ? 'bg-primary dark:bg-accent w-8'
                        : 'bg-gray-300 dark:bg-zinc-700',
                    )}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
