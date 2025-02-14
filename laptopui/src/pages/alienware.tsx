import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { AlienwareProduct, alienwareLaptops } from '../data/alienwaresdata';
import Link from 'next/link';
import Image from 'next/image';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AlienwarePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeLaptop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const sideCardsRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initial animations with stagger effect only
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(titleRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      filter: "blur(10px)",
    })
    .from(mainCardRef.current, {
      x: -100,
      opacity: 0,
      duration: 1,
      scale: 0.8,
      filter: "blur(5px)",
    }, "-=0.7")
    .from(Array.from(sideCardsRef.current?.children || []), {
      x: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      scale: 0.9,
      filter: "blur(5px)",
    }, "-=0.8")
    .from(Array.from(specsRef.current?.children || []), {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      scale: 0.9,
      filter: "blur(3px)",
    }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="overflow-hidden bg-[#0A0A0C]">
      <div ref={containerRef} className="h-screen relative">
        {/* Section 1: Alienware X-Series */}
        <div 
          ref={(el) => { sectionsRef.current[0] = el; }} 
          className="w-screen h-screen relative px-6 py-2 bg-gradient-to-br from-[#0A0A0C] via-[#1a0505] to-[#200505]"
        >
          {/* Modern Background */}
          <div ref={backgroundRef} className="absolute inset-0 w-full h-full -z-10">
            {/* Gradient orbs - reduced blur and size */}
            <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-red-900/20 rounded-full blur-[64px] animate-float" />
            <div className="absolute bottom-20 right-20 w-[30rem] h-[30rem] bg-purple-900/15 rounded-full blur-[64px] animate-float-delayed" />
            
            {/* Grid overlay with darker base */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#120000] via-[#1a0505] to-[#200505]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
          </div>

          {/* Content Container */}
          <div className="absolute inset-0 w-full h-screen px-4 py-2">
            <div className="relative w-full max-w-[1400px] mx-auto flex flex-col h-screen">
              {/* Header Section - Centered */}
              <div ref={titleRef} className="relative z-20 flex flex-col items-center text-center mb-4">
                <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#2d0a16]/50 backdrop-blur-md border border-red-900/20 mb-3">
                  <span className="text-red-400">Alienware</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                  <span className="text-white/60">Elite Gaming</span>
                </div>
                <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
                  {alienwareLaptops[activeLaptop].name}
                </h1>
                <p className="mb-5 text-sm text-white/60 max-w-2xl">
                  {alienwareLaptops[activeLaptop].description}
                </p>
              </div>

              {/* Main Content Layout */}
              <div className="flex-1 grid grid-cols-12 gap-4 min-h-0 relative z-20">
                {/* Left Column - Main Display */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-3">
                  {/* Main Card */}
                  <div className="relative h-[calc(100vh-12rem)] lg:h-[calc(100vh-28.8rem)] rounded-2xl overflow-hidden">
                    <MainCard 
                      product={alienwareLaptops[activeLaptop]} 
                      activeIndex={activeIndex}
                      category={alienwareLaptops[activeLaptop].category}
                      price={alienwareLaptops[activeLaptop].price}
                    />
                  </div>
                  
                  {/* Thumbnails */}
                  <div className="grid grid-cols-3 gap-3 h-16">
                    {[1, 2, 3].map((index) => (
                      <div key={index} className="relative h-full" onClick={() => setActiveIndex(index)}>
                        <SideCard
                          index={index}
                          image={alienwareLaptops[activeLaptop].images[index]}
                          onClick={() => setActiveIndex(index)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - Features & Performance */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
                  {/* Features Panel */}
                  <div ref={specsRef} className="bg-white/[0.03] backdrop-blur-2xl rounded-2xl p-4 border border-white/[0.05]
                    shadow-xl shadow-black/20 h-[calc(100vh-12rem)] lg:h-[calc(100vh-14rem)] overflow-y-auto">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-semibold text-white">Features</h3>
                      <span className="px-2 py-1 rounded-full bg-white/5 text-white/60 text-xs">
                        {alienwareLaptops[activeLaptop].category}
                      </span>
                    </div>
                    <div className="space-y-4 pr-2">
                      {alienwareLaptops[activeLaptop].features.map((feature, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] 
                          transition-colors group border border-white/[0.05] hover:border-white/[0.1]">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/10 to-purple-500/10 
                              flex items-center justify-center border border-white/[0.05] group-hover:border-white/[0.1]">
                              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                              </svg>
                            </div>
                            <h4 className="text-white font-medium">{feature.title}</h4>
                          </div>
                          <p className="text-white/60 text-sm pl-11">{feature.description}</p>
                        </div>
                      ))}
                    </div>

                    {/* Performance Stats */}
                    <div className="mt-6">
                      <h3 className="text-base font-semibold text-white mb-4">Performance</h3>
                      <div className="space-y-4">
                        {alienwareLaptops[activeLaptop].performance.map((stat, idx) => (
                          <div key={idx} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-white/60">{stat.label}</span>
                              <span className="text-white">{stat.value}</span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-red-900 to-purple-900 rounded-full"
                                style={{ width: stat.value }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// MainCard Component
const MainCard = React.memo(({ product, activeIndex, category, price }: { 
  product: AlienwareProduct; 
  activeIndex: number;
  category: string;
  price: string;
}) => {
  const mainCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(mainCardRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.3,
      onComplete: () => {
        gsap.to(mainCardRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
        });
      },
    });
  }, [activeIndex]);

  return (
    <div ref={mainCardRef} className="relative w-full h-full group">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-purple-900/20 opacity-0 
        group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      
      {/* Media Container */}
      <div className="relative h-full rounded-2xl overflow-hidden">
        {activeIndex === 0 && product.video ? (
          <video
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            autoPlay
            loop
            muted
            playsInline
            src={product.video}
          />
        ) : (
          <Image
            src={product.images[activeIndex]}
            alt={product.name}
            width={1200}
            height={800}
            priority={activeIndex === 0}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex flex-col gap-4">
            {/* Brand and Price Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-2
                  shadow-lg shadow-black/20 flex items-center justify-center">
                  <svg className="w-full h-full text-red-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 19h20L12 2zm0 3l7 14H5l7-14z"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-white/60">Alienware</span>
                  <span className="text-white font-medium">{category}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-400">
                  {price}
                </span>
                <span className="text-white/40 text-sm">USD</span>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-xl text-white/90 text-sm
                  border border-white/10">
                  Elite Performance
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">{product.name}</h3>
              <p className="text-white/80 text-base max-w-xl line-clamp-2">
                {product.description}
              </p>
              
              {/* Config Button */}
              <Link
                href={`/configure/${product.id}`}
                className="mt-4 w-full px-4 py-3 bg-gradient-to-r from-red-600 to-purple-600 rounded-xl
                  hover:from-red-500 hover:to-purple-500 transition-all duration-300 group
                  font-medium text-white text-base shadow-xl shadow-red-500/20 inline-block"
              >
                <div className="flex items-center justify-center gap-3">
                  Configure Now
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
MainCard.displayName = 'MainCard';

// SideCard Component
const SideCard = React.memo(({ index, image, onClick }: { index: number; image: string; onClick: () => void }) => (
  <div 
    className="relative h-full rounded-xl overflow-hidden cursor-pointer group"
    onClick={onClick}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-purple-900/20 opacity-0 
      group-hover:opacity-100 transition-opacity duration-300 z-10" />
    <Image
      src={image}
      alt={`View ${index}`}
      width={400}
      height={300}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 
      transition-colors duration-300 flex items-center justify-center">
      <span className="text-white/60 group-hover:text-white text-sm transition-colors">
        View {index}
      </span>
    </div>
  </div>
));
SideCard.displayName = 'SideCard';

export default AlienwarePage;