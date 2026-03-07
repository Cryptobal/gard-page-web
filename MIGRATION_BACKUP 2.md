# Backup de Versiones Pre-Migración Next.js 15

**Fecha:** 10 de Octubre, 2025
**Branch:** migration/next-15-stable

## Versiones Originales (Next.js 14.0.4)

### Core Dependencies
- `next`: 14.0.4
- `react`: 18.2.0
- `react-dom`: 18.2.0
- `@types/react`: 18.3.20
- `@types/react-dom`: 18.2.18
- `eslint-config-next`: 14.0.4

### UI/Animation
- `framer-motion`: 10.18.0
- `lucide-react`: 0.309.0
- `tailwindcss`: 3.4.17

### TypeScript & Tooling
- `typescript`: 5.3.3

### Otras Dependencias Relevantes
- `date-fns`: 4.1.0
- `zod`: 3.24.2
- `@vercel/analytics`: 1.5.0
- `@vercel/speed-insights`: 1.2.0
- `next-themes`: 0.4.6

## Comando de Rollback

Si algo falla críticamente:

```bash
git checkout main
pnpm install
pnpm build
```

## Notas
- Repositorio limpio al inicio de migración
- 64 archivos con "use client" 
- Integraciones críticas: Cloudflare, GTM, Zoho, Forms

