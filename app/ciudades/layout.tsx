import { generateMetadata } from './generateMetadata';

export const metadata = generateMetadata();

export default function CiudadesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
