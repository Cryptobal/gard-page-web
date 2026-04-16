'use client';

import React from 'react';
import Link from 'next/link';
import { getAllCiudades, CiudadData } from '@/lib/data/ciudad-data';
import { servicesMetadata } from '../servicios/serviceMetadata';
import { MapPin } from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

const BASE_URL = 'https://www.gard.cl';

interface Ciudad extends CiudadData {}

export default function CiudadesPage() {
  const ciudades = getAllCiudades();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Inicio', url: BASE_URL },
          { name: 'Cobertura por Ciudad', url: `${BASE_URL}/ciudades` },
        ]}
      />

      <section className="gard-section bg-white dark:bg-gray-900">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 font-title">
              Cobertura de Guardias de Seguridad en Chile
            </h1>
            <p className="text-xl text-muted-foreground dark:text-gray-300 mb-4">
              Gard Security opera con guardias certificados OS10 en 10 ciudades de Chile: Santiago, Antofagasta, Valparaíso, Concepción, Iquique, Puerto Montt, Rancagua, Chillán, Temuco y Viña del Mar.
            </p>
            <p className="text-base text-muted-foreground dark:text-gray-400 mb-12">
              Selecciona tu ciudad para ver los servicios disponibles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ciudades.map((ciudad: Ciudad) => (
              <article
                key={ciudad.slug}
                className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={18} className="text-primary" />
                  <h2 className="text-xl font-semibold">{ciudad.nombre}</h2>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">{ciudad.region}</div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {ciudad.descripcion}
                </p>
                <div>
                  <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">
                    Servicios disponibles
                  </div>
                  <ul className="space-y-1">
                    {servicesMetadata.map((servicio) => (
                      <li key={servicio.slug}>
                        <Link
                          href={`/${ciudad.slug}/${servicio.slug}`}
                          className="text-sm text-gray-700 dark:text-blue-100 hover:text-primary dark:hover:text-white transition-colors"
                        >
                          {servicio.title.split('|')[0].trim()} en {ciudad.nombre}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
