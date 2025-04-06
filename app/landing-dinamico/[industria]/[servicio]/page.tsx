'use client';

import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ChevronDown,
  Eye,
  DoorOpen,
  AlertCircle,
  Shield,
  Video,
  Moon,
  HardDrive,
  Radio,
  Bell,
  Battery,
  Package,
  CreditCard,
  Fence,
  Cog,
  UserCheck,
  Key,
  Database
} from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import DynamicCotizacionForm from '@/components/landing/DynamicCotizacionForm';
import getLandingText from '@/lib/data/landingText';
import { cloudflareImages } from '@/lib/images';
import ClientesCarrusel from '@/components/ClientesCarrusel';
import LandingSteps from '@/components/landing/LandingSteps';
import LandingFAQ from '@/components/landing/LandingFAQ';
import LandingFeatures from '@/components/landing/LandingFeatures';
import LandingSEOContent from '@/components/landing/LandingSEOContent';
import SEOFAQ from '@/components/landing/SEOFAQ';
import getFAQsByService from '@/lib/data/faq';

// Función para obtener el componente de icono por nombre
const getIconByName = (iconName: string | undefined, index: number) => {
  // Si no hay nombre de icono, usar un icono por defecto según el índice
  if (!iconName) {
    return index === 0 ? <ShieldCheck className="text-accent" size={28} /> :
           index === 1 ? <Clock className="text-accent" size={28} /> :
                         <CheckCircle2 className="text-accent" size={28} />;
  }

  // Mapeo de nombres a componentes de iconos
  const iconMap: Record<string, React.ReactNode> = {
    'eye': <Eye className="text-accent" size={28} />,
    'door': <DoorOpen className="text-accent" size={28} />,
    'alert-circle': <AlertCircle className="text-accent" size={28} />,
    'shield': <Shield className="text-accent" size={28} />,
    'video': <Video className="text-accent" size={28} />,
    'moon': <Moon className="text-accent" size={28} />,
    'hard-drive': <HardDrive className="text-accent" size={28} />,
    'radio': <Radio className="text-accent" size={28} />,
    'bell': <Bell className="text-accent" size={28} />,
    'battery': <Battery className="text-accent" size={28} />,
    'package': <Package className="text-accent" size={28} />,
    'credit-card': <CreditCard className="text-accent" size={28} />,
    'fence': <Fence className="text-accent" size={28} />,
    'cog': <Cog className="text-accent" size={28} />,
    'user-check': <UserCheck className="text-accent" size={28} />,
    'key': <Key className="text-accent" size={28} />,
    'database': <Database className="text-accent" size={28} />,
  };

  // Devolver el icono correspondiente o un icono por defecto
  return iconMap[iconName] || <Shield className="text-accent" size={28} />;
};

