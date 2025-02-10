import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import type { MSIProduct } from '../data/msidata';
import { msiProducts } from '../data/msidata';

const MSIPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeLaptop, setActiveLaptop] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const sideCardsRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial animations with stagger effect
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
    <div className="relative w-full h-screen px-4 py-2">
      {/* Background Elements */}
      <div ref={backgroundRef} className="absolute inset-0 w-full h-full -z-10">
        <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-red-900/20 rounded-full blur-[64px] animate-float" />
        <div className="absolute bottom-20 right-20 w-[30rem] h-[30rem] bg-red-900/15 rounded-full blur-[64px] animate-float-delayed" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto flex flex-col h-screen">
        {/* Header Section */}
        <div ref={titleRef} className="relative z-20 flex flex-col items-center text-center mb-4">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-3">
            <span className="text-red-400">MSI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
            <span className="text-white/60">Dragon Spirit</span>
          </div>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
            {msiProducts[activeLaptop].name}
          </h1>
          <p className="mb-5 text-sm text-white/60 max-w-2xl">
            Unleash the dragon within with MSI's cutting-edge gaming technology
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="flex-1 grid grid-cols-12 gap-4 min-h-0 relative z-20">
          {/* Left Column - Main Display */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-3">
            {/* Main Card */}
            <div ref={mainCardRef} className="relative h-[calc(100vh-12rem)] lg:h-[calc(100vh-28.8rem)] rounded-2xl overflow-hidden">
              <MainCard 
                product={msiProducts[activeLaptop]} 
                activeIndex={activeIndex}
                category={msiProducts[activeLaptop].category}
                price={msiProducts[activeLaptop].price}
              />
            </div>
            
            {/* Thumbnails */}
            <div ref={sideCardsRef} className="grid grid-cols-3 gap-3 h-56 bg-cover">
              {[1, 2, 3].map((index) => (
                <SideCard
                  key={index}
                  index={index}
                  image={msiProducts[activeLaptop].images[index]}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Specs & Details */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            <div ref={specsRef} className="bg-white/[0.03] backdrop-blur-2xl rounded-2xl p-4 border border-white/[0.05]
              shadow-xl shadow-black/20 h-[calc(100vh-12rem)] lg:h-[calc(100vh-14rem)] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-white">Specifications</h3>
                <span className="px-2 py-1 rounded-full bg-white/5 text-white/60 text-xs">
                  Dragon Series
                </span>
              </div>
              <div className="space-y-3 pr-2">
                {msiProducts[activeLaptop].specs.map((spec, idx) => (
                  <SpecBadge key={idx} spec={spec} />
                ))}
              </div>

              {/* Performance Stats */}
              <div className="mt-6">
                <h3 className="text-base font-semibold text-white mb-4">Performance</h3>
                <div className="space-y-4">
                  {[
                    { label: "Gaming Performance", value: "98%" },
                    { label: "CPU Speed", value: "95%" },
                    { label: "GPU Power", value: "97%" },
                    { label: "Cooling Efficiency", value: "94%" }
                  ].map((stat, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">{stat.label}</span>
                        <span className="text-white">{stat.value}</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-red-900 to-red-600 rounded-full"
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
  );
};

// Helper Components
const MainCard = React.memo(({ product, activeIndex, category, price }: {
  product: MSIProduct;
  activeIndex: number;
  category: string;
  price: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(cardRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.3,
      onComplete: () => {
        gsap.to(cardRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
        });
      },
    });
  }, [activeIndex]);

  return (
    <div ref={cardRef} className="relative w-full h-full group">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 opacity-0 
        group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      
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
          <img
            src={product.images[activeIndex]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-2
                  shadow-lg shadow-black/20 flex items-center justify-center">
                  <svg className="w-full h-full text-red-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 19h20L12 2zm0 3l7 14H5l7-14z"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-white/60">Dragon Series</span>
                  <span className="text-white font-medium">{category}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                  {price}
                </span>
                <span className="text-white/40 text-sm">USD</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-xl text-white/90 text-sm
                  border border-white/10">
                  Dragon Gaming
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">{product.name}</h3>
              <p className="text-white/80 text-base max-w-xl line-clamp-2">
                {product.description}
              </p>
              
              <button className="mt-4 w-full px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl
                hover:from-red-500 hover:to-orange-500 transition-all duration-300 group
                font-medium text-white text-base shadow-xl shadow-red-500/20">
                <div className="flex items-center justify-center gap-3">
                  Configure Now
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const SideCard = React.memo(({ index, image, onClick }: { index: number; image: string; onClick: () => void }) => (
  <div 
    className="relative h-full rounded-xl overflow-hidden cursor-pointer group"
    onClick={onClick}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 opacity-0 
      group-hover:opacity-100 transition-opacity duration-300 z-10" />
    <img
      src={image}
      alt={`View ${index}`}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 bg-cover"
    />
    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 
      transition-colors duration-300 flex items-center justify-center">

      <span className="text-white/60 group-hover:text-white text-sm transition-colors">
        View {index}
      </span>
    </div>
  </div>
));

const SpecBadge = React.memo(({ spec }: { spec: string }) => (
  <div className="group hover-card-effect bg-black/60 backdrop-blur-xl rounded-xl p-4 border border-white/20 
    hover:border-red-500/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10 flex flex-col items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-red-500/30 flex items-center justify-center group-hover:scale-110 transition-transform
        border border-red-500/30">
        <svg className="w-5 h-5 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <span className="text-white text-sm font-medium group-hover:text-red-300 transition-colors text-center">
        {spec}
      </span>
    </div>
  </div>
));

export default MSIPage;
