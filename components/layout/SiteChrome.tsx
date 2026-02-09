'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
  hideOn?: string[];
};

const DEFAULT_HIDE_PATHS = ['/presentacion', '/presentacion-demo', '/presentacion-demo/print'];

export default function SiteChrome({ children, hideOn }: Props) {
  const pathname = usePathname();
  const hideList = hideOn ?? DEFAULT_HIDE_PATHS;

  const shouldHide = hideList.some((prefix) =>
    pathname?.startsWith(prefix),
  );

  if (shouldHide) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
