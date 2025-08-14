### Cookies seguras

- `Secure`, `HttpOnly`, `SameSite=Lax|Strict` en todas las cookies.
- Evitar `SameSite=None` salvo necesidad (y solo con `Secure`).
- Revisar seteo en `middleware`/APIs y en terceros (GTM) bajo consentimiento.
