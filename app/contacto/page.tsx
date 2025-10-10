import dynamic from 'next/dynamic';

// Next.js 15: Removido ssr: false
const ContactoLandingClient = dynamic(() => import('@/components/contacto/ContactoLandingClient'));

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[hsl(var(--gard-background))]">
      <ContactoLandingClient />
    </main>
  );
} 