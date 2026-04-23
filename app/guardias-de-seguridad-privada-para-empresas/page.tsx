import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Shield, Users, Clock, Award, Building2, Truck, Mountain, ShoppingCart, Hammer, HardHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import ServiceSchema from '@/components/seo/ServiceSchema';
import FormularioCotizacionSeccion from '@/app/components/FormularioCotizacionSeccion';
import { companyStats } from '@/lib/data/company-stats';

const BASE_URL = 'https://www.gard.cl';
const CANONICAL_URL = `${BASE_URL}/guardias-de-seguridad-privada-para-empresas`;

type FAQItem = {
  question: string;
  answerText: string;
  answerNode: React.ReactNode;
};

const faqItems: FAQItem[] = [
  {
    question: '¿Qué diferencia a un guardia de seguridad privada para empresas de un guardia tradicional?',
    answerText:
      'Los guardias de seguridad privada para empresas B2B están certificados bajo la normativa OS10 de Carabineros de Chile, reciben capacitación continua en protocolos específicos del sector (minería, logística, retail, corporativo), están respaldados por supervisión 24/7 y sistemas de control de rondas digitalizados. A diferencia de un guardia residencial, operan bajo contratos de servicio B2B con SLAs definidos, reportería mensual de incidentes y coordinación con central de monitoreo.',
    answerNode: (
      <p>
        Los guardias de seguridad privada para empresas B2B están certificados bajo la normativa OS10 de Carabineros de Chile, reciben capacitación continua en protocolos específicos del sector (minería, logística, retail, corporativo), están respaldados por supervisión 24/7 y sistemas de control de rondas digitalizados. A diferencia de un guardia residencial, operan bajo contratos de servicio B2B con SLAs definidos, reportería mensual de incidentes y coordinación con central de monitoreo.
      </p>
    ),
  },
  {
    question: '¿Cuántos guardias necesita mi empresa?',
    answerText:
      'Depende del tamaño de las instalaciones, puntos de acceso, valor de activos protegidos, horarios de operación y nivel de riesgo del sector. Para una planta industrial mediana con operación 24/7 se suelen requerir entre 4 y 8 guardias rotativos para cubrir turnos; para un edificio corporativo con portería diurna suelen bastar 2-3 guardias. En Gard Security realizamos una evaluación gratuita de riesgo y te proponemos el dimensionamiento óptimo.',
    answerNode: (
      <p>
        Depende del tamaño de las instalaciones, puntos de acceso, valor de activos protegidos, horarios de operación y nivel de riesgo del sector. Para una planta industrial mediana con operación 24/7 se suelen requerir entre 4 y 8 guardias rotativos para cubrir turnos; para un edificio corporativo con portería diurna suelen bastar 2-3 guardias. En Gard Security realizamos una evaluación gratuita de riesgo y te proponemos el dimensionamiento óptimo.
      </p>
    ),
  },
  {
    question: '¿Cuánto cuesta contratar guardias de seguridad privada para una empresa?',
    answerText:
      'El costo mensual depende de cantidad de guardias, turnos, ubicación geográfica y servicios complementarios (monitoreo, rondas motorizadas, canino). Un guardia certificado OS10 en turno de 8 horas, 5 días a la semana, tiene un costo de mercado en Chile entre $850.000 y $1.400.000 CLP mensuales, incluyendo supervisión, uniformes y reemplazos. Para cotización personalizada y transparente, consulta nuestra guía de costos o solicita propuesta sin compromiso.',
    answerNode: (
      <p>
        El costo mensual depende de cantidad de guardias, turnos, ubicación geográfica y servicios complementarios (monitoreo, rondas motorizadas, canino). Un guardia certificado OS10 en turno de 8 horas, 5 días a la semana, tiene un costo de mercado en Chile entre $850.000 y $1.400.000 CLP mensuales, incluyendo supervisión, uniformes y reemplazos. Para cotización personalizada y transparente, consulta nuestra{' '}
        <Link href="/cuanto-cuesta-guardia-seguridad-chile" className="text-primary underline">guía de costos</Link>{' '}
        o solicita propuesta sin compromiso.
      </p>
    ),
  },
  {
    question: '¿Los guardias de Gard Security están certificados OS10?',
    answerText:
      'Sí, el 100% de los guardias de Gard Security cuentan con certificación OS10 vigente, emitida por Carabineros de Chile (próximamente administrada por la Subsecretaría de Prevención del Delito bajo la Ley 21.659). La certificación OS10 es obligatoria por ley para ejercer funciones de guardia de seguridad privada en Chile. Puedes consultar más sobre esta certificación en nuestra página dedicada.',
    answerNode: (
      <p>
        Sí, el 100% de los guardias de Gard Security cuentan con certificación OS10 vigente, emitida por Carabineros de Chile (próximamente administrada por la Subsecretaría de Prevención del Delito bajo la Ley 21.659). La certificación OS10 es obligatoria por ley para ejercer funciones de guardia de seguridad privada en Chile. Puedes consultar más sobre esta certificación en nuestra{' '}
        <Link href="/certificacion-os10-guardias-seguridad" className="text-primary underline">página dedicada</Link>.
      </p>
    ),
  },
  {
    question: '¿Qué tiempo de respuesta ofrecen ante incidentes?',
    answerText:
      'Nuestros guardias en el sitio tienen protocolos de reacción inmediata (menos de 2 minutos para activar alertas y coordinación). Para refuerzos móviles desde nuestra central, el tiempo de respuesta promedio en la Región Metropolitana es inferior a 15 minutos. Contamos con central de monitoreo 24/7 que coordina con Carabineros, bomberos y ambulancia cuando la situación lo requiere.',
    answerNode: (
      <p>
        Nuestros guardias en el sitio tienen protocolos de reacción inmediata (menos de 2 minutos para activar alertas y coordinación). Para refuerzos móviles desde nuestra central, el tiempo de respuesta promedio en la Región Metropolitana es inferior a 15 minutos. Contamos con central de monitoreo 24/7 que coordina con Carabineros, bomberos y ambulancia cuando la situación lo requiere.
      </p>
    ),
  },
  {
    question: '¿Gard Security opera fuera de Santiago?',
    answerText: `Sí. Contamos con presencia operativa en ${companyStats.citiesCovered} ciudades de Chile: Santiago, Antofagasta, Valparaíso, Concepción, Iquique, Puerto Montt, Rancagua, Chillán, Temuco y Viña del Mar. Para cobertura geográfica específica, consulta nuestras páginas por servicio y ciudad.`,
    answerNode: (
      <p>
        Sí. Contamos con presencia operativa en {companyStats.citiesCovered} ciudades de Chile: Santiago, Antofagasta, Valparaíso, Concepción, Iquique, Puerto Montt, Rancagua, Chillán, Temuco y Viña del Mar. Para cobertura geográfica específica, consulta nuestras{' '}
        <Link href="/servicios/guardias-de-seguridad" className="text-primary underline">páginas por servicio</Link>{' '}
        y ciudad.
      </p>
    ),
  },
  {
    question: '¿Qué industrias atiende Gard Security?',
    answerText:
      'Nos especializamos en seguridad B2B para minería, logística y centros de distribución, retail y centros comerciales, edificios corporativos, construcción, energía, puertos, agroindustria, farmacéutica, sector financiero y salud. Cada sector tiene protocolos específicos adaptados a sus riesgos particulares.',
    answerNode: (
      <p>
        Nos especializamos en seguridad B2B para minería, logística y centros de distribución, retail y centros comerciales, edificios corporativos, construcción, energía, puertos, agroindustria, farmacéutica, sector financiero y salud. Cada sector tiene protocolos específicos adaptados a sus riesgos particulares.
      </p>
    ),
  },
  {
    question: '¿Cómo supervisan a los guardias en terreno?',
    answerText:
      'Usamos un sistema propio de supervisión digital (OPAI) que incluye control de rondas por NFC/QR, geolocalización de guardias, reportería de incidentes en tiempo real, fotografías de novedades y dashboard operativo para el cliente. Además, nuestros supervisores realizan visitas no anunciadas a las instalaciones y auditorías semanales de protocolos.',
    answerNode: (
      <p>
        Usamos un sistema propio de supervisión digital (OPAI) que incluye control de rondas por NFC/QR, geolocalización de guardias, reportería de incidentes en tiempo real, fotografías de novedades y dashboard operativo para el cliente. Además, nuestros supervisores realizan visitas no anunciadas a las instalaciones y auditorías semanales de protocolos.
      </p>
    ),
  },
];

