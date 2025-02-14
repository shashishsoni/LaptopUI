import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import type { LaptopProduct } from '../data/asusdata';
import { asusLaptops } from '../data/asusdata';
import Image from 'next/image';

const LaptopProduct = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeLaptop, setActiveLaptop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationInterval = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleNext = () => {
    setActiveLaptop((prev) => (prev + 1) % asusLaptops.length);
  };

  const handlePrev = () => {
    setActiveLaptop((prev) => (prev - 1 + asusLaptops.length) % asusLaptops.length);
  };

  useEffect(() => {
    gsap.to('.laptop-content', {
      opacity: 0,
      x: -20,
      duration: 0.3,
      onComplete: () => {
        gsap.to('.laptop-content', {
          opacity: 1,
          x: 0,
          duration: 0.5,
        });
      },
    });
  }, [activeLaptop]);

  const getSmallCardContent = (index: number) => {
    const laptop = asusLaptops[activeLaptop];
    // Adjust index to get correct image from array
    const imageIndex = index - 1; // Since index 0 is main card
    
    return (
      <div className="relative w-full h-full">
        <Image
          src={laptop.images[imageIndex] || laptop.images[0]} // Fallback to first image if index doesn't exist
          alt={`${laptop.name} view ${index}`}
          width={400}
          height={300}
          className="w-full h-full object-cover"
          priority={index === 1} // Prioritize loading of first small image
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="text-sm text-white/80">View {index}</span>
        </div>
      </div>
    );
  };

  const rotateDisplays = () => {
    setActiveIndex((prev) => (prev + 1) % 5);
  };

  useEffect(() => {
    rotationInterval.current = setInterval(rotateDisplays, 5000);
    return () => clearInterval(rotationInterval.current);
  }, []);

  const handleCardClick = (index: number) => {
    if (activeIndex === index) return;
    clearInterval(rotationInterval.current);
    
    gsap.to('.display-card', {
      scale: 0.98,
      opacity: 0.8,
      duration: 0.3,
      onComplete: () => {
        setActiveIndex(index);
        gsap.to('.display-card', {
          scale: 1,
          opacity: 1,
          duration: 0.3,
        });
      },
    });

    rotationInterval.current = setInterval(rotateDisplays, 5000);
  };

  const handleConfigureClick = (laptopId: string) => {
    window.open(`/configure/${laptopId}`, '_blank', 'noopener,noreferrer');
  };


  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-20 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={handlePrev}
            className="p-4 rounded-full bg-black/20 hover:bg-purple-500/20 transition-all duration-300"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="laptop-content text-center">
            <div className="text-purple-400 text-xl mb-4">
              {asusLaptops[activeLaptop].brand} {asusLaptops[activeLaptop].category} Series
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              {asusLaptops[activeLaptop].name}
            </h1>
          </div>

          <button
            onClick={handleNext}
            className="p-4 rounded-full bg-black/20 hover:bg-purple-500/20 transition-all duration-300"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="laptop-content grid grid-cols-1 md:grid-cols-6 gap-6 mb-16 mx-auto">
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={`${
                index === 0 
                  ? 'md:col-span-6 md:row-span-2 h-[700px] relative'
                  : index <= 2 
                    ? 'md:col-span-3 h-[340px]'
                    : 'md:col-span-3 h-[340px]'
              } relative`}
            >
              <div
                onClick={() => handleCardClick(index)}
                className="display-card relative h-full w-full transition-all duration-500 ease-out"
              >
                <div
                  className={`relative h-full rounded-2xl overflow-hidden group cursor-pointer 
                  ${index === 0 
                    ? 'shadow-2xl shadow-purple-500/30 ring-1 ring-purple-500/20' 
                    : 'shadow-lg hover:shadow-xl hover:shadow-purple-500/20'}
                  transform transition-all duration-500 hover:scale-[1.02]`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-cyan-900/10 to-transparent 
                    pointer-events-none z-0" />
                  <div className="relative z-10 h-full">
                    {index === 0 ? (
                      // Main card content
                      <div className="relative w-full h-full">
                        {activeIndex === 0 ? (
                          <video
                            className="absolute inset-0 w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                            src={asusLaptops[activeLaptop].video}
                          />
                        ) : (
                          <Image
                            src={asusLaptops[activeLaptop].images[activeIndex - 1]}
                            alt={`${asusLaptops[activeLaptop].name} view ${activeIndex}`}
                            width={400}
                            height={300}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent 
                          via-black/20 to-black/80 pointer-events-none" />
                        
                        <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                          <div className="space-y-6">
                            <div className="flex justify-between items-start">
                              <div className="space-y-2">
                                <h2 className="text-4xl font-bold text-white">{asusLaptops[activeLaptop].name}</h2>
                                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                                  {asusLaptops[activeLaptop].description}
                                </p>
                              </div>
                              <span className="text-3xl font-bold text-cyan-400 ml-8">{asusLaptops[activeLaptop].price}</span>
                            </div>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                              <div className="flex gap-6">
                                {asusLaptops[activeLaptop].specs.slice(0, 2).map((spec) => (
                                  <div key={spec.title} className="flex items-center space-x-2 text-gray-300">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={spec.icon} />
                                    </svg>
                                    <span className="text-sm">{spec.value}</span>
                                  </div>
                                ))}
                              </div>
                              <button 
                                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl 
                                  hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 
                                  font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105
                                  transform active:scale-95"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleConfigureClick(asusLaptops[activeLaptop].id.toString());
                                }}
                              >
                                Configure Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Small card content
                      <>
                        {getSmallCardContent(index)}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                          transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                          <span className="text-white font-medium transform -translate-y-1 group-hover:translate-y-0 
                            transition-transform duration-300">View</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="laptop-content grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {asusLaptops[activeLaptop].specs.map((spec) => (
            <div
              key={spec.title}
              className="bg-black/40 backdrop-blur-md rounded-xl p-5 border border-white/10 
                hover:border-purple-500/50 transition-all duration-300 
                hover:shadow-lg hover:shadow-purple-500/10 group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors duration-300">
                  <svg
                    className="w-6 h-6 text-purple-400 group-hover:text-purple-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={spec.icon} />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">{spec.title}</h4>
                  <p className="text-white font-semibold group-hover:text-purple-300 transition-colors duration-300">
                    {spec.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LaptopProduct;