'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Shield } from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import OurServices from '@/app/components/OurServices';
import CtaFinal from '@/components/ui/shared/CtaFinal';
import SEODevPanel from '@/components/seo/SEODevPanel';
import CanonicalUrl from '@/components/seo/CanonicalUrl';
import GardHero from '@/components/layouts/GardHero';

export default function ServiciosLandingClient() {
  return (
    <>
      {/* Componentes SEO */}
      <SEODevPanel />
      <CanonicalUrl />
      
      {/* Hero Section */}
      <GardHero 
        title="Nuestros Servicios de Seguridad"
        subtitle="Protección integral para industrias, empresas, instituciones y comunidades."
        ctaTexto="Cotiza ahora"
        ctaHref="#cotizar"
        imageId="5eea1064-8a2d-4e8b-5606-d28775467a00"
        badge={{
          icon: <Shield className="h-4 w-4" />,
          text: "Servicios de Alta Calidad"
        }}
        overlay={true}
        variant="standard"
      />

      {/* Servicios destacados - usando el mismo componente que la página de inicio */}
      <OurServices />

      {/* Sección "¿Por qué elegir Gard?" */}
      <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-[hsl(var(--gard-background))]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-heading-2 mb-4 text-center">¿Por qué elegir Gard?</h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto text-center mb-12">
            Una empresa comprometida con la excelencia y la confianza en seguridad privada.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-[hsl(var(--gard-card))] p-8 rounded-2xl flex flex-col items-center text-center">
              <CheckCircle className="h-12 w-12 text-primary dark:text-[hsl(var(--gard-accent))] mb-4" />
              <h3 className="text-heading-4 mb-2">Personal profesional y confiable</h3>
              <p className="text-muted-foreground">
                Nuestro equipo está formado por profesionales certificados y verificados exhaustivamente.
              </p>
            </div>
            
            <div className="bg-white dark:bg-[hsl(var(--gard-card))] p-8 rounded-2xl flex flex-col items-center text-center">
              <CheckCircle className="h-12 w-12 text-primary dark:text-[hsl(var(--gard-accent))] mb-4" />
              <h3 className="text-heading-4 mb-2">Tecnología de vanguardia</h3>
              <p className="text-muted-foreground">
                Implementamos soluciones tecnológicas avanzadas para garantizar la máxima seguridad.
              </p>
            </div>
            
            <div className="bg-white dark:bg-[hsl(var(--gard-card))] p-8 rounded-2xl flex flex-col items-center text-center">
              <CheckCircle className="h-12 w-12 text-primary dark:text-[hsl(var(--gard-accent))] mb-4" />
              <h3 className="text-heading-4 mb-2">Cobertura nacional 24/7</h3>
              <p className="text-muted-foreground">
                Servicio ininterrumpido en todo el país con tiempos de respuesta garantizados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <CtaFinal 
        title="¿Necesitas un servicio de seguridad personalizado?"
        description="Cada empresa tiene desafíos únicos. Contacta con nuestro equipo para una solución adaptada a tus necesidades específicas."
        ctaLabel="Solicita tu cotización"
        ctaHref="/cotizar"
        variant="soft"
      />
    </>
  );
} 