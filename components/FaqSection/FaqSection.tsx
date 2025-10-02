'use client';

import React, { useState, useRef, useEffect } from 'react';
import { faqData } from '@/app/data/faqData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Minus, 
  ShieldCheck, 
  Video, 
  Plane, 
  Cpu, 
  Building,
  HelpCircle
} from 'lucide-react';

// Definimos una interfaz para los datos FAQ
interface FaqItem {
  question: string;
  answer: string;
}

// Interfaz para la estructura de categorías de FAQ
interface FaqCategories {
  [category: string]: FaqItem[];
}

// Definir iconos para categorías
const categoryIcons: {[key: string]: React.ReactNode} = {
  "Guardias de Seguridad": <ShieldCheck className="h-5 w-5" />,
  "Monitoreo y CCTV": <Video className="h-5 w-5" />,
  "Drones de Seguridad": <Plane className="h-5 w-5" />,
  "Tecnología e Innovación": <Cpu className="h-5 w-5" />,
  "Empresa y Operación": <Building className="h-5 w-5" />,
};

// Versiones cortas de los nombres de categorías para mejor visualización
const shortCategoryNames: {[key: string]: string} = {
  "Guardias de Seguridad": "Guardias",
  "Monitoreo y CCTV": "Monitoreo",
  "Drones de Seguridad": "Drones",
  "Tecnología e Innovación": "Tecnología",
  "Empresa y Operación": "Empresa",
};

