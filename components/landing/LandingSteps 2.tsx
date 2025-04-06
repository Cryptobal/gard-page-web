'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, ClipboardCheck, Shield, Search, Tag, User, Users, Eye } from 'lucide-react';

type Step = {
  title: string;
  description: string;
  iconName?: string;
};

interface LandingStepsProps {
  steps: Step[];
  title?: string;
  subtitle?: string;
}

// Función para mapear nombres de iconos a componentes
const getIconByName = (iconName: string | undefined) => {
  const iconSize = 28;
  const iconClass = "text-accent";
  
  if (!iconName) return <ClipboardList className={iconClass} size={iconSize} />;
  
  const iconMap: Record<string, JSX.Element> = {
    'clipboard-list': <ClipboardList className={iconClass} size={iconSize} />,
    'clipboard-check': <ClipboardCheck className={iconClass} size={iconSize} />,
    'shield': <Shield className={iconClass} size={iconSize} />,
    'search': <Search className={iconClass} size={iconSize} />,
    'tag': <Tag className={iconClass} size={iconSize} />,
    'user': <User className={iconClass} size={iconSize} />,
    'users': <Users className={iconClass} size={iconSize} />,
    'eye': <Eye className={iconClass} size={iconSize} />,
  };

  return iconMap[iconName] || <ClipboardList className={iconClass} size={iconSize} />;
};

const LandingSteps: React.FC<LandingStepsProps> = ({ 
  steps,
  title = "¿Cómo funciona nuestro servicio?",
  subtitle = "Proceso simple y efectivo para implementar tu solución de seguridad"
}) => {
  // Animaciones
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-heading-2 text-3xl md:text-4xl font-semibold mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-body-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center">
                    {getIconByName(step.iconName)}
                  </div>
                  <div className="absolute -right-2 -top-2 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LandingSteps; 