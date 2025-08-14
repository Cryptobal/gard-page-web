### Plan de imágenes (Cloudflare Images)

- Convertir fuentes a AVIF (fallback WebP) y servir con `CloudflareImage`.
- Definir `sizes` y `width/height` para eliminar CLS y optimizar LCP.
- `priority` solo en hero above-the-fold; lazy por defecto en el resto.
