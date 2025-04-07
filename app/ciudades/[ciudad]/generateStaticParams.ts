import { getAllCiudades } from '@/lib/data/ciudad-data';

export async function generateStaticParams() {
  const ciudades = getAllCiudades();
  
  return ciudades.map(ciudad => ({
    ciudad: ciudad.slug,
  }));
} 