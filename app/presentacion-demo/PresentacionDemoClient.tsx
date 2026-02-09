"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

const SLIDE_WIDTH = 1920;
const SLIDE_HEIGHT = 1080;

type Slide = {
  id: string;
  file: string;
  html: string;
};

type Props = {
  currentSlide: Slide | null;
  currentIndex: number;
  totalSlides: number;
  prevIndex: number;
  nextIndex: number;
};

export default function PresentacionDemoClient({
  currentSlide,
  currentIndex,
  totalSlides,
  prevIndex,
  nextIndex,
}: Props) {
  const prevHref = `/presentacion-demo?slide=${prevIndex + 1}`;
  const nextHref = `/presentacion-demo?slide=${nextIndex + 1}`;

  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scale, setScale] = useState(0.2);
  const stageRef = useRef<HTMLDivElement>(null);

  const updateScale = useCallback(() => {
    const el = stageRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (w <= 0 || h <= 0) return;
    const s = Math.min(w / SLIDE_WIDTH, h / SLIDE_HEIGHT, 1);
    setScale(s);
  }, []);

  useEffect(() => {
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, [updateScale, currentIndex]);

  const scaledWidth = Math.round(SLIDE_WIDTH * scale);
  const scaledHeight = Math.round(SLIDE_HEIGHT * scale);

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-900"}`}
    >
      <main className={styles.mainStage}>
        <div ref={stageRef} className={styles.slideStage}>
          {currentSlide ? (
            <div
              className={styles.slideFrameWrapper}
              style={{ width: scaledWidth, height: scaledHeight }}
            >
              <div
                className={styles.slideFrame}
                style={{
                  width: SLIDE_WIDTH,
                  height: SLIDE_HEIGHT,
                  transform: `scale(${scale})`,
                  transformOrigin: "0 0",
                }}
              >
                <iframe
                  title={`Slide ${currentIndex + 1}`}
                  srcDoc={currentSlide.html}
                  sandbox="allow-same-origin"
                />
              </div>
            </div>
          ) : (
            <div
              className={`rounded-2xl border p-6 text-sm ${isDark ? "border-white/10 bg-white/5 text-white/70" : "border-slate-200 bg-white text-slate-600"}`}
            >
              No se encontró el HTML del slide.
            </div>
          )}
        </div>
      </main>

      <nav
        className={`fixed bottom-0 left-0 right-0 z-20 flex flex-wrap items-center justify-center gap-4 border-t py-4 backdrop-blur sm:gap-6 ${isDark ? "border-white/10 bg-slate-950/95" : "border-slate-200/80 bg-slate-100/95"}`}
        aria-label="Navegación de slides"
      >
        <Link
          href={prevHref}
          className={`rounded-full px-5 py-2.5 font-medium transition sm:px-6 ${isDark ? "bg-teal-600 text-white hover:bg-teal-500" : "bg-teal-600 text-white hover:bg-teal-500"}`}
        >
          Anterior
        </Link>
        <span
          className={`min-w-[4rem] text-center text-sm tabular-nums ${isDark ? "text-white/70" : "text-slate-600"}`}
        >
          {totalSlides ? currentIndex + 1 : 0} / {totalSlides}
        </span>
        <Link
          href={nextHref}
          className={`rounded-full px-5 py-2.5 font-medium transition sm:px-6 ${isDark ? "bg-teal-600 text-white hover:bg-teal-500" : "bg-teal-600 text-white hover:bg-teal-500"}`}
        >
          Siguiente
        </Link>
        <Link
          href="/presentacion-demo/print"
          target="_blank"
          rel="noopener noreferrer"
          className={`rounded-full border px-5 py-2.5 transition sm:px-6 ${isDark ? "border-white/20 text-white hover:border-teal-400 hover:text-teal-100" : "border-slate-300 text-slate-700 hover:border-teal-500 hover:text-teal-700"}`}
        >
          Descargar PDF
        </Link>
        <button
          type="button"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          className={`rounded-full border px-4 py-2.5 text-sm transition sm:px-5 ${isDark ? "border-white/20 text-white/90 hover:border-teal-400 hover:text-teal-100" : "border-slate-300 text-slate-700 hover:border-teal-500 hover:text-teal-700"}`}
          aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
        >
          {isDark ? "Día" : "Noche"}
        </button>
      </nav>
    </div>
  );
}
