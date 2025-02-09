import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const PageContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pages = containerRef.current?.children;
    if (!pages) return;

    Array.from(pages).forEach((page, i) => {
      gsap.to(page, {
        xPercent: -100 * i,
        ease: "none",
        scrollTrigger: {
          trigger: page,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: 1,
        },
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="h-screen overflow-hidden">
      {children}
    </div>
  );
};

export default PageContainer; 