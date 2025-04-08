"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin } from 'lucide-react';
import { getAllCiudades } from '@/lib/data/ciudad-data';
import { servicios } from '@/app/data/servicios';
import { industries } from '@/app/data/industries';

const ServiciosBuscador = () => {
  const router = useRouter();
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState<string>('');
  const [servicioSeleccionado, setServicioSeleccionado] = useState<string>('');
  const [industriaSeleccionada, setIndustriaSeleccionada] = useState<string>('');
  const [ciudades, setCiudades] = useState<{slug: string, nombre: string}[]>([]);
  
  useEffect(() => {
    // Cargar las ciudades al montar el componente
    try {
      const todasCiudades = getAllCiudades();
      setCiudades(todasCiudades.map(ciudad => ({
        slug: ciudad.slug,
        nombre: ciudad.nombre
      })));
    } catch (error) {
      console.error('Error al cargar ciudades:', error);
      setCiudades([]); // Establecer un array vacío en caso de error
    }
  }, []);

  const handleBuscar = () => {
    // Validar que al menos ciudad y servicio estén seleccionados
    if (!ciudadSeleccionada || !servicioSeleccionado) {
      return;
    }

    // Construir la URL según las selecciones
    try {
      if (industriaSeleccionada) {
        // Si hay una industria seleccionada, redirigir a la página de servicios por industria
        router.push(`/servicios-por-industria/${servicioSeleccionado}/${industriaSeleccionada}`);
      } else {
        // Si solo hay ciudad y servicio, redirigir a la página de ciudad/servicio
        router.push(`/ciudades/${ciudadSeleccionada}/${servicioSeleccionado}`);
      }
    } catch (error) {
      console.error('Error al redirigir:', error);
    }
  };

  // Servicios filtrados para evitar errores
  const serviciosFiltrados = servicios || [];
  // Industrias filtradas para evitar errores
  const industriasFiltradas = industries || [];

  return (
    <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="gard-container text-center">
        <h2 className="text-heading-2 mb-4">Encuentra el servicio ideal para tu empresa</h2>
        <p className="text-body-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
          Selecciona tu ubicación, el servicio que necesitas y tu industria para obtener soluciones personalizadas de seguridad.
        </p>
        
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
            {/* Selector de servicio */}
            <div>
              <label htmlFor="servicio-select" className="block text-sm font-medium text-left mb-2 text-gray-700 dark:text-gray-300">
                Servicio
              </label>
              <Select 
                value={servicioSeleccionado} 
                onValueChange={setServicioSeleccionado}
              >
                <SelectTrigger id="servicio-select" className="w-full h-12 rounded-xl">
                  <SelectValue placeholder="Selecciona un servicio" />
                </SelectTrigger>
                <SelectContent>
                  {serviciosFiltrados.map((servicio) => (
                    <SelectItem key={servicio.slug} value={servicio.slug}>
                      {servicio.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Selector de industria (opcional) */}
            <div>
              <label htmlFor="industria-select" className="block text-sm font-medium text-left mb-2 text-gray-700 dark:text-gray-300">
                Industria (opcional)
              </label>
              <Select 
                value={industriaSeleccionada} 
                onValueChange={setIndustriaSeleccionada}
              >
                <SelectTrigger id="industria-select" className="w-full h-12 rounded-xl">
                  <SelectValue placeholder="Selecciona una industria" />
                </SelectTrigger>
                <SelectContent>
                  {industriasFiltradas.map((industria) => (
                    <SelectItem 
                      key={industria.name.toLowerCase().replace(/\s+/g, '-')} 
                      value={industria.name.toLowerCase().replace(/\s+/g, '-')}
                    >
                      {industria.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Selector de ciudad */}
            <div>
              <label htmlFor="ciudad-select" className="block text-sm font-medium text-left mb-2 text-gray-700 dark:text-gray-300">
                Ciudad
              </label>
              <Select 
                value={ciudadSeleccionada} 
                onValueChange={setCiudadSeleccionada}
              >
                <SelectTrigger id="ciudad-select" className="w-full h-12 rounded-xl">
                  <SelectValue placeholder="Selecciona una ciudad" />
                </SelectTrigger>
                <SelectContent>
                  {ciudades.map((ciudad) => (
                    <SelectItem key={ciudad.slug} value={ciudad.slug}>
                      {ciudad.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Botón de búsqueda */}
          <button 
            onClick={handleBuscar}
            disabled={!ciudadSeleccionada || !servicioSeleccionado}
            className="w-full h-14 rounded-xl flex items-center justify-center gap-2 text-white bg-blue-500 hover:bg-orange-500 transition-all duration-300 font-medium text-base"
          >
            <Search className="h-5 w-5" />
            <span>Buscar soluciones</span>
          </button>
        </div>

        {/* Sección de ciudades donde operamos (opcional) */}
        <div className="mt-16">
          <h3 className="text-heading-4 mb-8">Ciudades donde operamos</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {ciudades.slice(0, 10).map((ciudad) => (
              <a 
                key={ciudad.slug}
                href={`/ciudades/${ciudad.slug}`}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md p-4 transition-all hover:scale-105 hover:border-primary/30 hover:border flex flex-col items-center justify-center h-24 group"
              >
                <MapPin className="h-5 w-5 text-primary dark:text-accent mb-1 group-hover:text-primary" />
                <span className="font-medium mb-1 group-hover:text-primary">
                  {ciudad.nombre}
                </span>
                <span className="text-xs text-muted-foreground group-hover:text-primary/70">Ver servicios</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiciosBuscador; 