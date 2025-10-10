import dynamic from 'next/dynamic';

// Cargar el componente cliente de forma dinámica
// Next.js 15: Removido ssr: false
const SobreNosotrosClient = dynamic(() => import('@/components/sobre-nosotros/SobreNosotrosClient'));

export default function SobreNosotrosPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[hsl(var(--gard-background))]">
      <SobreNosotrosClient />
    </main>
  );
} 