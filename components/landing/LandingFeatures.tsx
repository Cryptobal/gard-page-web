'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, BadgeCheck, Cpu } from 'lucide-react';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface LandingFeaturesProps {
  titulo?: string;
  subtitulo?: string;
  caracteristicas?: FeatureItem[];
}

export default function LandingFeatures({
  titulo = "Razones para elegir Gard Security",
  subtitulo = "Ofrecemos servicios de seguridad que se destacan por su calidad y profesionalismo",
  caracteristicas = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-accent" />,
      title: "Guardias con OS10 al día",
      description: "Todo nuestro personal cuenta con certificación OS-10 vigente y capacitación continua."
    },
    {
      icon: <Clock className="w-10 h-10 text-accent" />,
      title: "Supervisión remota 24/7",
      description: "Monitoreamos todas nuestras operaciones las 24 horas, los 7 días de la semana desde nuestra central."
    },
    {
      icon: <Cpu className="w-10 h-10 text-accent" />,
      title: "Tecnología integrada",
      description: "Implementamos soluciones tecnológicas avanzadas integradas con el factor humano."
    },
    {
      icon: <BadgeCheck className="w-10 h-10 text-accent" />,
      title: "Protocolos validados",
      description: "Operamos bajo protocolos estrictos y validados para cada tipo de industria y situación."
    }
  ]
}: LandingFeaturesProps) {
  
  // Animaciones
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900" id="por-que-elegirnos">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h2 className="text-heading-2 text-3xl md:text-4xl font-semibold mb-4">
            {titulo}
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitulo}
          </p>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8"
        >
          {caracteristicas.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 