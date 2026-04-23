'use client';

import { motion } from 'framer-motion';
import CloudflareImage from '@/components/CloudflareImage';
import { cloudflareImages } from '@/lib/images';

const FOTOS = [
  {
    id: cloudflareImages.guardias.equipoHome,
    alt: 'Equipo de guardias de seguridad Gard Security certificados OS10 frente a edificio corporativo con bandera chilena en Santiago',
  },
  {
    id: cloudflareImages.guardias.panoramico,
    alt: 'Equipo Gard Security en institución patrimonial en Santiago, Chile',
  },
  {
    id: cloudflareImages.guardias.lobbyPremium,
    alt: 'Guardia Gard Security en recepción premium de edificio corporativo, con CCTV visible',
  },
  {
    id: cloudflareImages.guardias.recepcionMujer,
    alt: 'Guardia mujer Gard Security en recepción de edificio corporativo en Chile',
  },
  {
    id: cloudflareImages.guardias.residencialGorra,
    alt: 'Guardia Gard Security con gorra institucional en edificio residencial en Santiago',
  },
  {
    id: cloudflareImages.guardias.industrialReflectante,
    alt: 'Guardia Gard Security con chaleco reflectante en instalación industrial en Chile',
  },
  {
    id: cloudflareImages.guardias.industrialGarita,
    alt: 'Guardia Gard Security en garita de control de acceso de planta industrial / bodega logística',
  },
  {
    id: cloudflareImages.guardias.accesoVehicular,
    alt: 'Guardia Gard Security en control de acceso vehicular de estacionamiento corporativo',
  },
  {
    id: cloudflareImages.guardias.logistica,
    alt: 'Guardia Gard Security en exterior de centro logístico en Chile',
  },
  {
    id: cloudflareImages.guardias.institucionalNorte,
    alt: 'Guardia Gard Security en institución pública de la Región de Atacama, norte de Chile',
  },
];

export default function GuardiasEnAccion() {
  return (
    <section
      className="gard-section py-16 md:py-24 bg-[hsl(var(--gard-background))]"
      aria-label="Guardias de seguridad Gard Security en acción"
    >
      <div className="gard-container">
        <header className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <h2 className="text-heading-2 mb-4">Nuestros guardias en acción</h2>
          <p className="text-body-lg text-muted-foreground">
            Más de 1.000 guardias Gard Security certificados OS10 protegen empresas en 10 ciudades de Chile:
            minería, logística, edificios corporativos, retail, construcción e instituciones públicas.
          </p>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {FOTOS.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <CloudflareImage
                imageId={f.id}
                alt={f.alt}
                fill
                objectFit="cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
