#!/usr/bin/env -S tsx
/**
 * Exporta top keywords de Google Search Console (últimos 28 días).
 *
 * Requiere las mismas credenciales que gsc-indexing-submit.ts y que el
 * service account tenga acceso al property en Search Console (Owner o Full).
 *
 * Habilitar en Google Cloud: "Google Search Console API".
 *
 * Env vars:
 *   GSC_SERVICE_ACCOUNT_EMAIL
 *   GSC_SERVICE_ACCOUNT_KEY
 *   GSC_ANALYTICS_DAYS        — opcional, default 28
 *   GSC_ANALYTICS_ROW_LIMIT   — opcional, default 25
 *
 * Output: docs/seo-baseline-latest.md (+ cowork-logs/gsc-analytics-<ISO>.json)
 */

import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { searchConsoleConfig } from '../../lib/seo/search-console';
import { signServiceAccountJwt } from './gsc-indexing-submit';

const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const WEBMASTERS_SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
const WEBMASTERS_BASE = 'https://www.googleapis.com/webmasters/v3';

type SearchAnalyticsRow = {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
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

async function getAccessToken(clientEmail: string, privateKey: string): Promise<string> {
  const jwt = signServiceAccountJwt(clientEmail, privateKey, WEBMASTERS_SCOPE);
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
    throw new Error(`Token exchange falló: ${res.status} ${await res.text()}`);
  }
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) {
    throw new Error('Respuesta sin access_token.');
  }
  return json.access_token;
}

async function listAccessibleSites(token: string): Promise<string[]> {
  const res = await fetch(`${WEBMASTERS_BASE}/sites`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`List sites falló: ${res.status} ${await res.text()}`);
  }
  const json = (await res.json()) as { siteEntry?: Array<{ siteUrl?: string }> };
  return (json.siteEntry ?? [])
    .map((entry) => entry.siteUrl)
    .filter((url): url is string => Boolean(url));
}

function resolveSiteUrl(accessible: string[]): string {
  for (const candidate of searchConsoleConfig.propertyCandidates) {
    if (accessible.includes(candidate)) {
      return candidate;
    }
  }
  throw new Error(
    `No se encontró property de gard.cl. Accesibles: ${accessible.join(', ') || '(ninguno)'}. ` +
      'Agregá el service account como usuario en Search Console.',
  );
}

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

async function querySearchAnalytics(
  token: string,
  siteUrl: string,
  startDate: string,
  endDate: string,
  rowLimit: number,
): Promise<SearchAnalyticsRow[]> {
  const encodedSite = encodeURIComponent(siteUrl);
  const res = await fetch(`${WEBMASTERS_BASE}/sites/${encodedSite}/searchAnalytics/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      startDate,
      endDate,
      dimensions: ['query'],
      rowLimit,
    }),
  });
  if (!res.ok) {
    throw new Error(`searchAnalytics/query falló: ${res.status} ${await res.text()}`);
  }
  const json = (await res.json()) as { rows?: SearchAnalyticsRow[] };
  return json.rows ?? [];
}

function toMarkdown(
  siteUrl: string,
  startDate: string,
  endDate: string,
  rows: SearchAnalyticsRow[],
): string {
  const lines = [
    '# Baseline SEO · Google Search Console',
    '',
    `> Generado automáticamente · ${new Date().toISOString()}`,
    '',
    `- **Property**: \`${siteUrl}\``,
    `- **Período**: ${startDate} → ${endDate}`,
    `- **Sitemap**: ${searchConsoleConfig.sitemapUrl}`,
    '',
    '## Top keywords (clicks)',
    '',
    '| Query | Clicks | Impresiones | CTR | Posición avg |',
    '| --- | ---: | ---: | ---: | ---: |',
  ];

  if (rows.length === 0) {
    lines.push('| _(sin datos en el período)_ | — | — | — | — |');
  } else {
    for (const row of rows) {
      const query = row.keys?.[0] ?? '(unknown)';
      const clicks = row.clicks ?? 0;
      const impressions = row.impressions ?? 0;
      const ctr = row.ctr != null ? `${(row.ctr * 100).toFixed(1)}%` : '—';
      const position = row.position != null ? row.position.toFixed(1) : '—';
      lines.push(`| ${query.replace(/\|/g, '\\|')} | ${clicks} | ${impressions} | ${ctr} | ${position} |`);
    }
  }

  lines.push(
    '',
    '## Checklist manual en Search Console',
    '',
    '- [ ] Sitemap `https://www.gard.cl/sitemap.xml` enviado y sin errores',
    '- [ ] International Targeting → Chile',
    '- [ ] Vincular propiedad GA4 (`G-4XJ2YKYYDH`) en Settings → Associations',
    '- [ ] Revisar Core Web Vitals y Pages → Indexación semanalmente',
    '',
  );

  return lines.join('\n');
}

export async function runGscAnalyticsExport(): Promise<void> {
  const days = Number.parseInt(env('GSC_ANALYTICS_DAYS') ?? '28', 10);
  const rowLimit = Number.parseInt(env('GSC_ANALYTICS_ROW_LIMIT') ?? '25', 10);

  const end = new Date();
  const start = new Date(end);
  start.setDate(start.getDate() - days);

  const startDate = formatDate(start);
  const endDate = formatDate(end);

  const clientEmail = requireEnv('GSC_SERVICE_ACCOUNT_EMAIL');
  const privateKey = requireEnv('GSC_SERVICE_ACCOUNT_KEY');

  const token = await getAccessToken(clientEmail, privateKey);
  const accessible = await listAccessibleSites(token);
  const siteUrl = resolveSiteUrl(accessible);

  const rows = await querySearchAnalytics(token, siteUrl, startDate, endDate, rowLimit);
  const markdown = toMarkdown(siteUrl, startDate, endDate, rows);

  const docsPath = join(process.cwd(), 'docs', 'seo-baseline-latest.md');
  writeFileSync(docsPath, markdown, 'utf8');
  console.log(`Escrito: ${docsPath} (${rows.length} queries)`);

  const logDir = join(process.cwd(), 'cowork-logs');
  if (!existsSync(logDir)) {
    mkdirSync(logDir, { recursive: true });
  }
  const logPath = join(
    logDir,
    `gsc-analytics-${new Date().toISOString().replace(/[:.]/g, '-')}.json`,
  );
  writeFileSync(
    logPath,
    JSON.stringify({ siteUrl, startDate, endDate, rowCount: rows.length, rows }, null, 2),
    'utf8',
  );
  console.log(`Log: ${logPath}`);
}

if (import.meta.url === `file://${process.argv[1] ?? ''}`) {
  runGscAnalyticsExport().catch((err: unknown) => {
    console.error(err);
    process.exit(1);
  });
}
