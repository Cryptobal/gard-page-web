import { companyStats } from '@/lib/data/company-stats';

/**
 * Ops strip: marquesina de datos verificables. Todas las cifras provienen de
 * `lib/data/company-stats.ts` (fuente única). Si un dato no está allí, no se
 * muestra. `aria-hidden` porque duplica información presente en el contenido.
 *
 * Nota de contenido: el brief proponía "Operando desde 2016", pero la fundación
 * legal verificada de Gard Security es `foundedYear = 2022`. Se respeta la
 * fuente de verdad y se muestra `Operando desde ${foundedYear}`.
 */
const OPS_ITEMS: string[] = [
  `OS10 ${companyStats.os10CertifiedPct}% vigente`,
  `${companyStats.citiesCovered} ciudades`,
  companyStats.monitoringCenter247 ? 'Monitoreo 24/7' : '',
  `${companyStats.gmbRatingValue}★ ${companyStats.gmbReviewCount} reseñas`,
  `Operando desde ${companyStats.foundedYear}`,
].filter(Boolean);

export default function MobileOpsStrip() {
  // Se duplica la secuencia para lograr un loop continuo con translateX(-50%).
  const sequence = [...OPS_ITEMS, ...OPS_ITEMS];

  return (
    <div
      className="gard-shell-ops gard-glass gard-ops-viewport flex items-center"
      aria-hidden="true"
    >
      <div className="gard-ops-track gard-mono text-[11px] font-medium leading-none tracking-wide text-white/85">
        {sequence.map((item, index) => (
          <span key={index} className="inline-flex items-center whitespace-nowrap px-3">
            <span className="mr-3 inline-block h-1 w-1 rounded-full bg-[hsl(var(--gard-accent-bright))]" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
