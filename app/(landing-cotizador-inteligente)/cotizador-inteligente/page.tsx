'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CotizadorInteligenteV2 from '@/app/components/cotizador/CotizadorInteligenteV2';
import FAQsCotizador from '@/components/cotizador/FAQsCotizador';
import CloudflareImage from '@/components/CloudflareImage';
import CloudflareVideo from '@/components/CloudflareVideo';
import Link from 'next/link';
import { 
  ArrowRight, 
  Shield, 
  Clock, 
  Calculator, 
  HeadphonesIcon, 
  CheckCircle, 
  Star, 
  MessageSquare,
  ChevronRight,
  Users,
  BadgeCheck,
  Building
} from 'lucide-react';
import { cn } from '@/lib/utils';
import CountUp from 'react-countup';
import Script from 'next/script';

// IDs de imágenes para logos e imágenes
const LOGO_GARD_BLANCO = '49b89002-6bb9-41b9-50ad-e6b91e5f6d00';
const ESCUDO_GARD_BLANCO = 'f1cad221-0c11-43c4-3142-a53a6febbd00';
const HERO_VIDEO_ID = '173a0d7d07ffa39bb4c93e422d676e65';
const GUARDIA_IMAGEN_ID = '5eea1064-8a2d-4e8b-5606-d28775467a00'; // Imagen de guardia trabajando

// Definir el metadata directamente en este archivo para evitar problemas de importación
const metadataInfo = {
  title: 'Cotizador de Guardias de Seguridad | Calcula el Costo de tu Servicio | Gard Security',
  description: 'Calcula el costo de guardias de seguridad para tu empresa. Cotización instantánea y personalizada para servicios de seguridad industrial, retail, corporativa y más. Precios competitivos y cobertura 24/7.',
  keywords: [
    'cotizador guardias de seguridad',
    'servicios de seguridad para empresas',
    'guardias de seguridad industrial',
    'cotización seguridad privada',
    'precio guardias de seguridad',
    'seguridad para empresas',
    'guardias 24 horas',
    'servicios de seguridad corporativa',
    'cotización online seguridad',
    'guardias de seguridad retail'
  ],
  openGraph: {
    title: 'Cotizador de Guardias de Seguridad | Calcula el Costo de tu Servicio | Gard Security',
    description: 'Calcula el costo de guardias de seguridad para tu empresa. Cotización instantánea y personalizada para servicios de seguridad industrial, retail, corporativa y más.',
    url: 'https://gard.cl/cotizador-inteligente',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website',
  }
};

// Animación básica para cada sección
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Animación para los elementos de lista
const staggerChildrenVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5
    }
  }
};

