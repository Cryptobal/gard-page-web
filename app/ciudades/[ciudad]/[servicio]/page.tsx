'use client';

import React, { useEffect } from 'react';
import { notFound, useParams, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ChevronDown,
  MapPin,
  Building,
  ChevronRight,
  Phone
} from 'lucide-react';
import { getCiudadBySlug } from '@/lib/data/ciudad-data';
import { getCiudadServicioContent } from '@/lib/data/ciudad-servicio';
import { servicesMetadata } from '@/app/servicios/serviceMetadata';
import getLandingText from '@/lib/data/landingText';
import { traducirSlugServicio } from '@/lib/servicios-mapping';
import CloudflareImage from '@/components/CloudflareImage';
import { cloudflareImages } from '@/lib/images';
import ClientesCarrusel from '@/components/ClientesCarrusel';
import LandingSteps from '@/components/landing/LandingSteps';
import LandingFAQ from '@/components/landing/LandingFAQ';
import LandingFeatures from '@/components/landing/LandingFeatures';
import DynamicCotizacionForm from '@/components/landing/DynamicCotizacionForm';
import SEOFAQ from '@/components/landing/SEOFAQ';
import getFAQsByService from '@/lib/data/faq';

// Función para obtener el componente de icono por nombre
const getIconByName = (iconName: string | undefined, index: number) => {
  // Si no hay nombre de icono, usar un icono por defecto según el índice
  if (!iconName) {
    return index === 0 ? <ShieldCheck className="text-accent" size={28} /> :
           index === 1 ? <Clock className="text-accent" size={28} /> :
                         <CheckCircle2 className="text-accent" size={28} />;
  }

  // Mapeo de nombres a componentes de iconos
  const iconMap: Record<string, React.ReactNode> = {
    'shield': <ShieldCheck className="text-accent" size={28} />,
    'clock': <Clock className="text-accent" size={28} />,
    'check-circle': <CheckCircle2 className="text-accent" size={28} />,
    'map': <MapPin className="text-accent" size={28} />,
    'building': <Building className="text-accent" size={28} />,
    'phone': <Phone className="text-accent" size={28} />
  };

  // Devolver el icono correspondiente o un icono por defecto
  return iconMap[iconName] || <ShieldCheck className="text-accent" size={28} />;
};

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
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export default function CiudadServicioPage({ params }: { params: { ciudad: string; servicio: string } }) {
  // Obtener datos de la ciudad y servicio
  const searchParams = useSearchParams();
  const ciudad = getCiudadBySlug(params.ciudad);
  const servicioMetadata = servicesMetadata.find(s => s.slug === params.servicio);
  
  // Si la ciudad o el servicio no existen, mostrar 404
  if (!ciudad || !servicioMetadata) {
    notFound();
  }
  
  // Traducir el slug de la URL al slug usado en los datos
  const servicioSlugDatos = traducirSlugServicio(params.servicio);
  
  // Obtener textos genéricos del servicio desde los datos correctos
  const servicioFormatted = getLandingText(params.servicio, servicioSlugDatos);
  
  // Obtener el contenido personalizado para ciudad-servicio
  const contenido = getCiudadServicioContent(params.ciudad, servicioSlugDatos, ciudad, servicioFormatted);
  
  // Si no hay contenido personalizado, mostrar 404
  if (!contenido) {
    notFound();
  }
  
  // Obtener FAQs para este servicio
  const faqs = getFAQsByService(params.servicio);
  
  // Guardar parámetros UTM en sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Capturar UTMs
      const utm_source = searchParams.get('utm_source');
      const utm_medium = searchParams.get('utm_medium');
      const utm_campaign = searchParams.get('utm_campaign');
      const utm_content = searchParams.get('utm_content');
      const utm_term = searchParams.get('utm_term');
      const gclid = searchParams.get('gclid');
      
      // Guardar en sessionStorage si existen
      if (utm_source) sessionStorage.setItem('utm_source', utm_source);
      if (utm_medium) sessionStorage.setItem('utm_medium', utm_medium);
      if (utm_campaign) sessionStorage.setItem('utm_campaign', utm_campaign);
      if (utm_content) sessionStorage.setItem('utm_content', utm_content);
      if (utm_term) sessionStorage.setItem('utm_term', utm_term);
      if (gclid) sessionStorage.setItem('gclid', gclid);
    }
  }, [searchParams]);
  
  // Función para manejar el scroll suave a secciones
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Botón flotante para móviles
  const FloatingButton = () => (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-4 z-50 md:hidden"
    >
      <button
        onClick={() => scrollToSection('cotizacion-form')}
        className="flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        <span>Cotiza Ahora</span> <ArrowRight size={18} className="animate-pulse" />
      </button>
    </motion.div>
  );
  
  return (
    <>
      {/* Cabecera con logo */}
      <header className="w-full bg-white dark:bg-gray-900 py-6 shadow-sm fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between">
          <Link href="/">
            <CloudflareImage
              imageId={cloudflareImages.logo.default}
              alt="Gard Security"
              width={150}
              height={50}
              priority
            />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/ciudades"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Ciudades
            </Link>
            <Link 
              href="/servicios"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Servicios
            </Link>
            <button
              onClick={() => scrollToSection('cotizacion-form')}
              className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg transition-all"
            >
              Cotizar
            </button>
          </nav>
        </div>
      </header>
      
      {/* Hero principal */}
      <section className="w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center text-primary-foreground/70 mb-2 overflow-visible flex-wrap">
            <Link href="/ciudades" className="hover:text-white whitespace-nowrap">Ciudades</Link>
            <ChevronRight size={16} className="mx-2" />
            <Link href={`/ciudades/${ciudad.slug}`} className="hover:text-white whitespace-nowrap">{ciudad.nombre}</Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="whitespace-normal">{servicioMetadata.title.split('|')[0].trim()}</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="space-y-6"
            >
              <span className="inline-block bg-accent/20 text-accent rounded-full px-4 py-1 text-sm font-medium">
                Seguridad en {ciudad.nombre}
              </span>
              <h1 className="text-4xl font-bold md:text-5xl text-white">
                {`${params.servicio.replace(/-/g, ' ').charAt(0).toUpperCase() + params.servicio.replace(/-/g, ' ').slice(1)} de Seguridad en ${ciudad.nombre} para Empresas`}
              </h1>
              <p className="text-xl text-gray-300">
                {contenido.intro || `Servicio profesional de ${params.servicio.replace(/-/g, ' ')} en ${ciudad.nombre}`}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection('cotizacion-form')}
                  className="bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-8 rounded-xl inline-flex items-center justify-center gap-2 transition-all hover:scale-105"
                >
                  Cotiza ahora <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl overflow-hidden shadow-xl hidden md:block"
            >
              {/* Implementación de soporte para video o imagen */}
              {contenido.videoId ? (
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="w-full h-[400px] object-cover"
                  poster={`https://imagedelivery.net/mJjkfe-z7gy41t90G63Wzw/${contenido.imageId || cloudflareImages.hero.services}/public`}
                  aria-label={`Servicio profesional de ${params.servicio.replace(/-/g, ' ')} en ${ciudad.nombre} - Gard Security Chile`}
                >
                  <source src={`https://videodelivery.net/${contenido.videoId}/manifest/video.m3u8`} type="application/x-mpegURL" />
                  <source src={`https://videodelivery.net/${contenido.videoId}/download`} type="video/mp4" />
                  {/* Fallback a imagen */}
                  <CloudflareImage
                    imageId={contenido.imageId || cloudflareImages.hero.services}
                    alt={`Servicio profesional de ${params.servicio.replace(/-/g, ' ')} en ${ciudad.nombre} - Protección y seguridad con Gard Security Chile`}
                    width={600}
                    height={400}
                    className="w-full h-[400px] object-cover"
                  />
                </video>
              ) : (
                <CloudflareImage
                  imageId={contenido.imageId || cloudflareImages.hero.services}
                  alt={`Servicio profesional de ${params.servicio.replace(/-/g, ' ')} en ${ciudad.nombre} - Protección y seguridad con Gard Security Chile`}
                  width={600}
                  height={400}
                  className="w-full h-[400px] object-cover"
                />
              )}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Descripción */}
      <section className="py-16 md:py-24 bg-white dark:bg-[hsl(var(--gard-background))]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-primary dark:text-white">
              {`Servicios de ${params.servicio.replace(/-/g, ' ')} profesionales en ${ciudad.nombre}`}
            </h2>
            <p className="text-body-lg text-muted-foreground">
              {contenido.descripcion}
            </p>
            
            {/* Si hay estadísticas de seguridad para esta ciudad, mostrarlas */}
            {contenido.estadisticas && (
              <div className="grid grid-cols-3 gap-4 mt-8 text-center">
                {contenido.estadisticas.indiceDelincuencia && (
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {contenido.estadisticas.indiceDelincuencia}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Índice de delincuencia
                    </div>
                  </div>
                )}
                
                {contenido.estadisticas.tipoDelincuenciaPrincipal && (
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                    <div className="text-xl font-semibold text-primary mb-1">
                      {contenido.estadisticas.tipoDelincuenciaPrincipal}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Tipo principal
                    </div>
                  </div>
                )}
                
                {contenido.estadisticas.incidenciaRobos && (
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {contenido.estadisticas.incidenciaRobos}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Robos por 1000 hab.
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>
      
      {/* Sección de pasos */}
      <LandingSteps 
        titulo={`¿Cómo implementamos nuestro servicio de ${params.servicio.replace(/-/g, ' ')} en ${ciudad.nombre}?`}
      />
      
      {/* Beneficios */}
      <section id="beneficios" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-primary dark:text-white">
              {`Beneficios de nuestros servicios de ${params.servicio.replace(/-/g, ' ')} en ${ciudad.nombre}`}
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Estos son los beneficios exclusivos que obtendrás al contratar nuestros servicios de {params.servicio.replace(/-/g, ' ')} en {ciudad.nombre}.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {contenido.beneficios.map((beneficio, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-full">
                    <CheckCircle2 className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{beneficio}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Características */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-primary dark:text-white">
              {`¿Por qué elegir Gard Security para servicios de ${params.servicio.replace(/-/g, ' ')} en ${ciudad.nombre}?`}
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Nuestras soluciones de seguridad están adaptadas específicamente para satisfacer las necesidades locales de {ciudad.nombre}.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {contenido.features && contenido.features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-sm"
              >
                <div className="mb-4 bg-accent/10 p-3 inline-block rounded-full">
                  {getIconByName(feature.iconName, index)}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Referencias locales si existen */}
      {contenido.referenciasLocales && (
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-primary dark:text-white">
                {`Cobertura en ${ciudad.nombre}`}
              </h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                {`Nuestros servicios de ${params.servicio.replace(/-/g, ' ')} cubren todas las áreas de ${ciudad.nombre}`}
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Barrios */}
              {contenido.referenciasLocales.barrios && contenido.referenciasLocales.barrios.length > 0 && (
                <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Building size={20} className="text-primary" />
                    Barrios y comunas
                  </h3>
                  <ul className="space-y-2">
                    {contenido.referenciasLocales.barrios.map((barrio, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        {barrio}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Zonas comerciales */}
              {contenido.referenciasLocales.zonasComerciales && contenido.referenciasLocales.zonasComerciales.length > 0 && (
                <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-primary" />
                    Zonas comerciales
                  </h3>
                  <ul className="space-y-2">
                    {contenido.referenciasLocales.zonasComerciales.map((zona, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        {zona}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Puntos de referencia */}
              {contenido.referenciasLocales.puntosReferencia && contenido.referenciasLocales.puntosReferencia.length > 0 && (
                <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <MapPin size={20} className="text-primary" />
                    Puntos de referencia
                  </h3>
                  <ul className="space-y-2">
                    {contenido.referenciasLocales.puntosReferencia.map((punto, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        {punto}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      
      {/* Casos de éxito si existen */}
      {contenido.casosExito && contenido.casosExito.length > 0 && (
        <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-primary dark:text-white">
                {`Casos de éxito en ${ciudad.nombre}`}
              </h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                {`Nuestro historial de servicios exitosos de ${params.servicio.replace(/-/g, ' ')} en ${ciudad.nombre}`}
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {contenido.casosExito.map((caso, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-sm">
                  <h3 className="text-xl font-semibold mb-2">{caso.cliente}</h3>
                  <p className="text-muted-foreground mb-4">{caso.descripcion}</p>
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="font-medium text-primary">Resultado: {caso.resultado}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Testimonios si existen */}
      {contenido.testimonios && contenido.testimonios.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-primary dark:text-white">
                {`Lo que nuestros clientes en ${ciudad.nombre} opinan`}
              </h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                {`Testimonios de clientes satisfechos con nuestros servicios de ${params.servicio.replace(/-/g, ' ')} en ${ciudad.nombre}`}
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {contenido.testimonios.map((testimonio, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                  <div className="mb-4">
                    <p className="text-gray-700 dark:text-gray-300 italic">"{testimonio.texto}"</p>
                  </div>
                  <div className="flex items-center gap-4">
                    {testimonio.imageId && (
                      <CloudflareImage
                        imageId={testimonio.imageId}
                        alt={testimonio.nombre}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-medium">{testimonio.nombre}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonio.cargo}, {testimonio.empresa}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Razones para elegir Gard Security */}
      <LandingFeatures 
        titulo={`Ventajas de nuestro servicio de ${params.servicio.replace(/-/g, ' ')} en ${ciudad.nombre}`}
      />
      
      {/* Clientes que confían en nosotros */}
      <ClientesCarrusel />
      
      {/* Preguntas frecuentes */}
      <section className="py-16 md:py-28 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <LandingFAQ 
            servicio={params.servicio} 
            titulo={`Preguntas frecuentes sobre ${params.servicio.replace(/-/g, ' ')} en ${ciudad.nombre}`}
          />
          
          {/* Agregar el componente de FAQ estructurado para SEO */}
          <SEOFAQ 
            faqs={faqs}
            industria={ciudad.nombre.toLowerCase()}
            servicio={params.servicio}
          />
        </div>
      </section>
      
      {/* CTA con formulario */}
      <section id="cotizacion" className="py-16 md:py-28 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="space-y-6"
            >
              <span className="inline-block bg-accent/20 text-accent rounded-full px-4 py-1 text-sm font-medium">
                Contacto directo
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-primary dark:text-white">
                {`Solicita tu cotización de ${params.servicio.replace(/-/g, ' ')} para ${ciudad.nombre}`}
              </h2>
              <p className="text-body-lg text-muted-foreground">
                Completa el formulario y un asesor especializado en {ciudad.nombre} te contactará a la brevedad para ofrecerte una solución personalizada.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-accent" size={20} />
                  <p>Respuesta en menos de 24 horas</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-accent" size={20} />
                  <p>Personal especializado en {ciudad.nombre}</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-accent" size={20} />
                  <p>Soluciones adaptadas a tu presupuesto</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg"
              id="cotizacion-form"
            >
              <h3 className="text-2xl font-semibold mb-6 text-primary dark:text-white">
                Solicitar cotización
              </h3>
              
              <DynamicCotizacionForm 
                industria={ciudad.nombre}
                servicio={params.servicio}
                ctaText={`Cotizar en ${ciudad.nombre}`}
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Botón flotante para móviles */}
      <FloatingButton />
    </>
  );
} 