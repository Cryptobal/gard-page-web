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
  PlayCircle,
  ShieldCheck,
  Factory,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { ServicioIndustriaContent } from '@/lib/data/getServicioIndustriaContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CotizacionForm from '@/app/cotizar/components/CotizacionForm';
import CloudflareImage from '@/components/CloudflareImage';
import ClientesCarrusel from '@/components/ClientesCarrusel';
import { cn } from '@/lib/utils';
import { Stream } from '@cloudflare/stream-react';

interface ServicioIndustriaLandingProps {
  content: ServicioIndustriaContent;
  params: {
    servicio: string;
    industria: string;
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
        className="text-body-lg text-foreground dark:text-foreground"
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
        
        <p className="text-body-base text-foreground dark:text-foreground mt-2 flex-1">
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
          <p className="text-body-base text-foreground dark:text-foreground">
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
          <ShieldCheck className="h-5 w-5 text-primary mt-1" />
          <h3 className="text-lg font-semibold">
            {nombre}
          </h3>
        </div>
        
        <p className="text-foreground dark:text-foreground text-sm pl-8">
          {descripcion}
        </p>
      </div>
      
      {/* Línea conectora (solo visual) */}
      <div className="absolute -left-4 top-1/2 w-4 border-t border-dashed border-gray-300 dark:border-gray-700 hidden lg:block"></div>
    </motion.div>
  );
};

