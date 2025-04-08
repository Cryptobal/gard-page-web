import dynamic from 'next/dynamic';
import FormularioCotizacionSeccion from '@/app/components/FormularioCotizacionSeccion';

// Cargar el componente cliente de forma dinámica
const ServiciosLandingClient = dynamic(() => import('@/components/servicios/ServiciosLandingClient'), {
  ssr: false,
});

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <ServiciosLandingClient />
      
      {/* Formulario de cotización */}
      <FormularioCotizacionSeccion />
    </main>
  );
} 