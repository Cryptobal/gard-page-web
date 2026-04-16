import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Scale } from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { FAQSection } from '@/components/seo/FAQSchema';

const BASE_URL = 'https://www.gard.cl';
const PAGE_URL = `${BASE_URL}/vs/prosegur-alternativa`;

export const metadata: Metadata = {
  title: 'Alternativas a Prosegur en Chile | Gard Security',
  description:
    '¿Buscas una alternativa a Prosegur para tu empresa en Chile? Gard Security ofrece guardias OS10, monitoreo 24/7 y flexibilidad operativa con foco exclusivo B2B. Comparativa factual.',
  alternates: {
    canonical: PAGE_URL,
    languages: { 'es-CL': PAGE_URL, 'x-default': PAGE_URL },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Alternativas a Prosegur en Chile | Gard Security',
    description:
      'Evalúa Gard Security como alternativa B2B frente a Prosegur: foco exclusivo empresas, flexibilidad y tecnología propia.',
    url: PAGE_URL,
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website',
  },
};

const faqItems = [
  {
    question: '¿Por qué buscar una alternativa a Prosegur en Chile?',
    answer:
      'Las razones más comunes que escuchamos de empresas evaluando alternativas incluyen: necesidad de mayor flexibilidad contractual que la estructura corporativa de multinacionales, respuesta ejecutiva directa sin múltiples capas de aprobación, foco exclusivo B2B (sin mezcla con servicios residenciales o de eventos), tecnología propia de reportería en tiempo real, y precios más competitivos para contratos de 12-36 meses con los mismos estándares OS10.',
  },
  {
    question: '¿Qué ventajas tiene Gard Security frente a una multinacional como Prosegur?',
    answer:
      'Gard Security es una empresa mediana chilena especializada exclusivamente en B2B. Ventajas operativas: (1) respuesta ejecutiva directa del equipo decisor sin escalamientos, (2) menor rotación de supervisores asignados a cada cliente, (3) adaptación rápida de protocolos por industria, (4) sistema propio OPAI de gestión digital con IA para reportería en tiempo real, (5) foco 100% en empresas B2B — sin dividir atención con servicios residenciales.',
  },
  {
    question: '¿Cómo se comparan los precios de Gard Security y Prosegur?',
    answer:
      'Los precios en seguridad B2B dependen del dimensionamiento (guardias, turnos, ciudad, industria). Multinacionales suelen tener estructuras de costos más rígidas por overhead corporativo internacional. Gard Security puede ofrecer pricing más competitivo para contratos de mediano plazo manteniendo 100% de certificación OS10, supervisión 24/7 y cobertura nacional. Para cotización comparativa sin compromiso, consulta nuestra página /cotizar.',
  },
  {
    question: '¿Cuál es la cobertura geográfica de Gard Security comparada con Prosegur?',
    answer:
      'Gard Security opera con presencia directa en 10 ciudades de Chile: Santiago, Antofagasta, Valparaíso, Concepción, Iquique, Puerto Montt, Rancagua, Chillán, Temuco y Viña del Mar. Para operaciones en otras ciudades, evaluamos caso a caso con pool extendido. Prosegur tiene presencia global amplia; Gard Security está enfocada específicamente en el mercado chileno B2B, lo que se traduce en especialización local y respuesta más ágil.',
  },
  {
    question: '¿Es complicado migrar el servicio de Prosegur a Gard Security?',
    answer:
      'No. El proceso de transición se diseña con período de overlap para asegurar continuidad operacional sin ventanas de riesgo. Nuestro equipo de onboarding realiza: (1) auditoría del servicio actual, (2) propuesta de plan de migración en 30-60 días, (3) capacitación de guardias asignados al sitio, (4) testing paralelo con supervisión reforzada, (5) cutover supervisado por dirección. En la mayoría de casos no hay interrupción del servicio durante la migración.',
  },
];

export default function VsProsegurPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Inicio', url: BASE_URL },
          { name: 'Comparativas', url: `${BASE_URL}/vs` },
          { name: 'Alternativa a Prosegur', url: PAGE_URL },
        ]}
      />

      <section className="gard-section bg-white dark:bg-gray-900 py-16 md:py-24">
        <div className="gard-container max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 text-sm text-primary bg-primary/10 px-3 py-1.5 rounded-full mb-6">
            <Scale className="w-4 h-4" aria-hidden="true" />
            <span>Comparativa B2B factual</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 font-title">
            ¿Buscas una alternativa a Prosegur en Chile?
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            Gard Security es una empresa de seguridad privada B2B chilena enfocada exclusivamente
            en empresas. 200+ guardias certificados OS10, cobertura en 10 ciudades, y tecnología
            propia OPAI para supervisión digital en tiempo real. Evalúanos en paralelo a tu
            servicio actual.
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
            ¿Por qué empresas evalúan alternativas a multinacionales?
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Prosegur es una multinacional con presencia global y amplia capacidad operativa. Es
              una opción sólida para muchas empresas, especialmente aquellas con operaciones en
              múltiples países. Sin embargo, en las conversaciones que tenemos con gerentes de
              seguridad y operaciones de empresas chilenas, aparecen escenarios específicos donde
              una alternativa local especializada en B2B puede ser un mejor fit:
            </p>
            <ul>
              <li>
                <strong>Flexibilidad contractual:</strong> estructuras corporativas multinacionales
                suelen requerir aprobaciones multinivel para ajustes. Una empresa mediana responde
                más rápido a cambios operacionales.
              </li>
              <li>
                <strong>Acceso directo al equipo decisor:</strong> en Gard Security el cliente
                interactúa directamente con dirección, sin capas intermedias.
              </li>
              <li>
                <strong>Foco 100% B2B:</strong> no dividimos atención con servicios residenciales o
                eventos; cada recurso está dedicado a empresas.
              </li>
              <li>
                <strong>Tecnología diseñada para Chile:</strong> nuestro sistema OPAI fue
                desarrollado específicamente para las necesidades de reportería y auditabilidad del
                mercado B2B chileno.
              </li>
              <li>
                <strong>Pricing competitivo:</strong> al no cargar con overhead corporativo
                internacional, ofrecemos mejor precio manteniendo los mismos estándares (100% OS10,
                supervisión 24/7).
              </li>
            </ul>
            <p>
              Esto no significa que Prosegur sea mala opción. Significa que el mejor fit depende de
              las necesidades específicas de cada empresa. Para empresas B2B chilenas con
              operaciones en minería, logística, retail, corporativo o industrial que valoran
              flexibilidad + tecnología + foco exclusivo, Gard Security es una alternativa concreta
              a evaluar en proceso de cotización paralelo.
            </p>
          </div>
        </div>
      </section>

      <FAQSection
        title="Preguntas frecuentes sobre alternativas a Prosegur"
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
