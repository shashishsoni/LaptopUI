import { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
  src: string;
  className?: string;
}

const VideoPlayer = ({ src, className }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleError = (e: Event) => {
      console.error('Video error:', e);
      setError('Failed to load video');
      setIsLoading(false);
    };

    const handleLoadedData = () => {
      setIsLoading(false);
      setError(null);
    };

    video.addEventListener('error', handleError);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  // Ensure video path is absolute
  const videoSrc = src.startsWith('http') ? src : `${process.env.NEXT_PUBLIC_VERCEL_URL || ''}${src}`;

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
        crossOrigin="anonymous"
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