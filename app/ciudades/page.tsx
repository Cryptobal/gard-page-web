'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ciudades, getAllCiudades, getCiudadesByRegion, CiudadData } from '@/lib/data/ciudad-data';
import { servicesMetadata } from '../servicios/serviceMetadata';
import { 
  MapPin, 
  X, 
  ChevronDown, 
  ChevronRight, 
  Users, 
  Building, 
  Shield, 
  Calendar, 
  Search, 
  HelpCircle, 
  ArrowRight, 
  Phone,
  Home
} from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import { cloudflareImages } from '@/lib/images';

// Definimos los tipos
interface Ciudad extends CiudadData {}

// Versión simplificada para permitir la compilación
export default function CiudadesPage() {
  const [regionSeleccionada, setRegionSeleccionada] = useState<string | null>(null);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState<Ciudad | null>(null);
  
  // Función para agrupar ciudades por región
  const agruparCiudadesPorRegion = () => {
    return getCiudadesByRegion();
  };
  
  return (
    <>
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Cobertura Nacional de Seguridad Privada</h1>
          <p className="text-xl text-muted-foreground dark:text-gray-300 mb-4">
            Gard Security opera en 10 ciudades de Chile con guardias certificados OS10, monitoreo 24/7 y soluciones adaptadas a cada región. Cotiza servicios de seguridad en tu ciudad.
          </p>
          <p className="text-base text-muted-foreground dark:text-gray-400 mb-8">
            Santiago, Antofagasta, Valparaíso, Concepción, Iquique, Puerto Montt, Rancagua, Chillán, Temuco y Viña del Mar.
          </p>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {getAllCiudades().map((ciudad) => (
              <Link 
                key={ciudad.slug}
                href={`/ciudades/${ciudad.slug}`}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <h2 className="text-xl font-medium mb-2">{ciudad.nombre}</h2>
                <div className="flex items-center text-gray-500 mb-4">
                  <MapPin size={16} className="mr-1" />
                  <span>{ciudad.region}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                  {ciudad.descripcion.substring(0, 120)}...
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 