// Componente lado cliente para forzar metadatos
const MetadataEnforcer = () => {
  useEffect(() => {
    // Función para forzar la aplicación de metadatos
    const forceMetadata = () => {
      if (typeof document !== 'undefined') {
        // Aplicar título explícitamente
        document.title = metadataInfo.title;
        
        // Aplicar metadescripción
        let descMeta = document.querySelector('meta[name="description"]');
        if (!descMeta) {
          descMeta = document.createElement('meta');
          descMeta.setAttribute('name', 'description');
          document.head.appendChild(descMeta);
        }
        descMeta.setAttribute('content', metadataInfo.description);
        
        // Aplicar Open Graph
        if (metadataInfo.openGraph) {
          const og = metadataInfo.openGraph;
          
          // OG Title
          let ogTitle = document.querySelector('meta[property="og:title"]');
          if (!ogTitle) {
            ogTitle = document.createElement('meta');
            ogTitle.setAttribute('property', 'og:title');
            document.head.appendChild(ogTitle);
          }
          ogTitle.setAttribute('content', og.title);
          
          // OG Description
          let ogDesc = document.querySelector('meta[property="og:description"]');
          if (!ogDesc) {
            ogDesc = document.createElement('meta');
            ogDesc.setAttribute('property', 'og:description');
            document.head.appendChild(ogDesc);
          }
          ogDesc.setAttribute('content', og.description);
        }

        // Agregar schema.org para el cotizador
        const schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';
        schemaScript.text = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Cotizador de Guardias de Seguridad",
          "description": "Calcula el costo de guardias de seguridad para tu empresa. Cotización instantánea y personalizada para servicios de seguridad industrial, retail, corporativa y más.",
          "brand": {
            "@type": "Brand",
            "name": "Gard Security"
          },
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "CLP",
            "availability": "https://schema.org/InStock"
          }
        });
        document.head.appendChild(schemaScript);

        // Agregar schema.org para las FAQs
        const faqSchemaScript = document.createElement('script');
        faqSchemaScript.type = 'application/ld+json';
        faqSchemaScript.text = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "¿Cómo funciona el cotizador de guardias de seguridad?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nuestro cotizador te permite calcular el costo de guardias de seguridad personalizando parámetros como tipo de turno, horario y número de puestos. Simplemente configura tus necesidades y obtén una cotización instantánea."
              }
            },
            {
              "@type": "Question",
              "name": "¿Qué tipos de servicios de seguridad puedo cotizar?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ofrecemos cotización para servicios de seguridad industrial, retail, corporativa, centros comerciales, hotelería, minería, tecnología, financiera y más. El cotizador se adapta a las necesidades específicas de cada sector."
              }
            },
            {
              "@type": "Question",
              "name": "¿Cuál es el costo de guardias de seguridad 24/7?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "El costo de guardias 24/7 varía según el sistema de turnos (4x4, 5x2, 7x7, 14x14) y el número de puestos. Nuestro cotizador te permite ver el costo exacto según tu configuración específica."
              }
            }
          ]
        });
        document.head.appendChild(faqSchemaScript);
      }
    };
    
    // Ejecutar inmediatamente y luego cada segundo durante 5 segundos para asegurar que se apliquen
    forceMetadata();
    const interval = setInterval(forceMetadata, 1000);
    const timeout = setTimeout(() => clearInterval(interval), 5000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);
  
  return null;
};

