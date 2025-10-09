import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, CheckCircle, Clock, Award, Phone } from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import BreadcrumbSchema, { Breadcrumbs } from '@/components/seo/BreadcrumbSchema';
import ServiceSchema from '@/components/seo/ServiceSchema';
import { FAQSection } from '@/components/seo/FAQSchema';

export const metadata: Metadata = {
  title: 'Guardias de Seguridad para Minería Chile | Certificados OS10',
  description: 'Guardias certificados OS10 para faenas mineras. Protección 24/7, monitoreo remoto y respuesta inmediata. +15 años protegiendo mineras en Chile. Cotice ahora: +56 2 2987 2380',
  keywords: [
    'guardias seguridad minería chile',
    'guardias certificados OS10',
    'seguridad faenas mineras',
    'guardias para minas',
    'seguridad industrial minería',
    'guardias antofagasta',
    'seguridad minera certificada',
    'costo guardias minería'
  ],
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: 'https://www.gard.cl/guardias-seguridad-mineria-chile'
  },
  openGraph: {
    title: 'Guardias de Seguridad para Minería Chile | Certificados OS10 | Gard Security',
    description: 'Guardias certificados OS10 para faenas mineras. Protección 24/7, monitoreo remoto y respuesta inmediata. +15 años protegiendo las principales mineras de Chile.',
    url: 'https://www.gard.cl/guardias-seguridad-mineria-chile',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website',
    images: [
      {
        url: 'https://imagedelivery.net/gGw8cfmEZedi85dYm6qcFw/77e4d99e-a497-44ad-6c70-88cc1d7f2e00/public',
        width: 1200,
        height: 630,
        alt: 'Guardias de seguridad en faena minera Chile'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guardias de Seguridad para Minería Chile | Certificados OS10',
    description: 'Guardias certificados OS10 para faenas mineras. Protección 24/7, monitoreo remoto. +15 años de experiencia.',
  }
};

// FAQs específicas para esta landing
const faqs = [
  {
    question: '¿Cuánto cuesta contratar guardias de seguridad para una mina en Chile?',
    answer: 'El costo varía según el tamaño de la faena y cantidad de guardias requeridos. Para una faena mediana con 4 guardias 24/7, el servicio comienza desde $8.000.000 mensuales. Incluye personal certificado OS10, supervisión remota y equipamiento completo. Solicite una cotización personalizada llamando al +56 2 2987 2380.'
  },
  {
    question: '¿Todos sus guardias tienen certificación OS10 para trabajar en minería?',
    answer: 'Sí, el 100% de nuestros guardias que trabajan en faenas mineras cuentan con certificación OS10 vigente emitida por SERNAGEOMIN. Además, reciben capacitación continua en protocolos de seguridad específicos del sector minero.'
  },
  {
    question: '¿Cuánto tiempo toma implementar el servicio en una faena minera?',
    answer: 'Podemos iniciar operaciones en 5-7 días hábiles. Esto incluye: evaluación de la faena, selección de personal certificado OS10, capacitación específica en los protocolos de su operación, y despliegue en terreno. Para casos urgentes, tenemos capacidad de respuesta express en 48 horas.'
  },
  {
    question: '¿Qué áreas de la faena minera pueden cubrir?',
    answer: 'Cubrimos todas las áreas críticas: accesos principales y secundarios, casetas de control, zonas de maquinaria y equipos, bodegas de suministros, oficinas administrativas, comedores y campamentos, y zonas de extracción. Adaptamos el despliegue según layout específico de cada faena.'
  },
  {
    question: '¿Cómo garantizan la continuidad del servicio en faenas remotas?',
    answer: 'Mantenemos equipos de reemplazo disponibles, logística de transporte a zonas remotas, comunicación satelital para faenas sin cobertura celular, y protocolos de emergencia con helicopteros para casos críticos. Nuestro índice de continuidad operacional es 99.9%.'
  }
];

const breadcrumbs = [
  { name: 'Inicio', url: 'https://www.gard.cl' },
  { name: 'Guardias Seguridad Minería Chile', url: 'https://www.gard.cl/guardias-seguridad-mineria-chile' }
];

export default function GuardiasSeguridadMineriaPage() {
  return (
    <>
      {/* SEO Schemas */}
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema
        name="Guardias de Seguridad para Minería en Chile"
        description="Servicio especializado de guardias certificados OS10 para faenas mineras. Protección 24/7 con personal capacitado y monitoreo remoto."
        url="https://www.gard.cl/guardias-seguridad-mineria-chile"
        areaServed="Chile"
        aggregateRating={{
          ratingValue: 4.9,
          reviewCount: 127
        }}
        offers={{
          priceRange: "$$$"
        }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero optimizado para conversión */}
      <section className="gard-hero min-h-[70vh] flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0">
          <CloudflareImage
            imageId="77e4d99e-a497-44ad-6c70-88cc1d7f2e00"
            alt="Guardias de seguridad en faena minera Chile"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="gard-hero-content text-center relative z-10 px-4 py-20 max-w-5xl">
          <div className="inline-flex items-center rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-white mb-6 border border-primary/30">
            <Award className="h-4 w-4 mr-2" />
            <span>+15 Años Protegiendo Operaciones Mineras en Chile</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Guardias de Seguridad para Minería en Chile
          </h1>
          
          <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto mb-8 leading-relaxed">
            Personal <strong>certificado OS10</strong>, monitoreo 24/7 y respuesta inmediata ante emergencias. 
            Protección integral para su faena minera.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a 
              href="#cotizar" 
              className="gard-btn gard-btn-primary gard-btn-lg inline-flex items-center"
            >
              Cotizar Mi Faena Ahora <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a 
              href="tel:+56229872380"
              className="gard-btn gard-btn-secondary gard-btn-lg inline-flex items-center"
            >
              <Phone className="mr-2 h-5 w-5" /> +56 2 2987 2380
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <ShieldCheck className="h-10 w-10 text-primary mb-3" />
              <h3 className="text-white font-semibold text-lg mb-2">100% Certificados OS10</h3>
              <p className="text-white/80 text-sm">Todo nuestro personal cuenta con certificación SERNAGEOMIN vigente</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <Clock className="h-10 w-10 text-primary mb-3" />
              <h3 className="text-white font-semibold text-lg mb-2">Cobertura 24/7/365</h3>
              <p className="text-white/80 text-sm">Operación continua con turnos rotativos y supervisión remota</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <Award className="h-10 w-10 text-primary mb-3" />
              <h3 className="text-white font-semibold text-lg mb-2">Respuesta < 15 min</h3>
              <p className="text-white/80 text-sm">Tiempos de respuesta garantizados ante emergencias</p>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="gard-section py-16 md:py-24">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-2 mb-4">¿Por Qué Elegir a Gard Security para su Faena Minera?</h2>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Somos la empresa líder en seguridad para minería en Chile, con experiencia comprobada protegiendo las operaciones más exigentes del país.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Personal Especializado en Minería</h3>
                <p className="text-muted-foreground">
                  Nuestros guardias reciben capacitación continua en protocolos mineros, incluyendo manejo de emergencias en altura, espacios confinados, y operación con maquinaria pesada.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Certificación OS10 Obligatoria</h3>
                <p className="text-muted-foreground">
                  El 100% de nuestro personal para minería cuenta con certificación OS10 vigente emitida por SERNAGEOMIN, garantizando cumplimiento normativo total.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Experiencia en Faenas Remotas</h3>
                <p className="text-muted-foreground">
                  Operamos en las zonas mineras más remotas de Chile: Antofagasta, Atacama, Coquimbo. Contamos con logística especializada y comunicación satelital.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Monitoreo Remoto 24/7</h3>
                <p className="text-muted-foreground">
                  Central de monitoreo con supervisión continua, GPS tracking de guardias, y sistema de alertas tempranas para respuesta inmediata ante incidentes.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Cumplimiento Normativo</h3>
                <p className="text-muted-foreground">
                  Conocemos todas las normativas del sector minero chileno: DS 132, DS 72, Ley 16.744. Mantenemos documentación y reportes actualizados para auditorías.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Equipamiento de Alta Durabilidad</h3>
                <p className="text-muted-foreground">
                  Radios de largo alcance, linternas industriales, EPP certificado, y equipos resistentes a condiciones extremas de polvo, humedad y temperatura.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios incluidos */}
      <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-2 mb-4">¿Qué Incluye Nuestro Servicio?</h2>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Solución integral de seguridad para su faena minera, desde la evaluación inicial hasta la operación continua.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Control de Accesos',
                items: ['Verificación de identidad con foto', 'Registro digital de ingresos', 'Control de vehículos pesados', 'Gestión de contratistas']
              },
              {
                title: 'Vigilancia Perimetral',
                items: ['Rondas programadas cada 2 horas', 'Verificación de cercos', 'Detección de intrusiones', 'Respuesta inmediata']
              },
              {
                title: 'Protección de Activos',
                items: ['Vigilancia de maquinaria pesada', 'Control de bodegas de insumos', 'Verificación de explosivos', 'Registro fotográfico']
              },
              {
                title: 'Monitoreo Central',
                items: ['Supervisión remota 24/7', 'GPS tracking de guardias', 'Sistema de alertas', 'Coordinación con autoridades']
              },
              {
                title: 'Gestión de Emergencias',
                items: ['Protocolos de evacuación', 'Primeros auxilios certificados', 'Coordinación con rescate', 'Reporte de incidentes']
              },
              {
                title: 'Reportería y Cumplimiento',
                items: ['Bitácoras digitales', 'Reportes de incidentes', 'Estadísticas mensuales', 'Auditorías de calidad']
              }
            ].map((servicio, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border">
                <h3 className="text-xl font-semibold mb-4">{servicio.title}</h3>
                <ul className="space-y-2">
                  {servicio.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <FAQSection
        title="Preguntas Frecuentes sobre Guardias para Minería"
        description="Resolvemos las dudas más comunes sobre nuestro servicio de seguridad para faenas mineras en Chile"
        faqs={faqs}
      />

      {/* CTA Final con formulario */}
      <section id="cotizar" className="gard-section py-16 md:py-24 bg-[#0A0C12] text-white">
        <div className="gard-container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-heading-2 mb-4">Cotice Seguridad para su Faena Minera</h2>
          <p className="text-body-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Complete el formulario y un ejecutivo especializado en minería lo contactará en menos de 2 horas con una propuesta personalizada.
          </p>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nombre completo *"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400"
                  required
                />
                <input
                  type="email"
                  placeholder="Email corporativo *"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400"
                  required
                />
                <input
                  type="tel"
                  placeholder="Teléfono *"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400"
                  required
                />
                <input
                  type="text"
                  placeholder="Empresa minera *"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400"
                  required
                />
                <input
                  type="text"
                  placeholder="Ubicación de la faena"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400"
                />
                <select
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white"
                >
                  <option value="">N° de guardias necesarios</option>
                  <option value="1-2">1-2 guardias</option>
                  <option value="3-5">3-5 guardias</option>
                  <option value="6-10">6-10 guardias</option>
                  <option value="10+">Más de 10 guardias</option>
                </select>
              </div>
              <textarea
                placeholder="Cuéntenos sobre su faena y necesidades específicas de seguridad..."
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 h-32"
              ></textarea>
              <button
                type="submit"
                className="gard-btn gard-btn-primary gard-btn-lg w-full sm:w-auto"
              >
                Solicitar Cotización Ahora <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>

          <p className="text-sm text-gray-400 mt-6">
            * Al enviar este formulario acepta nuestros <Link href="/terminos" className="text-primary hover:underline">términos de servicio</Link> y <Link href="/privacidad" className="text-primary hover:underline">política de privacidad</Link>.
          </p>
        </div>
      </section>
    </>
  );
}

