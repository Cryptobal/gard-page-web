"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  MapPin, 
  CheckCircle, 
  Phone, 
  Clock, 
  ArrowRight, 
  Building2,
  AlertCircle,
  Award,
  Users,
  CheckCircle2,
  ListChecks,
  PlayCircle
} from 'lucide-react';
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { CiudadServicioContent } from '@/lib/data/getCiudadServicioContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CotizacionForm from '@/app/cotizar/components/CotizacionForm';
import CloudflareImage from '@/components/CloudflareImage';
import ClientesCarrusel from '@/components/ClientesCarrusel';
import { cn } from '@/lib/utils';
import { Stream } from '@cloudflare/stream-react';

// Mapeo de servicios a ID de videos de Cloudflare Stream
const videosPorServicio = {
  "guardias-de-seguridad": "beff4ff37ecd588faace5225a089992e",
  "monitoreo-remoto": "c23fd56dd80e14308e27c9bc78b7c257",
  "control-de-acceso": "42275340f2fd2f5f4a2b048a9feb8142",
  "seguridad-perimetral": "1ebfeb8f8f2ac179465db0fc05ed5b2d",
  "seguridad-retail": "93bdb9c0b3e6a0ae262cd9c0f61c098",
  "seguridad-industrial": "c740817e35f72ba3880deb4ca9719fb9",
  "analitica-de-video": "a098993d251d333a275c104aeb94be81",
  "seguridad-nocturna": "62b396de0e64bd2ae5faa64ae5349ab7",
  "guardia-edificio-dia": "c0a460385f6fb9e90343feb3a97c55c3",
  "central-monitoreo-2": "0d56cfdd1e9ad578b04fb212ae9afc42",
  "seguridad-electronica": "42275340f2fd2f5f4a2b048a9feb8142"
};

interface CiudadServicioLandingProps {
  content: CiudadServicioContent;
  params: {
    ciudad: string;
    servicio: string;
  };
}

