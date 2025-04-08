import { getAllCiudades } from '@/lib/data/ciudad-data';
import { servicesMetadata } from '@/app/servicios/serviceMetadata';

export async function generateStaticParams() {
  const ciudades = getAllCiudades();
  const servicios = servicesMetadata;
  
  const params = [];
  
  // Generar combinaciones de ciudad+servicio
  for (const ciudad of ciudades) {
    for (const servicio of servicios) {
      params.push({
        ciudad: ciudad.slug,
        servicio: servicio.slug,
      });
    }
  }
  
  return params;
} 