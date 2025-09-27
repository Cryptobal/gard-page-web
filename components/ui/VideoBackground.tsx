'use client';

import React, { useState, useEffect } from 'react';
import { Stream } from '@cloudflare/stream-react';

interface VideoBackgroundProps {
  videoId?: string;
  imageId?: string;
  title?: string;
  className?: string;
  overlay?: boolean;
}

const FALLBACK_VIDEO_IDS = [
  'ac93b4a10e87873748171425b9f8066d',
  '173a0d7d07ffa39bb4c93e422d676e65',
];

export default function VideoBackground({ 
  videoId, 
  imageId, 
  title = "Video de fondo",
  className = "",
  overlay = true 
}: VideoBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleVideoError = () => {
    const nextIndex = currentVideoIndex + 1;
    if (nextIndex < FALLBACK_VIDEO_IDS.length) {
      setCurrentVideoIndex(nextIndex);
    } else {
      setVideoError(true);
    }
  };

  const getCurrentVideoId = () => {
    if (videoId) return videoId;
    return FALLBACK_VIDEO_IDS[currentVideoIndex];
  };

  // NO renderizar NADA hasta estar montado
  if (!mounted) {
    return null;
  }

  const currentVideoId = getCurrentVideoId();

  // Si hay error, mostrar gradiente solamente
  if (videoError || !currentVideoId) {
    return (
      <div className={`absolute inset-0 w-full h-full ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-gray-900/70 to-gray-900/90"></div>
      </div>
    );
  }

  // Mostrar video
  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      <div className="absolute inset-0 w-full h-full">
        <Stream 
          src={currentVideoId}
          controls={false}
          muted={true}
          loop={true}
          autoplay={true}
          className="w-full h-full absolute inset-0 object-cover"
          preload="auto"
          title={title}
          onError={handleVideoError}
        />
      </div>
    </div>
  );
}