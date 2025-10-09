import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, CheckCircle, TrendingDown, Award, Phone, Package, Lock, Eye, Clock } from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import BreadcrumbSchema, { Breadcrumbs } from '@/components/seo/BreadcrumbSchema';
import ServiceSchema from '@/components/seo/ServiceSchema';
import { FAQSection } from '@/components/seo/FAQSchema';

export const metadata: Metadata = {
  title: 'Seguridad para Bodegas Logísticas Chile | Reducimos Mermas 85%',
  description: 'Protección integral de inventario y mercancía. Guardias especializados, control biométrico y CCTV inteligente. -85% de mermas comprobado. Cotice: +56 2 2987 2380',
  keywords: [
    'seguridad bodegas chile',
    'guardias almacenes logística',
    'protección inventario',
    'vigilancia centros distribución',
    'seguridad bodega 24/7',
    'control acceso bodegas',
    'reducir mermas bodega',
    'guardias logística santiago'
  ],
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: 'https://www.gard.cl/seguridad-bodegas-logistica-chile'
  },
  openGraph: {
    title: 'Seguridad para Bodegas Logísticas Chile | Reducimos Mermas hasta 85%',
    description: 'Protección integral de inventario. Guardias especializados, control biométrico y CCTV con IA. Resultados comprobados en centros de distribución.',
    url: 'https://www.gard.cl/seguridad-bodegas-logistica-chile',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website',
    images: [
      {
        url: 'https://imagedelivery.net/gGw8cfmEZedi85dYm6qcFw/683f9081-3573-4e90-e733-5c1507350900/public',
        width: 1200,
        height: 630,
        alt: 'Seguridad para bodegas logísticas Chile'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seguridad para Bodegas Logísticas Chile | -85% Mermas',
    description: 'Protección integral de inventario con guardias especializados y tecnología avanzada.',
  }
};

const faqs = [
  {
    question: '¿Cuánto cuesta contratar guardias para una bodega logística en Chile?',
    answer: 'Para una bodega estándar de 2,000-5,000 m², el servicio de 2 guardias en turno de 12 horas cuesta aproximadamente $2.500.000 - $4.000.000 mensuales. Incluye personal capacitado, supervisión digital, bitácora electrónica y respuesta a incidentes. El costo varía según tamaño de bodega, ubicación y horarios de operación. Solicite cotización al +56 2 2987 2380.'
  },
  {
    question: '¿Cómo pueden reducir las mermas y pérdidas de inventario?',
    answer: 'Implementamos protocolo integral: control de acceso biométrico, rondas con checkpoints RFID, inspección aleatoria de vehículos, CCTV con analítica de video, y registro digital de todos los movimientos. Nuestros clientes reportan reducciones de mermas del 70-85% en los primeros 6 meses de servicio.'
  },
  {
    question: '¿Sus guardias tienen experiencia en operaciones logísticas?',
    answer: 'Sí, todos nuestros guardias para bodegas logísticas reciben capacitación especializada en: sistemas WMS, protocolos de control de transportistas, uso de RFID y código de barras, coordinación con operaciones sin interrumpir flujos, y procedimientos de emergencia en almacenes (incendios, derrames químicos).'
  },
  {
    question: '¿Ofrecen servicio 24/7 para centros de distribución?',
    answer: 'Sí, ofrecemos cobertura completa 24/7/365 con guardias en turnos rotativos. Para operaciones con peaks de actividad, podemos reforzar personal en horarios críticos (ej: turnos noche para despachos o recepción de mercancía). Adaptamos dotación a sus necesidades operacionales.'
  },
  {
    question: '¿Cuánto tiempo toma implementar el servicio en mi bodega?',
    answer: 'Podemos iniciar operaciones en 3-5 días hábiles. El proceso incluye: visita técnica a terreno, evaluación de riesgos, selección de personal capacitado, inducción en protocolos específicos de su bodega, y despliegue. Para casos urgentes, tenemos capacidad de respuesta express en 24-48 horas.'
  }
];

const breadcrumbs = [
  { name: 'Inicio', url: 'https://www.gard.cl' },
  { name: 'Seguridad Bodegas Logística Chile', url: 'https://www.gard.cl/seguridad-bodegas-logistica-chile' }
];

export default function SeguridadBodegasPage() {
  return (
    <>
      {/* SEO Schemas */}
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema
        name="Seguridad para Bodegas y Centros de Distribución en Chile"
        description="Servicio especializado de seguridad para bodegas logísticas. Reducción de mermas, control de acceso y vigilancia 24/7."
        url="https://www.gard.cl/seguridad-bodegas-logistica-chile"
        areaServed="Chile"
        aggregateRating={{
          ratingValue: 4.9,
          reviewCount: 127
        }}
        offers={{
          priceRange: "$$"
        }}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Hero */}
      <section className="gard-hero min-h-[70vh] flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0">
          <CloudflareImage
            imageId="683f9081-3573-4e90-e733-5c1507350900"
            alt="Seguridad para bodegas logísticas Chile"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="gard-hero-content text-center relative z-10 px-4 py-20 max-w-5xl">
          <div className="inline-flex items-center rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-white mb-6 border border-primary/30">
            <TrendingDown className="h-4 w-4 mr-2" />
            <span>Reducimos Mermas hasta 85% en 6 Meses</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Seguridad para Bodegas Logísticas en Chile
          </h1>
          
          <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto mb-8 leading-relaxed">
            Protección integral de inventario y mercancía. <strong>Control de acceso biométrico</strong>, 
            guardias especializados y CCTV inteligente. Cobertura 24/7.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a 
              href="#cotizar" 
              className="gard-btn gard-btn-primary gard-btn-lg inline-flex items-center"
            >
              Cotizar Mi Bodega Ahora <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a 
              href="tel:+56229872380"
              className="gard-btn gard-btn-secondary gard-btn-lg inline-flex items-center"
            >
              <Phone className="mr-2 h-5 w-5" /> +56 2 2987 2380
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12 text-left">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
              <Package className="h-9 w-9 text-primary mb-2" />
              <h3 className="text-white font-semibold text-lg mb-1">-85% Mermas</h3>
              <p className="text-white/80 text-sm">Reducción comprobada en pérdidas de inventario</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
              <Lock className="h-9 w-9 text-primary mb-2" />
              <h3 className="text-white font-semibold text-lg mb-1">Control Biométrico</h3>
              <p className="text-white/80 text-sm">Acceso restringido con huella digital</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
              <Eye className="h-9 w-9 text-primary mb-2" />
              <h3 className="text-white font-semibold text-lg mb-1">CCTV + IA</h3>
              <p className="text-white/80 text-sm">Análisis inteligente de video en tiempo real</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
              <Clock className="h-9 w-9 text-primary mb-2" />
              <h3 className="text-white font-semibold text-lg mb-1">Cobertura 24/7</h3>
              <p className="text-white/80 text-sm">Guardias especializados en logística</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problema + Solución */}
      <section className="gard-section py-16 md:py-24">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-heading-2 mb-6">¿Por Qué las Bodegas Pierden Inventario?</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex gap-3 p-4 bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 rounded-r-lg">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <h4 className="font-semibold mb-1">Hurtos Internos</h4>
                    <p className="text-sm text-muted-foreground">60% de las mermas provienen de personal interno o transportistas sin control adecuado</p>
                  </div>
                </div>
                
                <div className="flex gap-3 p-4 bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 rounded-r-lg">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <h4 className="font-semibold mb-1">Accesos No Controlados</h4>
                    <p className="text-sm text-muted-foreground">Falta de registro digital de ingresos/egresos permite movimientos no autorizados</p>
                  </div>
                </div>
                
                <div className="flex gap-3 p-4 bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 rounded-r-lg">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <h4 className="font-semibold mb-1">Visibilidad Limitada</h4>
                    <p className="text-sm text-muted-foreground">Zonas ciegas sin CCTV o con guardias insuficientes facilitan sustracciones</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-heading-2 mb-6 text-primary">Nuestra Solución Integral</h2>
              
              <div className="space-y-4">
                {[
                  {
                    icon: <Lock className="h-6 w-6" />,
                    title: 'Control de Acceso Multicapa',
                    desc: 'Biométrico + tarjetas RFID + registro fotográfico de cada ingreso'
                  },
                  {
                    icon: <Eye className="h-6 w-6" />,
                    title: 'Vigilancia Inteligente',
                    desc: 'CCTV con analítica IA que detecta comportamientos sospechosos automáticamente'
                  },
                  {
                    icon: <ShieldCheck className="h-6 w-6" />,
                    title: 'Guardias Especializados',
                    desc: 'Personal capacitado en WMS, control de transportistas y protocolos logísticos'
                  },
                  {
                    icon: <Package className="h-6 w-6" />,
                    title: 'Rondas con Checkpoints',
                    desc: 'Sistema RFID que garantiza recorrido completo de zonas críticas cada 2 horas'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500 rounded-r-lg">
                    <div className="flex-shrink-0 text-green-600 dark:text-green-400">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Casos de éxito */}
      <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-2 mb-4">Resultados Reales en Bodegas Logísticas</h2>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Casos de éxito con clientes del sector logístico en Chile
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border">
              <div className="text-4xl font-bold text-primary mb-2">-82%</div>
              <h4 className="font-semibold mb-2">Centro de Distribución 8,000 m²</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Reducción de mermas en primeros 6 meses tras implementar control biométrico + CCTV + guardias especializados.
              </p>
              <p className="text-xs text-muted-foreground italic">Cliente sector retail, Santiago</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border">
              <div className="text-4xl font-bold text-primary mb-2">-75%</div>
              <h4 className="font-semibold mb-2">Bodega Farmacéutica 3,500 m²</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Eliminación casi total de hurtos internos mediante sistema de doble verificación y rondas con checkpoints RFID.
              </p>
              <p className="text-xs text-muted-foreground italic">Cliente sector farmacéutico, Quilicura</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border">
              <div className="text-4xl font-bold text-primary mb-2">-90%</div>
              <h4 className="font-semibold mb-2">Terminal Logístico 15,000 m²</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Control total de transportistas externos con registro digital, inspección de vehículos y escolta durante carga/descarga.
              </p>
              <p className="text-xs text-muted-foreground italic">Cliente logística, Pudahuel</p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios incluidos */}
      <section className="gard-section py-16 md:py-24">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-2 mb-4">¿Qué Incluye Nuestro Servicio?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Control de Acceso',
                items: ['Biométrico + RFID', 'Registro fotográfico digital', 'Validación de credenciales', 'Control de vehículos']
              },
              {
                title: 'Guardias Especializados',
                items: ['Capacitados en WMS', 'Protocolos anti-hurto', 'Coordinación con operaciones', 'Respuesta a incidentes']
              },
              {
                title: 'Vigilancia CCTV',
                items: ['Cámaras HD en zonas críticas', 'Analítica con IA', 'Grabación 30 días', 'Monitoreo remoto 24/7']
              },
              {
                title: 'Control de Transportistas',
                items: ['Pre-registro de camiones', 'Inspección de vehículos', 'Acompañamiento carga/descarga', 'Verificación de documentos']
              },
              {
                title: 'Rondas Programadas',
                items: ['Checkpoints RFID', 'Verificación de stock visual', 'Registro fotográfico', 'Rondas cada 2 horas']
              },
              {
                title: 'Reportería Digital',
                items: ['Bitácora electrónica', 'Alertas en tiempo real', 'Reportes de incidentes', 'Estadísticas mensuales']
              }
            ].map((servicio, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  {servicio.title}
                </h3>
                <ul className="space-y-2">
                  {servicio.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQSection
        title="Preguntas Frecuentes sobre Seguridad para Bodegas"
        description="Resolvemos las dudas más comunes sobre seguridad logística y protección de inventario"
        faqs={faqs}
      />

      {/* CTA Final */}
      <section id="cotizar" className="gard-section py-16 md:py-24 bg-[#0A0C12] text-white">
        <div className="gard-container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-heading-2 mb-4">Proteja su Inventario Hoy Mismo</h2>
          <p className="text-body-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Complete el formulario y un ejecutivo especializado en logística lo contactará en menos de 2 horas con una propuesta personalizada.
          </p>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Nombre completo *" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400" required />
                <input type="email" placeholder="Email corporativo *" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400" required />
                <input type="tel" placeholder="Teléfono *" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400" required />
                <input type="text" placeholder="Empresa *" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400" required />
                <input type="text" placeholder="Ubicación de bodega" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400" />
                <select className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white">
                  <option value="">Tamaño de bodega (m²)</option>
                  <option value="500-1000">500-1,000 m²</option>
                  <option value="1000-3000">1,000-3,000 m²</option>
                  <option value="3000-10000">3,000-10,000 m²</option>
                  <option value="10000+">Más de 10,000 m²</option>
                </select>
              </div>
              <textarea placeholder="Tipo de mercancía almacenada y necesidades específicas..." className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 h-32"></textarea>
              <button type="submit" className="gard-btn gard-btn-primary gard-btn-lg w-full sm:w-auto">
                Solicitar Cotización Ahora <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>

          <p className="text-sm text-gray-400 mt-6">
            * Al enviar acepta nuestros <Link href="/terminos" className="text-primary hover:underline">términos</Link> y <Link href="/privacidad" className="text-primary hover:underline">política de privacidad</Link>.
          </p>
        </div>
      </section>
    </>
  );
}

