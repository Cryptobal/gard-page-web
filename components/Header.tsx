'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { Menu, X, ChevronDown } from 'lucide-react';
import CloudflareImage from './CloudflareImage';
import { cloudflareImages } from '@/lib/images';
// framer-motion removed for performance - using CSS transitions instead
import { useTheme } from 'next-themes';

const navLinks = [
  { 
    href: '/servicios', 
    label: 'Servicios',
    hasMegaMenu: true
  },
  { 
    href: '/industrias', 
    label: 'Industrias',
    hasMegaMenu: true
  },
  { href: '/tecnologia-seguridad', label: 'Tecnologías' },
  { href: '/reclutamiento', label: 'Trabaja con Nosotros' },
  { href: '/cotizar', label: 'Cotizar', isCTA: true },
];

// Mega Menu Data
const megaMenuData = {
  Servicios: [
    { title: 'Guardias de Seguridad', href: '/servicios/guardias-de-seguridad', desc: 'Personal certificado OS10 para protección física.' },
    { title: 'Seguridad Electrónica', href: '/servicios/seguridad-electronica', desc: 'CCTV, alarmas y control de acceso avanzado.' },
    { title: 'Central de Monitoreo', href: '/servicios/central-monitoreo', desc: 'Vigilancia remota 24/7 con respuesta inmediata.' },
    { title: 'Drones de Seguridad', href: '/servicios/drones-seguridad', desc: 'Vigilancia aérea para grandes extensiones.' },
    { title: 'Auditoría de Seguridad', href: '/servicios/auditoria-seguridad', desc: 'Evaluación de riesgos y vulnerabilidades.' },
    { title: 'Consultoría', href: '/servicios/consultoria', desc: 'Asesoría estratégica en seguridad corporativa.' },
  ],
  Industrias: [
    { title: 'Minería', href: '/industrias/mineria', desc: 'Seguridad especializada para faenas mineras.' },
    { title: 'Retail', href: '/industrias/retail', desc: 'Protección de activos y control de pérdidas.' },
    { title: 'Logística', href: '/industrias/bodegas', desc: 'Seguridad para centros de distribución.' },
    { title: 'Corporativo', href: '/industrias/edificios-corporativos', desc: 'Vigilancia para oficinas y edificios.' },
    { title: 'Construcción', href: '/industrias/construccion', desc: 'Protección de obras y maquinaria.' },
    { title: 'Educación', href: '/industrias/educacion', desc: 'Seguridad para colegios y universidades.' },
  ]
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verificar el estado inicial
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Cerrar el menú móvil cuando se cambia de ruta
    setIsOpen(false);
    setHoveredLink(null);
  }, [pathname]);

  // Determinar si estamos en un contexto oscuro
  const isDarkMode = !mounted ? false : theme === 'dark';
  
  // Determinar las clases y estilos condicionales
  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 w-full 
    transition-all duration-500 ease-out
    ${scrolled 
      ? `py-2 md:py-3 shadow-xl backdrop-blur-xl ${isDarkMode ? 'bg-[hsl(var(--gard-header-bg))]/95' : 'bg-white/95'} border-b border-gray-200/20`
      : `py-4 md:py-6 shadow-none ${isDarkMode ? 'bg-[hsl(var(--gard-header-bg))]/60' : 'bg-white/60'} backdrop-blur-lg`
    }
  `;

  // Clases para elementos de navegación
  const getNavLinkClasses = (isActive: boolean, isCTA?: boolean) => {
    if (isCTA) {
      return `
        bg-gradient-to-r from-primary to-primary/90 text-white px-4 py-2 rounded-xl 
        hover:from-primary/90 hover:to-primary hover:scale-105 hover:shadow-lg hover:shadow-primary/20
        transition-all duration-300 ease-out font-semibold transform gard-btn-glow
        ${scrolled ? 'text-sm' : 'text-base'}
      `;
    }
    
    return `
      transition-all duration-300 ease-out font-semibold relative flex items-center gap-1 group
      ${scrolled ? 'text-sm' : 'text-base'}
      ${isActive 
        ? 'text-primary font-bold after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full' 
        : scrolled
          ? isDarkMode 
            ? 'text-white hover:text-primary' 
            : 'text-gray-800 hover:text-primary'
          : isDarkMode
            ? 'text-white hover:text-primary/90' 
            : 'text-gray-900 hover:text-primary'
      }
    `;
  };

  return (
    <header 
      className={headerClasses}
      onMouseLeave={() => setHoveredLink(null)}
    >
      <div className="gard-container px-4 md:px-6 flex items-center justify-between relative">
        <Link href="/" className="relative z-50 flex items-center transition-all duration-300 ease-in-out hover:scale-105 transform">
          <CloudflareImage
            imageId={isDarkMode 
              ? cloudflareImages.logo.nav.night 
              : cloudflareImages.logo.nav.day}
            alt="Gard Security Logo"
            width={scrolled ? 120 : 140}
            height={scrolled ? 34 : 40}
            priority
            className="transition-all duration-300 ease-in-out"
          />
        </Link>

        {/* Navegación de escritorio */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 h-full">
          {navLinks.map(({ href, label, isCTA, hasMegaMenu }) => (
            <div key={href} className="relative h-full flex items-center" onMouseEnter={() => hasMegaMenu && setHoveredLink(label)}>
              <Link
                href={href}
                className={getNavLinkClasses(pathname === href, isCTA)}
              >
                {label}
                {hasMegaMenu && <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${hoveredLink === label ? 'rotate-180' : ''}`} />}
              </Link>
            </div>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mega Menu Container - CSS transitions instead of framer-motion */}
        {megaMenuData[hoveredLink as keyof typeof megaMenuData] && (
          <div
            className={`absolute top-full left-0 w-full pt-4 z-40 mega-menu ${hoveredLink ? 'active' : ''}`}
            onMouseEnter={() => setHoveredLink(hoveredLink)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <div className={`
              w-full shadow-xl border-t border-gray-100 dark:border-gray-800
              ${isDarkMode ? 'bg-[hsl(var(--gard-header-bg))]/95 backdrop-blur-xl text-white' : 'bg-white/98 backdrop-blur-xl text-gray-900'}
              rounded-b-2xl p-8
            `}>
              <div className="gard-container grid grid-cols-3 gap-8">
                {megaMenuData[hoveredLink as keyof typeof megaMenuData].map((item, idx) => (
                  <Link 
                    key={idx} 
                    href={item.href}
                    className="group block p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                  >
                    <h4 className="font-bold text-primary dark:text-white text-lg mb-1 group-hover:text-accent transition-colors flex items-center">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {item.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Botón de menú móvil */}
        <button
          className={`md:hidden z-50 transition-colors duration-200 hover:bg-muted/20 rounded-md p-2 ${
            isOpen
              ? (isDarkMode ? 'text-white' : 'text-black')
              : scrolled 
                ? (isDarkMode ? 'text-white' : 'text-black')
                : (isDarkMode ? 'text-white' : 'text-black')
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Menú móvil - CSS transitions instead of framer-motion */}
        {isOpen && (
          <div
            className={`fixed inset-0 z-40 md:hidden pt-20 h-screen mobile-menu ${isOpen ? 'active' : ''} ${
              isDarkMode 
                ? 'bg-[hsl(var(--gard-header-bg))]/95 backdrop-blur-md' 
                : 'bg-white/95 backdrop-blur-md shadow-lg'
            }`}
            style={{
              height: '100vh', 
              maxHeight: '100vh',
              overflow: 'auto'
            }}
          >
            <nav className="flex flex-col items-center space-y-8 p-8 mt-4">
              {navLinks.map(({ href, label, isCTA }) => (
                <Link
                  key={href}
                  href={href}
                  className={isCTA 
                    ? "bg-primary text-white px-6 py-2 rounded-xl hover:bg-accent transition text-lg font-semibold"
                    : `
                      text-lg font-semibold transition-colors
                      ${pathname === href 
                        ? 'text-primary font-bold' 
                        : isDarkMode 
                          ? 'text-white hover:text-primary' 
                          : 'text-black hover:text-primary/80'
                      }
                    `
                  }
                >
                  {label}
                </Link>
              ))}
              <div className="mt-4">
                <ThemeToggle />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
