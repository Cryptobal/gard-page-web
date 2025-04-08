"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { ArrowRight, Phone, Clock, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CloudflareImage from '@/components/CloudflareImage';
import { Stream } from '@cloudflare/stream-react';
import Link from 'next/link';

interface GardHeroProps {
  /**
   * Título principal del Hero
   */
  title: string;
  
  /**
   * Subtítulo o descripción del Hero
   */
  subtitle?: string;
  
  /**
   * Texto del botón CTA principal
   */
  ctaTexto?: string;
  
  /**
   * URL a la que redirecciona el CTA principal
   */
  ctaHref?: string;
  
  /**
   * ID del video de Cloudflare Stream para el fondo
   * Si no se proporciona, se usa el video por defecto o la imagen
   */
  videoId?: string;
  
  /**
   * ID de la imagen de Cloudflare Images para usar como fondo o poster del video
   */
  imageId?: string;
  
  /**
   * Icono y texto para la etiqueta superior
   */
  badge?: {
    icon: React.ReactNode;
    text: string;
  };
  
  /**
   * Si es true, oscurece el video/imagen para mejor contraste
   */
  overlay?: boolean;
  
  /**
   * Estilo de Hero: "standard" (95vh) o "home" (100vh con layout más amplio)
   * @default "standard"
   */
  variant?: "standard" | "home";
  
  /**
   * Función opcional para scroll a formulario (alternativa a ctaHref)
   */
  onScrollToForm?: () => void;
  
  /**
   * Muestra u oculta el botón de llamada
   * @default false
   */
  showCallButton?: boolean;
  
  /**
   * Número de teléfono para el botón de llamada
   * @default "+56229872380"
   */
  phoneNumber?: string;
}

