import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Scale } from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { FAQSection } from '@/components/seo/FAQSchema';

const BASE_URL = 'https://www.gard.cl';
const PAGE_URL = `${BASE_URL}/vs/g4s-alternativa`;

export const metadata: Metadata = {
  title: 'Alternativas a G4S en Chile | Gard Security',
  description:
    '¿Buscas una alternativa a G4S para tu empresa en Chile? Gard Security ofrece especialización B2B local, guardias OS10, tecnología propia OPAI y pricing competitivo. Comparativa factual.',
  alternates: {
    canonical: PAGE_URL,
    languages: { 'es-CL': PAGE_URL, 'x-default': PAGE_URL },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Alternativas a G4S en Chile | Gard Security',
    description:
      'Evalúa Gard Security como alternativa B2B local a G4S: foco exclusivo Chile, cobertura en 10 ciudades y tiempos de respuesta más ágiles.',
    url: PAGE_URL,
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website',
  },
};

const faqItems = [
  {
    question: '¿Por qué buscar una alternativa a G4S en Chile?',
    answer:
      'G4S (ahora parte de Allied Universal) es una de las mayores operadoras globales de seguridad, con gran escala en servicios técnicos integrados como cash-in-transit y vigilancia tecnológica pesada. Las empresas que evalúan alternativas suelen buscar mayor flexibilidad operativa, equipos dedicados a Chile (no gestionados desde la casa matriz), respuesta ejecutiva directa, y pricing competitivo para contratos de vigilancia B2B tradicional sin el overhead de infraestructura global.',
  },
  {
    question: '¿Qué ventajas tiene Gard Security frente a una multinacional como G4S?',
    answer:
      'Gard Security es 100% chilena y 100% B2B. Ventajas operativas concretas: (1) foco exclusivo en el mercado chileno — conocimiento profundo de industrias locales (minería, logística, retail, corporativo), (2) equipo directivo accesible para decisiones rápidas, (3) tecnología propia OPAI con IA para reportería digital en tiempo real, (4) pricing más competitivo en contratos 12-36 meses manteniendo 100% OS10, (5) menor rotación de supervisores asignados a cada cliente.',
  },
  {
    question: '¿Cómo se comparan los precios de Gard Security y G4S?',
    answer:
      'Los precios en seguridad B2B dependen del dimensionamiento (guardias, turnos, ciudad, industria). Multinacionales como G4S suelen tener estructura de costos reflejo de operaciones globales. Gard Security ofrece pricing competitivo al operar exclusivamente en Chile, manteniendo los mismos estándares (100% OS10, supervisión 24/7, cobertura nacional). Para cotización comparativa sin compromiso, consulta /cotizar.',
  },
  {
    question: '¿Cuál es la cobertura geográfica de Gard Security comparada con G4S?',
    answer:
      'Gard Security opera con presencia directa en 10 ciudades de Chile: Santiago, Antofagasta, Valparaíso, Concepción, Iquique, Puerto Montt, Rancagua, Chillán, Temuco y Viña del Mar. G4S tiene presencia global en más de 80 países, pero esa escala no siempre se traduce en mejor cobertura específica para el cliente chileno. Gard Security responde con supervisión local y respuesta más ágil en el territorio.',
  },
  {
    question: '¿Es complicado migrar el servicio de G4S a Gard Security?',
    answer:
      'No. Diseñamos la transición con período de overlap para asegurar continuidad operacional sin ventanas de riesgo. Proceso estándar: (1) auditoría del servicio actual, (2) plan de migración en 30-60 días, (3) capacitación de guardias asignados al sitio, (4) testing paralelo con supervisión reforzada, (5) cutover supervisado por dirección. En la mayoría de casos no hay interrupción del servicio durante la migración.',
  },
];

export default function VsG4SPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Inicio', url: BASE_URL },
          { name: 'Comparativas', url: `${BASE_URL}/vs` },
          { name: 'Alternativa a G4S', url: PAGE_URL },
        ]}
      />

      <section className="gard-section bg-white dark:bg-gray-900 py-16 md:py-24">
        <div className="gard-container max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 text-sm text-primary bg-primary/10 px-3 py-1.5 rounded-full mb-6">
            <Scale className="w-4 h-4" aria-hidden="true" />
            <span>Comparativa B2B factual</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 font-title">
            ¿Buscas una alternativa a G4S en Chile?
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
            ¿Por qué empresas evalúan alternativas a G4S?
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              G4S es una de las mayores empresas globales de seguridad, con operaciones en más de
              80 países y fuerte presencia en servicios técnicos integrados como cash-in-transit,
              seguridad tecnológica pesada e infraestructura crítica. Es una opción sólida en
              escenarios que requieren escala global o servicios técnicos de alta complejidad. Sin
              embargo, para muchas empresas chilenas B2B que necesitan vigilancia física + supervisión
              digital sin los costos de una estructura global, una alternativa local especializada
              puede ser mejor fit:
            </p>
            <ul>
              <li>
                <strong>Especialización local:</strong> Gard Security conoce a fondo las industrias
                chilenas (minería en el norte, logística portuaria, retail en Santiago, corporativo).
              </li>
              <li>
                <strong>Decisiones rápidas:</strong> el cliente interactúa directamente con
                dirección, sin escalamientos a casa matriz internacional.
              </li>
              <li>
                <strong>Foco 100% B2B:</strong> cada recurso está dedicado a empresas — no hay
                división con servicios de otros segmentos.
              </li>
              <li>
                <strong>Tecnología OPAI:</strong> sistema propio con IA para supervisión digital en
                tiempo real, diseñado para el mercado chileno.
              </li>
              <li>
                <strong>Pricing competitivo:</strong> sin overhead corporativo global, ofrecemos
                mejor precio manteniendo los mismos estándares (100% OS10, supervisión 24/7).
              </li>
            </ul>
            <p>
              G4S no es mala opción — tiene fortalezas claras en escala global y servicios técnicos.
              Pero para empresas chilenas B2B que valoran flexibilidad + tecnología + foco exclusivo
              en Chile, Gard Security es una alternativa concreta a evaluar en cotización paralela.
            </p>
          </div>
        </div>
      </section>

      <FAQSection
        title="Preguntas frecuentes sobre alternativas a G4S"
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
