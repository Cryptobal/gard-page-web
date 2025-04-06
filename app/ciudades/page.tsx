'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ciudades, getCiudadesByRegion } from '@/lib/data/ciudad-data';
import { servicesMetadata } from '../servicios/serviceMetadata';
import { 
  MapPin, 
  Building, 
  ChevronRight, 
  ArrowRight, 
  Search,
  Shield,
  Camera,
  Scan,
  Plane,
  Lock,
  FileSearch,
  HelpCircle,
  ShieldCheck,
  UserCog,
  Home,
  X,
  Users,
  Map,
  Pin,
  Globe,
  Clock,
  Filter
} from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import { cloudflareImages } from '@/lib/images';

// Tipo para una ciudad
interface Ciudad {
  id: number;
  nombre: string;
  slug: string;
  region: string;
  poblacion: number;
  descripcion: string;
  industrias: string[];
  caracteristicas: string[];
  imageId?: string;
}

// Agrupar ciudades por región
const agruparCiudadesPorRegion = () => {
  const regiones: { [key: string]: typeof ciudades } = {};
  
  ciudades.forEach(ciudad => {
    if (!regiones[ciudad.region]) {
      regiones[ciudad.region] = [];
    }
    regiones[ciudad.region].push(ciudad);
  });
  
  return regiones;
};

// Mapeo de servicios a iconos y categorías
const serviciosCategorizados = {
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

// Mapeo de íconos para regiones
const regionIcons: Record<string, React.ReactNode> = {
  "Metropolitana": <Building className="h-5 w-5" />,
  "Valparaíso": <Map className="h-5 w-5" />,
  "Biobío": <Globe className="h-5 w-5" />,
  "Antofagasta": <Shield className="h-5 w-5" />,
  "Coquimbo": <Plane className="h-5 w-5" />,
  "Los Lagos": <Map className="h-5 w-5" />,
  "Atacama": <Shield className="h-5 w-5" />,
  "Ñuble": <Globe className="h-5 w-5" />,
  "O'Higgins": <Building className="h-5 w-5" />,
  "Maule": <Map className="h-5 w-5" />,
  "Arica y Parinacota": <Pin className="h-5 w-5" />,
  "Tarapacá": <Globe className="h-5 w-5" />,
  "La Araucanía": <Shield className="h-5 w-5" />,
  "Los Ríos": <Map className="h-5 w-5" />,
  "Magallanes": <Plane className="h-5 w-5" />,
  "Aysén": <Globe className="h-5 w-5" />
};

// Componente de tarjeta de ciudad
const CiudadCard = ({ ciudad, onSelect }: { ciudad: Ciudad, onSelect: (ciudad: Ciudad) => void }) => {
  const serviciosDisponibles = servicesMetadata.length;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer"
      onClick={() => onSelect(ciudad)}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-primary mr-2 mt-1" />
            <h3 className="font-medium text-heading-5">{ciudad.nombre}</h3>
          </div>
          <span className="text-xs bg-primary/10 text-primary dark:bg-primary/20 dark:text-accent px-2 py-1 rounded-full">
            {serviciosDisponibles} servicios
          </span>
        </div>
        
        {ciudad.industrias.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {ciudad.industrias.slice(0, 2).map((industria, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
              >
                {industria.replace(/-/g, ' ')}
              </span>
            ))}
            {ciudad.industrias.length > 2 && (
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                +{ciudad.industrias.length - 2}
              </span>
            )}
          </div>
        )}
        
        <div className="flex justify-end items-center text-primary dark:text-accent text-sm font-medium group mt-2">
          <span>Explorar</span>
          <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
};

