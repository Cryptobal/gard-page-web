import fs from "fs";
import path from "path";
import PrintAuto from "./PrintAuto";
import styles from "./page.module.css";

const SLIDES_DIR = path.join(
  process.cwd(),
  "app",
  "presentacion-demo",
  "slides",
);

function listSlideFiles(): string[] {
  if (!fs.existsSync(SLIDES_DIR)) return [];
  return fs
    .readdirSync(SLIDES_DIR)
    .filter((file) => file.endsWith(".html"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

export default function PrintPage() {
  const files = listSlideFiles();

  return (
    <div className={styles.page}>
      <PrintAuto />
      <div className={`${styles.printHide} mb-6 flex items-center justify-between`}>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-teal-300">
            Modo impresión
          </p>
          <h1 className="text-lg font-semibold text-white">
            Presentación completa ({files.length} slides)
          </h1>
          <p className="text-sm text-slate-300">
            Se imprimirá una slide por página.
          </p>
        </div>
      </div>

      <div className={styles.slidesGrid}>
        {files.map((file) => {
          const html = fs.readFileSync(path.join(SLIDES_DIR, file), "utf8");
          return (
            <div key={file} className={styles.slideWrapper}>
              <div className={styles.slideInner}>
                <iframe title={file} srcDoc={html} sandbox="allow-same-origin" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
