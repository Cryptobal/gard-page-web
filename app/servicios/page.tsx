import dynamic from 'next/dynamic';
import FormularioCotizacionSeccion from '@/app/components/FormularioCotizacionSeccion';

// Cargar el componente cliente de forma dinámica
// Next.js 15: Removido ssr: false
const ServiciosLandingClient = dynamic(() => import('@/components/servicios/ServiciosLandingClient'));

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <ServiciosLandingClient />
      
      {/* Formulario de cotización */}
      <FormularioCotizacionSeccion />
    </main>
  );
} 