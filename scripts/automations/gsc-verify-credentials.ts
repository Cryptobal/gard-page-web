#!/usr/bin/env -S tsx
/**
 * Verifica que GSC_SERVICE_ACCOUNT_* permiten obtener un access token.
 * Útil antes de re-configurar GitHub Secrets o tras rotar la clave.
 *
 *   export GSC_SERVICE_ACCOUNT_EMAIL="..."
 *   export GSC_SERVICE_ACCOUNT_KEY="$(jq -r .private_key credentials.json)"
 *   pnpm run gsc-verify
 */

import { signServiceAccountJwt } from './gsc-indexing-submit';

const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const INDEXING_SCOPE = 'https://www.googleapis.com/auth/indexing';

function requireEnv(name: string): string {
  const v = process.env[name]?.trim();
  if (!v) {
    throw new Error(`Falta env var: ${name}`);
  }
  return v;
}

async function main(): Promise<void> {
  const email = requireEnv('GSC_SERVICE_ACCOUNT_EMAIL');
  const key = requireEnv('GSC_SERVICE_ACCOUNT_KEY');

  const jwt = signServiceAccountJwt(email, key, INDEXING_SCOPE);
  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    throw new Error(`Token exchange falló (${res.status}): ${await res.text()}`);
  }

  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) {
    throw new Error('Respuesta sin access_token.');
  }

  console.log('OK: credenciales GSC válidas (JWT firmado + token obtenido).');
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
