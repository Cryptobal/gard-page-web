/**
 * Testimonios reales de clientes de Gard Security.
 *
 * REGLA DE ORO: publicamos únicamente testimonios con consentimiento
 * explícito por escrito. Si no hay, el array queda vacío y el render cae
 * back a una grilla de logos.
 *
 * Proceso para agregar un testimonio:
 *   1. Enviar el email plantilla en `/docs/EMAIL-PEDIR-TESTIMONIO.md`.
 *   2. Recibir quote + foto + cargo del cliente por escrito.
 *   3. Solicitar aprobación explícita del texto final antes de publicarlo.
 *   4. Agregar el objeto acá con `verified: true`.
 *
 * Lógica de render:
 *   - `testimonials.length === 0` → grilla de logos, SIN quotes.
 *   - `testimonials.length >= 3` → tarjetas con foto + quote + cargo + logo.
 *   - `testimonials.length` entre 1 y 2 → grilla de logos (no mostrar hasta
 *     tener un mínimo robusto).
 */
export type Testimonial = {
  /** Identificador único, slug kebab-case. Ej: "juan-perez-minera-x". */
  id: string;
  /** Nombre real de la persona. */
  clientName: string;
  /** Cargo de la persona en su empresa. */
  clientRole: string;
  /** Nombre comercial de la empresa del cliente. */
  companyName: string;
  /** Image ID de Cloudflare Images con el logo de la empresa. */
  companyLogo: string;
  /**
   * Quote en primera persona. 2-3 frases MÁXIMO. Debe sonar humano,
   * no marketing, no slogans. Mención de resultado concreto si existe.
   */
  quote: string;
  /** Image ID de Cloudflare Images con foto profesional de la persona. */
  photoUrl?: string;
  /** Industria del cliente (minería, retail, logística, corporativo, etc). */
  industry: string;
  /**
   * Solo publicamos testimonios verificados con consentimiento escrito del
   * cliente. Si no está verificado, no se agrega acá.
   */
  verified: true;
};

export const testimonials: Testimonial[] = [
  // Vacío por ahora. Se llena cuando lleguen los testimonios reales
  // respondiendo al email en /docs/EMAIL-PEDIR-TESTIMONIO.md.
];
