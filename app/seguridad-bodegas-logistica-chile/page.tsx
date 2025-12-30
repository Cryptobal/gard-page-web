import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, TrendingDown, Package, Lock, Eye, Clock } from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import BreadcrumbSchema, { Breadcrumbs } from '@/components/seo/BreadcrumbSchema';
import ServiceSchema from '@/components/seo/ServiceSchema';
import { FAQSection } from '@/components/seo/FAQSchema';
import FormularioCotizacionSeccion from '@/app/components/FormularioCotizacionSeccion';

export const metadata: Metadata = {
  title: 'Seguridad para Bodegas Logísticas Chile | Reducimos Mermas 85%',
  description: 'Protección integral de inventario y mercancía. Guardias especializados, control biométrico y CCTV inteligente. Reducción de mermas hasta 85% comprobado. Cotice en línea.',
  keywords: ['seguridad bodegas chile', 'guardias almacenes logística', 'protección inventario', 'vigilancia centros distribución'],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.gard.cl/seguridad-bodegas-logistica-chile' },
  openGraph: {
    title: 'Seguridad para Bodegas Logísticas Chile | Reducimos Mermas hasta 85%',
    description: 'Protección integral de inventario. Guardias especializados, control biométrico y CCTV con IA.',
    url: 'https://www.gard.cl/seguridad-bodegas-logistica-chile',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website',
    images: [{ url: 'https://imagedelivery.net/gGw8cfmEZedi85dYm6qcFw/683f9081-3573-4e90-e733-5c1507350900/public', width: 1200, height: 630, alt: 'Seguridad para bodegas logísticas Chile' }]
  }
};

const faqs = [
  { question: '¿Cuánto cuesta contratar guardias para una bodega logística en Chile?', answer: 'Depende de puestos, turnos, metraje y riesgo operativo. Entregamos cotización cerrada en 24h con supervisión y control de accesos, sin publicar montos genéricos.' },
  { question: '¿Cómo pueden reducir las mermas y pérdidas de inventario?', answer: 'Implementamos protocolo integral: control de acceso biométrico, rondas con checkpoints RFID, inspección aleatoria de vehículos, CCTV con analítica de video, y registro digital de todos los movimientos. Nuestros clientes reportan reducciones de mermas del 70-85% en los primeros 6 meses de servicio.' },
  { question: '¿Sus guardias tienen experiencia en operaciones logísticas?', answer: 'Sí, todos nuestros guardias para bodegas logísticas reciben capacitación especializada en: sistemas WMS, protocolos de control de transportistas, uso de RFID y código de barras, coordinación con operaciones sin interrumpir flujos, y procedimientos de emergencia en almacenes.' },
  { question: '¿Ofrecen servicio 24/7 para centros de distribución?', answer: 'Sí, ofrecemos cobertura completa 24/7/365 con guardias en turnos rotativos. Para operaciones con peaks de actividad, podemos reforzar personal en horarios críticos. Adaptamos dotación a sus necesidades operacionales.' },
  { question: '¿Cuánto tiempo toma implementar el servicio en mi bodega?', answer: 'Podemos iniciar operaciones en 3-5 días hábiles. El proceso incluye: visita técnica a terreno, evaluación de riesgos, selección de personal capacitado, inducción en protocolos específicos de su bodega, y despliegue. Para casos urgentes, tenemos capacidad de respuesta express en 24-48 horas.' }
];

const breadcrumbs = [
  { name: 'Inicio', url: 'https://www.gard.cl' },
  { name: 'Seguridad Bodegas Logística Chile', url: 'https://www.gard.cl/seguridad-bodegas-logistica-chile' }
];

export default function SeguridadBodegasPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema
        name="Seguridad para Bodegas y Centros de Distribución en Chile"
        description="Servicio especializado de seguridad para bodegas logísticas. Reducción de mermas, control de acceso y vigilancia 24/7."
        url="https://www.gard.cl/seguridad-bodegas-logistica-chile"
        areaServed="Chile"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 127 }}
        offers={{ priceRange: "$$" }}
      />
      <Breadcrumbs items={breadcrumbs} />

      <section className="gard-hero min-h-[70vh] flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0">
          <CloudflareImage imageId="683f9081-3573-4e90-e733-5c1507350900" alt="Seguridad para bodegas logísticas Chile" fill className="object-cover" priority />
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
            Protección integral de inventario y mercancía. <strong>Control de acceso biométrico</strong>, guardias especializados y CCTV inteligente. Cobertura 24/7.
          </p>
          
          <div className="flex justify-center mb-8">
            <a href="#cotizar" className="gard-btn gard-btn-primary gard-btn-lg inline-flex items-center">
              Cotizar Ahora <ArrowRight className="ml-2 h-5 w-5" />
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

      <section className="gard-section py-16 md:py-24">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-2 mb-4">¿Por Qué Elegir a Gard para su Bodega?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <CheckCircle className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Reducción Comprobada de Mermas</h3>
                <p className="text-muted-foreground">Nuestros clientes logísticos reportan reducciones del 70-85% en pérdidas de inventario en los primeros 6 meses.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Guardias Especializados en Logística</h3>
                <p className="text-muted-foreground">Personal capacitado en sistemas WMS, control de transportistas y coordinación con operaciones.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Tecnología de Control Avanzada</h3>
                <p className="text-muted-foreground">Control biométrico, CCTV con IA, checkpoints RFID y sistema de registro digital completo.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Protocolos Anti-Hurto</h3>
                <p className="text-muted-foreground">Inspección aleatoria de vehículos, doble verificación y registro de todos los movimientos de mercancía.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection title="Preguntas Frecuentes sobre Seguridad para Bodegas" description="Resolvemos las dudas más comunes sobre seguridad logística y protección de inventario" faqs={faqs} />

      <FormularioCotizacionSeccion 
        id="cotizar"
        prefillServicio="Guardias de Seguridad"
        prefillIndustria="Transporte y Logística"
      />
    </>
  );
}
