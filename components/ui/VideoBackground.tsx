'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Stream } from '@cloudflare/stream-react';

interface VideoBackgroundProps {
  videoId?: string;
  imageId?: string;
  title?: string;
  className?: string;
  overlay?: boolean;
  posterUrl?: string;
}

const FALLBACK_VIDEO_IDS = [
  'ac93b4a10e87873748171425b9f8066d',
  '173a0d7d07ffa39bb4c93e422d676e65',
];

export default function VideoBackground({
  videoId,
  title = "Video de fondo",
  className = "",
  overlay = true,
}: VideoBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const playTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (playTimerRef.current) clearTimeout(playTimerRef.current);
    };
  }, []);

  const handleVideoError = useCallback(() => {
    const nextIndex = currentVideoIndex + 1;
    if (nextIndex < FALLBACK_VIDEO_IDS.length) {
      setCurrentVideoIndex(nextIndex);
    } else {
      setVideoError(true);
    }
  }, [currentVideoIndex]);

  const handlePlay = useCallback(() => {
    playTimerRef.current = setTimeout(() => {
      setVideoReady(true);
    }, 150);
  }, []);

  const getCurrentVideoId = () => {
    if (videoId) return videoId;
    return FALLBACK_VIDEO_IDS[currentVideoIndex];
  };

  const currentVideoId = getCurrentVideoId();

  if (!mounted || !currentVideoId || videoError) {
    return null;
  }

  return (
    <div
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{
        opacity: videoReady ? 1 : 0,
        transition: 'opacity 800ms ease-in',
        willChange: videoReady ? 'auto' : 'opacity',
      }}
    >
      <Stream
        src={currentVideoId}
        controls={false}
        muted={true}
        loop={true}
        autoplay={true}
        className="w-full h-full absolute inset-0 object-cover"
        preload="auto"
        title={title}
        onPlay={handlePlay}
        onError={handleVideoError}
      />
    </div>
  );
}