const breadcrumbs = [
  { name: 'Inicio', url: BASE_URL },
  { name: 'Servicios', url: `${BASE_URL}/servicios` },
  { name: 'Guardias de Seguridad para Empresas', url: CANONICAL_URL },
];

export default function GuardiasParaEmpresasPage() {
  const yearsOfExperience = companyStats.leadershipYearsExperience;

  const faqsForSchema = faqItems.map((f) => ({ question: f.question, answer: f.answerText }));

  return (
    <main className="flex min-h-screen flex-col">
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqsForSchema} />
      <ServiceSchema
        name="Guardias de Seguridad Privada para Empresas"
        description={`Servicio B2B de guardias de seguridad privada certificados OS10 para empresas en Chile. Cobertura en ${companyStats.citiesCovered} ciudades, especialización en minería, logística, retail, corporativo, construcción e industrial. ${yearsOfExperience}+ años de experiencia del equipo fundador, ${companyStats.activeGuards} guardias activos, supervisión 24/7.`}
        url={CANONICAL_URL}
        serviceType="Servicio de Guardias de Seguridad Privada B2B"
        category="Seguridad Privada"
        areaServed={[
          { type: 'City', name: 'Santiago' },
          { type: 'City', name: 'Antofagasta' },
          { type: 'City', name: 'Valparaíso' },
          { type: 'City', name: 'Concepción' },
          { type: 'City', name: 'Iquique' },
          { type: 'City', name: 'Puerto Montt' },
          { type: 'City', name: 'Rancagua' },
          { type: 'City', name: 'Chillán' },
          { type: 'City', name: 'Temuco' },
          { type: 'City', name: 'Viña del Mar' },
          { type: 'Country', name: 'Chile' },
        ]}
        audience={{ audienceType: 'Empresas B2B en Chile' }}
        offers={{
          priceCurrency: 'CLP',
          availability: 'https://schema.org/InStock',
          url: `${BASE_URL}/cotizar`,
          priceDescription: 'Cotización personalizada según dimensionamiento',
        }}
        hasOfferCatalog={{
          name: 'Industrias atendidas',
          items: [
            { name: 'Guardias para Minería', url: `${BASE_URL}/industrias/mineria` },
            { name: 'Guardias para Bodegas y Logística', url: `${BASE_URL}/industrias/bodegas` },
            { name: 'Guardias para Edificios Corporativos', url: `${BASE_URL}/industrias/edificios-corporativos` },
            { name: 'Guardias para Retail', url: `${BASE_URL}/industrias/retail` },
            { name: 'Guardias para Construcción', url: `${BASE_URL}/industrias/construccion` },
          ],
        }}
      />

      {/* Hero */}
      <section className="w-full py-16 md:py-24 lg:py-28 bg-gradient-to-br from-primary/5 via-background to-primary/5 dark:from-primary/10 dark:via-background dark:to-primary/10">
        <div className="container px-4 mx-auto max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:underline">Inicio</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/servicios" className="hover:underline">Servicios</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">Guardias de Seguridad para Empresas</li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <Shield className="h-4 w-4" />
            <span>100% Guardias Certificados OS10</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Guardias de Seguridad Privada para Empresas en Chile
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
            Servicio B2B de guardias de seguridad certificados OS10 para empresas en minería, logística, retail, corporativo, construcción e industrial. {companyStats.activeGuards} guardias activos, cobertura en {companyStats.citiesCovered} ciudades, supervisión 24/7 con tecnología propia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="/cotizar">
                Solicitar Cotización B2B <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#caracteristicas">
                Ver Características del Servicio
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t">
            <div>
              <div className="text-3xl font-bold text-primary">{companyStats.activeGuards}</div>
              <div className="text-sm text-muted-foreground">Guardias activos OS10</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">{yearsOfExperience}</div>
              <div className="text-sm text-muted-foreground">Años de experiencia del equipo</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">{companyStats.citiesCovered}</div>
              <div className="text-sm text-muted-foreground">Ciudades de cobertura</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Supervisión operacional</div>
            </div>
          </div>
        </div>
      </section>

      {/* Qué son los guardias de seguridad privada para empresas */}
      <section className="w-full py-16 md:py-20">
        <div className="container px-4 mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Qué son los guardias de seguridad privada para empresas?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Un guardia de seguridad privada para empresas es un profesional acreditado bajo la normativa OS10 de Carabineros de Chile, contratado por empresas B2B para proteger personas, activos e instalaciones. A diferencia de la seguridad residencial o de eventos puntuales, el servicio B2B opera bajo contratos con SLAs definidos, protocolos específicos por industria, supervisión continua y reportería operacional mensual.
            </p>
            <p>
              En Chile, la Ley 21.659 (Nueva Ley de Seguridad Privada) regula el ejercicio de la actividad, exigiendo certificación OS10 vigente para todos los guardias, registro de empresa de seguridad privada ante la autoridad competente, y cumplimiento de protocolos de capacitación continua. Contratar una empresa que cumpla íntegramente esta normativa no es opcional: es un requisito legal que protege a tu organización ante contingencias laborales, seguros y responsabilidad civil.
            </p>
            <p>
              Gard Security fue fundada en {companyStats.foundedYear} por un equipo con {companyStats.leadershipYearsExperience}+ años de experiencia en el rubro y se especializa exclusivamente en el segmento B2B. El 100% de nuestros guardias cuenta con certificación OS10 vigente, están respaldados por central de monitoreo 24/7, y operan con el sistema OPAI — nuestra plataforma propia de gestión operativa con IA que digitaliza rondas, control de asistencia y reportería de incidentes.
            </p>
          </div>
        </div>
      </section>

      {/* Características del servicio B2B */}
      <section id="caracteristicas" className="w-full py-16 md:py-20 bg-muted/30">
        <div className="container px-4 mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Características del servicio de guardias para empresas
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            Diseñado para empresas que requieren soluciones de seguridad medibles, auditables y escalables.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Award, title: '100% Certificación OS10 vigente', desc: 'Todos los guardias cumplen la normativa legal obligatoria. Verificamos y renovamos credenciales antes del vencimiento.' },
              { icon: Users, title: 'Supervisión en terreno', desc: 'Supervisores dedicados realizan visitas no anunciadas y auditorías semanales de protocolos en cada sitio.' },
              { icon: Clock, title: 'Central de monitoreo 24/7', desc: 'Operadores certificados reciben alertas, activan refuerzos y coordinan con Carabineros, bomberos y ambulancia.' },
              { icon: Shield, title: 'Control digital de rondas', desc: 'Sistema OPAI con NFC/QR, geolocalización de guardias y reportería en tiempo real accesible por el cliente.' },
              { icon: CheckCircle, title: 'Reemplazo inmediato', desc: 'Plan de contingencia con pool de guardias disponibles para cubrir ausencias sin interrumpir el servicio.' },
              { icon: Building2, title: 'Protocolos por industria', desc: 'Guardias entrenados específicamente para minería, logística, retail, construcción, corporativo o el sector que tu empresa opere.' },
            ].map((item) => (
              <div key={item.title} className="bg-background rounded-xl p-6 shadow-sm border">
                <item.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industrias que atendemos */}
      <section className="w-full py-16 md:py-20">
        <div className="container px-4 mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Guardias para empresas por industria
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            Cada sector tiene riesgos distintos. Nuestros guardias reciben capacitación específica para el contexto operacional de tu industria.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Mountain, title: 'Minería', desc: 'Protocolos para faenas mineras, control de accesos en portería, escolta de vehículos, seguridad en zonas aisladas.', href: '/industrias/mineria' },
              { icon: Truck, title: 'Logística y Bodegas', desc: 'Control de rampas, inspección de camiones, sellado de contenedores, reducción de mermas en centros de distribución.', href: '/industrias/bodegas' },
              { icon: Building2, title: 'Edificios Corporativos', desc: 'Portería profesional, control de visitantes, protocolos ante emergencias en oficinas ejecutivas.', href: '/industrias/edificios-corporativos' },
              { icon: ShoppingCart, title: 'Retail', desc: 'Prevención de pérdidas, control de clientes, apoyo en apertura y cierre, protocolos anti-amagos.', href: '/industrias/retail' },
              { icon: HardHat, title: 'Construcción', desc: 'Protección de obras, custodia de materiales y maquinaria, control de acceso de subcontratistas.', href: '/industrias/construccion' },
              { icon: Hammer, title: 'Industrial y Manufactura', desc: 'Seguridad perimetral, control de turnos, protocolos en plantas de producción 24/7.', href: '/industrias/manufactura' },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group bg-background rounded-xl p-6 shadow-sm border hover:border-primary hover:shadow-md transition-all"
              >
                <item.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.desc}</p>
                <span className="text-primary font-medium inline-flex items-center gap-1">
                  Ver servicio <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué Gard Security vs otras empresas */}
      <section className="w-full py-16 md:py-20 bg-muted/30">
        <div className="container px-4 mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Por qué elegir Gard Security sobre otras empresas de guardias?
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
            <p>
              El mercado de seguridad privada en Chile tiene operadores de distinto tamaño, desde empresas multinacionales hasta operadores locales con pocos guardias. La decisión de con quién contratar debe basarse en factores verificables, no solo en precio.
            </p>
            <p>
              Gard Security ocupa un nicho específico: empresa mediana especializada exclusivamente en B2B, con ventaja operacional frente a multinacionales (mayor flexibilidad contractual, menor rotación de supervisores, respuesta ejecutiva directa) y ventaja estructural frente a operadores pequeños (tecnología propia, cobertura nacional, respaldo financiero para contingencias).
            </p>
          </div>

          <div className="bg-background rounded-xl border overflow-hidden">
            <table className="w-full">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="px-6 py-4 text-left">Criterio</th>
                  <th className="px-6 py-4 text-center">Gard Security</th>
                  <th className="px-6 py-4 text-center">Operador típico</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Certificación OS10', '100% del personal auditada', '70-85% real en mercado'],
                  ['Supervisión digital en tiempo real', 'Sistema OPAI propio con IA', 'Planillas o apps básicas'],
                  ['Cobertura geográfica', '10 ciudades de Chile', 'Santiago o ciudad sede'],
                  ['Tiempo de respuesta móvil', 'Menor a 15 min en RM', 'Variable, sin SLA'],
                  ['Reportería al cliente', 'Dashboard operativo en línea', 'Reporte mensual en PDF'],
                  ['Reemplazo ante ausencia', 'Pool de guardias, cobertura inmediata', 'Variable, según disponibilidad'],
                  ['Foco operacional', 'Exclusivo B2B', 'Mixto B2B/residencial'],
                ].map(([criterio, gard, otros]) => (
                  <tr key={criterio} className="border-t">
                    <td className="px-6 py-4 font-medium">{criterio}</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">{gard}</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{otros}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            * Valores comparativos basados en observación de mercado B2B chileno. Cada empresa puede verificar las afirmaciones sobre Gard Security durante el proceso de cotización.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-16 md:py-20">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Preguntas frecuentes sobre guardias de seguridad para empresas
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Respuestas a las dudas más comunes de gerentes y responsables de seguridad en empresas B2B.
          </p>

          <div className="space-y-6">
            {faqItems.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-muted/30 rounded-xl border p-6 [&[open]]:bg-background"
              >
                <summary className="font-semibold text-lg cursor-pointer flex items-center justify-between gap-4">
                  <span>{faq.question}</span>
                  <span className="text-primary text-2xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="mt-4 text-muted-foreground prose prose-sm dark:prose-invert max-w-none">
                  {faq.answerNode}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-link contextual a servicio catálogo */}
      <section className="w-full py-12 bg-muted/30">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <p className="text-lg text-muted-foreground mb-4">
            Esta página describe el servicio de guardias desde una perspectiva comercial B2B.
          </p>
          <p className="text-lg">
            ¿Buscás la <strong>descripción técnica y operacional detallada del servicio</strong>?
          </p>
          <Button asChild variant="outline" size="lg" className="mt-6">
            <Link href="/servicios/guardias-de-seguridad">
              Ver ficha técnica del servicio <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Cotización */}
      <FormularioCotizacionSeccion prefillServicio="Guardias de Seguridad" />
    </main>
  );
}