// Componente de Beneficios Iniciales con diseño mejorado
const BeneficiosIniciales = () => {
  const beneficios = [
    {
      icon: <Calculator className="h-12 w-12 text-orange-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Cotización en 1 minuto",
      description: "Configure turnos, cantidad de guardias y obtenga un estimado inmediato del costo mensual."
    },
    {
      icon: <Shield className="h-12 w-12 text-orange-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Ajuste exacto a tus necesidades",
      description: "Personaliza cada aspecto del servicio según tus requisitos específicos de seguridad."
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-orange-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Formulario ultra simple",
      description: "Solicita tu cotización formal con solo unos clics y recíbela en tu correo."
    },
    {
      icon: <HeadphonesIcon className="h-12 w-12 text-orange-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Asesoría inmediata",
      description: "Un ejecutivo especializado te contactará para resolver todas tus consultas."
    }
  ];

  return (
    <section className="py-16 w-full bg-gray-900" id="beneficios">
      <motion.div 
        className="max-w-7xl mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Beneficios de nuestro <span className="text-orange-500">servicio premium</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Diseñamos soluciones de seguridad integral para empresas con los más altos estándares de calidad.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {beneficios.map((beneficio, index) => (
            <motion.div
              key={index}
              className="group bg-gray-800 rounded-2xl p-6 text-center hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1
                  }
                }
              }}
            >
              <div className="flex justify-center mb-5">
                {beneficio.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{beneficio.title}</h3>
              <p className="text-gray-300">{beneficio.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// Componente de Beneficios Premium mejorado
const BeneficiosPremium = () => {
  return (
    <section className="py-20 w-full relative overflow-hidden" id="beneficios-premium">
      {/* Fondo con overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-95 z-0"></div>
      
      {/* Imagen de fondo con blur */}
      <div className="absolute inset-0 z-[-1] opacity-20">
        <CloudflareImage
          imageId={GUARDIA_IMAGEN_ID}
          alt="Guardia de seguridad profesional"
          fill
          className="object-cover blur-sm"
        />
      </div>
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="text-center mb-16">
          <motion.h2 
            className="flex flex-col md:inline-flex md:flex-row items-center justify-center text-3xl md:text-4xl font-bold mb-6 text-white"
            variants={fadeInUp}
          >
            <Shield className="mb-4 md:mb-0 md:mr-3 text-orange-500 h-8 w-8 md:h-10 md:w-10" />
            ¿Por qué elegir nuestro servicio premium?
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            En Gard Security combinamos experiencia, tecnología y profesionalismo para brindar un servicio superior.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <motion.div 
            className="bg-gray-800 bg-opacity-80 rounded-2xl p-8 shadow-xl"
            variants={fadeInUp}
          >
            <h3 className="text-xl font-bold mb-6 text-white border-b border-gray-700 pb-3">
              Nuestras ventajas competitivas
            </h3>
            <motion.ul 
              className="space-y-4"
              variants={staggerChildrenVariants}
            >
              {[
                'Guardias certificados y capacitados',
                'Supervisión permanente 24/7',
                'Tecnología de punta en seguridad',
                'Uniformes y equipamiento completo'
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center text-gray-200"
                  variants={itemVariants}
                >
                  <CheckCircle className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          
          <motion.div 
            className="bg-gray-800 bg-opacity-80 rounded-2xl p-8 shadow-xl"
            variants={fadeInUp}
          >
            <h3 className="text-xl font-bold mb-6 text-white border-b border-gray-700 pb-3">
              Beneficios para tu empresa
            </h3>
            <motion.ul 
              className="space-y-4"
              variants={staggerChildrenVariants}
            >
              {[
                'Reducción de costos operacionales',
                'Mayor tranquilidad para tu equipo',
                'Respuesta inmediata ante emergencias',
                'Informes detallados de incidentes'
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center text-gray-200"
                  variants={itemVariants}
                >
                  <CheckCircle className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
        
        <div className="text-center">
          <a 
            href="#cotizador" 
            className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Solicitar cotización personalizada <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

// Componente de Contador de Empresas
const ContadorEmpresas = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <motion.div 
      className="bg-[hsl(var(--gard-background))] py-8 border-t border-gray-700"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      onViewportEnter={() => setIsVisible(true)}
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-lg text-gray-300 mb-3">
          <span className="font-bold text-orange-500 text-2xl">
            {isVisible ? <CountUp end={27} duration={4} /> : 0}
          </span>
          {" "}empresas ya cotizaron este mes
        </p>
        <p className="text-sm text-gray-400">Gard Security: más de 50 empresas confían en nosotros para su protección.</p>
      </div>
    </motion.div>
  );
};

// Componente de botón sticky para móvil
const StickyMobileButton = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 500);
      
      // Detectar si el footer está visible o cerca para ocultar el CTA flotante
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        // Añadir margen de seguridad (100px) para que desaparezca antes de llegar al footer
        const isNearFooter = footerRect.top < window.innerHeight + 100;
        if (isNearFooter) {
          setIsScrolled(false);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className={cn(
      "fixed bottom-4 left-0 right-0 z-50 px-4 md:hidden transition-all duration-300",
      isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
    )}>
      <a 
        href="#cotizador" 
        className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-xl transition-colors"
      >
        Simular Cotización <Calculator className="w-5 h-5" />
      </a>
    </div>
  );
};

// Componente para forzar la carga de Google Analytics en esta página
const ForceGALoader = () => {
  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window !== 'undefined') {
      // Inicializar dataLayer si no existe
      window.dataLayer = window.dataLayer || [];
      
      // Añadir evento de página vista para asegurar que GTM capture esta página
      window.dataLayer.push({
        event: 'pageview',
        page: window.location.pathname,
        page_title: document.title
      });
      
      console.log('[ForceGALoader] Forzando inicialización de dataLayer en /cotizador-inteligente');
    }
  }, []);
  
  return (
    <>
      {/* Script GA4 directo como fallback */}
      <Script id="ga4-direct-script" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-W9QM4NMC');
        `}
      </Script>
    </>
  );
};

export default function CotizadorInteligentePage() {
  return (
    <>      
      {/* Componente para forzar metadatos */}
      <MetadataEnforcer />
      
      {/* Forzar la carga de Google Analytics */}
      <ForceGALoader />
      
      {/* Breadcrumb */}
      <nav className="bg-gray-50 dark:bg-gray-900 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-primary dark:hover:text-accent">
                Inicio
              </Link>
            </li>
            <li>
              <ChevronRight className="h-4 w-4" />
            </li>
            <li>
              <Link href="/servicios" className="hover:text-primary dark:hover:text-accent">
                Servicios
              </Link>
            </li>
            <li>
              <ChevronRight className="h-4 w-4" />
            </li>
            <li className="text-primary dark:text-accent">
              Cotizador de Guardias
            </li>
          </ol>
        </div>
      </nav>
      
      {/* Hero Section con Video de Fondo */}
      <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden pt-[100px] md:pt-[120px]">
        {/* Video de fondo */}
        <div className="absolute inset-0">
          <CloudflareVideo
            videoId={HERO_VIDEO_ID}
            autoplay={true}
            loop={true}
            muted={true}
            controls={false}
            className="w-full h-full object-cover"
          />
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div className="bg-gradient-to-t from-black/60 to-transparent absolute inset-0 z-10"></div>
        </div>
        
        {/* Contenido del Hero */}
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 max-w-7xl mx-auto">
          <h1 className="text-heading-1 text-white md:text-5xl font-bold leading-tight max-w-4xl mb-6">
            Cotizador de Guardias de Seguridad para Empresas
          </h1>
          <p className="text-body-lg text-white max-w-2xl mb-8">
            Calcula el costo de guardias de seguridad para tu empresa. Cotización instantánea y personalizada para servicios de seguridad industrial, retail, corporativa y más. Precios competitivos y cobertura 24/7.
          </p>
        </div>
      </section>

      {/* Sección de Beneficios Iniciales */}
      <BeneficiosIniciales />
      
      {/* Cotizador inteligente con diseño mejorado */}
      <section id="cotizador" className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            {/* Ícono añadido sobre el título */}
            <motion.div 
              className="inline-flex items-center justify-center mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Calculator className="h-10 w-10 text-orange-500" />
              </div>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Calculadora de Costos para Servicios de Seguridad
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Personaliza los parámetros según tus necesidades de seguridad y obtén un estimado del costo mensual de guardias para tu empresa
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <CotizadorInteligenteV2 />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
          </motion.div>
        </div>
      </section>
      
      {/* Beneficios Premium */}
      <BeneficiosPremium />
      
      {/* Testimonios y Casos de Éxito */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Empresas que confían en nuestros servicios
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Más de 50 empresas de diferentes sectores han elegido nuestros servicios de seguridad
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                empresa: "Retail Nacional",
                sector: "Comercio",
                testimonio: "La implementación de guardias de seguridad ha mejorado significativamente la seguridad en nuestros locales. El servicio es profesional y la atención es excelente.",
                logo: "retail-logo"
              },
              {
                empresa: "Empresa Industrial",
                sector: "Manufactura",
                testimonio: "Los guardias están altamente capacitados y el servicio 24/7 nos da la tranquilidad que necesitamos para operar con seguridad.",
                logo: "industrial-logo"
              },
              {
                empresa: "Centro Comercial",
                sector: "Retail",
                testimonio: "La cobertura completa y el profesionalismo de los guardias han mejorado la experiencia de nuestros visitantes y la seguridad del centro.",
                logo: "mall-logo"
              }
            ].map((testimonio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                    <Building className="h-6 w-6 text-primary dark:text-accent" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {testimonio.empresa}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonio.sector}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "{testimonio.testimonio}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Preguntas frecuentes */}
      <section id="faqs" className="py-20 bg-gray-50 dark:bg-gray-900">
        <motion.div 
          className="max-w-4xl mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="text-center mb-12">
            <motion.div 
              className="inline-flex items-center justify-center mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-orange-600 dark:text-orange-500" />
              </div>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Resolvemos tus dudas sobre nuestros servicios de seguridad
            </p>
          </div>
          
          <motion.div
            variants={staggerChildrenVariants}
          >
            <FAQsCotizador />
          </motion.div>
        </motion.div>
      </section>
      
      {/* Contador de empresas */}
      <ContadorEmpresas />
    </>
  );
} 