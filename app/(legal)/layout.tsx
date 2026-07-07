export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-hidden touch-pan-y overscroll-y-contain">
      {children}
    </div>
  );
}
