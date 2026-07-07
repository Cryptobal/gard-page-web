const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1500;

export type OpaiMessagePayload = {
  type: string;
  anonymous?: boolean;
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  body: string;
  fileUrl?: string;
  fileName?: string;
  metadata?: Record<string, string | undefined>;
};

type SubmitResult =
  | { ok: true }
  | { ok: false; message: string };

export async function submitOpaiMessage(
  endpoint: string,
  payload: OpaiMessagePayload
): Promise<SubmitResult> {
  let lastError = 'No se pudo enviar la denuncia. Intenta nuevamente.';

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS * attempt));
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        return { ok: true };
      }

      const errorBody = await response.text().catch(() => '');
      lastError = errorBody
        ? `Error al enviar (${response.status}). Intenta nuevamente.`
        : `Error al enviar (${response.status}). Intenta nuevamente.`;

      if (response.status >= 400 && response.status < 500 && response.status !== 408 && response.status !== 429) {
        break;
      }
    } catch {
      lastError = 'Error de conexión. Verifica tu internet e intenta más tarde.';
    }
  }

  return { ok: false, message: lastError };
}

export async function uploadLegalEvidence(
  endpoint: string,
  file: File
): Promise<{ ok: true; url: string; fileName: string } | { ok: false; message: string }> {
  const uploadBody = new FormData();
  uploadBody.append('file', file);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: uploadBody,
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data?.success && data?.data?.url) {
      return {
        ok: true,
        url: data.data.url as string,
        fileName: (data.data.fileName as string) || file.name,
      };
    }

    return { ok: false, message: 'No se pudo adjuntar el archivo. Puedes enviar la denuncia sin evidencia.' };
  } catch {
    return { ok: false, message: 'No se pudo adjuntar el archivo. Puedes enviar la denuncia sin evidencia.' };
  }
}
