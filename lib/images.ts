// Definición de IDs de imágenes en Cloudflare
export const cloudflareImages = {
  // Logos e identidad
  logo: {
    default: '195f82cb-9a5e-4964-6fb5-ea43da47b000',    // Escudo azul
    white: 'f1cad221-0c11-43c4-3142-a53a6febbd00',    // Escudo blanco
    day: '7661cf51-c66b-4419-9229-e6e50f76ff00',    // Logo para modo claro
    night: '49b89002-6bb9-41b9-50ad-e6b91e5f6d00',  // Logo para modo oscuro
    nav: {
      day: '7661cf51-c66b-4419-9229-e6e50f76ff00',  // Logo en navbar para modo claro
      night: '49b89002-6bb9-41b9-50ad-e6b91e5f6d00' // Logo en navbar para modo oscuro
    },
    footer: {
      day: '195f82cb-9a5e-4964-6fb5-ea43da47b000',  // Logo en footer para modo claro
      night: 'f1cad221-0c11-43c4-3142-a53a6febbd00' // Logo en footer para modo oscuro
    },
    icon: '89a214ef-5112-4c4e-912e-4f56514c1600',
  },
  
  // Imágenes para el Hero
  hero: {
    home: '4824f8b9-abb0-4e77-c654-efe920697b00',
    about: '7d33f2ab-1ad7-4f8d-11c3-e82a0b54db00',
    services: '4613e018-4925-4fb0-1fee-ed8ede43cd00',
    contact: '428c1028-8f6b-455a-e110-38421eeb5700',
    reclutamiento: '4a46b63d-0e1b-4640-b95c-7f040a288c00',
  },
  
  // Imágenes para secciones
  sections: {
    about: '7d33f2ab-1ad7-4f8d-11c3-e82a0b54db00',
    services: '4613e018-4925-4fb0-1fee-ed8ede43cd00',
    technologies: '678cad4f-9b0d-49e6-3bbd-0d747a2fdc00',
    team: '57d32c87-0757-48e9-747f-2f7e66737100',
  },
  
  // Iconos de servicios y características
  icons: {
    security: '8bc35c05-93da-4a2a-f46e-a926bd422d00',
    shield: '8bc35c05-93da-4a2a-f46e-a926bd422d00',
    lock: '7db0cea1-4eab-4c2d-65a8-6bdd50918800',
    monitoring: '4a167a19-1ef9-430d-ec5e-ffbbc3c35300',
    alert: '5c97d40c-bf3c-4413-6ead-c15f7c9aa100',
    support: '5c97d40c-bf3c-4413-6ead-c15f7c9aa100',
  },
  
  // Equipo
  team: {
    ceo: '57d32c87-0757-48e9-747f-2f7e66737100',
    cto: '57d32c87-0757-48e9-747f-2f7e66737100',
    security: '57d32c87-0757-48e9-747f-2f7e66737100',
    support: '57d32c87-0757-48e9-747f-2f7e66737100',
  },

  // Fotos reales de guardias Gard (abril 2026) — fuente: scripts/guardias-fotos-ids.json
  guardias: {
    equipoHome: '57d32c87-0757-48e9-747f-2f7e66737100',                    // Home hero + Empresas (3 guardias bandera)
    panoramico: '4613e018-4925-4fb0-1fee-ed8ede43cd00',                    // Banner hero / Sobre Nosotros (edif. patrimonial)
    logistica: '71e50080-0802-4f2c-ce4f-b34f56f22900',                     // Bodegas / logística
    recepcionMujer: 'b0818218-7e38-4d9b-6dcf-5538e24b4e00',                // Edificios corporativos (mujer)
    accesoVehicular: '2539041c-4815-4194-1656-fa6993014200',               // Control acceso vehicular
    industrialReflectante: '1e7b161c-a76a-44bf-2a38-67b0631f8f00',         // Construcción / retail industrial
    residencialGorra: '0b92cbb0-137d-45a1-eda4-94c70eff7600',              // Condominios / edificios
    lobbyPremium: 'a89d3b2e-9738-4c67-c34f-3682a516c800',                  // Edificios corporativos premium
    institucionalNorte: '22439039-6cb0-4ed4-a362-5aebe3ffaa00',            // Antofagasta / gobierno
    industrialGarita: '29d16f73-5388-479a-a0ad-84774cbce300',              // Minería / bodegas industriales
  },
  
  // Clientes y marcas
  clients: {
    client1: 'eeaf472c-ab11-448b-f5e2-d18415147800',
    client2: 'bee9d371-805c-4029-59f6-93cdfd916000',
    client3: '7db0cea1-4eab-4c2d-65a8-6bdd50918800',
    client4: '732f1a26-ecdd-4dbd-cae3-f62b3f212700',
    client5: '068a0aaa-47f0-428c-bdf0-b8f7f780cb00',
  },
  
  // Blog posts
  blog: {
    nuevaLeySeguridad: '0ba18961-6cc4-4e17-7473-00213237b400',
    sustentabilidad: '145a101a-5be7-40d8-bdb4-a39ff9babc00',
    mejoresEmpresasSantiago: '772e4ec0-e6ed-473d-baf9-54db58967c00',
  }
};

// ID de la cuenta de Cloudflare Images
export const CLOUDFLARE_ACCOUNT_HASH = 'gGw8cfmEZedi85dYm6qcFw';

// Helper para construir la URL de Cloudflare Images con optimización mobile-first
export const getCloudflareImageUrl = (
  imageId: string,
  variant: string = 'public',
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'auto';
  }
): string => {
  let url = `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_HASH}/${imageId}/${variant}`;
  
  // Agregar parámetros de optimización si se proporcionan
  if (options) {
    const params = new URLSearchParams();
    
    if (options.width) params.append('w', options.width.toString());
    if (options.height) params.append('h', options.height.toString());
    if (options.quality) params.append('q', options.quality.toString());
    if (options.format) params.append('f', options.format);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
  }
  
  return url;
}; 