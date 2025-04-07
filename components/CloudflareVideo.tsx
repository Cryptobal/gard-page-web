'use client';

import React from 'react';
import { Stream } from '@cloudflare/stream-react';

interface CloudflareVideoProps {
  videoId: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  poster?: string;
  width?: string | number;
  height?: string | number;
}

export default function CloudflareVideo({
  videoId,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
  poster,
  width = '100%',
  height = '100%',
}: CloudflareVideoProps) {
  return (
    <div style={{ width, height, position: 'relative' }} className={className}>
      <Stream 
        src={videoId}
        controls={controls}
        muted={muted}
        loop={loop}
        autoplay={autoPlay}
        poster={poster}
        className="w-full h-full absolute inset-0 object-cover"
        preload="auto"
      />
    </div>
  );
} 