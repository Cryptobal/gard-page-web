import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto | Gard Security - Atención personalizada',
  description: 'Comunícate directamente con nuestros especialistas en seguridad. Teléfono, email y formulario para consultas sobre servicios de guardias y seguridad privada.',
  alternates: {
    canonical: 'https://www.gard.cl/contacto',
  },
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 