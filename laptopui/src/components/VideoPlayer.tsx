import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  src: string;
  className?: string;
}

const VideoPlayer = ({ src, className }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.warn('Video autoplay failed:', error);
      });
    }
  }, []);

  // Handle both /videos/ and direct paths
  const videoSrc = src.startsWith('/') ? src : `${src}`;

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
};

export default VideoPlayer; 