'use client';

import { ToastProvider as InternalToastProvider } from './use-toast';

export function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <InternalToastProvider>{children}</InternalToastProvider>;
} 