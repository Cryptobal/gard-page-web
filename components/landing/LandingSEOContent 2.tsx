'use client';

import React from 'react';
import { motion } from 'framer-motion';

type SEOSubSection = {
  title: string;
  content: string;
};

interface LandingSEOContentProps {
  title: string;
  paragraphs: string[];
  subSections: SEOSubSection[];
}

const LandingSEOContent: React.FC<LandingSEOContentProps> = ({
  title,
  paragraphs,
  subSections
}) => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">{title}</h2>
          
          {/* Párrafos principales */}
          {paragraphs.map((paragraph, index) => (
            <p key={`p-${index}`} className="mb-6">
              {paragraph}
            </p>
          ))}
          
          {/* Subsecciones */}
          {subSections.map((section, index) => (
            <div key={`section-${index}`} className="mt-8 mb-8">
              <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
              <p>{section.content}</p>
            </div>
          ))}
          
          {/* Llamado a la acción final */}
          <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="font-semibold text-center">
              ¿Listo para mejorar la seguridad de tu empresa? Completa el formulario y un especialista te contactará a la brevedad.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingSEOContent; 