import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Update the laptop lid and base colors
const METALLIC_GRAY = '#2D3436';
const METALLIC_LIGHT = '#636E72';
const METALLIC_DARK = '#2D3436';
const EDGE_HIGHLIGHT = '#DFE6E9';

export default function LaptopAnimationPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [showNewContent, setShowNewContent] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Updated image paths and added more gaming-focused images
  const slides = [
    '/image/image1.jpg',  
    '/image/image2.jpg',   
    '/image/image3.jpg'     
  ];

  useEffect(() => {
    if (containerRef.current) {
      const updateSize = () => {
        setContainerSize({
          width: containerRef.current?.offsetWidth || 0,
          height: containerRef.current?.offsetHeight || 0
        });
      };

      updateSize();
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }
  }, []);

  useEffect(() => {
    // Background slider animation
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !svgContainerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=600vh",
        scrub: true,
        pin: true,
        pinSpacing: true,
      },
      onComplete: () => setShowNewContent(true),
    });

    // Step 1: Display gaming features
    tl.set('.gaming-features', {
      opacity: 1,
    });

    // Step 2: Synchronized laptop lid opening and screen content
    tl.to('.laptop-lid', {
      duration: 8,
      attr: {
        d: 'M 70,240 l 341.643 0 l 0 -215.73 l -341.643 0 l 0 215.73 z M 426,250 l -368.433 0 l 0 -231.663 c 0 -9.87 8.037 -18.048 18.048 -18.048 l 333.606 0 c 9.87 0 18.048 8.037 18.048 18.048 l 0 231.663 z',
      },
      fill: METALLIC_DARK,
      ease: "power2.inOut",
    })
    .to('.screen-content', {
      duration: 8,
      opacity: 1,
      ease: "power2.inOut",
    }, "<")
    .to('.content-wrapper', {
      duration: 4,
      opacity: 1,
      ease: "power2.inOut",
    }, "<+=2");

    // Step 3: Extended zoom out effect
    tl.to([svgContainerRef.current, '.gaming-features'], {
      duration: 8,
      scale: 0.5,
      opacity: 0,
      ease: "power2.inOut",
    }, ">");

    // Step 4: Show new content
    tl.to('.new-content', {
      duration: 3,
      opacity: 1,
      y: 0,
      ease: "power2.out",
    }, "-=2");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-screen overflow-hidden relative">
      {/* Enhanced Background Slider */}
      <div 
        className="absolute z-0"
        style={{
          width: `${containerSize.width}px`,
          height: `${containerSize.height}px`
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide}
            className={`absolute transition-all duration-1000 ease-in-out ${
              currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{
              width: `${containerSize.width}px`,
              height: `${containerSize.height}px`
            }}
          >
            {/* Background Image */}
            <div
              className="absolute bg-cover bg-center transform"
              style={{
                width: '100%',
                height: '1500px',
                backgroundImage: `url(${slide})`,
                filter: 'brightness(0.4)',
              }}
            />
            {/* Gradient Overlay */}
            <div 
              className="absolute bg-gradient-to-b from-black/50 via-transparent to-black/50"
              style={{
                width: `${containerSize.width}px`,
                height: `${containerSize.height}px`
              }}
            />
          </div>
        ))}
      </div>

      {/* Enhanced Gaming Features Section */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-full max-w-6xl text-center opacity-0 gaming-features z-10">
        <h1 className="text-6xl font-bold mb-12 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600 drop-shadow-2xl">
          Next-Gen Gaming Experience
        </h1>
        
        {/* Enhanced Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="feature-card backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20 hover:border-purple-500/50 transition-all duration-300">
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-cyan-400 mb-3">NVIDIA RTX 4090</h3>
            <p className="text-gray-300">24GB GDDR6X Memory</p>
            <p className="text-gray-400 text-sm mt-2">Ray Tracing & DLSS 3.0</p>
          </div>
          <div className="feature-card backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20 hover:border-purple-500/50 transition-all duration-300">
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-purple-500 mb-3">360Hz Display</h3>
            <p className="text-gray-300">1ms Response Time</p>
            <p className="text-gray-400 text-sm mt-2">G-SYNC Ultimate</p>
          </div>
          <div className="feature-card backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20 hover:border-purple-500/50 transition-all duration-300">
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-pink-600 mb-3">Per-Key RGB</h3>
            <p className="text-gray-300">16.8M Colors</p>
            <p className="text-gray-400 text-sm mt-2">Dynamic Effects</p>
          </div>
        </div>

        {/* New Specs Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
          <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
            <h3 className="text-cyan-400 text-lg font-semibold">CPU</h3>
            <p className="text-white">Intel i9-13980HX</p>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
            <h3 className="text-purple-500 text-lg font-semibold">RAM</h3>
            <p className="text-white">64GB DDR5</p>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
            <h3 className="text-pink-600 text-lg font-semibold">Storage</h3>
            <p className="text-white">4TB NVMe SSD</p>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
            <h3 className="text-cyan-400 text-lg font-semibold">Battery</h3>
            <p className="text-white">90Wh</p>
          </div>
        </div>
      </div>

      {/* Updated Gaming Laptop SVG - Adjusted position */}
      <div
        ref={svgContainerRef}
        className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[95vw] z-20"
      >
        <svg
          viewBox="0 0 480 268"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Screen Content - Improved UI */}
          <g className="screen-content" opacity="0" style={{ zIndex: 30 }}>
            {/* Screen Background */}
            <rect x="70" y="24.27" width="341.643" height="215.73" fill={METALLIC_DARK} />
            
            {/* Gaming UI Elements */}
            <g className="gaming-ui">
              {/* Top Bar */}
              <rect x="70" y="24.27" width="341.643" height="24" fill="#0a0a0a" />
              <circle cx="395" cy="36" r="3" fill="#00ff88" />
              <circle cx="380" cy="36" r="3" fill="#00ffaa" />
              <text x="85" y="41" fill="#00ff88" fontSize="11" fontFamily="monospace">SYSTEM STATUS: OPTIMAL</text>
              
              {/* Main Content */}
              <g className="content-wrapper" opacity="0">
                {/* Gaming Dashboard */}
                <rect x="80" y="58" width="321.643" height="172" fill="#0a0a0a" rx="4" />
                
                {/* System Stats */}
                <g className="stats-container" transform="translate(90, 68)">
                  <rect width="150" height="45" fill="#111111" rx="4" />
                  <text x="10" y="20" fill="#00ff88" fontSize="11" fontFamily="monospace">CPU TEMPERATURE</text>
                  <text x="10" y="35" fill="#ffffff" fontSize="14" fontFamily="monospace">75°C | 5.2 GHz</text>
                </g>
                
                <g className="stats-container" transform="translate(250, 68)">
                  <rect width="150" height="45" fill="#111111" rx="4" />
                  <text x="10" y="20" fill="#00ff88" fontSize="11" fontFamily="monospace">GPU TEMPERATURE</text>
                  <text x="10" y="35" fill="#ffffff" fontSize="14" fontFamily="monospace">68°C | RTX 4090</text>
                </g>

                {/* Performance Graph */}
                <g className="graph-container" transform="translate(90, 123)">
                  <rect width="310" height="97" fill="#111111" rx="4" />
                  <text x="10" y="20" fill="#00ff88" fontSize="11" fontFamily="monospace">SYSTEM PERFORMANCE</text>
                  <polyline
                    points="10,70 50,30 90,50 130,20 170,40 210,25 250,35 290,30"
                    stroke="#00ff88"
                    strokeWidth="2"
                    fill="none"
                  />
                  <line x1="10" y1="80" x2="300" y2="80" stroke="#1a1a1a" strokeWidth="1" />
                  <line x1="10" y1="30" x2="300" y2="30" stroke="#1a1a1a" strokeWidth="1" />
                </g>
              </g>
            </g>
          </g>

          {/* Laptop Bottom */}
          <g className="laptop-bottom" style={{ zIndex: 10 }}>
            {/* Base Shadow with Sharper Edges */}
            <path
              d="M5,250 L475,250 C478,250 480,251 480,262 L0,262 C0,251 2,250 5,250"
              fill={METALLIC_DARK}
              className="shadow-2xl"
            />
            {/* Main Base with Sharp Edges */}
            <path
              transform="translate(0, 250)"
              d="M460,18 L20,18 C15,18 10,14 0,12 L480,12 C470,14 465,18 460,18 Z"
              fill={METALLIC_GRAY}
            />
            <rect x="0" y="250" width="480" height="12" fill={METALLIC_LIGHT} />
            {/* Metallic Edge Highlight */}
            <rect x="20" y="255" width="440" height="1" fill={EDGE_HIGHLIGHT} opacity="0.3" />
          </g>

          {/* Gaming Laptop Lid with Sharp Edges */}
          <path
            className="laptop-lid"
            d="M 70,240 l 341.6 0 l 52.17 0 l -434.7 0 l 52 0 z M 426,250 l -368.4 0 l -56.4 0 c 0 -8.46 8 -8.46 18.05 -8.46 l 443.6 0 c 19.7 0 18 8 18 8.5 l -56 0 z"
            fill={METALLIC_GRAY}
            stroke={EDGE_HIGHLIGHT}
            strokeWidth="0.5"
            style={{ zIndex: 20 }}
          />

          {/* Gradients Definitions */}
          <defs>
            <linearGradient id="rgbGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ff88" />
              <stop offset="50%" stopColor="#00ffaa" />
              <stop offset="100%" stopColor="#00ff88" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* New Content with Video Background */}
      <div
        className={`new-content absolute inset-0 opacity-0 transform translate-y-8 transition-all duration-500 ${
          showNewContent ? 'opacity-100 translate-y-0' : ''
        }`}
      >
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute w-full h-full object-cover"
          >
            <source src="/video/Untitled design_2.mp4" type="video/mp4" />
          </video>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
          <h1 className="mt-10 text-5xl font-bold text-center mb-12 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600">
            Welcome to the Future
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 hover:border-purple-500/50 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">Performance</h2>
              <p className="text-gray-300">Experience unparalleled gaming performance with the latest hardware.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 hover:border-purple-500/50 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4 text-purple-500">Innovation</h2>
              <p className="text-gray-300">Cutting-edge technology meets sophisticated design.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 hover:border-purple-500/50 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4 text-pink-600">Experience</h2>
              <p className="text-gray-300">Immerse yourself in the next generation of gaming.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}