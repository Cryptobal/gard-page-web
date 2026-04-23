/**
 * Grilla de logos de clientes B2B reales de Gard Security.
 *
 * Solo contiene identificadores públicos (nombre, industria, logo, link).
 * **NO INCLUIR quotes ni frases atribuidas al cliente acá**: los testimonios
 * reales van en `/lib/data/testimonials.ts` y requieren consentimiento
 * explícito. Ver `/docs/EMAIL-PEDIR-TESTIMONIO.md` para el proceso.
 */
export type ClienteLogo = {
  nombre: string;
  industria: string;
  imageId: string;
  link?: string;
};

export const CLIENTES: ClienteLogo[] = [
  {
    nombre: 'Polpaico',
    industria: 'Industria',
    link: 'https://www.polpaico.cl',
    imageId: 'eeaf472c-ab11-448b-f5e2-d18415147800',
  },
  {
    nombre: 'Zerando',
    industria: 'Turismo',
    link: 'https://zerandoochile.com.br',
    imageId: 'bee9d371-805c-4029-59f6-93cdfd916000',
  },
  {
    nombre: 'Dhemax',
    industria: 'Electromovilidad',
    link: 'https://www.dhemax.com',
    imageId: '7db0cea1-4eab-4c2d-65a8-6bdd50918800',
  },
  {
    nombre: 'Transmat',
    industria: 'Minería',
    link: 'https://transmat.cl',
    imageId: '732f1a26-ecdd-4dbd-cae3-f62b3f212700',
  },
  {
    nombre: 'Tritec-Intervento',
    industria: 'Industria',
    link: 'https://tritec-intervento.cl',
    imageId: '068a0aaa-47f0-428c-bdf0-b8f7f780cb00',
  },
  {
    nombre: 'Tattersall',
    industria: 'Industria',
    link: 'https://tattersall.cl',
    imageId: 'bf9629aa-071f-48e3-cf86-a9a29203fd00',
  },
  {
    nombre: 'Forestal Santa Blanca',
    industria: 'Hotelera y Turismo',
    link: 'https://forestalsantablanca.com',
    imageId: '10786958-2ce6-4352-ccc2-2c6f45c6a100',
  },
  {
    nombre: 'GL Events',
    industria: 'Turismo',
    link: 'https://gl-events.cl',
    imageId: '62c92cfb-7c18-4699-2433-552682479a00',
  },
  {
    nombre: 'Ecars',
    industria: 'Electromovilidad',
    imageId: 'd5c3a497-e5de-416c-de6b-95ade83f9900',
  },
  {
    nombre: 'Delegación Presidencial de Chañaral',
    industria: 'Instituciones Públicas',
    link: 'https://www.interior.gob.cl',
    imageId: '72310c38-9a82-4923-bd28-800ba8d9ef00',
  },
  {
    nombre: 'Bbosch',
    industria: 'Minería',
    link: 'https://bbosch.cl',
    imageId: '0b1d6037-3672-4cd9-1c72-6ba511bc5100',
  },
  {
    nombre: 'Embajada de Brasil en Chile',
    industria: 'Instituciones Públicas',
    link: 'https://santiago.itamaraty.gov.br',
    imageId: 'cf2de6d2-1d49-4db8-2d01-4b67f78f0d00',
  },
];