// Componente para FAQs con Schema.org markup para SEO
const FAQSection = ({ faqs, industria }: { faqs: { pregunta: string; respuesta: string }[]; industria: string }) => {
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
          subtitle={`Resolvemos tus dudas sobre nuestros servicios para el sector ${industria}`}
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
                <AccordionContent className="text-foreground dark:text-foreground py-4 pb-6 text-body-base">
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

export default function ServicioIndustriaLanding({ content, params }: ServicioIndustriaLandingProps) {
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
  
  // Obtenemos el nombre formateado del servicio y la industria
  const servicioFormatted = params.servicio.replace(/-/g, ' ');
  const industriaFormatted = params.industria.replace(/-/g, ' ');
  
  // Obtener el ID del video con fallback al video genérico
  const defaultVideoId = "ac93b4a10e87873748171425b9f8066d";
  const videoId = content.videoId || defaultVideoId;

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
                    variant="gard-accent" 
                    size="lg" 
                    className="w-full rounded-xl"
                    onClick={scrollToForm}
                  >
                    {content.ctaTexto}
                  </Button>
                </div>
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
              // Fallback a imagen si no hay video disponible
              <div className="absolute inset-0">
                <CloudflareImage
                  imageId={content.imageId}
                  alt={`Servicio de ${servicioFormatted} para ${industriaFormatted}`}
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
                    <Factory className="h-4 w-4" />
                    Solución Especializada para {industriaFormatted}
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
                    variant="gard-primary" 
                    size="lg" 
                    className="rounded-xl shadow-lg w-full sm:w-auto"
                    onClick={scrollToForm}
                  >
                    {content.ctaTexto}
                    <ArrowRight className="ml-2 h-5 w-5" />
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
                  Servicio Especializado para {industriaFormatted}
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
                    variant="gard-primary" 
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
                  <span className="text-sm text-foreground/80 dark:text-foreground/80">{stat.label}</span>
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
              title={`Beneficios Exclusivos para ${industriaFormatted}`} 
              subtitle="Soluciones adaptadas a las necesidades específicas de su sector"
            />
            
            <div className="gard-grid gap-8">
              {content.beneficios.map((beneficio, index) => (
                <BenefitCard 
                  key={index}
                  icon={getBenefitIcon(index)}
                  title={getBenefitTitle(index, industriaFormatted, servicioFormatted)}
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
              title={`Soluciones para ${industriaFormatted}`} 
              subtitle="Casos de éxito adaptados a las necesidades del sector"
            />
            
            <div className="gard-grid-2 gap-8">
              {content.casosDeUso.map((caso, index) => (
                <CaseStudyCard 
                  key={index}
                  icon={getCaseIcon(index)}
                  title={getCaseTitle(index, industriaFormatted, servicioFormatted)}
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
                variant="gard-outline" 
                size="lg" 
                className="gard-btn-lg rounded-xl border-accent text-accent hover:bg-accent/10"
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
              className="mx-auto max-w-lg dark:bg-gray-800/60 bg-primary-foreground p-6 rounded-xl border border-gray-200 dark:border-gray-700 mt-12 shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">¿Necesitas proteger un área específica?</h4>
                  <p className="text-body-sm text-foreground dark:text-foreground mb-3">
                    Si tienes necesidades especiales o requieres protección para otra área no listada, contáctanos para una evaluación personalizada.
                  </p>
                  <Button 
                    variant="gard-primary" 
                    className="px-4 py-2 rounded-xl hover:bg-accent transition-colors"
                    onClick={scrollToForm}
                  >
                    Solicitar evaluación personalizada <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Clientes Section - Logos Carrusel */}
        <section 
          data-section="clientes"
          className="gard-section gard-section-alt overflow-hidden"
        >
          <div className="gard-container">
            <SectionTitle 
              title="Empresas que confían en nosotros" 
              subtitle="Clientes satisfechos en el sector industrial y corporativo"
            />
            
            <ClientesCarrusel />
          </div>
        </section>
        
        {/* FAQ Section */}
        <FAQSection 
          faqs={content.preguntasFrecuentes} 
          industria={industriaFormatted}
        />
        
        {/* Formulario de Contacto */}
        <section 
          id="formulario-cotizacion" 
          data-section="formulario"
          className="gard-section gard-section-alt overflow-hidden"
        >
          <div className="gard-container">
            <SectionTitle 
              title={`Solicita tu Servicio de ${servicioFormatted} para ${industriaFormatted}`} 
              subtitle="Completa el formulario y te contactaremos en menos de 12 horas"
            />
            
            <div className="max-w-3xl mx-auto">
              <Card className="border-none shadow-lg dark:bg-gray-800">
                <CardContent className="p-6 md:p-8">
                  <CotizacionForm 
                    // Quitar props que no existen en el componente
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </LazyMotion>
  );
}

function getBenefitIcon(index: number) {
  const icons = [
    <Shield className="h-6 w-6 text-primary" key="1" />,
    <CheckCircle2 className="h-6 w-6 text-primary" key="2" />,
    <Award className="h-6 w-6 text-primary" key="3" />,
    <Users className="h-6 w-6 text-primary" key="4" />,
    <ListChecks className="h-6 w-6 text-primary" key="5" />,
  ];
  
  return icons[index % icons.length];
}

function getBenefitTitle(index: number, industria: string, servicio: string) {
  const titles = [
    `Especialización en ${industria}`,
    `Mayor Seguridad en su Empresa`,
    `Personal Altamente Capacitado`,
    `Respuesta Inmediata 24/7`,
    `Tecnología Integrada y Adaptada`,
  ];
  
  return titles[index % titles.length];
}

function getCaseIcon(index: number) {
  const icons = [
    <Building2 className="h-6 w-6 text-primary" key="1" />,
    <ShieldCheck className="h-6 w-6 text-primary" key="2" />,
    <Lock className="h-6 w-6 text-primary" key="3" />,
    <Factory className="h-6 w-6 text-primary" key="4" />,
  ];
  
  return icons[index % icons.length];
}

function getCaseTitle(index: number, industria: string, servicio: string) {
  // Personalizar según el índice
  if (index === 0) return `Protección Integral para ${industria}`;
  if (index === 1) return `Optimización de Recursos`;
  if (index === 2) return `${servicio} Especializado`;
  if (index === 3) return `Prevención Proactiva`;
  
  return `Caso de Éxito ${index + 1}`;
} 