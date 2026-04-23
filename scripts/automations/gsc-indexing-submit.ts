#!/usr/bin/env -S tsx
/**
 * Google Search Console Indexing API · submit job.
 *
 * Uso previsto: correr como cron nightly en Cowork (o cron/CI similar).
 * Lee URLs recientemente modificadas y las envía al Indexing API de Google,
 * aceptando hasta 200 URLs/día por defecto (cuota estándar).
 *
 * Requiere las siguientes env vars:
 *   GSC_SERVICE_ACCOUNT_EMAIL   — client_email del service account
 *   GSC_SERVICE_ACCOUNT_KEY     — private_key del service account (con \n)
 *   GSC_INDEXING_MAX_PER_RUN    — opcional, default 200
 *   GSC_INDEXING_DRY_RUN        — opcional, "true" para simular sin POST
 *
 * Setup:
 *   1. Crear service account en Google Cloud Console.
 *   2. Darle rol "Owner" del property en Search Console.
 *   3. Habilitar Indexing API en el proyecto Cloud.
 *   4. Exportar credentials.json; poblar las env vars de arriba.
 *
 * Input:
 *   lib/data/recently-updated.json — array de {url, type}.
 *     type: "URL_UPDATED" | "URL_DELETED"
 *
 * Output:
 *   cowork-logs/gsc-indexing-<ISO>.json — resultado por URL.
 *
 * No usa librerías externas a propósito: crypto built-in + fetch nativos.
 */

import { createSign } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const INDEXING_ENDPOINT = 'https://indexing.googleapis.com/v3/urlNotifications:publish';
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const SCOPE = 'https://www.googleapis.com/auth/indexing';
const DEFAULT_MAX_PER_RUN = 200;
const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_BACKOFF_MS = 1500;

type NotificationType = 'URL_UPDATED' | 'URL_DELETED';

type RecentlyUpdatedEntry = {
  url: string;
  type: NotificationType;
  /** Opcional, para trazar por qué fue priorizada. */
  reason?: string;
};

type SubmitResult = {
  url: string;
  type: NotificationType;
  status: 'ok' | 'error' | 'skipped';
  httpStatus?: number;
  error?: string;
  retries: number;
};

function env(name: string): string | undefined {
  const v = process.env[name];
  return v && v.length > 0 ? v : undefined;
}

function requireEnv(name: string): string {
  const v = env(name);
  if (!v) {
    throw new Error(`Falta env var requerida: ${name}`);
  }
  return v;
}

function base64url(input: Buffer | string): string {
  const buf = typeof input === 'string' ? Buffer.from(input) : input;
  return buf
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/**
 * Crea un JWT firmado con RS256 para el Google service account flow.
 * https://developers.google.com/identity/protocols/oauth2/service-account
 */
function signServiceAccountJwt(clientEmail: string, privateKey: string): string {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: clientEmail,
    scope: SCOPE,
    aud: TOKEN_ENDPOINT,
    exp: now + 3600,
    iat: now,
  };
  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsigned);
  signer.end();
  const signature = signer.sign(privateKey.replace(/\\n/g, '\n'));
  return `${unsigned}.${base64url(signature)}`;
}

