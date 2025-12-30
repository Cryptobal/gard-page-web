'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Building, 
  Shield, 
  ChevronRight, 
  ArrowRight,
  Home,
  Camera,
  Scan,
  Plane,
  Lock,
  FileSearch,
  HelpCircle,
  ShieldCheck,
  UserCog,
  Phone,
  Clock,
  Users,
  BadgeCheck
} from 'lucide-react';
import { getCiudadBySlug } from '@/lib/data/ciudad-data';
import { servicesMetadata } from '@/app/servicios/serviceMetadata';
import CloudflareImage from '@/components/CloudflareImage';
import { cloudflareImages } from '@/lib/images';
import { Button } from '@/components/ui/button';

// Tipo para un servicio
interface Servicio {
  slug: string;
  title: string;
  description: string;
  keywords?: string[];
  icon?: React.ReactNode;
  color?: string;
}

// Tipo para un servicio categorizado
interface ServicioCategorizado {
  slug: string;
  icon: React.ReactNode;
  title: string;
  color: string;
}

// Tipo para las categorías de servicios
interface CategoriaServicios {
  [categoria: string]: ServicioCategorizado[];
}

// Mapeo de servicios a iconos y categorías
const serviciosCategorizados: CategoriaServicios = {
  "Protección Humana": [
    { 
      slug: 'guardias-de-seguridad', 
      icon: <Shield className="h-5 w-5 text-primary" />,
      title: 'Guardias de Seguridad',
      color: 'bg-blue-50 dark:bg-blue-900/20'
    }
  ],
  "Tecnología de Vigilancia": [
    { 
      slug: 'seguridad-electronica', 
      icon: <Camera className="h-5 w-5 text-emerald-600" />,
      title: 'Seguridad Electrónica',
      color: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    { 
      slug: 'central-monitoreo', 
      icon: <Scan className="h-5 w-5 text-indigo-600" />,
      title: 'Central de Monitoreo',
      color: 'bg-indigo-50 dark:bg-indigo-900/20'
    },
    { 
      slug: 'drones-seguridad', 
      icon: <Plane className="h-5 w-5 text-amber-600" />,
      title: 'Drones de Seguridad',
      color: 'bg-amber-50 dark:bg-amber-900/20'
    },
    { 
      slug: 'seguridad-perimetral', 
      icon: <Lock className="h-5 w-5 text-red-600" />,
      title: 'Seguridad Perimetral',
      color: 'bg-red-50 dark:bg-red-900/20'
    },
    { 
      slug: 'prevencion-intrusiones', 
      icon: <ShieldCheck className="h-5 w-5 text-purple-600" />,
      title: 'Prevención de Intrusiones',
      color: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ],
  "Consultoría": [
    { 
      slug: 'auditoria-seguridad', 
      icon: <FileSearch className="h-5 w-5 text-sky-600" />,
      title: 'Auditoría de Seguridad',
      color: 'bg-sky-50 dark:bg-sky-900/20'
    },
    { 
      slug: 'consultoria', 
      icon: <UserCog className="h-5 w-5 text-orange-600" />,
      title: 'Consultoría Especializada',
      color: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ]
};

// Función para clasificar los servicios por categoría
const getServiciosPorCategoria = (servicios: Servicio[]): Record<string, Servicio[]> => {
  const resultado: Record<string, Servicio[]> = {};
  
  // Inicializar las categorías
  Object.keys(serviciosCategorizados).forEach(categoria => {
    resultado[categoria] = [];
  });
  
  // Clasificar cada servicio
  servicios.forEach(servicio => {
    for (const [categoria, items] of Object.entries(serviciosCategorizados)) {
      const encontrado = items.find(item => item.slug === servicio.slug);
      if (encontrado) {
        resultado[categoria].push({
          ...servicio,
          icon: encontrado.icon,
          color: encontrado.color
        });
        break;
      }
    }
  });
  
  // Filtrar categorías vacías
  return Object.fromEntries(
    Object.entries(resultado).filter(([_, servicios]) => servicios.length > 0)
  );
};

// Obtener icono para un servicio específico
const getServicioIcon = (slug: string): React.ReactNode => {
  for (const categoria of Object.values(serviciosCategorizados)) {
    const servicio = categoria.find(s => s.slug === slug);
    if (servicio) return servicio.icon;
  }
  return <Shield className="h-5 w-5 text-primary" />; // Icono por defecto
};

// Obtener color para un servicio específico
const getServicioColor = (slug: string): string => {
  for (const categoria of Object.values(serviciosCategorizados)) {
    const servicio = categoria.find(s => s.slug === slug);
    if (servicio) return servicio.color;
  }
  return 'bg-blue-50 dark:bg-blue-900/20'; // Color por defecto
};

// Next.js 15: En Client Components, usar useParams() en lugar de props
export default function CiudadPage() {
  const routeParams = useParams();
  const params = { ciudad: routeParams.ciudad as string };
  
  const ciudad = getCiudadBySlug(params.ciudad);
  const [servicioSeleccionado, setServicioSeleccionado] = useState<string | null>(null);
  
  // Si la ciudad no existe, mostrar página 404 personalizada
  if (!ciudad) {
    return (
      <div className="min-h-screen gard-container py-16 md:py-24 text-center">
        <h1 className="text-heading-2 mb-6">Ciudad no encontrada</h1>
        <p className="text-body-lg mb-8 max-w-2xl mx-auto">
          Lo sentimos, la ciudad que estás buscando no está disponible.
          Es posible que la URL haya cambiado o que la página haya sido eliminada.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/ciudades"
            className="gard-btn gard-btn-primary inline-flex items-center justify-center"
          >
            <span>Ver todas las ciudades</span>
          </Link>
          <Link
            href="/"
            className="gard-btn gard-btn-outline inline-flex items-center justify-center"
          >
            <span>Volver al Inicio</span>
          </Link>
        </div>
      </div>
    );
  }
  
  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  
  const servicios = servicesMetadata as Servicio[];
  const serviciosPorCategoria = getServiciosPorCategoria(servicios);
  
  return (
    <div className="min-h-screen">
      {/* Botón de cotización flotante */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button asChild variant="gard-primary" size="lg" className="shadow-lg rounded-full flex items-center gap-2 px-6">
          <Link href={`/cotizar?ciudad=${ciudad.slug}`}>
            <Phone className="h-5 w-5" />
            Cotizar en {ciudad.nombre}
          </Link>
        </Button>
      </div>

      {/* Breadcrumbs SEO */}
      <nav className="gard-container flex items-center py-4 text-sm">
        <Link href="/" className="flex items-center text-gray-500 hover:text-primary">
          <Home className="h-4 w-4 mr-1" />
          <span>Inicio</span>
        </Link>
        <ChevronRight size={14} className="mx-2 text-gray-400" />
        <Link href="/ciudades" className="text-gray-500 hover:text-primary">
          Ciudades
        </Link>
        <ChevronRight size={14} className="mx-2 text-gray-400" />
        <span className="text-primary font-medium">{ciudad.nombre}</span>
      </nav>

      {/* Hero principal */}
      <section className="gard-hero min-h-[60vh] flex flex-col justify-center items-center">
        {/* Overlay para contraste */}
        <div className="gard-hero-overlay"></div>
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div className="bg-gradient-to-t from-black/50 to-transparent absolute inset-0 z-10"></div>
        
        <div className="gard-hero-content text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
            Servicios de Seguridad en {ciudad.nombre}
          </h1>
          
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            {ciudad.descripcion}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto">
            <Button asChild variant="gard-outline" size="lg" className="w-full sm:flex-1 bg-transparent border-white text-white hover:bg-white/20">
              <Link href={`#servicios-${ciudad.slug}`}>
                Ver Servicios
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="gard-primary" size="lg" className="w-full sm:flex-1">
              <Link href="/cotizar">
                Cotizar Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="absolute inset-0 -z-10">
          <CloudflareImage
            imageId={cloudflareImages.hero.home}
            alt={`Seguridad en ${ciudad.nombre}`}
            fill
            priority
            objectFit="cover"
            objectPosition="center center"
          />
        </div>
      </section>
      
      <div className="gard-section">
        <div className="gard-container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="col-span-2" id={`servicios-${ciudad.slug}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-heading-3 flex items-center gap-2 text-primary">
                  <Shield className="text-primary h-6 w-6" />
                  Servicios en {ciudad.nombre}
                </h2>
                {/* Micro-filtro de servicios */}
                <div className="flex gap-2 overflow-x-auto pb-2 max-w-xs lg:max-w-md">
                  <button 
                    onClick={() => setServicioSeleccionado(null)}
                    className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap ${!servicioSeleccionado ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                  >
                    Todos
                  </button>
                  {Object.keys(serviciosPorCategoria).map(categoria => (
                    <button 
                      key={categoria}
                      onClick={() => setServicioSeleccionado(categoria)}
                      className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap ${servicioSeleccionado === categoria ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                    >
                      {categoria}
                    </button>
                  ))}
                </div>
              </div>
              
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-8"
              >
                {Object.entries(serviciosPorCategoria)
                  .filter(([categoria]) => !servicioSeleccionado || categoria === servicioSeleccionado)
                  .map(([categoria, serviciosCategoria]) => (
                  <div key={categoria}>
                    <h3 className="text-heading-4 mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                      {categoria === "Protección Humana" && <Users className="h-5 w-5 mr-2 text-blue-600" />}
                      {categoria === "Tecnología de Vigilancia" && <Camera className="h-5 w-5 mr-2 text-green-600" />}
                      {categoria === "Consultoría" && <FileSearch className="h-5 w-5 mr-2 text-orange-600" />}
                      {categoria}
                    </h3>
                    <div className="gard-grid-2 gap-6">
                      {serviciosCategoria.map((servicio: Servicio) => (
                        <motion.div key={servicio.slug} variants={itemVariants}>
                          <Link 
                            href={`/ciudades/${ciudad.slug}/${servicio.slug}`}
                            className={`block p-6 rounded-xl hover:shadow-md transition-all hover:scale-[1.01] border border-gray-100 dark:border-gray-700 ${servicio.color}`}
                          >
                            <div className="flex items-center mb-4">
                              <div className="h-10 w-10 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm">
                                {servicio.icon}
                              </div>
                              <h3 className="font-medium text-primary dark:text-accent text-heading-5 ml-3">
                                {servicio.title.split('|')[0].trim()}
                              </h3>
                            </div>
                            <p className="text-body-base text-gray-600 dark:text-gray-300 mb-4">
                              {servicio.description.length > 120 
                                ? `${servicio.description.substring(0, 120)}...` 
                                : servicio.description}
                            </p>
                            <div className="flex items-center text-primary dark:text-accent font-medium group mt-2">
                              <span>Ver detalles en {ciudad.nombre}</span>
                              <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            <div>
              <h2 className="text-heading-3 mb-6 flex items-center gap-2 text-primary">
                <MapPin className="text-primary h-6 w-6" />
                Acerca de {ciudad.nombre}
              </h2>
              
              <div className="gard-card p-6 mb-6">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 text-heading-5 mb-4 flex items-center">
                  <Building className="h-5 w-5 text-primary mr-2" />
                  Ficha Técnica
                </h3>
                
                <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-4 mb-4">
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-500 dark:text-gray-400">Región</span>
                    <span className="font-medium">{ciudad.region}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-500 dark:text-gray-400">Población</span>
                    <span className="font-medium">{ciudad.poblacion.toLocaleString()} <span className="text-xs text-gray-500">habitantes</span></span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-500 dark:text-gray-400">Cobertura</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      <Clock className="inline h-4 w-4 mr-1" />24/7
                    </span>
                  </div>
                </div>
                
                <h3 className="font-medium text-gray-800 dark:text-gray-200 text-heading-5 mb-4 flex items-center">
                  <BadgeCheck className="h-5 w-5 text-primary mr-2" />
                  Características
                </h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-3 mb-6">
                  {ciudad.necesidadesSeguridad.map((caracteristica, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary mt-1.5 mr-2"></span>
                      {caracteristica}
                    </li>
                  ))}
                </ul>
                
                <h3 className="font-medium text-gray-800 dark:text-gray-200 text-heading-5 mb-4 flex items-center">
                  <Building className="h-5 w-5 text-primary mr-2" />
                  Industrias principales
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {ciudad.industriasClave.map((industria, index) => (
                    <span 
                      key={index}
                      className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-accent px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {industria.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="gard-card p-6 sticky top-6">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 text-heading-5 mb-4 flex items-center">
                  <HelpCircle className="h-5 w-5 text-primary mr-2" />
                  ¿Necesitas un servicio personalizado?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Contáctanos para recibir asesoría especializada sobre seguridad en {ciudad.nombre}.
                </p>
                <div className="space-y-3">
                  <Button asChild variant="gard-primary" size="sm" className="w-full justify-center inline-flex items-center">
                    <Link href={`/cotizar?ciudad=${ciudad.slug}`}>
                      Solicitar cotización
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="gard-outline" size="sm" className="w-full justify-center inline-flex items-center">
                    <Link href="/contacto">
                      Contactar asesor
                      <Phone size={16} className="ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 