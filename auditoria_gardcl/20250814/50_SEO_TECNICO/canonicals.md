### Canonicalización y trailing slash

- En Next.js, usar `metadata.alternates.canonical` por plantilla.
- Asegurar una sola versión: HTTPS + www (redirigir no-www → www con 308) [ya activo].
- Evitar canonicals a URLs con parámetros UTM. Usar `has` en `redirects()` para limpiar tracking.
