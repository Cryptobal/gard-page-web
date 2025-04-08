'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ExternalLink, MapPin, CalendarClock, Shield,
  ChevronDown, ChevronUp, Award, BarChart2, Clock, 
  ThumbsUp, Settings, Search, Globe 
} from 'lucide-react';

interface LandingSEOContentProps {
  industria: string;
  servicio: string;
  contenido?: {
    titulo?: string;
    subtitulos?: {
      titulo: string;
      contenido: string;
    }[];
    conclusion?: string;
  };
  includeLocalSEO?: boolean;
}

export default function LandingSEOContent({
  industria,
  servicio,
  contenido,
  includeLocalSEO = true
}: LandingSEOContentProps) {
  // Estado para controlar qué acordeón está abierto
  const [openAccordion, setOpenAccordion] = useState(-1); // Ninguno abierto por defecto
  
  // Transformar nombres con guiones a formato legible
  const industriaNombre = industria.replace(/-/g, ' ');
  const servicioNombre = servicio.replace(/-/g, ' ');
  
  // Construir títulos y subtítulos optimizados para SEO
  const tituloOptimizado = `${servicioNombre} para ${industriaNombre}: Soluciones de seguridad profesionales`;
  
  // Iconos para cada sección
  const sectionIcons = [
    <Shield key="shield" className="w-6 h-6 text-accent" />,
    <Award key="award" className="w-6 h-6 text-accent" />,
    <Settings key="settings" className="w-6 h-6 text-accent" />
  ];
  
  // Generar subtítulos temáticos basados en la industria y servicio
  const getSubtituloSEO = (indice: number) => {
    const subtitulos = [
      `Beneficios de nuestros servicios de ${servicioNombre} para empresas de ${industriaNombre}`,
      `Por qué elegir Gard Security como empresa de ${servicioNombre} para ${industriaNombre}`,
      `Tecnología y metodología en nuestros servicios de ${servicioNombre} para ${industriaNombre}`
    ];
    
    return subtitulos[indice % subtitulos.length];
  };
  
  // Si no hay contenido personalizado, generar uno extenso y optimizado para SEO
  const seoContent = contenido || {
    titulo: tituloOptimizado,
    subtitulos: [
      {
        titulo: getSubtituloSEO(0),
        contenido: `En Gard Security entendemos las necesidades específicas del sector ${industriaNombre} cuando se trata de ${servicioNombre}. Nuestras soluciones están diseñadas para proporcionar tranquilidad y protección efectiva, permitiéndole concentrarse en su negocio principal. Utilizamos tecnología avanzada combinada con personal altamente capacitado para garantizar un nivel óptimo de seguridad adaptado específicamente a los desafíos únicos que enfrenta la industria ${industriaNombre}. La implementación de un sistema robusto de ${servicioNombre} no solo protege sus activos físicos, sino también su reputación y la confianza de sus clientes.`
      },
      {
        titulo: getSubtituloSEO(1),
        contenido: `Con más de 10 años de experiencia en el sector de seguridad privada, Gard Security se ha establecido como un socio confiable para empresas de todos los tamaños en el sector ${industriaNombre}. Nuestro enfoque personalizado significa que no ofrecemos soluciones genéricas sino planes de ${servicioNombre} adaptados específicamente a sus instalaciones, personal y requisitos operativos. Utilizamos una combinación de métodos probados y tecnologías innovadoras para crear un entorno seguro que proteja sus activos más valiosos mientras mantiene la eficiencia operativa. Además, nuestro servicio de atención al cliente 24/7 garantiza que siempre hay un profesional disponible para atender sus consultas o emergencias.`
      },
      {
        titulo: getSubtituloSEO(2),
        contenido: `En Gard Security estamos comprometidos con la incorporación de las últimas innovaciones tecnológicas en nuestros servicios de ${servicioNombre} para el sector ${industriaNombre}. Desde sistemas de vigilancia avanzados hasta protocolos de respuesta inmediata, cada aspecto de nuestro servicio está diseñado para proporcionar una protección integral. Nuestros profesionales de seguridad reciben capacitación continua en las mejores prácticas y tecnologías específicas para su industria, garantizando que reciba un servicio de clase mundial que evoluciona con las cambiantes amenazas de seguridad. Al elegir Gard Security, no solo está contratando un servicio de ${servicioNombre}, sino accediendo a toda una infraestructura de seguridad integral respaldada por años de experiencia en el sector.`
      }
    ],
    conclusion: `En Gard Security, no solo ofrecemos servicios de ${servicioNombre} para el sector ${industriaNombre}; proporcionamos tranquilidad y una asociación a largo plazo centrada en la protección de lo que más valora. Contáctenos hoy para descubrir cómo nuestras soluciones personalizadas pueden satisfacer sus necesidades específicas de seguridad y contribuir al éxito continuo de su negocio. Nuestro compromiso es convertirnos en su aliado estratégico en materia de seguridad, ofreciendo soluciones que evolucionan con su empresa y las amenazas cambiantes del entorno.`
  };
  
  // Asegurarse de que subtitulos siempre sea un array
  const subtitulos = seoContent.subtitulos || [];
  
  // Toggle para abrir/cerrar acordeones
  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };
  
  // Animación para el contenido
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Datos para la infografía de estadísticas
  const statsItems = [
    { value: '95%', label: 'Tasa de detección', icon: <BarChart2 className="w-5 h-5 text-accent" /> },
    { value: '24/7', label: 'Monitoreo continuo', icon: <Clock className="w-5 h-5 text-accent" /> },
    { value: '10+', label: 'Años de experiencia', icon: <Award className="w-5 h-5 text-accent" /> },
    { value: '100%', label: 'Satisfacción clientes', icon: <ThumbsUp className="w-5 h-5 text-accent" /> },
  ];
  
  // Lista de ciudades para la cobertura
  const ciudades = [
    'Santiago (Región Metropolitana)',
    'Valparaíso y Viña del Mar',
    'Concepción y Talcahuano',
    'Antofagasta',
    'La Serena y Coquimbo',
    'Temuco',
    'Puerto Montt',
    'Rancagua'
  ];
  
  // Enlaces relacionados
  const relatedLinks = [
    { 
      title: 'Sobre nosotros', 
      description: 'Conozca más sobre Gard Security y nuestra experiencia', 
      url: '/sobre-nosotros', 
      icon: <Search className="w-5 h-5 text-accent" /> 
    },
    { 
      title: 'Servicios', 
      description: 'Explore nuestra gama completa de servicios de seguridad', 
      url: '/servicios', 
      icon: <Shield className="w-5 h-5 text-accent" /> 
    },
    { 
      title: 'Tecnología', 
      description: 'Descubra nuestra tecnología de seguridad avanzada', 
      url: '/tecnologia-seguridad', 
      icon: <Settings className="w-5 h-5 text-accent" /> 
    },
    { 
      title: 'Blog', 
      description: 'Lea nuestros artículos sobre seguridad y protección', 
      url: '/blog', 
      icon: <Award className="w-5 h-5 text-accent" /> 
    }
  ];
  
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900" id="informacion-detallada">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-semibold mb-10 text-center text-primary dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {seoContent.titulo}
        </motion.h2>
        
        {/* Acordeones */}
        <div className="space-y-4 mb-12">
          {subtitulos.map((subtitulo, index) => (
            <motion.div 
              key={index} 
              className="overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.button
                className={`w-full flex items-center justify-between p-5 rounded-xl text-left transition-all duration-300 ${
                  openAccordion === index 
                    ? 'bg-accent/10 dark:bg-gray-700 shadow-md' 
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => toggleAccordion(index)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-accent/10">
                    {sectionIcons[index]}
                  </div>
                  <h3 className="text-lg font-medium text-primary dark:text-white">
                    {subtitulo.titulo}
                  </h3>
                </div>
                
                {openAccordion === index ? (
                  <ChevronUp className="w-5 h-5 text-accent shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-accent shrink-0" />
                )}
              </motion.button>
              
              <AnimatePresence initial={false}>
                {openAccordion === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 bg-white dark:bg-gray-700 rounded-b-xl border-t border-gray-100 dark:border-gray-600">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {subtitulo.contenido}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        {/* Infografía de estadísticas */}
        <motion.div 
          className="rounded-2xl bg-white dark:bg-gray-800 shadow-md p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-8 text-center text-primary dark:text-white">
            Nuestros servicios de {servicioNombre} en números
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statsItems.map((stat, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center text-center"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  {stat.icon}
                </div>
                <span className="text-3xl font-bold text-accent mb-1">{stat.value}</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Conclusión */}
        {seoContent.conclusion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border-l-4 border-accent"
          >
            <p className="italic text-lg font-medium text-gray-700 dark:text-gray-300">
              {seoContent.conclusion}
            </p>
          </motion.div>
        )}
        
        {/* Cobertura geográfica */}
        {includeLocalSEO && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden bg-gray-900 p-8 mb-12 relative"
          >
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-black to-gray-800"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-semibold text-white">
                  Cobertura geográfica de nuestros servicios de {servicioNombre}
                </h3>
              </div>
              
              <p className="text-gray-300 mb-8">
                Ofrecemos servicios de {servicioNombre} para {industriaNombre} en todo Chile, con presencia destacada en:
              </p>
              
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                {ciudades.map((ciudad, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span className="text-white">{ciudad}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-700">
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-accent" />
                  Contamos con personal y equipamiento disponible para atender sus necesidades de seguridad en cualquier ciudad del país.
                </p>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Enlaces relacionados */}
        <div className="mb-8">
          <motion.h3 
            className="text-xl font-semibold mb-6 text-center text-primary dark:text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Recursos relacionados con {servicioNombre}
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedLinks.map((link, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md hover:bg-accent/5 dark:hover:bg-accent/10 transition-all"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={link.url} className="block p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-full bg-accent/10">
                      {link.icon}
                    </div>
                    <h4 className="font-semibold text-primary dark:text-white">{link.title}</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {link.description}
                  </p>
                  <div className="flex items-center text-accent text-sm font-medium">
                    <span>Explorar</span>
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* CTA Final */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            className="bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-8 rounded-xl inline-flex items-center justify-center gap-2 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('cotizacion-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Solicita tu cotización personalizada
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 