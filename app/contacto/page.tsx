import dynamic from 'next/dynamic';

const ContactoLandingClient = dynamic(() => import('@/components/contacto/ContactoLandingClient'), {
  ssr: false,
});

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[hsl(var(--gard-background))]">
      <ContactoLandingClient />
    </main>
  );
} 