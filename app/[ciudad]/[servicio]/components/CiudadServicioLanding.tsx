"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
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
  ListChecks
} from 'lucide-react';
import { CiudadServicioContent } from '@/lib/data/getCiudadServicioContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CotizacionForm from '@/app/cotizar/components/CotizacionForm';
import CloudflareImage from '@/components/CloudflareImage';
import ClientesCarrusel from '@/components/ClientesCarrusel';

interface CiudadServicioLandingProps {
  content: CiudadServicioContent;
  params: {
    ciudad: string;
    servicio: string;
  };
}

export default function CiudadServicioLanding({ content, params }: CiudadServicioLandingProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
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
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Función para mostrar el formulario
  const scrollToForm = () => {
    const form = document.getElementById('formulario-cotizacion');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Animaciones
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      } 
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const scaleUp = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      } 
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* CTA Flotante en móvil (solo aparece al hacer scroll) */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-100 dark:border-gray-800 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <Button 
                  variant="gard-primary" 
                  size="lg" 
                  className="w-full rounded-xl shadow-md"
                  onClick={scrollToForm}
                >
                  {content.ctaTexto}
                </Button>
              </div>
              <Button 
                variant="outline" 
                size="icon"
                className="rounded-full"
                onClick={() => window.location.href = 'tel:+56229872380'}
              >
                <Phone className="h-5 w-5 text-primary" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hero Section - Full Height con Split Layout */}
      <section 
        data-section="hero"
        className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-900 dark:to-black"
      >
        {/* Overlay con degradado */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
        
        {/* Imagen de fondo */}
        <div className="absolute inset-0 w-full h-full z-0">
          {content.imageId && (
            <CloudflareImage
              imageId={content.imageId}
              alt={`Servicio de ${params.servicio.replace('-', ' ')} en ${params.ciudad.replace('-', ' ')}`}
              className="object-cover"
              fill
              priority
              objectFit="cover"
            />
          )}
        </div>
        
        {/* Contenido del Hero */}
        <div className="container mx-auto px-4 lg:px-8 z-20 py-16 md:py-24">
          <div className="max-w-3xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6 backdrop-blur-sm">
                  <MapPin className="h-4 w-4" />
                  Servicio Local en {params.ciudad.replace('-', ' ')}
                </span>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                {content.h1}
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl"
              >
                {content.intro}
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Button 
                  variant="gard-primary" 
                  size="lg" 
                  className="rounded-xl text-base font-medium shadow-lg hover:shadow-primary/20 transition-all duration-300"
                  onClick={scrollToForm}
                >
                  {content.ctaTexto}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-xl border-white text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                  onClick={() => window.location.href = 'tel:+56229872380'}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Llamar ahora
                </Button>
              </motion.div>
              
              <motion.div 
                variants={fadeInUp}
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
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
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
                className="w-2 h-2 bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Descripción Section con Diseño Moderno */}
      <section 
        data-section="descripcion"
        className="bg-white dark:bg-gray-900 py-20 md:py-28"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-12"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-center mb-4"
              >
                Servicio Especializado en {params.ciudad.replace('-', ' ')}
              </motion.h2>
              
              <motion.div 
                variants={fadeInUp}
                className="prose prose-lg dark:prose-invert max-w-none"
              >
                {content.descripcion.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </motion.div>
              
              <motion.div 
                variants={fadeInUp}
                className="flex justify-center"
              >
                <Button 
                  variant="gard-primary" 
                  size="lg" 
                  className="rounded-xl"
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
      <section className="bg-gray-50 dark:bg-gray-800 py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center p-4"
            >
              <span className="text-3xl md:text-4xl font-bold text-primary mb-2">+500</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Clientes Satisfechos</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center text-center p-4"
            >
              <span className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Servicio Continuo</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center p-4"
            >
              <span className="text-3xl md:text-4xl font-bold text-primary mb-2">15 min</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Tiempo de Respuesta</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center text-center p-4"
            >
              <span className="text-3xl md:text-4xl font-bold text-primary mb-2">100%</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Personal Certificado</span>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Beneficios Section con Cards y Efectos */}
      <section 
        data-section="beneficios"
        className="bg-white dark:bg-gray-900 py-20 md:py-28 overflow-hidden"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-16"
          >
            <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Beneficios Exclusivos en {params.ciudad.replace('-', ' ')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Soluciones adaptadas a las necesidades específicas de su sector y ubicación
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.beneficios.map((beneficio, index) => (
                <motion.div
                  key={index}
                  variants={scaleUp}
                  className="h-full"
                >
                  <Card className="h-full border-none shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="flex items-start gap-5 mb-4">
                        <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          {getBenefitIcon(index)}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">
                            {getBenefitTitle(index, params.ciudad.replace('-', ' '))}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mt-2 flex-1">
                        {beneficio}
                      </p>
                      
                      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                        <span className="text-sm text-primary flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" />
                          Garantizado
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Casos de Uso Section - Grilla Visual Moderna */}
      <section 
        data-section="casos"
        className="bg-gray-50 dark:bg-gray-800 py-20 md:py-28 overflow-hidden"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-16"
          >
            <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Soluciones para {params.ciudad.replace('-', ' ')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Casos de éxito adaptados a las necesidades locales
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content.casosDeUso.map((caso, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                >
                  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 h-full">
                    <div className="flex items-start gap-5">
                      <div className="shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          {getCaseIcon(index)}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-3">
                          {getCaseTitle(index, params.ciudad.replace('-', ' '), params.servicio.replace('-', ' '))}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {caso}
                        </p>
                        
                        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                          <span className="text-primary text-sm font-medium">Ver caso completo →</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div variants={fadeInUp} className="flex justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-xl"
                onClick={scrollToForm}
              >
                ¿Necesitas una solución a medida?
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Zonas Críticas Section - Con Mapa Visual */}
      <section 
        data-section="zonas"
        className="bg-white dark:bg-gray-900 py-20 md:py-28 overflow-hidden"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-16"
          >
            <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {content.zonasCriticas.titulo}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {content.zonasCriticas.descripcion}
              </p>
            </motion.div>
            
            <div>
              <div className="relative">
                {/* Fondo de mapa estilizado */}
                <div className="absolute inset-0 bg-dots-pattern opacity-5 rounded-3xl"></div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 md:p-10 shadow-sm relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content.zonasCriticas.zonas.map((zona, index) => (
                      <motion.div
                        key={index}
                        variants={scaleUp}
                        className="relative"
                      >
                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all p-5 h-full border-l-4 border-primary">
                          <div className="flex items-start gap-3 mb-3">
                            <MapPin className="h-5 w-5 text-primary mt-1" />
                            <h3 className="text-lg font-semibold">
                              {zona.split(':')[0]}
                            </h3>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-400 text-sm pl-8">
                            {zona.includes(':') ? zona.split(':')[1] : zona}
                          </p>
                        </div>
                        
                        {/* Línea conectora (solo visual) */}
                        <div className="absolute -left-4 top-1/2 w-4 border-t border-dashed border-gray-300 dark:border-gray-700 hidden lg:block"></div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div 
              variants={fadeInUp}
              className="mx-auto max-w-lg bg-gray-100 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">¿Su zona no aparece en la lista?</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Trabajamos en todas las zonas de {params.ciudad.replace('-', ' ')}. Contáctenos para obtener información específica sobre su ubicación.
                  </p>
                  <Button 
                    variant="gard-outline" 
                    size="sm"
                    className="rounded-lg mt-1"
                    onClick={scrollToForm}
                  >
                    Consultar por mi zona
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Carrusel de clientes */}
      <ClientesCarrusel />
      
      {/* FAQs Section */}
      <section 
        data-section="faqs"
        className="bg-white dark:bg-gray-900 py-20 md:py-28 overflow-hidden"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-16"
          >
            <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Preguntas Frecuentes
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Resolvemos tus dudas sobre nuestros servicios en {params.ciudad.replace('-', ' ')}
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {content.preguntasFrecuentes.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 dark:border-gray-800 py-2">
                    <AccordionTrigger className="text-left text-lg font-medium py-4 pr-4 hover:no-underline">
                      {faq.pregunta}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 py-4 pb-6 text-base">
                      {faq.respuesta}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA y Formulario Section */}
      <section 
        id="formulario-cotizacion"
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-900 dark:to-black py-20 md:py-28"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
          >
            <motion.div variants={fadeInUp} className="text-white space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Solicita una Cotización Personalizada
              </h2>
              
              <p className="text-xl text-gray-300">
                Completa el formulario y un especialista en seguridad para {params.ciudad.replace('-', ' ')} te contactará en menos de 12 horas.
              </p>
              
              <div className="space-y-6 pt-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-primary/20 p-3 rounded-xl shrink-0 mt-1">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg mb-1">Evaluación Personalizada</h3>
                    <p className="text-gray-300">Análisis de riesgos específico para su sector en {params.ciudad.replace('-', ' ')}</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-primary/20 p-3 rounded-xl shrink-0 mt-1">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg mb-1">Respuesta Inmediata</h3>
                    <p className="text-gray-300">Contacto en menos de 12 horas por un especialista local</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-primary/20 p-3 rounded-xl shrink-0 mt-1">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg mb-1">Sin Compromisos</h3>
                    <p className="text-gray-300">Cotización transparente sin costos ocultos ni contratos forzosos</p>
                  </div>
                </motion.div>
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
                <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm py-3 px-5 rounded-lg">
                  <span className="text-sm text-gray-300">Certificación</span>
                  <span className="text-white font-medium">OS-10</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm py-3 px-5 rounded-lg">
                  <span className="text-sm text-gray-300">Cobertura</span>
                  <span className="text-white font-medium">Nacional</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm py-3 px-5 rounded-lg">
                  <span className="text-sm text-gray-300">Experiencia</span>
                  <span className="text-white font-medium">+18 años</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={scaleUp}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-1">
                <CotizacionForm />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Funciones de ayuda para iconos y títulos
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