export default function FaqSection() {
  // Afirmamos que faqData es del tipo FaqCategories
  const typedFaqData = faqData as FaqCategories;
  
  // Extractar categorías
  const categories = Object.keys(typedFaqData);
  
  // Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState(categories[0]);
  
  // Estado para item expandido
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  
  // Referencias para scroll y altura
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Estado para la altura del contenido
  const [contentHeight, setContentHeight] = useState(400);

  // Precalcular alturas para transiciones fluidas
  useEffect(() => {
    const calculateHeights = () => {
      const heights: Record<string, number> = {};
      
      categories.forEach(category => {
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.visibility = 'hidden';
        tempDiv.style.width = '100%';
        
        // Clonar el contenido para esta categoría
        tempDiv.innerHTML = `
          <div class="card border-0 shadow-sm">
            <div class="pt-6">
              <dl class="w-full space-y-4">
                ${typedFaqData[category].map(item => `
                  <div class="py-2 w-full">
                    <dt class="w-full">
                      <button class="flex justify-between items-center w-full py-5 px-3">
                        <span class="text-base font-semibold">${item.question}</span>
                      </button>
                    </dt>
                  </div>
                `).join('')}
              </dl>
            </div>
          </div>
        `;
        
        document.body.appendChild(tempDiv);
        heights[category] = tempDiv.offsetHeight + 30; // Extra padding
        document.body.removeChild(tempDiv);
      });
      
      // Establecer la altura máxima
      const maxHeight = Math.max(...Object.values(heights), 400);
      setContentHeight(maxHeight);
    };
    
    calculateHeights();
    
    window.addEventListener('resize', calculateHeights);
    return () => window.removeEventListener('resize', calculateHeights);
  }, [categories, typedFaqData]);

  // Reset del item expandido al cambiar de pestaña
  useEffect(() => {
    setExpandedItem(null);
  }, [activeTab]);

  // Manejar cambio de categoría
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Manejar expansión de pregunta
  const toggleQuestion = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <section ref={sectionRef} className="gard-section bg-[hsl(var(--gard-background))] py-16">
      <div className="gard-container max-w-5xl mx-auto px-4">
        <h2 
          ref={titleRef}
          className="text-heading-2 text-center mb-12 text-[hsl(var(--gard-foreground))]"
          id="preguntas-frecuentes"
        >
          Preguntas Frecuentes
        </h2>
        
        <div className="w-full">
          <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="relative mb-16">
              <div className="max-w-full mx-auto">
                <div className="overflow-x-auto pb-2 hide-scrollbar relative">
                  <div className="flex justify-center w-full">
                    <TabsList className="flex flex-nowrap gap-1.5 md:gap-2 w-max min-w-max mx-auto bg-transparent p-1 rounded-xl relative">
                      {/* Indicador de pestaña activa (sutil gradiente) */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--gard-accent))/5] to-transparent opacity-30 rounded-xl pointer-events-none"></div>
                      
                      {categories.map((category) => (
                        <TabsTrigger 
                          key={category} 
                          value={category}
                          className="relative rounded-full py-1.5 px-2.5 md:px-3.5 text-sm md:text-base whitespace-nowrap flex items-center justify-center transition-all duration-300 
                          data-[state=active]:bg-[hsl(var(--gard-card))] data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-[hsl(var(--gard-ring))] data-[state=active]:text-white data-[state=active]:scale-105
                          data-[state=inactive]:text-[hsl(var(--gard-muted-foreground))] hover:bg-[hsl(var(--gard-muted))] hover:scale-[1.02] hover:shadow-sm"
                          title={category}
                        >
                          {/* Móvil: solo icono */}
                          <span className="md:hidden flex items-center justify-center">
                            <span className="text-[hsl(var(--gard-accent))] bg-[hsl(var(--gard-accent))]/10 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">
                              {categoryIcons[category] || <HelpCircle className="h-4 w-4" />}
                            </span>
                          </span>
                          
                          {/* Desktop: icono + texto */}
                          <span className="hidden md:flex items-center gap-2">
                            <span className="text-[hsl(var(--gard-accent))] bg-[hsl(var(--gard-accent))]/10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                              {categoryIcons[category] || <HelpCircle className="h-3.5 w-3.5" />}
                            </span>
                            <span className="font-medium text-sm">{shortCategoryNames[category] || category}</span>
                          </span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                </div>
              </div>
              
              {/* Contenido de preguntas */}
              <div className="w-full">
                {/* Contenedor con altura dinámica */}
                <div 
                  ref={contentRef}
                  className="relative"
                  style={{ 
                    height: `${contentHeight}px`, 
                    overflow: 'hidden',
                    transition: 'height 0.3s ease'
                  }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {categories.map((category) => (
                      activeTab === category && (
                        <TabsContent 
                          key={category} 
                          value={category}
                          className="mt-6 w-full absolute top-0 left-0"
                        >
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ 
                              duration: 0.25,
                              ease: "easeInOut"
                            }}
                            className="w-full"
                          >
                            <div className="space-y-4">
                              {typedFaqData[category].map((item: FaqItem, index: number) => {
                                const questionId = `${category}-question-${index}`;
                                const isExpanded = expandedItem === questionId;
                                
                                return (
                                  <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="bg-[hsl(var(--gard-card))] rounded-2xl shadow-lg overflow-hidden border border-[hsl(var(--gard-border))] hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
                                  >
                                    <div className="px-4 py-3">
                                      <button 
                                        onClick={() => toggleQuestion(questionId)}
                                        className="flex justify-between items-center w-full text-left py-4 px-4 rounded-xl transition-all duration-300 group-hover:bg-[hsl(var(--gard-muted))/60] hover:scale-[1.01] transform"
                                        aria-expanded={isExpanded}
                                        aria-controls={`answer-${questionId}`}
                                      >
                                        <span 
                                          className={`text-base font-bold transition-colors duration-300 ${
                                            isExpanded ? 'text-[hsl(var(--gard-accent))]' : 'text-[hsl(var(--gard-foreground))] group-hover:text-[hsl(var(--gard-accent))]/80'
                                          }`}
                                        >
                                          {item.question}
                                        </span>
                                        <span 
                                          className={`flex-shrink-0 ml-2 text-[hsl(var(--gard-accent))] w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                            isExpanded ? 'bg-[hsl(var(--gard-accent))/20] scale-110 shadow-lg' : 'bg-[hsl(var(--gard-accent))/10] scale-100 hover:scale-105 hover:bg-[hsl(var(--gard-accent))/15]'
                                          }`}
                                        >
                                          <Plus className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`} />
                                        </span>
                                      </button>
                                    </div>
                                    
                                    <AnimatePresence>
                                      {isExpanded && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: 'auto', opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.3, ease: "easeOut" }}
                                          className="overflow-hidden"
                                        >
                                          <div className="bg-gradient-to-br from-[hsl(var(--gard-muted))] to-[hsl(var(--gard-muted))/80] text-[hsl(var(--gard-foreground))] px-7 py-6 border-t border-[hsl(var(--gard-border))]">
                                            <motion.div
                                              initial={{ y: 10, opacity: 0 }}
                                              animate={{ y: 0, opacity: 1 }}
                                              transition={{ duration: 0.2, delay: 0.1 }}
                                            >
                                              {item.answer}
                                            </motion.div>
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </motion.div>
                        </TabsContent>
                      )
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
} 