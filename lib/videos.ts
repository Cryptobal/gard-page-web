// ID de la cuenta de Cloudflare Stream
export const CLOUDFLARE_ACCOUNT_ID = 'gGw8cfmEZedi85dYm6qcFw';

// Helper para construir la URL de Cloudflare Stream
export const getCloudflareVideoUrl = (
  videoId: string
): string => {
  // Los videos en Cloudflare Stream tienen una URL específica
  // Probamos con el formato de iframe, que es más confiable
  return `https://iframe.cloudflarestream.com/${videoId}`;
}; 