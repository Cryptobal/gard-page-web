"use client";

import CotizacionForm from './components/CotizacionForm';
import UrlParamsProcessor from './components/UrlParamsProcessor';
import { ArrowRight, Clipboard } from 'lucide-react';
import GardHero from '@/components/layouts/GardHero';
import { useRef } from 'react';
import Head from 'next/head';

export default function CotizarPage() {
  // Función para desplazar al formulario cuando se hace clic en el botón
  const scrollToForm = () => {
    const formSection = document.querySelector('.gard-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Componente para procesar parámetros URL */}
      <UrlParamsProcessor />

      {/* Hero Section */}
      <GardHero 
        title="Cotiza tu Servicio de Seguridad"
        subtitle="Completa el formulario y te enviaremos una propuesta personalizada"
        ctaTexto="Completar Formulario"
        onScrollToForm={scrollToForm}
        badge={{
          icon: <Clipboard className="h-4 w-4" />,
          text: "Cotización Personalizada"
        }}
        videoId="ac93b4a10e87873748171425b9f8066d"
        imageId="09f20a0c-b345-4db8-ff81-14aad098db00"
        overlay={true}
      />

      {/* Formulario de cotización */}
      <section className="gard-section py-16 md:py-24">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <h2 className="text-heading-2 mb-6">Solicita tu cotización personalizada</h2>
              <p className="text-body-lg text-muted-foreground mb-8">
                En Gard Security te ofrecemos soluciones adaptadas específicamente a tus necesidades de seguridad. Completa el formulario y nuestro equipo te contactará en menos de 12 horas hábiles.
              </p>
              
              <div className="bg-muted/20 p-6 rounded-xl mb-8">
                <h3 className="text-heading-4 mb-4">¿Por qué solicitar una cotización?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Propuestas personalizadas según tus necesidades</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Presupuestos claros y sin sorpresas</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Rápida respuesta de nuestros especialistas</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Soluciones adaptadas a tu presupuesto</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="md:col-span-7">
              <CotizacionForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}