export default function GardHero({
  title,
  subtitle,
  ctaTexto = "Solicitar cotización",
  ctaHref = "/cotizar",
  videoId = "ac93b4a10e87873748171425b9f8066d", // Video por defecto de Gard
  imageId,
  badge,
  overlay = true,
  variant = "standard",
  onScrollToForm,
  showCallButton = false,
  phoneNumber = "+56229872380"
}: GardHeroProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  
  // Reproducir/pausar video (para compatibilidad con videos que no sean de Cloudflare)
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };
  
  // Determinar qué hacer cuando se hace clic en el CTA
  const handleCtaClick = () => {
    if (onScrollToForm) {
      onScrollToForm();
    }
  };
  
  // Asegurar que no haya espacios entre componentes en cualquier renderizado
  useEffect(() => {
    if (heroRef.current) {
      const nextElement = heroRef.current.nextElementSibling;
      if (nextElement) {
        // Eliminar cualquier margen superior del siguiente elemento
        (nextElement as HTMLElement).style.marginTop = '0';
      }
    }
  }, []);
  
  return (
    <LazyMotion features={domAnimation}>
      {/* Hero Section - Fullscreen con video/imagen de fondo */}
      <section 
        ref={heroRef}
        data-section="hero"
        className="gard-hero relative h-screen min-h-[600px] flex items-center overflow-hidden bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 dark:bg-[linear-gradient(to_bottom,hsl(var(--gard-background-darkest))_0%,hsl(var(--gard-background))_100%)]"
        style={{ 
          marginBottom: '0',
          borderBottom: '1px solid transparent' // Evita flash blanco entre secciones
        }}
      >
        {/* Overlay con degradado */}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10 dark:from-[hsl(var(--gard-background-darkest))/90] dark:to-transparent"></div>
        )}
        
        {/* Video o imagen de fondo */}
        <div className="absolute inset-0 w-full h-full z-0">
          {videoId ? (
            // Usar Cloudflare Stream como fondo
            <div className="absolute inset-0 w-full h-full">
              <Stream 
                src={videoId}
                controls={false}
                muted={true}
                loop={true}
                autoplay={true}
                poster={imageId ? `https://imagedelivery.net/cGbMPRg9wt8jvG6HDuBzVQ/${imageId}/public` : undefined}
                className="w-full h-full absolute inset-0 object-cover"
                preload="auto"
              />
              {/* Patrón de textura sutil en modo oscuro */}
              <div className="hidden dark:block absolute inset-0 bg-[url('/assets/noise-pattern.png')] opacity-10 z-10 pointer-events-none"></div>
            </div>
          ) : imageId ? (
            // Fallback a imagen si no hay video disponible
            <div className="absolute inset-0">
              <CloudflareImage
                imageId={imageId}
                alt={title}
                className="object-cover"
                fill
                priority
                objectFit="cover"
              />
              
              {/* Patrón de textura sutil en modo oscuro */}
              <div className="hidden dark:block absolute inset-0 bg-[url('/assets/noise-pattern.png')] opacity-10 z-10 pointer-events-none"></div>
              
              {/* Sobreponer un botón de play para simular que es un video */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                onClick={toggleVideo}
                className="absolute bottom-10 right-10 z-20 bg-[hsl(var(--gard-card))/30] backdrop-blur-sm text-white p-3 rounded-full hover:bg-[hsl(var(--gard-card))/50] transition-all"
              >
                <PlayCircle className="h-10 w-10" />
              </motion.button>
            </div>
          ) : (
            // Fallback si no hay ni video ni imagen
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-[hsl(var(--gard-background-darkest))/70] to-[hsl(var(--gard-background-darkest))/90]"></div>
          )}
        </div>
        
        {/* Contenido del Hero */}
        <div className={`gard-hero-content z-20 py-16 md:py-24 ${variant === "home" ? "w-full px-4 md:px-6 lg:px-8" : "gard-container"}`}>
          <div className={`${variant === "home" ? "max-w-5xl mx-auto" : "max-w-3xl"}`}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
              }}
              className="space-y-8"
            >
              {badge && (
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { duration: 0.5 }
                    }
                  }}
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6 backdrop-blur-sm">
                    {badge.icon}
                    {badge.text}
                  </span>
                </motion.div>
              )}
              
              <motion.h1 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { duration: 0.5 }
                  }
                }}
                className={`font-bold leading-tight text-white font-title ${variant === "home" ? "text-4xl sm:text-5xl md:text-6xl" : "text-3xl sm:text-4xl md:text-5xl"}`}
              >
                {title}
              </motion.h1>
              
              {subtitle && (
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { duration: 0.5 }
                    }
                  }}
                  className={`text-white/90 mt-4 font-light ${variant === "home" ? "text-lg sm:text-xl max-w-2xl" : "text-base sm:text-lg max-w-xl"}`}
                >
                  {subtitle}
                </motion.p>
              )}
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { duration: 0.5 }
                  }
                }}
                className="flex flex-col sm:flex-row gap-4 pt-6"
              >
                {onScrollToForm ? (
                  <Button 
                    variant="gard-primary" 
                    size="lg" 
                    className="rounded-xl shadow-lg w-full sm:w-auto"
                    onClick={handleCtaClick}
                  >
                    {ctaTexto}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                ) : (
                  <Link href={ctaHref}>
                    <Button 
                      variant="gard-primary" 
                      size="lg" 
                      className="rounded-xl shadow-lg w-full sm:w-auto"
                    >
                      {ctaTexto}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}
                
                {showCallButton && (
                  <Button 
                    variant="gard-outline-orange" 
                    size="lg" 
                    className="rounded-xl backdrop-blur-sm w-full sm:w-auto"
                    onClick={() => window.location.href = `tel:${phoneNumber}`}
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Llamar ahora
                  </Button>
                )}
              </motion.div>
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { duration: 0.5 }
                  }
                }}
                className="flex items-center gap-3 text-gray-300 pt-6"
              >
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Respuesta en menos de 12 horas</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Indicador de scroll - Posición absoluta en la parte inferior del hero */}
        <div 
          className="absolute left-0 right-0 bottom-8 md:bottom-10 w-full flex justify-center items-center z-50"
          style={{ 
            pointerEvents: 'none'
          }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col items-center bg-black/50 backdrop-blur-md py-2 px-5 rounded-full shadow-lg"
            style={{ 
              pointerEvents: 'auto'
            }}
          >
            <span className="text-white/90 text-sm mb-1 font-semibold">Descubra más</span>
            <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center items-start p-1">
              <motion.div 
                animate={{ 
                  y: [0, 12, 0],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5
                }}
                style={{ width: "0.5rem", height: "0.5rem" }}
                className="bg-white rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </LazyMotion>
  );
} 