'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Shield, BadgeCheck, User, CheckCircle,
  Calendar, Briefcase, Users, FileCheck, GraduationCap,
  DollarSign, Award, Smile
} from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import { cloudflareImages } from '@/lib/images';
import GardHero from '@/components/layouts/GardHero';
import ReclutamientoForm from './ReclutamientoForm';

export default function ReclutamientoPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <main className="flex-grow">
      {/* Hero Principal */}
      <GardHero
        title="Sé parte de Gard Security"
        subtitle="Buscamos guardias responsables, con vocación y compromiso."
        ctaTexto="Postula Aquí"
        badge={{
          icon: <Shield className="h-4 w-4" />,
          text: "Oportunidades Laborales"
        }}
        imageId="428c1028-8f6b-455a-e110-38421eeb5700"
        overlay={true}
        onScrollToForm={scrollToForm}
      />

      {/* ¿A quién buscamos? */}
      <section className="py-16 md:py-24 bg-white dark:bg-gradient-to-b dark:from-[hsl(var(--gard-background))] dark:to-[hsl(var(--gard-background)/_0.85)] dark:backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿A quién buscamos?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              En Gard Security seleccionamos a personas comprometidas, íntegras y capacitadas.
              Nuestro equipo humano es el pilar de nuestra excelencia operativa.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: <BadgeCheck className="h-8 w-8 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Certificado OS10 vigente", description: "Requisito fundamental para ejercer labores de seguridad privada" },
              { icon: <User className="h-8 w-8 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Buena presencia", description: "Presentación personal impecable y trato profesional" },
              { icon: <CheckCircle className="h-8 w-8 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Compromiso", description: "Responsabilidad, puntualidad y seriedad en el trabajo" },
              { icon: <Calendar className="h-8 w-8 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Disponibilidad", description: "Flexibilidad para turnos rotativos según necesidades" },
              { icon: <Briefcase className="h-8 w-8 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Experiencia", description: "Valoramos experiencia previa en seguridad (no excluyente)" },
              { icon: <Users className="h-8 w-8 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Trabajo en equipo", description: "Capacidad para integrarse a equipos de alto rendimiento" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center p-6 text-center bg-white dark:bg-[hsl(var(--gard-card))] dark:border-[1px] dark:border-[hsl(var(--gard-accent)/_0.15)] rounded-2xl shadow-sm hover:shadow-md transition-all dark:hover:border-[hsl(var(--gard-accent)/_0.3)]"
              >
                <div className="mb-4 p-3 rounded-full bg-transparent dark:bg-[hsl(var(--gard-accent)/_0.1)] dark:backdrop-blur-md">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso de Reclutamiento */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-[#050505] dark:bg-[radial-gradient(circle_at_center,_rgba(15,15,15,0.5)_1px,transparent_1px)] dark:bg-[length:24px_24px]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Proceso de Reclutamiento</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Nuestro proceso garantiza excelencia desde el primer paso.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: <Briefcase className="h-10 w-10 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Identificación de necesidad", description: "Evaluamos requerimientos específicos del cliente" },
              { icon: <FileCheck className="h-10 w-10 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Filtro documental", description: "Revisión de OS10, antecedentes y referencias" },
              { icon: <User className="h-10 w-10 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Evaluación psicológica", description: "Evaluamos aptitudes y perfil psicológico" },
              { icon: <BadgeCheck className="h-10 w-10 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Verificación de antecedentes", description: "Comprobación exhaustiva de historial laboral y personal" },
              { icon: <Users className="h-10 w-10 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Entrevista personal", description: "Entrevista con nuestro equipo de Recursos Humanos" },
              { icon: <GraduationCap className="h-10 w-10 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Capacitación inicial", description: "Formación específica según el servicio asignado" },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col bg-white dark:bg-black/50 dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] p-8 rounded-2xl shadow-sm hover:shadow-md transition-all dark:hover:border-[rgba(255,255,255,0.15)]"
              >
                <div className="flex justify-center items-center w-16 h-16 rounded-full bg-primary/10 dark:bg-[hsl(var(--gard-accent)/_0.1)] mb-6 mx-auto">
                  {step.icon}
                </div>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold mb-4 mx-auto">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
                <p className="text-muted-foreground text-center">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué Gard */}
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Por qué trabajar en Gard?</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">Te ofrecemos estabilidad, formación continua y un equipo de primer nivel.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: <DollarSign className="h-8 w-8 text-[hsl(var(--gard-accent))]" />, title: "Pagos puntuales", description: "Sueldos competitivos con pago puntual garantizado." },
              { icon: <Award className="h-8 w-8 text-[hsl(var(--gard-accent))]" />, title: "Crecimiento profesional", description: "Oportunidades reales de avanzar dentro de la empresa." },
              { icon: <Smile className="h-8 w-8 text-[hsl(var(--gard-accent))]" />, title: "Excelente clima laboral", description: "Ambiente de trabajo respetuoso y profesional." },
              { icon: <Shield className="h-8 w-8 text-[hsl(var(--gard-accent))]" />, title: "Implementos de calidad", description: "Equipamiento completo para realizar tu trabajo con seguridad." },
              { icon: <GraduationCap className="h-8 w-8 text-[hsl(var(--gard-accent))]" />, title: "Capacitación continua", description: "Formación permanente para mejorar tus habilidades." },
              { icon: <Users className="h-8 w-8 text-[hsl(var(--gard-accent))]" />, title: "Equipo de primer nivel", description: "Trabaja junto a profesionales comprometidos." },
            ].map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}
                className="bg-[rgba(15,15,15,0.5)] dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 dark:hover:border-[rgba(255,255,255,0.15)]"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-[hsl(var(--gard-accent)/_0.1)] rounded-full flex items-center justify-center mb-6">{item.icon}</div>
                  <h3 className="text-white text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario de Postulación */}
      <section ref={formRef} className="py-16 md:py-24 bg-white dark:bg-[hsl(var(--gard-background))]">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="relative h-32 md:h-48 bg-[hsl(var(--gard-accent))] rounded-t-2xl overflow-hidden">
              <CloudflareImage
                imageId={cloudflareImages.hero.reclutamiento}
                alt="Trabaja con nosotros - Gard Security"
                fill
                className="object-cover opacity-20"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center">Formulario de Postulación</h2>
                <p className="text-center mt-2 max-w-xl">Complete sus datos para ser considerado en nuestros procesos de selección</p>
              </div>
            </div>
            <ReclutamientoForm />
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-20 bg-primary gard-dark-bg">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Listo para proteger con excelencia?</h2>
            <p className="text-xl text-white/80 mb-8">Únete a Gard Security y desarrolla tu carrera en una empresa líder del sector.</p>
            <button
              onClick={scrollToForm}
              className="bg-[hsl(var(--gard-accent))] text-white hover:bg-[hsl(var(--gard-accent))]/90 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all font-medium"
            >
              Postula Ahora <ArrowRight className="inline h-5 w-5 ml-2" />
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
