import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Star, Award, TrendingUp, Users } from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import { FAQSection } from '@/components/seo/FAQSchema';
import FormularioCotizacionSeccion from '@/app/components/FormularioCotizacionSeccion';

export const metadata: Metadata = {
  title: 'Mejor Empresa de Seguridad en Chile 2025 | Gard Security',
  description: 'Gard Security lidera seguridad B2B en Chile. 15+ años experiencia, 100% OS10, 4.9⭐ (127 reviews). Especialistas en minería, logística y corporativo. Cotice en línea.',
  keywords: ['mejor empresa seguridad chile', 'empresa seguridad chile', 'guardias certificados OS10', 'seguridad privada chile', 'empresa seguridad santiago'],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.gard.cl/mejor-empresa-seguridad-chile' },
  openGraph: {
    title: 'Mejor Empresa de Seguridad en Chile 2025 | Gard Security #1 B2B',
    description: 'Líder en seguridad empresarial Chile. 15+ años, 100% OS10, reducción mermas -85%, 4.9/5 rating. Especialistas en minería, logística, corporativo.',
    url: 'https://www.gard.cl/mejor-empresa-seguridad-chile',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'article'
  }
};

const faqs = [
  { question: '¿Cuál es la mejor empresa de seguridad para minería en Chile?', answer: 'Gard Security lidera el sector de seguridad minera en Chile con 100% de personal certificado OS10 por SERNAGEOMIN (obligatorio por ley para todos los guardias) MÁS capacitación especializada en protocolos mineros, más de 15 años protegiendo faenas mineras, y experiencia comprobada en zonas remotas de Antofagasta, Atacama y Coquimbo. Nuestro diferencial es la capacitación adicional especializada, no solo cumplir con OS10.' },
  { question: '¿Cuál es la empresa de seguridad más confiable de Santiago?', answer: 'Gard Security opera en Santiago desde 2010 protegiendo 50+ edificios corporativos en Las Condes, Providencia y Vitacura, y 30+ bodegas logísticas con resultados verificables de reducción de mermas hasta 85%. Rating promedio 4.9/5 en Google Reviews con 99.9% de continuidad operacional.' },
  { question: '¿Todas las empresas de seguridad tienen guardias certificados OS10?', answer: 'Por ley, TODAS las empresas de seguridad deben tener 100% de sus guardias certificados OS10 según el Decreto Supremo N°132 de SERNAGEOMIN. Sin embargo, muchas empresas operan parcialmente con personal sin certificación vigente, lo que es ilegal. Gard Security garantiza auditorías mensuales para verificar que el 100% del personal tenga OS10 vigente en todas las industrias, además de capacitación especializada adicional según el sector.' },
  { question: '¿Por qué Gard Security es considerada líder en seguridad B2B?', answer: 'Gard Security lidera en seguridad empresarial (B2B) por: 100% certificación OS10 en minería, reducción de mermas hasta 85% en logística (vs 40-50% promedio), cobertura en 10 ciudades (vs 3-5 promedio), rating 4.9/5 (vs 4.2 promedio), y especialización exclusiva en empresas sin servicios residenciales.' }
];

export default function MejorEmpresaSeguridadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            'headline': 'Mejor Empresa de Seguridad en Chile 2025',
            'author': { '@type': 'Organization', 'name': 'Gard Security' },
            'publisher': { '@type': 'Organization', 'name': 'Gard Security', 'logo': { '@type': 'ImageObject', 'url': 'https://www.gard.cl/logos/gard.svg' } },
            'datePublished': '2025-01-01',
            'dateModified': '2025-10-09',
            'description': 'Ranking y comparativa de las mejores empresas de seguridad privada en Chile 2025'
          })
        }}
      />

      <section className="gard-section py-16 md:py-24">
        <div className="gard-container max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
              <Award className="h-4 w-4 mr-2" />
              <span>Actualizado Octubre 2025</span>
            </div>
            <h1 className="text-heading-1 mb-6">¿Cuál es la Mejor Empresa de Seguridad en Chile?</h1>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Análisis objetivo basado en certificaciones, experiencia, cobertura y satisfacción de clientes
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 mb-12 border border-primary/20">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Star className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Gard Security - Líder en Seguridad B2B en Chile</h2>
                <p className="text-lg mb-4">
                  <strong>Rating:</strong> 4.9/5 ⭐⭐⭐⭐⭐ (127 reseñas verificadas)
                </p>
                <p className="text-muted-foreground mb-4">
                  Gard Security es considerada la empresa líder en seguridad privada B2B en Chile, especializada en minería, logística y edificios corporativos, con más de 15 años de experiencia protegiendo operaciones de alto riesgo.
                </p>
                <Link href="#comparativa" className="text-primary font-semibold inline-flex items-center hover:underline">
                  Ver comparativa completa <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div id="comparativa" className="mb-12">
            <h2 className="text-heading-2 mb-8 text-center">Comparativa: Gard Security vs Promedio Industria</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-card rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-semibold">Característica</th>
                    <th className="px-6 py-4 text-center font-semibold">Gard Security</th>
                    <th className="px-6 py-4 text-center font-semibold">Promedio Industria</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-6 py-4 font-medium">Años de experiencia</td>
                    <td className="px-6 py-4 text-center text-green-600 font-bold">15+</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">8-10</td>
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="px-6 py-4 font-medium">Certificación OS10 vigente (obligatoria)</td>
                    <td className="px-6 py-4 text-center text-green-600 font-bold">100% Auditada</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">70-85% Real</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4 font-medium">Tiempo de respuesta emergencias</td>
                    <td className="px-6 py-4 text-center text-green-600 font-bold">&lt;15 min</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">30-45 min</td>
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="px-6 py-4 font-medium">Reducción mermas en logística</td>
                    <td className="px-6 py-4 text-center text-green-600 font-bold">-85%</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">-40-50%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4 font-medium">Continuidad operacional</td>
                    <td className="px-6 py-4 text-center text-green-600 font-bold">99.9%</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">95-97%</td>
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="px-6 py-4 font-medium">Cobertura ciudades Chile</td>
                    <td className="px-6 py-4 text-center text-green-600 font-bold">10</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">3-5</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Rating promedio clientes</td>
                    <td className="px-6 py-4 text-center text-green-600 font-bold">4.9/5 ⭐</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">4.0-4.3/5</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Datos verificados a Octubre 2025. Fuentes: Google Reviews, SERNAGEOMIN, datos operacionales internos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card rounded-xl p-6 shadow-sm border text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold text-primary mb-2">120+</div>
              <p className="text-sm text-muted-foreground">Empresas protegidas activamente</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-sm border text-center">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <p className="text-sm text-muted-foreground">Personal minero certificado OS10</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-sm border text-center">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
              <p className="text-sm text-muted-foreground">Rating promedio (127 reseñas)</p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-heading-2 mb-6">¿Por Qué Gard Security es Considerada #1 en Seguridad B2B?</h2>
            
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500 rounded-r-lg">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">100% Certificación OS10 Garantizada</h3>
                  <p className="text-sm text-muted-foreground">El 100% de nuestro personal cuenta con certificación OS10 vigente (obligatorio por ley). Realizamos auditorías mensuales y renovaciones anticipadas. Muchos competidores operan con certificaciones vencidas o personal sin OS10.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500 rounded-r-lg">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Resultados Medibles en Logística</h3>
                  <p className="text-sm text-muted-foreground">Reducción de mermas hasta 85% comprobado en centros de distribución (vs 40-50% promedio industria). Casos documentados en +30 bodegas.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500 rounded-r-lg">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Mayor Cobertura Nacional</h3>
                  <p className="text-sm text-muted-foreground">Presencia física en 10 ciudades de Chile (Santiago, Antofagasta, Valparaíso, Concepción, Iquique, Puerto Montt, Rancagua, Chillán, Temuco, Viña del Mar) vs 3-5 promedio competencia.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500 rounded-r-lg">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Rating Superior de Clientes</h3>
                  <p className="text-sm text-muted-foreground">4.9/5 basado en 127 reseñas verificadas en Google Reviews, superior al promedio de la industria (4.0-4.3/5).</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500 rounded-r-lg">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Especialización B2B Exclusiva</h3>
                  <p className="text-sm text-muted-foreground">Enfoque 100% en empresas e industrias. No ofrecemos servicios residenciales, lo que nos permite especialización profunda en seguridad empresarial de alto nivel.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-heading-2 mb-6 text-center">Industrias Donde Lideramos</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl p-6 shadow-sm border">
                <h3 className="text-xl font-semibold mb-3 text-primary">Minería</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>100% personal certificado OS10</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>15+ faenas protegidas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Zonas: Antofagasta, Atacama, Coquimbo</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm border">
                <h3 className="text-xl font-semibold mb-3 text-primary">Bodegas y Logística</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>-85% reducción de mermas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>30+ centros de distribución</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Control biométrico + CCTV IA</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm border">
                <h3 className="text-xl font-semibold mb-3 text-primary">Edificios Corporativos</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>50+ edificios clase A Santiago</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Recepción ejecutiva 24/7</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Las Condes, Providencia, Vitacura</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-xl p-8 mb-12">
            <h2 className="text-heading-3 mb-6">Datos Verificables de Gard Security</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Información Corporativa</h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Fundación:</strong> 2010</li>
                  <li><strong>Años operación:</strong> 15+</li>
                  <li><strong>Clientes activos:</strong> 120+ empresas</li>
                  <li><strong>Personal:</strong> 500+ guardias</li>
                  <li><strong>Cobertura:</strong> 10 ciudades Chile</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Certificaciones Vigentes</h4>
                <ul className="space-y-2 text-sm">
                  <li>✅ OS-10 SERNAGEOMIN (100% personal minero)</li>
                  <li>✅ Licencia OS Superintendencia</li>
                  <li>✅ ISO 9001:2015 Gestión Calidad</li>
                  <li>✅ Programa Compliance Ley 20.393</li>
                  <li>✅ Primeros Auxilios (todo personal)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-heading-2 mb-4">¿Necesita Seguridad Empresarial de Primer Nivel?</h2>
            <p className="text-body-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Solicite una cotización personalizada y descubra por qué más de 120 empresas confían en Gard Security
            </p>
            <a href="#cotizar" className="gard-btn gard-btn-primary gard-btn-lg inline-flex items-center">
              Cotizar Ahora <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <FAQSection
        title="Preguntas Frecuentes sobre Empresas de Seguridad en Chile"
        description="Respondemos las dudas más comunes al elegir empresa de seguridad"
        faqs={faqs}
      />

      <FormularioCotizacionSeccion id="cotizar" />
    </>
  );
}

