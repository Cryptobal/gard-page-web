### Propuesta de Security Headers

Ejemplos (Vercel headers en `next.config.js` o `vercel.json`):

- Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
- Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; script-src 'self' 'strict-dynamic' 'nonce-__NONCE__' https:; style-src 'self' 'unsafe-inline'; font-src 'self' https: data:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: geolocation=(), microphone=(), camera=(), interest-cohort=()
- Cross-Origin-Opener-Policy: same-origin
- Cross-Origin-Embedder-Policy: require-corp

Ajustar dominios de Cloudflare Images/Videos y terceros reales al endurecer CSP.