// Animaciones mejoradas
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const DynamicLandingPage = () => {
  // Obtener params de la URL
  const params = useParams();
  const searchParams = useSearchParams();
  const industria = params?.industria as string;
  const servicio = params?.servicio as string;
  
  // Obtener textos dinámicos
  const landingText = getLandingText(industria, servicio);
  
  // Obtener FAQs para este servicio
  const faqs = getFAQsByService(servicio);
  
  // Guardar parámetros UTM en sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Capturar UTMs
      const utm_source = searchParams.get('utm_source');
      const utm_medium = searchParams.get('utm_medium');
      const utm_campaign = searchParams.get('utm_campaign');
      const utm_content = searchParams.get('utm_content');
      const utm_term = searchParams.get('utm_term');
      const gclid = searchParams.get('gclid');
      
      // Guardar en sessionStorage si existen
      if (utm_source) sessionStorage.setItem('utm_source', utm_source);
      if (utm_medium) sessionStorage.setItem('utm_medium', utm_medium);
      if (utm_campaign) sessionStorage.setItem('utm_campaign', utm_campaign);
      if (utm_content) sessionStorage.setItem('utm_content', utm_content);
      if (utm_term) sessionStorage.setItem('utm_term', utm_term);
      if (gclid) sessionStorage.setItem('gclid', gclid);
    }
  }, [searchParams]);
  
  // Función para manejar el scroll suave a secciones
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Botón flotante para móviles mejorado
  const FloatingButton = () => (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-4 z-50 md:hidden"
    >
      <button
        onClick={() => scrollToSection('cotizacion-form')}
        className="flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        <span>Cotiza Ahora</span> <ArrowRight size={18} className="animate-pulse" />
      </button>
    </motion.div>
  );
  
  return (
    <>
      {/* Cabecera con logo */}
      <header className="w-full bg-white dark:bg-gray-900 py-6 shadow-sm fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-center md:justify-start">
          <Link href="/">
            <CloudflareImage
              imageId={cloudflareImages.logo.default}
              alt="Gard Security"
              width={150}
              height={50}
              priority
            />
          </Link>
        </div>
      </header>
      
      {/* Hero principal mejorado */}
      <section className="w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="space-y-6"
          >
            <span className="inline-block bg-accent/20 text-accent rounded-full px-4 py-1 text-sm font-medium">
              Seguridad para {industria.replace(/-/g, ' ')}
            </span>
            <h1 className="text-4xl font-bold md:text-5xl text-white">
              {servicio.charAt(0).toUpperCase() + servicio.slice(1).replace(/-/g, ' ')} para {industria.replace(/-/g, ' ')}
            </h1>
            <p className="text-xl text-gray-300">
              {landingText.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('cotizacion-form')}
                className="bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-8 rounded-xl inline-flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                Cotiza ahora <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden shadow-xl hidden md:block"
          >
            {/* Implementación de soporte para video */}
            {landingText.videoId ? (
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-[400px] object-cover"
                poster={`https://imagedelivery.net/mJjkfe-z7gy41t90G63Wzw/${landingText.imageId || cloudflareImages.hero.services}/public`}
                aria-label={`Servicio profesional de ${servicio.replace(/-/g, ' ')} para empresas de ${industria.replace(/-/g, ' ')} - Gard Security Chile`}
              >
                <source src={`https://videodelivery.net/${landingText.videoId}/manifest/video.m3u8`} type="application/x-mpegURL" />
                <source src={`https://videodelivery.net/${landingText.videoId}/download`} type="video/mp4" />
                {/* Fallback a imagen */}
                <CloudflareImage
                  imageId={landingText.imageId || cloudflareImages.hero.services}
                  alt={`Servicio profesional de ${servicio.replace(/-/g, ' ')} para empresas de ${industria.replace(/-/g, ' ')} - Protección y seguridad con Gard Security Chile`}
                  width={600}
                  height={400}
                  className="w-full h-[400px] object-cover"
                />
              </video>
            ) : (
              <CloudflareImage
                imageId={landingText.imageId || cloudflareImages.hero.services}
                alt={`Servicio profesional de ${servicio.replace(/-/g, ' ')} para empresas de ${industria.replace(/-/g, ' ')} - Protección y seguridad con Gard Security Chile`}
                width={600}
                height={400}
                className="w-full h-[400px] object-cover"
              />
            )}
          </motion.div>
        </div>
      </section>
      
      {/* Descripción */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-primary dark:text-white">
              Servicios de {servicio.replace(/-/g, ' ')} profesionales para {industria.replace(/-/g, ' ')}
            </h2>
            <p className="text-body-lg text-muted-foreground">
              {landingText.description}
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Sección de pasos */}
      <LandingSteps 
        titulo={`¿Cómo implementamos nuestro servicio de ${servicio.replace(/-/g, ' ')} para ${industria.replace(/-/g, ' ')}?`}
      />
      
      {/* Beneficios */}
      <section id="beneficios" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-primary dark:text-white">
              Beneficios de nuestros servicios de {servicio.replace(/-/g, ' ')} para {industria.replace(/-/g, ' ')}
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Estos son los beneficios exclusivos que obtendrás al contratar nuestros servicios de {servicio.replace(/-/g, ' ')} para el sector {industria.replace(/-/g, ' ')}.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {landingText.beneficios.map((beneficio, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-full">
                    <CheckCircle2 className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{beneficio}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Características */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-primary dark:text-white">
              ¿Por qué elegir Gard Security para servicios de {servicio.replace(/-/g, ' ')} en {industria.replace(/-/g, ' ')}?
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Nuestras soluciones de seguridad están adaptadas específicamente para satisfacer las necesidades del sector {industria.replace(/-/g, ' ')}.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {landingText.features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-sm"
              >
                <div className="mb-4 bg-accent/10 p-3 inline-block rounded-full">
                  {getIconByName(feature.iconName, index)}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Razones para elegir Gard Security */}
      <LandingFeatures 
        titulo={`Ventajas de nuestro servicio de ${servicio.replace(/-/g, ' ')} para ${industria.replace(/-/g, ' ')}`}
      />
      
      {/* Clientes que confían en nosotros */}
      <ClientesCarrusel />
      
      {/* Preguntas frecuentes - espaciado aumentado */}
      <section className="py-16 md:py-28 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <LandingFAQ 
            servicio={servicio} 
            titulo={`Preguntas frecuentes sobre ${servicio.replace(/-/g, ' ')} para ${industria.replace(/-/g, ' ')}`}
          />
          
          {/* Agregar el componente de FAQ estructurado para SEO */}
          <SEOFAQ 
            faqs={faqs}
            industria={industria}
            servicio={servicio}
          />
        </div>
      </section>
      
      {/* CTA con formulario - espaciado aumentado */}
      <section id="cotizacion" className="py-16 md:py-28 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="space-y-6"
            >
              <span className="inline-block bg-accent/20 text-accent rounded-full px-4 py-1 text-sm font-medium">
                Contacto directo
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-primary dark:text-white">
                {`Solicita tu cotización de ${servicio.replace(/-/g, ' ')} para ${industria.replace(/-/g, ' ')}`}
              </h2>
              <p className="text-body-lg text-muted-foreground">
                Completa el formulario y un asesor especializado en {industria.replace(/-/g, ' ')} te contactará a la brevedad para ofrecerte una solución personalizada.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-2 rounded-full">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <p>Sin compromiso</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-2 rounded-full">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <p>Respuesta en menos de 24h</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-2 rounded-full">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <p>Asesoramiento personalizado</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <DynamicCotizacionForm
                industria={industria}
                servicio={servicio}
                ctaText="Quiero proteger mi industria"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Contenido SEO */}
      <LandingSEOContent 
        industria={industria}
        servicio={servicio}
      />
      
      {/* Botón flotante para móviles */}
      <FloatingButton />
      
      {/* Script para Google Tag Manager */}
      <script 
        dangerouslySetInnerHTML={{ 
          __html: `
            // Función para crear y enviar eventos de dataLayer
            function sendDataLayerEvent(eventName, params) {
              if (typeof window !== 'undefined' && window.dataLayer) {
                window.dataLayer.push({
                  event: eventName,
                  ...params
                });
              }
            }
            
            // Registrar vista de página de landing dinámica
            sendDataLayerEvent('view_landing_page', {
              industria: '${industria}',
              servicio: '${servicio}'
            });
            
            // Capturar envío del formulario
            document.addEventListener('DOMContentLoaded', function() {
              const formulario = document.getElementById('cotizacion-form');
              if (formulario) {
                formulario.addEventListener('submit', function() {
                  sendDataLayerEvent('form_submission', {
                    industria: '${industria}',
                    servicio: '${servicio}',
                    landing: 'landing_dinamico'
                  });
                });
              }
            });
          `
        }}
      />
    </>
  );
}

export default DynamicLandingPage; 