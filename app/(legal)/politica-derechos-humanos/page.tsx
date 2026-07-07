import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import BreadcrumbSchema, { Breadcrumbs } from '@/components/seo/BreadcrumbSchema';
import { Download, ShieldAlert, CalendarClock } from 'lucide-react';

// La firma y el PDF se entregan por separado; renderizamos la imagen solo si ya existe
// en /public para evitar un asset roto mientras tanto.
const firmaSrc = '/assets/politicas/Firma_JM.png';
const hasFirma = fs.existsSync(path.join(process.cwd(), 'public', firmaSrc));

export const metadata: Metadata = {
  title: 'Política de Derechos Humanos — Gard Security',
  description:
    'Política pública de Derechos Humanos de Gard Security. Adherida a UNGP y Principios Voluntarios (VPSHR). Compromiso con clientes mineros, industriales y comunidades.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.gard.cl/politica-derechos-humanos',
    languages: {
      'es-CL': 'https://www.gard.cl/politica-derechos-humanos',
      'x-default': 'https://www.gard.cl/politica-derechos-humanos',
    },
  },
  openGraph: {
    title: 'Política de Derechos Humanos · Gard Security',
    description:
      'Política pública de Derechos Humanos de Gard Security. Adherida a UNGP y Principios Voluntarios (VPSHR). Compromiso con clientes mineros, industriales y comunidades.',
    url: 'https://www.gard.cl/politica-derechos-humanos',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website',
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Política de Derechos Humanos — Gard Security',
  url: 'https://www.gard.cl/politica-derechos-humanos',
  inLanguage: 'es-CL',
  about: 'HumanRightsPolicy',
  publisher: {
    '@type': 'Organization',
    name: 'Gard Security SpA',
    url: 'https://www.gard.cl',
  },
  author: {
    '@type': 'Person',
    name: 'Jorge Andrés Montenegro Fuenzalida',
    jobTitle: 'Gerente General',
  },
  datePublished: '2026-07-01',
  dateModified: '2026-07-01',
};

const breadcrumbs = [
  { name: 'Inicio', url: 'https://www.gard.cl' },
  { name: 'Legal y Cumplimiento', url: 'https://www.gard.cl/politica-derechos-humanos' },
  { name: 'Política de Derechos Humanos', url: 'https://www.gard.cl/politica-derechos-humanos' },
];

