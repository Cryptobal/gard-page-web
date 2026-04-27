import { getCotizarVariant, type CotizarVariant } from '@/lib/ab-testing';
import CotizarPageClient from './CotizarPageClient';

// El experimento A/B requiere render dinámico por usuario para leer la cookie
// asignada por middleware. Sin esto, Next puede prerenderizar y cachear la
// respuesta, sirviendo la misma variante a todos.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface CotizarPageProps {
  searchParams: Promise<{ v?: string }>;
}

export default async function CotizarPage({ searchParams }: CotizarPageProps) {
  const params = await searchParams;

  // Override manual via query param (QA, links de email, debugging).
  // Si no hay override, usa la variante asignada por cookie del middleware.
  let variant: CotizarVariant = await getCotizarVariant();
  if (params?.v === 'multistep') variant = 'multistep';
  if (params?.v === 'control') variant = 'control';

  return <CotizarPageClient variant={variant} />;
}
