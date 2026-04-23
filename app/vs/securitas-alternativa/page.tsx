import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Scale } from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { FAQSection } from '@/components/seo/FAQSchema';
import { companyStats } from '@/lib/data/company-stats';

const BASE_URL = 'https://www.gard.cl';
const PAGE_URL = `${BASE_URL}/vs/securitas-alternativa`;

export const metadata: Metadata = {
  title: 'Alternativas a Securitas en Chile | Gard Security',
  description:
    '¿Buscas una alternativa a Securitas para tu empresa en Chile? Gard Security ofrece tecnología OPAI con IA, agilidad operativa, contratos flexibles y foco exclusivo B2B. Comparativa factual.',
  alternates: {
    canonical: PAGE_URL,
    languages: { 'es-CL': PAGE_URL, 'x-default': PAGE_URL },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Alternativas a Securitas en Chile | Gard Security',
    description:
      'Evalúa Gard Security como alternativa ágil a Securitas: tecnología propia OPAI, contratos flexibles y foco 100% B2B en el mercado chileno.',
    url: PAGE_URL,
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website',
  },
};

const faqItems = [
  {
    question: '¿Por qué buscar una alternativa a Securitas en Chile?',
    answer:
      'Securitas es una empresa tradicional fuerte en Chile, con amplia base de clientes históricos. Las empresas que evalúan alternativas suelen buscar tecnología más moderna de supervisión digital (reportería con IA en tiempo real), contratos más flexibles sin estructuras legacy, foco 100% B2B sin mezcla con otros segmentos, y un equipo comercial con capacidad de respuesta ejecutiva directa. Evaluar alternativas no implica que Securitas sea mala opción — implica buscar el mejor fit para las necesidades específicas.',
  },
  {
    question: '¿Qué ventajas tiene Gard Security frente a Securitas?',
    answer:
      'Gard Security combina los estándares tradicionales del sector con tecnología moderna. Ventajas concretas: (1) sistema propio OPAI con IA para supervisión digital en tiempo real — reportería auditable 24/7, (2) contratos diseñados con flexibilidad operativa (ajustes rápidos en dimensionamiento, ciudades, horarios), (3) foco 100% B2B sin legacy de otros segmentos, (4) equipo directivo accesible para decisiones rápidas, (5) pricing competitivo en contratos de mediano plazo con 100% OS10.',
  },
  {
    question: '¿Cómo se compara la tecnología de Gard Security con Securitas?',
    answer:
      'Gard Security desarrolló OPAI, un sistema propio de gestión y supervisión con IA diseñado para las necesidades de reportería B2B del mercado chileno. Permite: reportería digital en tiempo real, trazabilidad auditable de rondas y incidentes, dashboards accesibles al cliente 24/7, y alertas automatizadas. Securitas tiene sus propias herramientas corporativas globales; Gard Security apuesta por una solución diseñada específicamente para Chile, con iteración rápida y adaptación a necesidades del cliente.',
  },
  {
    question: '¿Cuál es la cobertura geográfica de Gard Security comparada con Securitas?',
    answer: `Gard Security opera con presencia directa en ${companyStats.citiesCovered} ciudades de Chile: Santiago, Antofagasta, Valparaíso, Concepción, Iquique, Puerto Montt, Rancagua, Chillán, Temuco y Viña del Mar. Securitas tiene cobertura amplia en el territorio chileno, con una base de clientes históricos considerable. Para empresas que requieren cobertura en ciudades principales con supervisión digital moderna, Gard Security es una alternativa ágil y especializada.`,
  },
  {
    question: '¿Es complicado migrar el servicio de Securitas a Gard Security?',
    answer:
      'No. Diseñamos la transición con período de overlap para asegurar continuidad operacional sin ventanas de riesgo. Proceso estándar: (1) auditoría del servicio actual, (2) plan de migración en 30-60 días, (3) capacitación de guardias asignados al sitio, (4) testing paralelo con supervisión reforzada, (5) cutover supervisado por dirección. En la mayoría de casos no hay interrupción del servicio durante la migración.',
  },
];

export default function VsSecuritasPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Inicio', url: BASE_URL },
          { name: 'Comparativas', url: `${BASE_URL}/vs` },
          { name: 'Alternativa a Securitas', url: PAGE_URL },
        ]}
      />

      <section className="gard-section bg-white dark:bg-gray-900 py-16 md:py-24">
        <div className="gard-container max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 text-sm text-primary bg-primary/10 px-3 py-1.5 rounded-full mb-6">
            <Scale className="w-4 h-4" aria-hidden="true" />
            <span>Comparativa B2B factual</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 font-title">
            ¿Buscas una alternativa a Securitas en Chile?
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            Gard Security combina los estándares tradicionales del sector con tecnología moderna:
            {' '}{companyStats.activeGuards} guardias certificados OS10, cobertura en {companyStats.citiesCovered} ciudades, y sistema propio OPAI con
            IA para supervisión digital en tiempo real. Evalúanos en paralelo a tu servicio actual.
          </p>
          <Link
            href="/cotizar"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
          >
            Solicitar cotización comparativa
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="gard-section bg-gray-50 dark:bg-gray-950 py-16">
        <div className="gard-container max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 font-title">
            ¿Por qué empresas evalúan alternativas a proveedores tradicionales?
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Securitas tiene presencia tradicional fuerte en Chile y una amplia base de clientes
              históricos. Es una opción consolidada en el mercado. Las conversaciones que tenemos
              con gerentes de seguridad y operaciones de empresas chilenas revelan escenarios
              específicos donde una alternativa moderna, ágil y local puede ser mejor fit:
            </p>
            <ul>
              <li>
                <strong>Tecnología moderna de supervisión:</strong> OPAI de Gard Security entrega
                reportería digital en tiempo real con IA — trazabilidad auditable, dashboards 24/7
                y alertas automatizadas.
              </li>
              <li>
                <strong>Contratos flexibles sin legacy:</strong> diseñados para ajustes rápidos
                de dimensionamiento, ciudades, horarios y protocolos.
              </li>
              <li>
                <strong>Equipo decisor accesible:</strong> el cliente interactúa directamente con
                dirección — decisiones en horas, no semanas.
              </li>
              <li>
                <strong>Foco 100% B2B:</strong> no compartimos recursos con otros segmentos
                (residencial, eventos) — cada recurso está dedicado a empresas.
              </li>
              <li>
                <strong>Pricing competitivo:</strong> estructura ágil permite precios mejores en
                contratos de mediano plazo manteniendo 100% OS10 y supervisión 24/7.
              </li>
            </ul>
            <p>
              Securitas no es mala opción — tiene experiencia probada en el mercado chileno. Pero
              para empresas B2B que valoran tecnología moderna + agilidad + foco exclusivo, Gard
              Security es una alternativa concreta a evaluar en cotización paralela.
            </p>
          </div>
        </div>
      </section>

      <FAQSection
        title="Preguntas frecuentes sobre alternativas a Securitas"
        faqs={faqItems}
      />

      <section className="gard-section bg-primary text-white py-16">
        <div className="gard-container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 font-title">
            Evalúa Gard Security en cotización paralela
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Sin compromiso. Comparamos punto a punto contra tu servicio actual para que decidas
            con información real verificable.
          </p>
          <Link
            href="/cotizar"
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
          >
            Solicitar cotización comparativa
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
