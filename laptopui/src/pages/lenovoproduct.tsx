import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import type { LenovoProduct } from '../data/lenovodata';
import { lenovoProducts } from '../data/lenovodata';
import Image from 'next/image';
import AlienwarePage from './alienware';
import RazerPage from './razer';
import MSIPage from './msipage';
import VideoPlayer from '../components/VideoPlayer';
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const sideCardsRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.to(containerRef.current, {
      x: () => -(containerRef.current?.scrollWidth || 0) + window.innerWidth,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: "top top",
        end: () => `+=${(containerRef.current?.scrollWidth || 0) - window.innerWidth}`,
        scrub: 1,
        anticipatePin: 1,
        snap: 1 / (sectionsRef.current.length - 1),
        invalidateOnRefresh: true,
      },
    });

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
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <div className="overflow-hidden bg-[#0A0A0C]">
      <div ref={containerRef} className="flex w-[400vw] h-screen">
        {/* Section 1: Legion Pro Series */}
        <div 
          ref={(el) => { sectionsRef.current[0] = el; }} 
          className="w-screen h-screen relative px-6 py-2 bg-gradient-to-br from-[#0A0A0C] via-[#050a1a] to-[#05101f]"
        >
          {/* Modern Background */}
          <div ref={backgroundRef} className="absolute inset-0 w-full h-full -z-10">
            {/* Gradient orbs - matching style with Alienware */}
            <div className="absolute top-20 left-20 w-[35rem] h-[35rem] bg-blue-900/20 rounded-full blur-[64px] animate-float" />
            <div className="absolute bottom-20 right-20 w-[30rem] h-[30rem] bg-indigo-900/15 rounded-full blur-[64px] animate-float-delayed" />
            
            {/* Grid overlay with darker base */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#000012] via-[#050a1a] to-[#05101f]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
          </div>

          {/* Content Container */}
          <div className="absolute inset-0 w-full h-screen px-4 py-2">
            <div className="relative w-full max-w-[1400px] mx-auto flex flex-col h-screen">
              {/* Header Section - Centered */}
              <div ref={titleRef} className="relative z-20 flex flex-col items-center text-center mb-4">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-3">
                  <span className="text-blue-400">Lenovo</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  <span className="text-white/60">Elite Gaming</span>
                </div>
                <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
                  {lenovoProducts[activeIndex].name}
                </h1>
                <p className="mb-5 text-sm text-white/60 max-w-2xl">
                  Experience gaming evolution with cutting-edge technology
                </p>
              </div>

              {/* Main Content Layout */}
              <div className="flex-1 grid grid-cols-12 gap-4 min-h-0 relative z-20">
                {/* Left Column - Main Display */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-3">
                  {/* Main Card */}
                  <div className="relative h-[calc(100vh-12rem)] lg:h-[calc(100vh-28.8rem)] rounded-2xl overflow-hidden">
                    <MainCard 
                      product={lenovoProducts[activeIndex]} 
                      activeIndex={activeIndex}
                      category={lenovoProducts[activeIndex].category}
                      price={lenovoProducts[activeIndex].price}
                    />
                  </div>
                  
                  {/* Thumbnails */}
                  <div className="grid grid-cols-3 gap-3 h-16">
                    {[1, 2, 3].map((index) => (
                      <div key={index} className="relative h-full" onClick={() => setActiveIndex(index)}>
                        <SideCard
                          index={index}
                          image={lenovoProducts[activeIndex].images[index]}
                          onClick={() => setActiveIndex(index)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - Specs & Details */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
                  {/* Specs Panel */}
                  <div className="bg-white/[0.03] backdrop-blur-2xl rounded-2xl p-4 border border-white/[0.05]
                    shadow-xl shadow-black/20 h-[calc(100vh-12rem)] lg:h-[calc(100vh-14rem)] overflow-y-auto">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-semibold text-white">Specifications</h3>
                      <span className="px-2 py-1 rounded-full bg-white/5 text-white/60 text-xs">
                        Gaming Series
                      </span>
                    </div>
                    <div className="space-y-3 pr-2">
                      {lenovoProducts[activeIndex].specs.map((spec, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] 
                          transition-colors group border border-white/[0.05] hover:border-white/[0.1]">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 
                            flex items-center justify-center border border-white/[0.05] group-hover:border-white/[0.1]">
                            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <span className="text-white/80 text-xs group-hover:text-white transition-colors">{spec}</span>
                        </div>
                      ))}
                    </div>

                    {/* Performance Stats */}
                    <div className="mt-6">
                      <h3 className="text-base font-semibold text-white mb-4">Performance</h3>
                      <div className="space-y-4">
                        {[
                          { label: "Gaming Performance", value: "95%" },
                          { label: "CPU Speed", value: "90%" },
                          { label: "GPU Power", value: "92%" },
                          { label: "Cooling Efficiency", value: "88%" }
                        ].map((stat, idx) => (
                          <div key={idx} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-white/60">{stat.label}</span>
                              <span className="text-white">{stat.value}</span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-900 to-cyan-900 rounded-full"
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

        {/* Section 2: Alienware - Dark Red/Black theme */}
        <div ref={(el) => { sectionsRef.current[1] = el; }} 
          className="w-screen h-screen flex-shrink-0 bg-gradient-to-br from-[#1a0000] via-[#330000] to-[#2d0a16]">
          <AlienwarePage />
        </div>

        {/* Section 3: Legion Tower - Dark Emerald theme */}
        <div ref={(el) => { sectionsRef.current[2] = el; }} 
          className="w-screen h-screen flex-shrink-0 bg-gradient-to-br from-[#011c1c] via-[#042f2e] to-[#134e4a]">
          <RazerPage />
        </div>

        {/* Section 4: Interactive Display - Dark Purple/Night theme */}
        <div ref={(el) => { sectionsRef.current[3] = el; }} 
          className="w-screen h-screen flex-shrink-0 bg-gradient-to-br from-[#0f0720] via-[#1e1b4b] to-[#312e81]">
          <MSIPage />
        </div>
      </div>
    </div>
  );
};

const MainCard = React.memo(({ product, activeIndex, category, price }: { 
  product: LenovoProduct; 
  activeIndex: number;
  category: string;
  price: string;
}) => {
  const mainCardRef = useRef<HTMLDivElement>(null);

  
  const handleConfigureClick = (laptopId: string) => {
    window.open(`/configure/${laptopId}`, '_blank', 'noopener,noreferrer');
  };

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
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 opacity-0 
        group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      
      {/* Media Container */}
      <div className="relative h-full rounded-2xl overflow-hidden">
        {activeIndex === 0 && product.cloudinaryVideo ? (
          <VideoPlayer
            publicId={"https://ucarecdn.com/82a58a9b-9ae4-49ec-8633-8b445a475de9/bgvideo.mp4"}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
          />
        ) : activeIndex === 1 ? (
          <VideoPlayer
            publicId={"https://ucarecdn.com/82a58a9b-9ae4-49ec-8633-8b445a475de9/bgvideo.mp4"}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
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
            {/* Legion Series and Price Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-2
                  shadow-lg shadow-black/20 flex items-center justify-center">
                  <svg className="w-full h-full text-purple-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 19h20L12 2zm0 3l7 14H5l7-14z"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-white/60">Legion Series</span>
                  <span className="text-white font-medium">{category}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
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
                  Premium Gaming
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">{product.name}</h3>
              <p className="text-white/80 text-base max-w-xl line-clamp-2">
                {product.description}
              </p>
              
              {/* Config Button */}
              <button 
                className="mt-4 w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl
                  hover:from-purple-500 hover:to-cyan-500 transition-all duration-300 group
                  font-medium text-white text-base shadow-xl shadow-purple-500/20"
                onClick={() => handleConfigureClick(product.id.toString())}
              >
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
MainCard.displayName = 'MainCard';

const SideCard = React.memo(({ index, image, onClick }: { 
  index: number; 
  image: string; 
  onClick: () => void 
}) => (
  <div 
    className="relative h-full rounded-xl overflow-hidden cursor-pointer group"
    onClick={onClick}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 opacity-0 
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


export default HorizontalScrollPage;