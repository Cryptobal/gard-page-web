import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calculator, Wallet, CheckCircle, Info, BarChart3 } from 'lucide-react';
import BreadcrumbSchema, { Breadcrumbs } from '@/components/seo/BreadcrumbSchema';
import OfferSchema from '@/components/seo/OfferSchema';
import { FAQSection } from '@/components/seo/FAQSchema';
import FormularioCotizacionSeccion from '@/app/components/FormularioCotizacionSeccion';

export const metadata: Metadata = {
  title: 'Guardias de seguridad en Chile | Cotización rápida sin publicar precios',
  description:
    'Solicita una cotización cerrada en 24h para guardias OS10 en Chile. Sin precios genéricos: entregamos valor según turnos, puestos y riesgo, con supervisión 24/7 incluida.',
  keywords: [
    'guardias de seguridad chile',
    'guardias os10',
    'seguridad privada empresas',
    'guardias para empresas',
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.gard.cl/cuanto-cuesta-guardia-seguridad-chile' },
  openGraph: {
    title: 'Guardias de seguridad en Chile | Gard Security',
    description:
      'Cotización rápida sin publicar precios genéricos. Guardias OS10, supervisión 24/7 y cobertura nacional.',
    url: 'https://www.gard.cl/cuanto-cuesta-guardia-seguridad-chile',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'article',
  },
};

const breadcrumbs = [
  { name: 'Inicio', url: 'https://www.gard.cl' },
  { name: 'Costo guardias de seguridad', url: 'https://www.gard.cl/cuanto-cuesta-guardia-seguridad-chile' },
];

const faqs = [
  {
    question: '¿Cuál es el precio de un guardia de seguridad en Santiago?',
    answer: 'No publicamos precios genéricos. Cotizamos en 24h con valor cerrado según puestos, turnos y riesgo, incluyendo OS10 y supervisión.',
  },
  {
    question: '¿Por qué varía el costo entre industrias o ubicaciones?',
    answer:
      'Influyen turnos, cantidad de puestos, riesgo, ubicación (urbano vs remoto) y tecnología requerida (CCTV/analítica, control de accesos).',
  },
  {
    question: '¿Qué factores influyen en el costo?',
    answer:
      'Turnos (12h/24h), número de puestos, nivel de riesgo, ubicación y tecnología. Cotizamos caso a caso sin publicar montos.',
  },
  {
    question: '¿La propuesta incluye supervisión?',
    answer: 'Sí. Supervisión 24/7, rondas, check-in digital y reportes mensuales con KPIs.',
  },
  {
    question: '¿Hay costos ocultos?',
    answer: 'No. Las propuestas incluyen EPP, uniformes, supervisión y reemplazos. Cargos adicionales solo si el cliente requiere equipamiento especial.',
  },
  {
    question: '¿Puedo cotizar rápidamente?',
    answer: 'Sí. Complete el formulario y en menos de 24h enviamos una propuesta con precio cerrado y SLA claros.',
  },
];

export default function CuantoCuestaGuardiaPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <OfferSchema
        serviceName="Guardias de Seguridad OS10 en Chile"
        serviceDescription="Guardias de seguridad certificados OS10 con cobertura nacional y supervisión 24/7."
        url="https://www.gard.cl/cuanto-cuesta-guardia-seguridad-chile"
        prices={[
          {
            name: 'Guardia OS10 Santiago',
            description: 'Turno 12h en edificios corporativos y oficinas en Santiago.',
            price: 1150000,
            priceCurrency: 'CLP',
            unitText: 'MONTH',
            category: 'Corporativo',
          },
          {
            name: 'Logística 24/7 (4 puestos)',
            description: 'Operación 24/7 en centros de distribución con control de accesos.',
            price: 5200000,
            priceCurrency: 'CLP',
            unitText: 'MONTH',
            category: 'Logística',
          },
          {
            name: 'Minería 7x7 (4 puestos)',
            description: 'Guardias OS10 en faenas remotas con logística completa.',
            price: 15000000,
            priceCurrency: 'CLP',
            unitText: 'MONTH',
            category: 'Minería',
          },
        ]}
      />
      <Breadcrumbs items={breadcrumbs} />

      <section className="gard-section py-16 md:py-24">
        <div className="gard-container max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
            <Calculator className="h-4 w-4 mr-2" />
            <span>Guardias OS10 · Cotización rápida</span>
          </div>
          <h1 className="text-heading-1 mb-6">Guardias de seguridad en Chile</h1>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            No publicamos precios genéricos: cotizamos en 24h según puestos, turnos y riesgo, con supervisión 24/7 incluida.
          </p>
          <div className="flex justify-center">
            <a href="#cotizar" className="gard-btn gard-btn-primary gard-btn-lg inline-flex items-center">
              Cotizar ahora <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="gard-container max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-heading-2 mb-4">Cómo calculamos tu propuesta</h2>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Evaluamos turnos, número de puestos, nivel de riesgo, ubicación y tecnología requerida. Entregamos un valor cerrado sin sorpresas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <h3 className="text-xl font-semibold mb-2">1. Puestos y turnos</h3>
              <p className="text-muted-foreground text-sm">Cantidad de puestos, esquema 12h/24h y cobertura requerida.</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <h3 className="text-xl font-semibold mb-2">2. Riesgo y ubicación</h3>
              <p className="text-muted-foreground text-sm">Nivel de riesgo, urbano vs remoto y requerimientos operativos.</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <h3 className="text-xl font-semibold mb-2">3. Tecnología y SLA</h3>
              <p className="text-muted-foreground text-sm">CCTV/analítica, control de accesos y tiempos de respuesta comprometidos.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="gard-section py-16 md:py-24">
        <div className="gard-container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <Wallet className="h-10 w-10 text-primary mb-3" />
              <h3 className="text-xl font-semibold mb-2">Precio cerrado</h3>
              <p className="text-muted-foreground text-sm">Cotización en 24h con SLA y costos transparentes (sin cargos ocultos).</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <CheckCircle className="h-10 w-10 text-primary mb-3" />
              <h3 className="text-xl font-semibold mb-2">100% OS10 incluido</h3>
              <p className="text-muted-foreground text-sm">Guardias con certificación vigente y supervisión continua.</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <Info className="h-10 w-10 text-primary mb-3" />
              <h3 className="text-xl font-semibold mb-2">Factores de costo</h3>
              <p className="text-muted-foreground text-sm">Ubicación, turnos, riesgo, puestos, tecnología (CCTV) y tiempos de respuesta.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="gard-container max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-heading-2 mb-4">Transparencia sin publicar precios genéricos</h2>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Cotizamos cada operación con SLA y supervisión incluidos. Sin montos de referencia que no apliquen a tu realidad.
            </p>
          </div>
        </div>
      </section>

      <FAQSection
        title="Preguntas frecuentes sobre el costo de guardias"
        description="Respuestas directas y rangos de referencia para estimar presupuesto."
        faqs={faqs}
      />

      <FormularioCotizacionSeccion id="cotizar" prefillServicio="Guardias de Seguridad" prefillIndustria="Empresarial" />
    </>
  );
}
