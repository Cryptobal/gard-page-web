"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Redo, Shield, MapPin, UserCheck, RefreshCw, PanelRight } from 'lucide-react';
import { CiudadServicioContent } from '@/lib/data/getCiudadServicioContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CotizacionForm from '@/app/cotizar/components/CotizacionForm';
import CloudflareImage from '@/components/CloudflareImage';

interface CiudadServicioLandingProps {
  content: CiudadServicioContent;
  params: {
    ciudad: string;
    servicio: string;
  };
}

export default function CiudadServicioLanding({ content, params }: CiudadServicioLandingProps) {
  const [showForm, setShowForm] = useState(false);
  
  // Animaciones para elementos que aparecen en pantalla
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  // Función para mostrar el formulario
  const toggleForm = () => {
    setShowForm(true);
    
    // Scroll al formulario
    setTimeout(() => {
      const form = document.getElementById('formulario-cotizacion');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-gray-900 to-gray-800 dark:from-black dark:to-gray-900">
        <div className="gard-container py-16 md:py-24 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div 
              className="text-white space-y-6"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                Servicio local en {params.ciudad.replace('-', ' ')}
              </div>
              
              <h1 className="text-heading-1 font-bold text-white">
                {content.h1}
              </h1>
              
              <p className="text-body-lg text-gray-200">
                {content.intro}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  variant="gard-primary" 
                  size="lg" 
                  className="rounded-2xl"
                  onClick={toggleForm}
                >
                  {content.ctaTexto}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-2xl border-white text-white hover:bg-white/10"
                  onClick={() => window.location.href = `tel:+56229872380`}
                >
                  Llamar ahora: +56 2 2987 2380
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              className="relative h-[300px] md:h-[450px] rounded-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {content.imageId && (
                <CloudflareImage
                  imageId={content.imageId}
                  alt={`Servicio de ${params.servicio.replace('-', ' ')} en ${params.ciudad.replace('-', ' ')}`}
                  className="object-cover rounded-xl"
                  fill
                  priority
                  objectFit="cover"
                />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm p-4 rounded-lg">
                <p className="text-white text-sm">
                  Servicio profesional de seguridad en {params.ciudad.replace('-', ' ')} con personal local y respuesta inmediata
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Descripción Section */}
      <section className="gard-section bg-white dark:bg-gray-900">
        <div className="gard-container py-16 md:py-24 px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-heading-2 font-bold text-center mb-8">
              Servicio de Seguridad Especializado en {params.ciudad.replace('-', ' ')}
            </h2>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {content.descripcion.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-body-base leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="pt-8 flex justify-center">
              <Button 
                variant="gard-primary" 
                size="lg" 
                className="rounded-2xl"
                onClick={toggleForm}
              >
                {content.ctaTexto}
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Beneficios Section */}
      <section className="gard-section bg-gray-50 dark:bg-gray-800">
        <div className="gard-container py-16 md:py-24 px-4">
          <h2 className="text-heading-2 font-bold text-center mb-12">
            Beneficios de Nuestro Servicio en {params.ciudad.replace('-', ' ')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.beneficios.map((beneficio, index) => (
              <Card key={index} className="gard-card border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    
                    <div>
                      <h3 className="text-heading-4 font-medium mb-2">
                        Beneficio {index + 1}
                      </h3>
                      <p className="text-body-base text-muted-foreground">
                        {beneficio}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Casos de Uso Section */}
      <section className="gard-section bg-white dark:bg-gray-900">
        <div className="gard-container py-16 md:py-24 px-4">
          <h2 className="text-heading-2 font-bold text-center mb-4">
            Aplicaciones en {params.ciudad.replace('-', ' ')}
          </h2>
          
          <p className="text-body-lg text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Soluciones adaptadas a las necesidades específicas de diferentes sectores en {params.ciudad.replace('-', ' ')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.casosDeUso.map((caso, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl bg-gray-50 dark:bg-gray-800"
              >
                <div className="bg-primary/10 p-3 rounded-full shrink-0">
                  <UserCheck className="h-6 w-6 text-primary" />
                </div>
                
                <div>
                  <h3 className="text-heading-5 font-medium mb-2">
                    Caso {index + 1}
                  </h3>
                  <p className="text-body-base text-muted-foreground">
                    {caso}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-2xl"
              onClick={toggleForm}
            >
              ¿Necesitas una solución similar?
            </Button>
          </div>
        </div>
      </section>
      
      {/* Zonas Críticas Section */}
      <section className="gard-section bg-gray-50 dark:bg-gray-800">
        <div className="gard-container py-16 md:py-24 px-4">
          <h2 className="text-heading-2 font-bold text-center mb-4">
            {content.zonasCriticas.titulo}
          </h2>
          
          <p className="text-body-lg text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            {content.zonasCriticas.descripcion}
          </p>
          
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.zonasCriticas.zonas.map((zona, index) => (
                <div 
                  key={index}
                  className="p-4 border border-gray-100 dark:border-gray-800 rounded-xl"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="text-heading-5 font-medium">
                      {zona.split(':')[0]}
                    </h3>
                  </div>
                  
                  <p className="text-body-base text-muted-foreground">
                    {zona.includes(':') ? zona.split(':')[1] : zona}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQs Section */}
      <section className="gard-section bg-white dark:bg-gray-900">
        <div className="gard-container py-16 md:py-24 px-4">
          <h2 className="text-heading-2 font-bold text-center mb-4">
            Preguntas Frecuentes
          </h2>
          
          <p className="text-body-lg text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Resolvemos tus dudas sobre nuestros servicios en {params.ciudad.replace('-', ' ')}
          </p>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {content.preguntasFrecuentes.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-heading-5 py-4">
                    {faq.pregunta}
                  </AccordionTrigger>
                  <AccordionContent className="text-body-base text-muted-foreground py-4">
                    {faq.respuesta}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      
      {/* CTA y Formulario Section */}
      <section id="formulario-cotizacion" className="gard-section bg-gray-900 dark:bg-black">
        <div className="gard-container py-16 md:py-24 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="text-white space-y-6">
              <h2 className="text-heading-2 font-bold">
                Solicita una Cotización Personalizada
              </h2>
              
              <p className="text-body-lg text-gray-300">
                Completa el formulario y un especialista en seguridad para {params.ciudad.replace('-', ' ')} te contactará en menos de 12 horas.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full shrink-0 mt-1">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-gray-300">Evaluación personalizada del riesgo para tu sector</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full shrink-0 mt-1">
                    <RefreshCw className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-gray-300">Respuesta rápida adaptada a {params.ciudad.replace('-', ' ')}</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full shrink-0 mt-1">
                    <PanelRight className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-gray-300">Sin compromiso ni costos ocultos</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
              <CotizacionForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 