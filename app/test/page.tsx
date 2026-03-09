import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Página de prueba</h1>
      <p>Si esta página se muestra, la aplicación está funcionando correctamente.</p>
    </div>
  );
} 