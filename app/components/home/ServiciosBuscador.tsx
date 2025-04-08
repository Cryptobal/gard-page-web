"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin } from 'lucide-react';
import { getAllCiudades } from '@/lib/data/ciudad-data';
import { servicios } from '@/app/data/servicios';
import { industries } from '@/app/data/industries';

// Función para normalizar nombres a slugs (quitando acentos y caracteres especiales)
function normalizeName(name: string): string {
  return name.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
}

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
      if (industriaSeleccionada && industriaSeleccionada !== "todas") {
        // Si hay una industria seleccionada, redirigir a la página de servicios por industria
        // Usar slugs ya normalizados del industriesMetadata en vez de normalizar los nombres
        const slugIndustria = industriaSeleccionada;
        router.push(`/servicios-por-industria/${servicioSeleccionado}/${slugIndustria}`);
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
  const industriasFiltradas = industries || [];

  return (
    <section className="bg-white dark:bg-gray-800 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-heading-2 text-center mb-2">Encuentra tu solución de seguridad</h2>
        <p className="text-body-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          Selecciona tu ciudad, el tipo de servicio que necesitas y te mostraremos la mejor solución.
        </p>

        <div className="bg-[hsl(var(--gard-background))] dark:bg-gray-700 rounded-2xl p-6 md:p-8 shadow-md max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Selector de Ciudad */}
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Ciudad</label>
              <Select value={ciudadSeleccionada} onValueChange={setCiudadSeleccionada}>
                <SelectTrigger className="bg-white dark:bg-gray-800 h-14 rounded-xl">
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

            {/* Selector de Servicio */}
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Servicio requerido</label>
              <Select value={servicioSeleccionado} onValueChange={setServicioSeleccionado}>
                <SelectTrigger className="bg-white dark:bg-gray-800 h-14 rounded-xl">
                  <SelectValue placeholder="Tipo de servicio" />
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

            {/* Selector de Industria (opcional) */}
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Industria (opcional)</label>
              <Select value={industriaSeleccionada} onValueChange={setIndustriaSeleccionada}>
                <SelectTrigger className="bg-white dark:bg-gray-800 h-14 rounded-xl">
                  <SelectValue placeholder="Selecciona tu industria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Cualquier industria</SelectItem>
                  {industriasFiltradas.map((industria) => (
                    <SelectItem 
                      key={normalizeName(industria.name)} 
                      value={normalizeName(industria.name)}
                    >
                      {industria.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <button 
            onClick={handleBuscar}
            disabled={!ciudadSeleccionada || !servicioSeleccionado}
            className="w-full h-14 rounded-xl flex items-center justify-center gap-2 text-white bg-blue-500 hover:bg-orange-500 transition-all duration-300 font-medium text-base"
          >
            <Search className="h-5 w-5" />
            <span>Buscar soluciones</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiciosBuscador; 