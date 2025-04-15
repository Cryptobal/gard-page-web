'use client';

import React from 'react';
import { Stream } from '@cloudflare/stream-react';

interface CloudflareVideoProps {
  videoId: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

export default function CloudflareVideo({
  videoId,
  className = '',
  autoplay = true,
  loop = true,
  muted = true,
  controls = false,
}: CloudflareVideoProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Stream
        src={videoId}
        autoplay={autoplay}
        loop={loop}
        muted={muted}
        controls={controls}
        className="w-full h-full object-cover"
      />
    </div>
  );
} 