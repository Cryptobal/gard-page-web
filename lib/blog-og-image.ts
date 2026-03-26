import { CLOUDFLARE_ACCOUNT_HASH } from '@/lib/images';

const SITE_ORIGIN = 'https://www.gard.cl';
const DEFAULT_CLOUDFLARE_IMAGE_ID = '5eea1064-8a2d-4e8b-5606-d28775467a00';

function isValidCloudflareImageId(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id);
}

/** URL absoluta para Open Graph, Twitter y JSON-LD (card local o Cloudflare). */
export function getBlogPostShareImageUrl(
  cardImage?: string,
  imageId?: string
): string {
  if (cardImage?.startsWith('/')) {
    return `${SITE_ORIGIN}${cardImage}`;
  }
  if (imageId && isValidCloudflareImageId(imageId)) {
    return `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_HASH}/${imageId}/public`;
  }
  return `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_HASH}/${DEFAULT_CLOUDFLARE_IMAGE_ID}/public`;
}