// Componente de modal de ciudad
const CiudadModal = ({ 
  ciudad, 
  onClose,
  regionSeleccionada
}: { 
  ciudad: Ciudad | null, 
  onClose: () => void,
  regionSeleccionada: string | null
}) => {
  if (!ciudad) return null;
  
  // Obtener servicios
  const todosServicios = servicesMetadata;
  const serviciosPorCategoria: Record<string, typeof servicesMetadata> = {};
  
  // Agrupar servicios por categoría
  Object.keys(serviciosCategorizados).forEach(categoria => {
    const slugsEnCategoria = serviciosCategorizados[categoria as keyof typeof serviciosCategorizados].map(s => s.slug);
    serviciosPorCategoria[categoria] = todosServicios.filter(s => slugsEnCategoria.includes(s.slug));
  });
  
  // Obtener ícono para un servicio
  const getServicioIcon = (slug: string) => {
    for (const categoria of Object.values(serviciosCategorizados)) {
      const servicio = categoria.find(s => s.slug === slug);
      if (servicio) return servicio.icon;
    }
    return <Shield className="h-5 w-5" />;
  };
  
  // Obtener color para un servicio
  const getServicioColor = (slug: string) => {
    for (const categoria of Object.values(serviciosCategorizados)) {
      const servicio = categoria.find(s => s.slug === slug);
      if (servicio) return servicio.color;
    }
    return 'bg-blue-50 dark:bg-blue-900/20';
  };
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Breadcrumbs */}
        <div className="px-6 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center text-sm">
          <Link href="/" className="text-gray-500 hover:text-primary flex items-center">
            <Home className="h-3.5 w-3.5 mr-1" />
            <span>Inicio</span>
          </Link>
          <ChevronRight size={12} className="mx-2 text-gray-400" />
          <Link href="/ciudades" className="text-gray-500 hover:text-primary">
            Ciudades
          </Link>
          {regionSeleccionada && (
            <>
              <ChevronRight size={12} className="mx-2 text-gray-400" />
              <span className="text-gray-500">{regionSeleccionada}</span>
            </>
          )}
          <ChevronRight size={12} className="mx-2 text-gray-400" />
          <span className="text-primary font-medium">{ciudad.nombre}</span>
        </div>
        
        {/* Botón de cierre */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors z-10"
        >
          <X className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        </button>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Columna izquierda */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <MapPin className="h-6 w-6 text-primary mr-2" />
                {ciudad.nombre}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {ciudad.descripcion}
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Servicios disponibles en {ciudad.nombre}
              </h3>
              
              <div className="space-y-4">
                {Object.entries(serviciosPorCategoria).map(([categoria, servicios]) => (
                  servicios.length > 0 && (
                    <div key={categoria} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <h4 className="text-lg font-medium text-gray-800 dark:text-white flex items-center mb-3">
                        {categoria === "Protección Humana" && <Users className="h-5 w-5 mr-2 text-blue-600" />}
                        {categoria === "Tecnología de Vigilancia" && <Camera className="h-5 w-5 mr-2 text-green-600" />}
                        {categoria === "Consultoría" && <FileSearch className="h-5 w-5 mr-2 text-orange-600" />}
                        {categoria}
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {servicios.map(servicio => (
                          <Link
                            key={servicio.slug}
                            href={`/ciudades/${ciudad.slug}/${servicio.slug}`}
                            className={`flex items-center p-3 rounded-lg ${getServicioColor(servicio.slug)} hover:shadow-sm transition-all`}
                          >
                            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm mr-3">
                              {getServicioIcon(servicio.slug)}
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800 dark:text-white text-sm">
                                {servicio.title.split('|')[0].trim()}
                              </h5>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
            
            {/* Columna derecha */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 sticky top-4">
                <h4 className="font-medium text-gray-800 dark:text-white mb-4 flex items-center">
                  <Building className="h-5 w-5 text-primary mr-2" />
                  Ficha Técnica
                </h4>
                
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
                
                <h4 className="font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  Industrias principales
                </h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {ciudad.industrias.map((industria, index) => (
                    <span 
                      key={index}
                      className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-accent px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {industria.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
                
                <div className="mt-4 space-y-3">
                  <Link 
                    href={`/cotizar?ciudad=${ciudad.slug}`}
                    className="gard-btn gard-btn-primary gard-btn-md inline-flex items-center w-full justify-center"
                  >
                    Cotizar en {ciudad.nombre}
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                  <Link 
                    href={`/ciudades/${ciudad.slug}`}
                    className="gard-btn gard-btn-outline gard-btn-md inline-flex items-center w-full justify-center"
                  >
                    Ver página completa
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function CiudadesPage() {
  const regionesCiudades = agruparCiudadesPorRegion();
  const [regionSeleccionada, setRegionSeleccionada] = useState<string | null>(null);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState<Ciudad | null>(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  
  // Obtener lista de regiones
  const regiones = Object.keys(regionesCiudades);
  
  // Obtener ciudades filtradas
  const ciudadesFiltradas = regionSeleccionada 
    ? regionesCiudades[regionSeleccionada] 
    : Object.values(regionesCiudades).flat();
  
  // Efecto para manejar overflow del body al abrir el modal
  useEffect(() => {
    if (ciudadSeleccionada) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [ciudadSeleccionada]);
  
  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  
  return (
    <>
      {/* Breadcrumbs SEO */}
      <nav className="gard-container flex items-center py-4 text-sm">
        <Link href="/" className="flex items-center text-gray-500 hover:text-primary">
          <Home className="h-4 w-4 mr-1" />
          <span>Inicio</span>
        </Link>
        <ChevronRight size={14} className="mx-2 text-gray-400" />
        <span className="text-primary font-medium">Ciudades</span>
        {regionSeleccionada && (
          <>
            <ChevronRight size={14} className="mx-2 text-gray-400" />
            <span className="text-primary font-medium">{regionSeleccionada}</span>
          </>
        )}
      </nav>

      {/* Hero principal */}
      <section className="gard-hero min-h-[40vh] md:min-h-[50vh] flex flex-col justify-center items-center">
        {/* Overlay para contraste */}
        <div className="gard-hero-overlay"></div>
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div className="bg-gradient-to-t from-black/50 to-transparent absolute inset-0 z-10"></div>
        
        <div className="gard-hero-content text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight"
          >
            Servicios de Seguridad en {regionSeleccionada ? `${regionSeleccionada}` : 'Todo Chile'}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto mb-8"
          >
            Ofrecemos soluciones de seguridad adaptadas a las necesidades específicas de cada ciudad.
            {!regionSeleccionada && ' Selecciona una región para comenzar.'}
          </motion.p>
        </div>
        
        <div className="absolute inset-0 -z-10">
          <CloudflareImage
            imageId={cloudflareImages.hero.home}
            alt="Servicios de seguridad en Chile"
            fill
            priority
            objectFit="cover"
            objectPosition="center center"
          />
        </div>
      </section>
      
      <div className="gard-section pt-8 pb-16">
        <div className="gard-container">
          {/* Selector de regiones - Mobile */}
          <div className="md:hidden mb-6">
            <button
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="flex items-center justify-between w-full p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <span className="font-medium">
                {regionSeleccionada ? `Región: ${regionSeleccionada}` : 'Seleccionar región'}
              </span>
              <Filter size={20} className="text-primary" />
            </button>
            
            <AnimatePresence>
              {showMobileFilter && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
                >
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setRegionSeleccionada(null);
                        setShowMobileFilter(false);
                      }}
                      className={`w-full text-left p-2 rounded-md ${!regionSeleccionada ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} mb-1`}
                    >
                      Todas las regiones
                    </button>
                    
                    {regiones.map(region => (
                      <button
                        key={region}
                        onClick={() => {
                          setRegionSeleccionada(region);
                          setShowMobileFilter(false);
                        }}
                        className={`w-full text-left p-2 rounded-md ${regionSeleccionada === region ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} mb-1 flex items-center`}
                      >
                        <span className="mr-2">{regionIcons[region]}</span>
                        {region}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Selector de regiones - Desktop */}
            <div className="hidden md:block">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 sticky top-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Regiones</h2>
                
                <div className="space-y-1">
                  <button
                    onClick={() => setRegionSeleccionada(null)}
                    className={`w-full text-left p-2 rounded-md ${!regionSeleccionada ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    Todas las regiones
                  </button>
                  
                  {regiones.map(region => (
                    <button
                      key={region}
                      onClick={() => setRegionSeleccionada(region)}
                      className={`w-full text-left p-2 rounded-md ${regionSeleccionada === region ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} flex items-center`}
                    >
                      <span className={`mr-2 ${regionSeleccionada === region ? 'text-white' : 'text-primary'}`}>
                        {regionIcons[region]}
                      </span>
                      {region}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Lista de ciudades */}
            <div className="md:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  {regionSeleccionada 
                    ? `Ciudades en ${regionSeleccionada}` 
                    : 'Todas las ciudades'}
                </h2>
                <span className="text-gray-500 dark:text-gray-400">
                  {ciudadesFiltradas.length} ciudades
                </span>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={regionSeleccionada || 'all'}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {ciudadesFiltradas.map(ciudad => (
                    <CiudadCard 
                      key={ciudad.id} 
                      ciudad={ciudad} 
                      onSelect={(ciudad) => setCiudadSeleccionada(ciudad)} 
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de ciudad */}
      <AnimatePresence>
        {ciudadSeleccionada && (
          <CiudadModal 
            ciudad={ciudadSeleccionada} 
            onClose={() => setCiudadSeleccionada(null)}
            regionSeleccionada={regionSeleccionada}
          />
        )}
      </AnimatePresence>
    </>
  );
} 