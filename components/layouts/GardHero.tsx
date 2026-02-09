"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, LazyMotion, domAnimation, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Phone, Clock, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CloudflareImage from '@/components/CloudflareImage';
import dynamic from 'next/dynamic';

const VideoBackground = dynamic(() => import('@/components/ui/VideoBackground'), {
  ssr: false,
  loading: () => null
});
import { getCloudflareImageUrl } from '@/lib/images';
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
  const prefersReducedMotion = useReducedMotion();
  
  // Parallax Effect - Deshabilitado en mobile y si el usuario prefiere reduced motion
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const y = useTransform(scrollY, [0, 1000], [0, prefersReducedMotion || isMobile ? 0 : 300]);
  
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
        {/* Overlay con degradado - Ensure visibility in both modes */}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
        )}
        
        {/* Video o imagen de fondo con Parallax */}
        <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
          <VideoBackground
            videoId={videoId}
            imageId={imageId}
            title={title}
            overlay={overlay}
            posterUrl={imageId ? getCloudflareImageUrl(imageId, { width: 1920, quality: 85 }) : undefined}
          />
        </motion.div>
        
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
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-primary/80 text-white text-sm font-semibold mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
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
                className={`text-white font-title ${variant === "home" ? "text-heading-1 md:!text-6xl" : "text-heading-1"}`}
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
                  className={`text-white mt-4 font-light ${variant === "home" ? "text-lg sm:text-xl max-w-2xl" : "text-base sm:text-lg max-w-xl"}`}
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
                      variant="default" 
                      size="lg" 
                      className="rounded-xl shadow-xl hover:shadow-2xl w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                      onClick={handleCtaClick}
                    >
                      {ctaTexto}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                ) : (
                  <Link href={ctaHref}>
                    <Button 
                      variant="default" 
                      size="lg" 
                      className="rounded-xl shadow-xl hover:shadow-2xl w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                    >
                      {ctaTexto}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}
                
                {showCallButton && (
                  <Button 
                    variant="outline-orange" 
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