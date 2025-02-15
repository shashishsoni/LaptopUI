import { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
  src: string;
  className?: string;
}

const VideoPlayer = ({ src, className }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simply use the src directly from public folder
  const videoSrc = `/videos/${src.split('/').pop()}`;

  return (
    <div className={`relative ${className || ''}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <span className="text-white">Loading...</span>
        </div>
      )}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <span className="text-white/60">{error}</span>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer; 