// Componente de título de sección reutilizable
const SectionTitle = ({ title, subtitle, className }: { title: string; subtitle?: string; className?: string }) => (
  <div className={cn("text-center max-w-3xl mx-auto mb-12", className)}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-heading-2 mb-4 font-title"
    >
      {title}
    </motion.h2>
    
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-body-lg text-muted"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// Componente para mostrar cada beneficio
const BenefitCard = ({ icon, title, description, index }: { icon: React.ReactNode; title: string; description: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Card className="gard-card h-full border-none shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <CardContent className="gard-card-content h-full flex flex-col">
        <div className="flex items-start gap-5 mb-4">
          <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
            {icon}
          </div>
          
          <div className="flex-1">
            <h3 className="text-heading-5 mb-2">
              {title}
            </h3>
          </div>
        </div>
        
        <p className="text-body-base text-muted mt-2 flex-1">
          {description}
        </p>
        
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
          <span className="text-sm text-primary flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            <span className="font-medium">Garantizado</span>
          </span>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

// Componente para los casos de uso
const CaseStudyCard = ({ icon, title, description, index }: { icon: React.ReactNode; title: string; description: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="gard-card p-6 h-full">
      <div className="flex items-start gap-5">
        <div className="shrink-0">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
        </div>
        
        <div>
          <h3 className="text-heading-5 mb-3">
            {title}
          </h3>
          <p className="text-body-base text-muted">
            {description}
          </p>
          
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
            <span className="text-primary text-sm font-medium flex items-center gap-1">
              <ArrowRight className="h-4 w-4" />
              <span>Ver caso completo</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// Componente para mapa de zona crítica
const ZonaCriticaCard = ({ zona, index }: { zona: string; index: number }) => {
  const zonaParts = zona.split(':');
  const nombre = zonaParts[0];
  const descripcion = zonaParts.length > 1 ? zonaParts[1] : '';
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all p-5 h-full border-l-4 border-primary">
        <div className="flex items-start gap-3 mb-3">
          <MapPin className="h-5 w-5 text-primary mt-1" />
          <h3 className="text-lg font-semibold">
            {nombre}
          </h3>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm pl-8">
          {descripcion}
        </p>
      </div>
      
      {/* Línea conectora (solo visual) */}
      <div className="absolute -left-4 top-1/2 w-4 border-t border-dashed border-gray-300 dark:border-gray-700 hidden lg:block"></div>
    </motion.div>
  );
};

// Componente para FAQs con Schema.org markup para SEO
const FAQSection = ({ faqs, ciudad }: { faqs: { pregunta: string; respuesta: string }[]; ciudad: string }) => {
  // JSON-LD para FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.pregunta,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.respuesta
      }
    }))
  };
  
  return (
    <section 
      data-section="faqs"
      className="gard-section bg-white dark:bg-gray-900 overflow-hidden"
    >
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="gard-container">
        <SectionTitle 
          title="Preguntas Frecuentes"
          subtitle={`Resolvemos tus dudas sobre nuestros servicios en ${ciudad}`}
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border-b border-gray-200 dark:border-gray-800 py-2"
              >
                <AccordionTrigger className="text-left text-lg font-medium py-4 pr-4 hover:no-underline">
                  {faq.pregunta}
                </AccordionTrigger>
                <AccordionContent className="text-muted py-4 pb-6 text-body-base">
                  {faq.respuesta}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default function CiudadServicioLanding({ content, params }: CiudadServicioLandingProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Rastrear el desplazamiento para animaciones y CTA flotante
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
      
      // Detectar sección activa para animaciones
      const sections = document.querySelectorAll('[data-section]');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.getAttribute('data-section') || 'hero');
        }
      });
      
      // Detectar si el footer está visible o cerca para ocultar el CTA flotante
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        // Añadir margen de seguridad (100px) para que desaparezca antes de llegar al footer
        const isNearFooter = footerRect.top < window.innerHeight + 100;
        if (isNearFooter) {
          setIsScrolled(false);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Reproducir/pausar video (mantener para compatibilidad con videos que no sean de Cloudflare)
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
  
  // Función para mostrar el formulario
  const scrollToForm = () => {
    const form = document.getElementById('formulario-cotizacion');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Obtenemos el nombre formateado de la ciudad y el servicio
  const ciudadFormatted = params.ciudad.replace(/-/g, ' ');
  const servicioFormatted = params.servicio.replace(/-/g, ' ');
  
  // Obtener el ID del video para el servicio actual con fallback al video genérico "Escudo Seguridad"
  const defaultVideoId = "ac93b4a10e87873748171425b9f8066d";
  const videoId = videosPorServicio[params.servicio as keyof typeof videosPorServicio] || defaultVideoId;

  return (
    <LazyMotion features={domAnimation}>
      <div className="flex flex-col min-h-screen relative">
        {/* CTA Flotante en móvil (solo aparece al hacer scroll) */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              style={{ 
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 50
              }}
              className="md:hidden bg-white dark:bg-gray-900 shadow-lg border-t border-gray-100 dark:border-gray-800 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <Button 
                    variant="accent" 
                    size="lg" 
                    className="w-full rounded-xl"
                    onClick={scrollToForm}
                  >
                    {content.ctaTexto}
                  </Button>
                </div>
                <Button 
                  variant="outline-orange" 
                  size="icon"
                  className="rounded-full"
                  onClick={() => window.location.href = 'tel:+56229872380'}
                >
                  <Phone className="h-5 w-5 text-accent" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Hero Section - Fullscreen con video/imagen de fondo */}
        <section 
          data-section="hero"
          className="gard-hero relative min-h-[95vh] flex items-center overflow-hidden bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-900 dark:to-black"
        >
          {/* Overlay con degradado */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
          
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
                  poster={content.imageId ? `https://imagedelivery.net/cGbMPRg9wt8jvG6HDuBzVQ/${content.imageId}/public` : undefined}
                  className="w-full h-full absolute inset-0 object-cover"
                  preload="auto"
                />
              </div>
            ) : content.imageId ? (
              // Fallback a imagen si no hay video disponible para el servicio
              <div className="absolute inset-0">
                <CloudflareImage
                  imageId={content.imageId}
                  alt={`Servicio de ${servicioFormatted} en ${ciudadFormatted}`}
                  className="object-cover"
                  fill
                  priority
                  objectFit="cover"
                />
                
                {/* Sobreponer un botón de play para simular que es un video */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  onClick={toggleVideo}
                  className="absolute bottom-10 right-10 z-20 bg-black/30 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/50 transition-all"
                >
                  <PlayCircle className="h-10 w-10" />
                </motion.button>
              </div>
            ) : (
              // Fallback si no hay ni video ni imagen
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-black/50"></div>
            )}
          </div>
          
          {/* Contenido del Hero */}
          <div className="gard-hero-content gard-container z-20 py-16 md:py-24">
            <div className="max-w-3xl">
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
                    <MapPin className="h-4 w-4" />
                    Servicio Local en {ciudadFormatted}
                  </span>
                </motion.div>
                
                <motion.h1 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { duration: 0.5 }
                    }
                  }}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white font-title"
                >
                  {content.h1}
                </motion.h1>
                
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { duration: 0.5 }
                    }
                  }}
                  className="text-base sm:text-lg text-white/90 mt-4 max-w-xl font-light"
                >
                  {content.intro}
                </motion.p>
                
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
                  <Button 
                    variant="default" 
                    size="lg" 
                    className="rounded-xl shadow-lg w-full sm:w-auto"
                    onClick={scrollToForm}
                  >
                    {content.ctaTexto}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <Button 
                    variant="outline-orange" 
                    size="lg" 
                    className="rounded-xl backdrop-blur-sm w-full sm:w-auto"
                    onClick={() => window.location.href = 'tel:+56229872380'}
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Llamar ahora
                  </Button>
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
          
          {/* Indicador de scroll */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            style={{
              position: "absolute",
              bottom: "2rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 20
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-white/70 text-sm">Descubra más</span>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center items-start p-1">
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
            </div>
          </motion.div>
        </section>
        
        {/* Descripción Section con Diseño Moderno */}
        <section 
          data-section="descripcion"
          className="gard-section bg-white dark:bg-gray-900"
        >
          <div className="gard-container">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15 }
                  }
                }}
                className="space-y-12"
              >
                <motion.h2 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { duration: 0.5 }
                    }
                  }}
                  className="text-heading-2 font-title text-center mb-4"
                >
                  Servicio Especializado en {ciudadFormatted}
                </motion.h2>
                
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { duration: 0.5 }
                    }
                  }}
                  className="prose prose-lg dark:prose-invert max-w-none"
                >
                  {content.descripcion.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-body-base text-foreground dark:text-foreground leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  ))}
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
                  className="flex justify-center"
                >
                  <Button 
                    variant="default" 
                    size="lg" 
                    className="gard-btn-lg rounded-xl"
                    onClick={scrollToForm}
                  >
                    Solicitar Asesoría Personalizada
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="gard-section-alt py-12 md:py-16">
          <div className="gard-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { value: "+500", label: "Clientes Satisfechos" },
                { value: "24/7", label: "Servicio Continuo" },
                { value: "15 min", label: "Tiempo de Respuesta" },
                { value: "100%", label: "Personal Certificado" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center p-4"
                >
                  <span className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Beneficios Section con Cards y Efectos */}
        <section 
          data-section="beneficios"
          className="gard-section bg-white dark:bg-gray-900 overflow-hidden"
        >
          <div className="gard-container">
            <SectionTitle 
              title={`Beneficios Exclusivos en ${ciudadFormatted}`} 
              subtitle="Soluciones adaptadas a las necesidades específicas de su sector y ubicación"
            />
            
            <div className="gard-grid gap-8">
              {content.beneficios.map((beneficio, index) => (
                <BenefitCard 
                  key={index}
                  icon={getBenefitIcon(index)}
                  title={getBenefitTitle(index, ciudadFormatted)}
                  description={beneficio}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Casos de Uso Section - Grilla Visual Moderna */}
        <section 
          data-section="casos"
          className="gard-section gard-section-alt overflow-hidden"
        >
          <div className="gard-container">
            <SectionTitle 
              title={`Soluciones para ${ciudadFormatted}`} 
              subtitle="Casos de éxito adaptados a las necesidades locales"
            />
            
            <div className="gard-grid-2 gap-8">
              {content.casosDeUso.map((caso, index) => (
                <CaseStudyCard 
                  key={index}
                  icon={getCaseIcon(index)}
                  title={getCaseTitle(index, ciudadFormatted, servicioFormatted)}
                  description={caso}
                  index={index}
                />
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center mt-12"
            >
              <Button 
                variant="outline-orange" 
                size="lg" 
                className="gard-btn-lg rounded-xl"
                onClick={scrollToForm}
              >
                ¿Necesitas una solución a medida?
              </Button>
            </motion.div>
          </div>
        </section>
        
        {/* Zonas Críticas Section - Con Mapa Visual */}
        <section 
          data-section="zonas"
          className="gard-section bg-white dark:bg-gray-900 overflow-hidden"
        >
          <div className="gard-container">
            <SectionTitle 
              title={content.zonasCriticas.titulo} 
              subtitle={content.zonasCriticas.descripcion}
            />
            
            <div>
              <div className="relative">
                {/* Fondo de mapa estilizado */}
                <div className="absolute inset-0 bg-dots-pattern opacity-5 rounded-3xl"></div>
                
                <div className="gard-card p-8 md:p-10 shadow-sm relative bg-gray-50 dark:bg-gray-800 rounded-3xl">
                  <div className="gard-grid gap-6">
                    {content.zonasCriticas.zonas.map((zona, index) => (
                      <ZonaCriticaCard 
                        key={index}
                        zona={zona}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mx-auto max-w-lg bg-gray-100 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 mt-12"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">¿Su zona no aparece en la lista?</h4>
                  <p className="text-body-sm text-muted mb-3">
                    Trabajamos en todas las zonas de {ciudadFormatted}. Contáctenos para obtener información específica sobre su ubicación.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="rounded-lg mt-1"
                    onClick={scrollToForm}
                  >
                    Consultar por mi zona
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Carrusel de clientes */}
        <ClientesCarrusel />
        
        {/* FAQs Section con Schema.org markup */}
        <FAQSection 
          faqs={content.preguntasFrecuentes} 
          ciudad={ciudadFormatted}
        />
        
        {/* CTA y Formulario Section */}
        <section 
          id="formulario-cotizacion"
          className="gard-section bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-900 dark:to-black"
        >
          <div className="gard-container">
            <div className="gard-grid-2 gap-12 lg:gap-16 items-start">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-white space-y-8"
              >
                <h2 className="text-heading-2 font-title">
                  Solicita una Cotización Personalizada
                </h2>
                
                <p className="text-body-lg text-gray-300">
                  Completa el formulario y un especialista en seguridad para {ciudadFormatted} te contactará en menos de 12 horas.
                </p>
                
                <div className="space-y-6 pt-4">
                  {[
                    {
                      icon: <Shield className="h-6 w-6 text-primary" />,
                      title: "Evaluación Personalizada",
                      description: `Análisis de riesgos específico para su sector en ${ciudadFormatted}`
                    },
                    {
                      icon: <Clock className="h-6 w-6 text-primary" />,
                      title: "Respuesta Inmediata",
                      description: "Contacto en menos de 12 horas por un especialista local"
                    },
                    {
                      icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
                      title: "Sin Compromisos",
                      description: "Cotización transparente sin costos ocultos ni contratos forzosos"
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-primary/20 p-3 rounded-xl shrink-0 mt-1">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-lg mb-1">{item.title}</h3>
                        <p className="text-gray-300">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="pt-6 flex items-center gap-4">
                  <div className="p-1.5 rounded-full border-2 border-white/20 backdrop-blur-sm">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden">
                      {/* Logo adaptado al modo oscuro/claro */}
                      <div className="hidden dark:block">
                        <img src="/logos/logo-escudo-blanco.svg" alt="Gard Security Logo" className="h-10 w-10" />
                      </div>
                      <div className="block dark:hidden">
                        <img src="/logos/logo-escudo-azul.svg" alt="Gard Security Logo" className="h-10 w-10" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-medium">Gard Security</p>
                    <p className="text-sm text-gray-300">Expertos en Seguridad desde 2005</p>
                  </div>
                </div>
                
                <div className="pt-6 space-x-4 flex">
                  {[
                    { label: "Certificación", value: "OS-10" },
                    { label: "Cobertura", value: "Nacional" },
                    { label: "Experiencia", value: "+18 años" }
                  ].map((badge, index) => (
                    <div key={index} className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm py-3 px-5 rounded-lg">
                      <span className="text-sm text-gray-300">{badge.label}</span>
                      <span className="text-white font-medium">{badge.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="gard-card rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="p-1">
                  <CotizacionForm />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </LazyMotion>
  );
}

// Funciones auxiliares para iconos y títulos
function getBenefitIcon(index: number) {
  const icons = [
    <Shield key="shield" className="h-6 w-6 text-primary" />,
    <Users key="users" className="h-6 w-6 text-primary" />,
    <Building2 key="building" className="h-6 w-6 text-primary" />,
    <Clock key="clock" className="h-6 w-6 text-primary" />,
    <Award key="award" className="h-6 w-6 text-primary" />,
    <CheckCircle2 key="check" className="h-6 w-6 text-primary" />,
  ];
  
  return icons[index % icons.length];
}

function getBenefitTitle(index: number, ciudad: string) {
  const titles = [
    `Experiencia Local en ${ciudad}`,
    "Respuesta Inmediata",
    "Tecnología Avanzada",
    "Servicio 24/7",
    "Personal Certificado",
    "Soluciones Personalizadas",
  ];
  
  return titles[index % titles.length];
}

function getCaseIcon(index: number) {
  const icons = [
    <Building2 key="building" className="h-6 w-6 text-primary" />,
    <Shield key="shield" className="h-6 w-6 text-primary" />,
    <ListChecks key="list" className="h-6 w-6 text-primary" />,
    <Users key="users" className="h-6 w-6 text-primary" />,
  ];
  
  return icons[index % icons.length];
}

function getCaseTitle(index: number, ciudad: string, servicio: string) {
  const baseTitle = "Solución para ";
  
  const sectors = [
    `Sector Comercial en ${ciudad}`,
    `Edificios Corporativos en ${ciudad}`,
    `Industria y Manufactura en ${ciudad}`,
    `Centros Educativos en ${ciudad}`,
    `Sector Residencial en ${ciudad}`,
  ];
  
  return baseTitle + sectors[index % sectors.length];
} 