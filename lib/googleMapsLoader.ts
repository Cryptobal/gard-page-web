import { Loader } from '@googlemaps/js-api-loader';

let loaderInstance: Loader | null = null;

export function getGoogleMapsLoader(): Loader {
  if (loaderInstance) return loaderInstance;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
  if (!apiKey && typeof window !== 'undefined') {
    console.warn(
      '[gmaps] NEXT_PUBLIC_GOOGLE_MAPS_API_KEY no configurada. El autocompletado de direcciones no funcionará.'
    );
  }

  loaderInstance = new Loader({
    apiKey,
    version: 'weekly',
    libraries: ['places'],
  });

  return loaderInstance;
}
