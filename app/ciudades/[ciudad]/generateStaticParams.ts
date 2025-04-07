import { getCiudades } from '@/lib/data/ciudad-data';

export async function generateStaticParams() {
  const ciudades = getCiudades();
  
  return ciudades.map(ciudad => ({
    ciudad: ciudad.slug,
  }));
} 