async function exchangeJwtForAccessToken(jwt: string): Promise<string> {
  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: jwt,
  });
  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token exchange falló: ${res.status} ${text}`);
  }
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) {
    throw new Error('Respuesta sin access_token.');
  }
  return json.access_token;
}

async function publishWithRetry(
  url: string,
  type: NotificationType,
  accessToken: string,
  maxRetries = DEFAULT_MAX_RETRIES,
): Promise<SubmitResult> {
  let lastError = '';
  let lastStatus: number | undefined;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(INDEXING_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, type }),
      });
      lastStatus = res.status;
      if (res.ok) {
        return { url, type, status: 'ok', httpStatus: res.status, retries: attempt };
      }
      // 429 y 5xx: reintentamos con backoff exponencial.
      if (res.status === 429 || res.status >= 500) {
        lastError = await res.text();
        if (attempt < maxRetries) {
          await sleep(DEFAULT_BACKOFF_MS * Math.pow(2, attempt));
          continue;
        }
      } else {
        lastError = await res.text();
      }
      return {
        url,
        type,
        status: 'error',
        httpStatus: res.status,
        error: truncate(lastError, 500),
        retries: attempt,
      };
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
      if (attempt < maxRetries) {
        await sleep(DEFAULT_BACKOFF_MS * Math.pow(2, attempt));
        continue;
      }
    }
  }
  return {
    url,
    type,
    status: 'error',
    httpStatus: lastStatus,
    error: truncate(lastError, 500),
    retries: maxRetries,
  };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function truncate(s: string, max: number): string {
  return s.length <= max ? s : `${s.slice(0, max)}…`;
}

function loadRecentlyUpdated(): RecentlyUpdatedEntry[] {
  const path = join(process.cwd(), 'lib', 'data', 'recently-updated.json');
  if (!existsSync(path)) {
    // eslint-disable-next-line no-console
    console.warn(`(warn) No existe ${path}. El job no tiene URLs que enviar.`);
    return [];
  }
  const raw = readFileSync(path, 'utf-8');
  const parsed = JSON.parse(raw) as unknown;
  if (!Array.isArray(parsed)) {
    throw new Error('recently-updated.json debe ser un array de {url, type}.');
  }
  return parsed.map((entry, idx) => {
    const e = entry as Partial<RecentlyUpdatedEntry>;
    if (typeof e.url !== 'string' || e.url.length === 0) {
      throw new Error(`Entry #${idx} sin url válida.`);
    }
    if (e.type !== 'URL_UPDATED' && e.type !== 'URL_DELETED') {
      throw new Error(`Entry #${idx} con type inválido: ${String(e.type)}`);
    }
    return { url: e.url, type: e.type, reason: e.reason };
  });
}

function writeLog(results: SubmitResult[]): string {
  const logDir = join(process.cwd(), 'cowork-logs');
  if (!existsSync(logDir)) {
    mkdirSync(logDir, { recursive: true });
  }
  const filename = `gsc-indexing-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  const path = join(logDir, filename);
  writeFileSync(
    path,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        total: results.length,
        ok: results.filter((r) => r.status === 'ok').length,
        errors: results.filter((r) => r.status === 'error').length,
        skipped: results.filter((r) => r.status === 'skipped').length,
        results,
      },
      null,
      2,
    ),
    'utf-8',
  );
  return path;
}

async function main(): Promise<void> {
  const dryRun = env('GSC_INDEXING_DRY_RUN') === 'true';
  const maxPerRun = Number.parseInt(env('GSC_INDEXING_MAX_PER_RUN') ?? String(DEFAULT_MAX_PER_RUN), 10);

  const entries = loadRecentlyUpdated();
  if (entries.length === 0) {
    // eslint-disable-next-line no-console
    console.log('No hay URLs para enviar. Saliendo.');
    return;
  }

  const batch = entries.slice(0, maxPerRun);
  if (entries.length > maxPerRun) {
    // eslint-disable-next-line no-console
    console.warn(
      `(warn) ${entries.length} URLs en cola; enviando solo las primeras ${maxPerRun} por cuota diaria.`,
    );
  }

  if (dryRun) {
    // eslint-disable-next-line no-console
    console.log('[dry-run] Se enviarían las siguientes URLs:');
    for (const e of batch) {
      // eslint-disable-next-line no-console
      console.log(`  - ${e.type}: ${e.url}${e.reason ? ` (${e.reason})` : ''}`);
    }
    return;
  }

  const clientEmail = requireEnv('GSC_SERVICE_ACCOUNT_EMAIL');
  const privateKey = requireEnv('GSC_SERVICE_ACCOUNT_KEY');

  const jwt = signServiceAccountJwt(clientEmail, privateKey);
  const accessToken = await exchangeJwtForAccessToken(jwt);

  const results: SubmitResult[] = [];
  for (const entry of batch) {
    // Rate limit suave: 1 request cada 300ms → 200 req/min como máximo.
    const r = await publishWithRetry(entry.url, entry.type, accessToken);
    results.push(r);
    await sleep(300);
  }

  const ok = results.filter((r) => r.status === 'ok').length;
  const err = results.filter((r) => r.status === 'error').length;
  const logPath = writeLog(results);

  // eslint-disable-next-line no-console
  console.log(`\n${ok} ok / ${err} errores / ${results.length} total`);
  // eslint-disable-next-line no-console
  console.log(`Log: ${logPath}`);

  if (err > 0) {
    process.exitCode = 1;
  }
}

const entrypointUrl = `file://${process.argv[1] ?? ''}`;
if (import.meta.url === entrypointUrl) {
  main().catch((err: unknown) => {
    // eslint-disable-next-line no-console
    console.error('Fatal:', err instanceof Error ? err.message : err);
    process.exit(1);
  });
}

export { main as runGscIndexing, publishWithRetry, signServiceAccountJwt };
