'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, ArrowRight, ShieldCheck, Award, Clock } from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import OurServices from '@/app/components/OurServices';
import CtaFinal from '@/components/ui/shared/CtaFinal';
import SEODevPanel from '@/components/seo/SEODevPanel';

export default function ServiciosLandingClient() {
  return (
    <>
      {/* Componentes SEO */}
      <SEODevPanel />
      
      {/* Hero Section */}
      <section className="relative w-full h-[45vh] md:h-[60vh]">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Nuestros Servicios de Seguridad
          </h1>
          <p className="text-white text-lg md:text-xl opacity-90 max-w-3xl mb-8">
            Protección integral para industrias, empresas, instituciones y comunidades.
          </p>
          <Link href="/cotizar" className="gard-btn gard-btn-primary gard-btn-lg inline-flex items-center">
            Cotiza ahora <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
        <CloudflareImage
          imageId="5eea1064-8a2d-4e8b-5606-d28775467a00"
          alt="Servicios de seguridad Gard"
          fill
          priority
          className="object-cover"
        />
      </section>

      {/* Contenido único adicional - Introducción */}
      <section className="gard-section py-16 md:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-heading-2 mb-4">Soluciones personalizadas para cada cliente</h2>
              <p className="text-body-lg mb-6">
                En Gard Security entendemos que cada cliente tiene necesidades únicas. Por eso, ofrecemos servicios adaptados a los requerimientos específicos de cada industria y organización.
              </p>
              <p className="text-muted-foreground mb-6">
                Nuestros especialistas realizan un análisis exhaustivo de sus instalaciones, procesos y posibles vulnerabilidades para diseñar un plan de seguridad integral que garantice la protección total de sus activos.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <ShieldCheck className="h-6 w-6 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Análisis de riesgos completo</h3>
                    <p className="text-sm text-muted-foreground">Evaluación exhaustiva de vulnerabilidades específicas</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="h-6 w-6 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Personal altamente capacitado</h3>
                    <p className="text-sm text-muted-foreground">Guardias especializados según su industria</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Respuesta inmediata 24/7</h3>
                    <p className="text-sm text-muted-foreground">Atención continua y tiempos de respuesta garantizados</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <CloudflareImage
                imageId="662bce53-3ea1-4f76-86d9-bea6d420a000"
                alt="Soluciones de seguridad personalizadas"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Servicios destacados - usando el mismo componente que la página de inicio */}
      <OurServices />

      {/* Sección "¿Por qué elegir Gard?" */}
      <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-heading-2 mb-4 text-center">¿Por qué elegir Gard?</h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto text-center mb-12">
            Una empresa comprometida con la excelencia y la confianza en seguridad privada.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl flex flex-col items-center text-center">
              <CheckCircle className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-heading-4 mb-2">Personal profesional y confiable</h3>
              <p className="text-muted-foreground">
                Nuestro equipo está formado por profesionales certificados y verificados exhaustivamente.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl flex flex-col items-center text-center">
              <CheckCircle className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-heading-4 mb-2">Tecnología de vanguardia</h3>
              <p className="text-muted-foreground">
                Implementamos soluciones tecnológicas avanzadas para garantizar la máxima seguridad.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl flex flex-col items-center text-center">
              <CheckCircle className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-heading-4 mb-2">Cobertura nacional 24/7</h3>
              <p className="text-muted-foreground">
                Servicio ininterrumpido en todo el país con tiempos de respuesta garantizados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de testimonios - Contenido único adicional */}
      <section className="gard-section py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-heading-2 mb-4 text-center">Nuestros clientes confían en nosotros</h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto text-center mb-12">
            La seguridad de nuestros clientes es nuestra mejor carta de presentación
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <p className="italic text-muted-foreground mb-4">
                "La implementación de los servicios de Gard ha mejorado significativamente nuestra seguridad. Su personal altamente capacitado y su tecnología de punta nos han dado la tranquilidad que necesitábamos."
              </p>
              <div className="font-semibold">Roberto Méndez</div>
              <div className="text-sm text-muted-foreground">Gerente de Operaciones, Industrias del Norte</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <p className="italic text-muted-foreground mb-4">
                "Tras varios incidentes de seguridad, decidimos contratar a Gard. Su enfoque personalizado y su capacidad de adaptarse a nuestras necesidades específicas marcaron la diferencia. Altamente recomendados."
              </p>
              <div className="font-semibold">Claudia Soto</div>
              <div className="text-sm text-muted-foreground">Directora Administrativa, Centro Comercial Alameda</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <p className="italic text-muted-foreground mb-4">
                "La calidad del servicio de monitoreo y la respuesta inmediata ante alertas han superado nuestras expectativas. El equipo de Gard demuestra un verdadero compromiso con la seguridad de sus clientes."
              </p>
              <div className="font-semibold">Javier Rojas</div>
              <div className="text-sm text-muted-foreground">Administrador, Condominio Las Palmas</div>
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