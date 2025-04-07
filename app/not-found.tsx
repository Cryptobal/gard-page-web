import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="gard-container py-16 md:py-24 text-center">
      <h1 className="text-heading-2 mb-6">Página no encontrada</h1>
      <p className="text-body-lg mb-8 max-w-2xl mx-auto">
        Lo sentimos, la página que estás buscando no está disponible.
        Es posible que la URL haya cambiado o que la página haya sido eliminada.
      </p>
      <Link
        href="/"
        className="gard-btn gard-btn-primary inline-flex items-center"
      >
        <span>Volver al Inicio</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </Link>
    </div>
  );
} 