'use client';

import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  publicId: string;
  className?: string;
  id?: string;
  controls?: boolean;
}

const VideoPlayer = ({ publicId, className = '', id, controls = false }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // For debugging
  console.log('Video URL being used:', publicId);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play().catch(error => {
        console.warn('Autoplay prevented:', error);
      });
    }
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        id={id}
        src={publicId}
        autoPlay
        muted
        loop
        playsInline
        controls={controls}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default VideoPlayer;