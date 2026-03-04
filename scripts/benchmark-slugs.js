const { performance } = require('perf_hooks');

const industries = [
  { name: "Minería" },
  { name: "Retail" },
  { name: "Eventos y Espectáculos" },
  { name: "Bodegas" },
  { name: "Salud" },
  { name: "Educación" },
  { name: "Edificios corporativos" },
  { name: "Construcción" },
  { name: "Transporte y Logística" },
  { name: "Parques Industriales" },
  { name: "Instituciones Públicas" },
  { name: "Hotelería y Turismo" },
];

const servicesMetadata = [
  { slug: 'guardias-de-seguridad' },
  { slug: 'seguridad-electronica' },
  { slug: 'central-monitoreo' },
  { slug: 'drones-seguridad' },
  { slug: 'seguridad-perimetral' },
  { slug: 'auditoria-seguridad' },
  { slug: 'consultoria' },
  { slug: 'prevencion-intrusiones' },
];

function normalize(name) {
  return name.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
}

function runBaseline(iterations) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    // Replicating industryPages mapping
    const industryPages = industries.map((industry) => {
      const slug = normalize(industry.name);
      return { slug };
    });

    // Replicating servicioIndustriaPages nested loop
    const servicioIndustriaPages = [];
    for (const servicio of servicesMetadata) {
      for (const industria of industries) {
        const industriaSlug = normalize(industria.name);
        servicioIndustriaPages.push({ servicio: servicio.slug, industria: industriaSlug });
      }
    }
  }
  const end = performance.now();
  return end - start;
}

function runOptimized(iterations) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    // Pre-calculate slugs
    const industriesWithSlugs = industries.map(industry => ({
      ...industry,
      slug: normalize(industry.name)
    }));

    // Replicating industryPages mapping
    const industryPages = industriesWithSlugs.map((industry) => {
      return { slug: industry.slug };
    });

    // Replicating servicioIndustriaPages nested loop
    const servicioIndustriaPages = [];
    for (const servicio of servicesMetadata) {
      for (const industria of industriesWithSlugs) {
        const industriaSlug = industria.slug;
        servicioIndustriaPages.push({ servicio: servicio.slug, industria: industriaSlug });
      }
    }
  }
  const end = performance.now();
  return end - start;
}

const iterations = 100000;
console.log(`Running benchmark with ${iterations} iterations...`);

const baselineTime = runBaseline(iterations);
console.log(`Baseline time: ${baselineTime.toFixed(2)}ms`);

const optimizedTime = runOptimized(iterations);
console.log(`Optimized time: ${optimizedTime.toFixed(2)}ms`);

const improvement = ((baselineTime - optimizedTime) / baselineTime * 100).toFixed(2);
console.log(`Improvement: ${improvement}%`);
