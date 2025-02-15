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

  // Convert Cloudinary public ID to URL
  const videoUrl = `https://res.cloudinary.com/dtbppvpta/video/upload/v1739634434/laptopui/${publicId}.mp4`;

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
        src={videoUrl}
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