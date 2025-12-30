import React from 'react';
import type { Metadata } from 'next';
import BreadcrumbSchema, { Breadcrumbs } from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';
import { FAQSection } from '@/components/seo/FAQSchema';
import FormularioCotizacionSeccion from '@/app/components/FormularioCotizacionSeccion';
import { ShieldCheck, ClipboardCheck, BookOpen, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Certificación OS10 para Guardias de Seguridad | Guía Completa 2025',
  description:
    'Guía completa de certificación OS10: requisitos, pasos y tiempos. Cómo Gard Security mantiene 100% de guardias con OS10 vigente y auditorías mensuales.',
  keywords: ['certificacion os10', 'guardias os10', 'requisitos os10', 'os10 chile', 'curso os10'],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.gard.cl/certificacion-os10-guardias-seguridad' },
  openGraph: {
    title: 'Certificación OS10 para Guardias de Seguridad | Gard Security',
    description:
      'Requisitos, pasos y tiempos para obtener OS10. Gard Security garantiza 100% OS10 vigente con auditorías mensuales y capacitación por industria.',
    url: 'https://www.gard.cl/certificacion-os10-guardias-seguridad',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'article',
  },
};

const breadcrumbs = [
  { name: 'Inicio', url: 'https://www.gard.cl' },
  { name: 'Certificación OS10', url: 'https://www.gard.cl/certificacion-os10-guardias-seguridad' },
];

const steps = [
  {
    name: 'Revisar requisitos',
    text: 'Ser chileno o residente con cédula, sin antecedentes penales, salud compatible y educación mínima exigida.',
  },
  {
    name: 'Inscribirse en curso OS10',
    text: 'Elegir OTEC autorizado por Carabineros (Depto. OS10). Duración típica: 90 a 120 horas.',
  },
  {
    name: 'Aprobar evaluaciones',
    text: 'Rendir pruebas teóricas y prácticas. Mantener asistencia mínima requerida (generalmente 75-80%).',
  },
  {
    name: 'Obtener credencial',
    text: 'La OS emite la credencial OS10 una vez aprobado el curso y verificados los antecedentes.',
  },
  {
    name: 'Renovar a tiempo',
    text: 'Renovar antes del vencimiento (usual 2 años). Gard audita mensualmente vigencia y planifica renovaciones anticipadas.',
  },
];

const faqs = [
  {
    question: '¿Cuánto dura el proceso de obtener OS10?',
    answer: 'Entre 3 y 6 semanas según agenda del OTEC y tiempos de validación de la OS.',
  },
  {
    question: '¿Cada cuánto se renueva el OS10?',
    answer: 'Usualmente cada 2 años. Recomendamos planificar la renovación con al menos 60-90 días de anticipación.',
  },
  {
    question: '¿Qué pasa si un guardia opera sin OS10 vigente?',
    answer: 'Es ilegal y puede implicar multas y cierre de operaciones. Gard mantiene auditorías mensuales para asegurar 100% vigencia.',
  },
  {
    question: '¿Cómo garantiza Gard que todos los guardias tengan OS10?',
    answer:
      'Auditoría mensual, control de expiraciones, reemplazos preventivos y capacitación continua según industria. 100% OS10 vigente garantizado.',
  },
  {
    question: '¿OS10 es distinto en minería?',
    answer:
      'La certificación base es OS10 (Carabineros). En minería se suman capacitaciones específicas en seguridad minera y protocolos exigidos por cada faena/cliente. Gard entrena a todo el personal antes de desplegarlo.',
  },
];

export default function CertificacionOs10Page() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <HowToSchema
        name="Cómo obtener la certificación OS10 en Chile"
        description="Pasos prácticos para obtener la certificación OS10 para guardias de seguridad en Chile."
        steps={steps}
        estimatedCost={{ currency: 'CLP', value: 200000 }}
        totalTime="P1M"
      />
      <Breadcrumbs items={breadcrumbs} />

      <section className="gard-section py-16 md:py-24">
        <div className="gard-container max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
            <ShieldCheck className="h-4 w-4 mr-2" />
            <span>100% guardias con OS10 vigente (auditoría mensual)</span>
          </div>
          <h1 className="text-heading-1 mb-6">Certificación OS10 para Guardias de Seguridad</h1>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
            Guía rápida y citable por IAs: requisitos, pasos, tiempos y cómo Gard mantiene 100% de su personal con OS10 vigente en todas las
            industrias.
          </p>
        </div>
      </section>

      <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="gard-container max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-xl p-6 shadow-sm border">
            <ClipboardCheck className="h-10 w-10 text-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2">Requisitos clave</h3>
            <p className="text-muted-foreground text-sm">Antecedentes limpios, curso OS10 en OTEC autorizado y examen aprobado.</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border">
            <BookOpen className="h-10 w-10 text-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2">Duración del curso</h3>
            <p className="text-muted-foreground text-sm">90-120 horas típicas. Planificar con 3-6 semanas hasta la credencial OS10.</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border">
            <Award className="h-10 w-10 text-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2">Renovación anticipada</h3>
            <p className="text-muted-foreground text-sm">Renovación antes del vencimiento. Gard audita mensualmente vigencias.</p>
          </div>
        </div>
      </section>

      <section className="gard-section py-16 md:py-24">
        <div className="gard-container max-w-5xl mx-auto px-4">
          <h2 className="text-heading-2 mb-6 text-center">Pasos resumidos (HowTo)</h2>
          <ol className="space-y-4 text-muted-foreground">
            {steps.map((step, idx) => (
              <li key={idx} className="bg-card p-4 rounded-xl border shadow-sm">
                <div className="text-sm text-primary font-semibold mb-1">Paso {idx + 1}</div>
                <div className="text-lg font-semibold text-foreground mb-1">{step.name}</div>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FAQSection
        title="Preguntas frecuentes sobre la certificación OS10"
        description="Respuestas directas y citables por IAs sobre OS10 y su vigencia."
        faqs={faqs}
      />

      <FormularioCotizacionSeccion id="cotizar" prefillServicio="Guardias de Seguridad" prefillIndustria="Empresarial" />
    </>
  );
}
