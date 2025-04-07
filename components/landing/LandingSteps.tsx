'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, UserCheck, ShieldCheck } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface LandingStepsProps {
  titulo?: string;
  description?: string;
  pasos?: Step[];
}

export default function LandingSteps({
  titulo = "¿Cómo funciona nuestro servicio?",
  description = "Proceso simple y eficiente para implementar tu seguridad",
  pasos = [
    {
      title: "Solicita tu cotización",
      description: "Completa el formulario con tus datos y necesidades específicas para recibir una propuesta personalizada.",
      icon: <ClipboardList className="w-10 h-10 text-accent" />
    },
    {
      title: "Recibe evaluación personalizada",
      description: "Nuestros expertos evaluarán tus necesidades y te presentarán una solución a medida.",
      icon: <UserCheck className="w-10 h-10 text-accent" />
    },
    {
      title: "Comienza tu protección",
      description: "Implementamos las soluciones acordadas con un despliegue rápido y eficiente para tu tranquilidad.",
      icon: <ShieldCheck className="w-10 h-10 text-accent" />
    }
  ]
}: LandingStepsProps) {
  
  // Animaciones
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1
      }
    }
  };

  const iconAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2
      }
    },
    hover: { 
      scale: 1.1,
      rotate: [0, -5, 5, -5, 0],
      transition: { duration: 0.5 }
    }
  };
  
  const numberAnimation = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 10,
        delay: 0.4
      }
    }
  };
  
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800" id="como-funciona">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-primary dark:text-white">
            {titulo}
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 mt-12"
        >
          {pasos.map((paso, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="relative"
            >
              {/* Línea conectora (solo entre pasos, no después del último) */}
              {index < pasos.length - 1 && (
                <motion.div 
                  className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-accent/20 -z-10 transform -translate-x-1/2"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              )}
              
              <motion.div 
                className="bg-white dark:bg-gray-700 rounded-xl p-8 h-full flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-center mb-6 relative">
                  <motion.div 
                    className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center"
                    variants={iconAnimation}
                    whileHover="hover"
                  >
                    {paso.icon}
                  </motion.div>
                  <motion.span 
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg"
                    variants={numberAnimation}
                  >
                    {index + 1}
                  </motion.span>
                </div>
                <motion.h3 
                  className="text-xl font-semibold mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {paso.title}
                </motion.h3>
                <motion.p 
                  className="text-muted-foreground"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  {paso.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 