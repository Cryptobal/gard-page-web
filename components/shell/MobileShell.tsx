'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import MobileTopBar from './MobileTopBar';
import MobileOpsStrip from './MobileOpsStrip';
import MobileTabBar from './MobileTabBar';
import MobileNavSheet, { type SheetKey } from './MobileNavSheet';

// Rutas donde el shell NO debe renderizarse:
//  • grupo (landing-cotizador-inteligente): usePathname() devuelve la ruta sin
//    el nombre del route group, por eso se excluye por su path real.
//  • rutas de test/demo con layout propio o barras fijas propias.
const EXCLUDED_EXACT = new Set<string>([
  '/cotizador-inteligente',
  '/presentacion-demo',
  '/test',
  '/test-form',
]);
const EXCLUDED_PREFIXES = ['/presentacion-demo/', '/test/', '/test-form/'];

function isExcluded(pathname: string | null): boolean {
  if (!pathname) return true;
  if (EXCLUDED_EXACT.has(pathname)) return true;
  return EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export default function MobileShell() {
  const pathname = usePathname();
  const [openSheet, setOpenSheet] = useState<SheetKey | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openSheetFrom = useCallback(
    (key: SheetKey, trigger: HTMLElement | null) => {
      triggerRef.current = trigger;
      setOpenSheet(key);
    },
    [],
  );

  const closeSheet = useCallback(() => {
    setOpenSheet(null);
    // Devolver el foco al disparador tras el desmontaje del sheet.
    const trigger = triggerRef.current;
    if (trigger && typeof trigger.focus === 'function') {
      requestAnimationFrame(() => trigger.focus());
    }
    triggerRef.current = null;
  }, []);

  // Cerrar el sheet al cambiar de ruta (la navegación mueve el foco).
  useEffect(() => {
    setOpenSheet(null);
    triggerRef.current = null;
  }, [pathname]);

  if (isExcluded(pathname)) return null;

  return (
    <div className="md:hidden">
      <MobileTopBar onOpenMenu={(el) => openSheetFrom('menu', el)} />
      <MobileOpsStrip />
      <MobileTabBar
        pathname={pathname ?? ''}
        activeSheet={openSheet}
        onOpenSheet={openSheetFrom}
      />
      <MobileNavSheet
        openKey={openSheet}
        onClose={closeSheet}
        pathname={pathname ?? ''}
      />
    </div>
  );
}
