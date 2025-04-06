'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import getFAQsByService, { FAQItem } from '@/lib/data/faq';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LandingFAQProps {
  servicio: string;
  titulo?: string;
  description?: string;
}

export default function LandingFAQ({
  servicio,
  titulo = "Preguntas frecuentes",
  description = "Aquí encontrarás respuestas a las dudas más comunes sobre nuestros servicios."
}: LandingFAQProps) {
  // Obtener las preguntas frecuentes para este servicio
  const faqs = getFAQsByService(servicio);
  
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
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900" id="preguntas-frecuentes">
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
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq: FAQItem, index: number) => (
              <motion.div 
                key={index}
                variants={fadeIn}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <AccordionTrigger 
                    className="py-4 px-6 text-left text-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-all data-[state=open]:text-accent flex items-center justify-between"
                  >
                    <span>{faq.question}</span>
                    <div className="flex-shrink-0 ml-2 h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <Plus className="h-4 w-4 text-accent transition-transform duration-200 group-data-[state=open]:hidden" />
                      <Minus className="h-4 w-4 text-accent transition-transform duration-200 hidden group-data-[state=open]:block" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent 
                    className="py-6 px-6 text-muted-foreground bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700"
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
} 