export default function PoliticaDerechosHumanosPage() {
  return (
    <main className="gard-section bg-gray-50 dark:bg-gray-900 min-h-screen py-10 md:py-16">
      <BreadcrumbSchema items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <div className="gard-container max-w-4xl mx-auto px-4">
        <Breadcrumbs items={breadcrumbs} />

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-heading-2 md:text-heading-1 text-primary dark:text-accent font-title mb-4">
            Política de Derechos Humanos
          </h1>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
              <CalendarClock className="mr-2 h-4 w-4" />
              Vigente desde julio 2026
            </span>
            <a href="/assets/politicas/politica-derechos-humanos-gard-v1.pdf" download>
              <Button variant="accent" className="rounded-2xl">
                <Download className="mr-2 h-4 w-4" />
                Descargar PDF
              </Button>
            </a>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <strong>Vigente desde:</strong> 1 de julio de 2026 · <strong>Versión:</strong> 1.0 ·{' '}
            <strong>Próxima revisión:</strong> julio de 2027
          </p>
        </header>

        {/* Contenido */}
        <article className="prose dark:prose-invert max-w-none prose-headings:font-title prose-headings:text-primary dark:prose-headings:text-accent prose-a:text-primary dark:prose-a:text-accent">
          <p>
            En Gard Security reconocemos que la actividad de seguridad privada, por su naturaleza y
            contexto, tiene el potencial de impactar los derechos humanos de trabajadores, clientes,
            comunidades vecinas y terceros que interactúan con las operaciones que resguardamos. Por
            eso, asumimos públicamente el compromiso de respetar los derechos humanos
            internacionalmente reconocidos en toda nuestra cadena de valor.
          </p>

          <h2>1. Alcance</h2>
          <p>Esta política aplica a:</p>
          <ul>
            <li>
              Todos los trabajadores de Gard Security SpA, en todos sus cargos, contratos y
              localidades del territorio nacional.
            </li>
            <li>
              Todas las operaciones y contratos de servicios de vigilancia, seguridad electrónica,
              monitoreo y tecnología que Gard preste directamente o a través de sus filiales.
            </li>
            <li>
              Todos los subcontratistas, proveedores y aliados comerciales que trabajen en nombre de
              Gard o en operaciones bajo su responsabilidad.
            </li>
          </ul>

          <h2>2. Marcos internacionales adheridos</h2>
          <p>
            Gard Security adhiere y aplica operacionalmente los siguientes marcos internacionales de
            derechos humanos:
          </p>
          <ul>
            <li>
              <strong>Declaración Universal de los Derechos Humanos</strong> (ONU, 1948) — fundamento
              ético universal.
            </li>
            <li>
              <strong>
                Principios Rectores de la ONU sobre las Empresas y los Derechos Humanos (UNGP)
              </strong>{' '}
              — el marco global adoptado por la ONU en 2011, que establece los pilares Proteger,
              Respetar y Remediar.
            </li>
            <li>
              <strong>Principios Voluntarios sobre Seguridad y Derechos Humanos (VPSHR)</strong> — el
              estándar sectorial para industrias extractivas, del cual son signatarias las principales
              compañías mineras que operan en Chile.
            </li>
            <li>
              <strong>
                Convenio 169 de la Organización Internacional del Trabajo (OIT) sobre Pueblos
                Indígenas y Tribales
              </strong>{' '}
              — ratificado por Chile en 2008.
            </li>
            <li>
              <strong>
                Declaración de la OIT sobre principios y derechos fundamentales en el trabajo
              </strong>{' '}
              — no discriminación, no trabajo forzado, no trabajo infantil, libertad sindical.
            </li>
          </ul>

          <h2>3. Marco normativo chileno</h2>
          <p>
            Complementariamente, Gard cumple estrictamente el marco normativo chileno aplicable,
            incluyendo:
          </p>
          <ul>
            <li>Constitución Política de la República de Chile.</li>
            <li>
              <strong>Ley 21.659</strong> (Nueva Ley de Seguridad Privada) y su reglamentación OS-10
              vigente.
            </li>
            <li>
              <strong>Ley 21.643 (Ley Karin)</strong> — prevención y sanción del acoso laboral, sexual
              y violencia en el trabajo.
            </li>
            <li>
              <strong>Ley 20.609 (Ley Zamudio)</strong> — antidiscriminación.
            </li>
            <li>
              <strong>Ley 21.523 (Ley Naín-Retamal)</strong> — legítima defensa privilegiada para las
              fuerzas de orden públicas (Gard reconoce expresamente que este marco no aplica
              automáticamente al personal de seguridad privada, y capacita a sus guardias bajo el
              estándar general del Código Penal).
            </li>
            <li>
              <strong>Código del Trabajo</strong> y toda la normativa laboral y previsional vigente.
            </li>
            <li>
              <strong>DS 594</strong> — condiciones sanitarias y ambientales en los lugares de trabajo.
            </li>
          </ul>

          <h2>4. Compromisos concretos</h2>
          <p>Gard Security se compromete a:</p>
          <h3>4.1 Debida diligencia en derechos humanos</h3>
          <p>
            Identificar, prevenir, mitigar y rendir cuentas sobre los impactos reales o potenciales
            que nuestras operaciones puedan tener sobre los derechos humanos, en cumplimiento del pilar
            «Respetar» de los UNGP.
          </p>
          <h3>4.2 Uso proporcional de la fuerza</h3>
          <p>
            El personal operativo de Gard opera bajo el principio de uso proporcional de la fuerza y
            con prioridad absoluta en técnicas de de-escalada verbal. Los incidentes de uso de fuerza
            son investigados sin excepción.
          </p>
          <h3>4.3 Formación y capacitación</h3>
          <p>
            Todo el personal operativo recibe formación inicial y periódica en derechos humanos, con
            contenidos alineados a los UNGP y VPSHR. La capacitación queda documentada, evaluada y
            trazada en nuestra plataforma OPAI.
          </p>
          <h3>4.4 No discriminación e igualdad de trato</h3>
          <p>
            Gard no discrimina por raza, etnia, nacionalidad, género, orientación sexual, identidad de
            género, edad, religión, opinión política, discapacidad, situación socioeconómica ni ninguna
            otra condición.
          </p>
          <h3>4.5 Enfoque de género</h3>
          <p>
            Aplicamos protocolos específicos para revisiones, intervenciones y atención a mujeres, en
            cumplimiento de la Ley Karin y de las buenas prácticas del sector.
          </p>
          <h3>4.6 Respeto a comunidades y pueblos indígenas</h3>
          <p>
            En operaciones que involucren interacción con comunidades locales o pueblos indígenas, Gard
            capacita a su personal en respeto cultural, no discriminación y protocolos específicos bajo
            el Convenio 169 OIT. Las tensiones con comunidades no se resuelven en terreno por el
            personal operativo: siempre se escalan al Jefe de Contrato y al mandante.
          </p>
          <h3>4.7 Prohibición del trabajo forzado y del trabajo infantil</h3>
          <p>
            Gard rechaza cualquier forma de trabajo forzado, servidumbre o explotación, y no contrata a
            personas menores de 18 años para funciones operativas de seguridad.
          </p>
          <h3>4.8 Libertad de asociación</h3>
          <p>
            Gard respeta el derecho de sus trabajadores a asociarse, sindicalizarse y negociar
            colectivamente, conforme al Código del Trabajo chileno.
          </p>
          <h3>4.9 Salud, seguridad y bienestar</h3>
          <p>
            Gard aplica su Política SHE (Safety, Health, Environment) en todas sus operaciones, con
            especial cuidado en faenas remotas, régimen 14×14 y trabajos en altura geográfica.
          </p>
          <h3>4.10 Confidencialidad y protección de datos</h3>
          <p>
            Gard protege la información personal de sus trabajadores, clientes y terceros bajo el marco
            de la Ley 21.719 sobre protección de datos personales.
          </p>

          <h2>5. Cadena de valor</h2>
          <p>
            Gard extiende estos compromisos a sus subcontratistas y proveedores. Todo subcontratista
            que preste servicios en operaciones bajo responsabilidad de Gard debe:
          </p>
          <ul>
            <li>
              Adherir a los principios de esta política, o acreditar tener una política propia
              equivalente.
            </li>
            <li>Someterse a homologación documental previa al ingreso a faena.</li>
            <li>
              Cumplir con las obligaciones laborales, previsionales y de salud y seguridad de sus
              trabajadores (certificados F30 y F30-1 al día).
            </li>
          </ul>

          <h2>6. Canal de denuncia y no represalias</h2>
          <p>
            Cualquier trabajador, cliente, subcontratista, comunidad vecina o tercero que tenga
            conocimiento de una posible vulneración a derechos humanos en el ámbito de operaciones de
            Gard puede reportarlo a través de nuestro Canal de Denuncias (Ley Karin), disponible de
            forma confidencial y sin represalias.
          </p>
          <p>
            Gard garantiza expresamente que ninguna persona que denuncie de buena fe sufrirá represalia
            laboral, contractual ni de ninguna otra naturaleza.
          </p>
          <p>
            Para clientes mineros e industriales que operen bajo estándares propios (Anglo American,
            BHP, Codelco, entre otros), Gard reconoce y respeta sus canales oficiales de denuncia como
            vías legítimas y complementarias.
          </p>

          <h2>7. Gobernanza y revisión</h2>
          <p>
            La responsabilidad última del cumplimiento de esta política recae en la Gerencia General de
            Gard Security. Su implementación operacional está a cargo del área de Prevención SHE y del
            área de Recursos Humanos, con supervisión periódica del Directorio.
          </p>
          <p>
            Esta política se revisa formalmente al menos una vez al año. La próxima revisión programada
            es en <strong>julio de 2027</strong>.
          </p>

          <h2>8. Vigencia y firma</h2>
          <p>
            Esta Política de Derechos Humanos entra en vigencia el <strong>1 de julio de 2026</strong> y
            se comunica a toda la organización a través de los canales internos habituales.
          </p>
        </article>

        {/* Bloque destacado: Canal de Denuncias */}
        <div className="gard-card bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8 my-10 flex flex-col sm:flex-row items-start gap-5">
          <div className="p-3 rounded-full bg-accent/10 flex-shrink-0">
            <ShieldAlert className="h-7 w-7 text-accent" />
          </div>
          <div>
            <h2 className="text-heading-5 md:text-heading-4 font-title text-primary dark:text-white mb-2">
              Canal de Denuncias
            </h2>
            <p className="text-body-base text-gray-700 dark:text-gray-300 mb-4">
              Reporta de forma confidencial y sin represalias cualquier posible vulneración a derechos
              humanos en operaciones de Gard.
            </p>
            <Link href="/ley-karin">
              <Button variant="default" className="rounded-2xl">
                Acceder al Canal de Denuncias (Ley Karin)
              </Button>
            </Link>
          </div>
        </div>

        {/* Firma visual */}
        <div className="max-w-md mx-auto text-center border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 p-6 my-10">
          {hasFirma && (
            <Image
              src={firmaSrc}
              alt="Firma de Jorge Andrés Montenegro Fuenzalida"
              width={220}
              height={90}
              className="mx-auto mb-3 h-auto w-auto max-h-24 object-contain dark:invert dark:brightness-0 dark:contrast-100"
            />
          )}
          <p className="text-body-base font-semibold text-primary dark:text-white mb-1">
            Jorge Andrés Montenegro Fuenzalida
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Gerente General · Gard Security SpA
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Julio 2026</p>
        </div>

        {/* Metadatos de documento */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-6 mt-10">
          <p>Documento: Política de Derechos Humanos · Gard Security SpA</p>
          <p>Versión: 1.0 · Vigente desde: 1 de julio de 2026</p>
          <p>Próxima revisión: julio de 2027</p>
          <p>
            Contacto:{' '}
            <a
              href="mailto:administracion@gard.cl"
              className="hover:text-primary dark:hover:text-accent transition-colors"
            >
              administracion@gard.cl
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
