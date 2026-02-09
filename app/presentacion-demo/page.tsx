import fs from "fs";
import path from "path";
import PresentacionDemoClient from "./PresentacionDemoClient";

const SLIDES_DIR = path.join(
  process.cwd(),
  "app",
  "presentacion-demo",
  "slides",
);

type Slide = {
  id: string;
  file: string;
  html: string;
};

type PageProps = {
  searchParams?: Promise<{ slide?: string }>;
};

function listSlideFiles(): string[] {
  if (!fs.existsSync(SLIDES_DIR)) return [];
  return fs
    .readdirSync(SLIDES_DIR)
    .filter((file) => file.endsWith(".html"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function loadSlides(): Slide[] {
  const files = listSlideFiles();
  return files.map((file) => {
    const fullPath = path.join(SLIDES_DIR, file);
    const html = fs.readFileSync(fullPath, "utf8");
    return {
      id: file.replace(".html", ""),
      file,
      html,
    };
  });
}

function clampIndex(index: number, max: number) {
  if (Number.isNaN(index)) return 0;
  return Math.min(Math.max(index, 0), Math.max(0, max));
}

export default async function PresentacionDemoPage({
  searchParams,
}: PageProps) {
  const params = searchParams ? await searchParams : {};
  const slides = loadSlides();
  const totalSlides = slides.length;
  const rawIndex = Number.parseInt(String(params?.slide ?? "1"), 10) - 1;
  const currentIndex = clampIndex(rawIndex, totalSlides - 1);
  const currentSlide = slides[currentIndex] ?? null;
  const prevIndex = clampIndex(currentIndex - 1, totalSlides - 1);
  const nextIndex = clampIndex(currentIndex + 1, totalSlides - 1);

  return (
    <PresentacionDemoClient
      currentSlide={currentSlide}
      currentIndex={currentIndex}
      totalSlides={totalSlides}
      prevIndex={prevIndex}
      nextIndex={nextIndex}
    />
  );
}
