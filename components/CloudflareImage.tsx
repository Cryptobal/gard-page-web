import Image from 'next/image';
import { getCloudflareImageUrl } from '@/lib/images';

interface CloudflareImageProps {
  imageId: string;
  alt: string;
  width?: number;
  height?: number;
  variant?: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  objectPosition?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export default function CloudflareImage({
  imageId,
  alt,
  width,
  height,
  variant = 'public',
  className = '',
  priority = false,
  fill = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw',
  quality = 85, // Reducido para mobile-first
  objectFit = 'cover',
  objectPosition = 'center',
  placeholder = 'empty',
  blurDataURL,
}: CloudflareImageProps) {
  const imageUrl = getCloudflareImageUrl(imageId, variant);
  
  const imageProps = {
    src: imageUrl,
    alt,
    className: `${className} ${fill ? 'object-' + objectFit + ' object-' + objectPosition.replace(' ', '-') : ''}`,
    priority,
    quality,
    sizes,
    placeholder,
    // Simple placeholder base64 por defecto si se solicita blur y no se entrega uno específico
    blurDataURL: placeholder === 'blur' ? (blurDataURL || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjEwODAiIGZpbGw9IiNlZWUiIC8+PC9zdmc+') : undefined,
  };

  return fill ? (
    <div className="relative w-full h-full">
      <Image
        {...imageProps}
        fill={true}
      />
    </div>
  ) : (
    <Image
      {...imageProps}
      width={width}
      height={height}
    />
  );
} 