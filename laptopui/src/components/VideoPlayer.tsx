import { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
  src: string;
  className?: string;
}

const VideoPlayer = ({ src, className }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleError = (e: Event) => {
      console.error('Video error:', e);
      setError('Failed to load video');
    };

    const handleLoadedData = () => {
      video.play().catch(err => {
        console.warn('Autoplay failed:', err);
      });
    };

    video.addEventListener('error', handleError);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [src]);

  // Ensure video path starts with /videos/
  const videoSrc = src.startsWith('/videos/') ? src : `/videos/${src}`;

  return (
    <div className={`relative ${className}`}>
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