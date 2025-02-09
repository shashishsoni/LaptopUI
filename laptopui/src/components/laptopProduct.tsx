import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LaptopProduct {
  id: number;
  name: string;
  description: string;
  images: string[];
  video: string;
  price: string;
  specs: {
    title: string;
    value: string;
    icon: string;
  }[];
}

const laptopProduct: LaptopProduct = {
  id: 1,
  name: "ROG Strix SCAR 17",
  description: "Experience next-level gaming with our most powerful laptop ever.",
  images: [
    "/image/asus1.webp",
    "/image/asus2.jpg",
    "/image/asus3.jpg",
    "/image/asus4.png",
  ],
  video: "/video/asusvideo.mp4",
  price: "$2,499",
  specs: [
    {
      title: 'Processor',
      value: 'Intel i9-13980HX',
      icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
    {
      title: 'Graphics',
      value: 'NVIDIA RTX 4090',
      icon: 'M12 2l7 7-7 7-7-7 7-7zm0 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z',
    },
    {
      title: 'Memory',
      value: '64GB DDR5 RAM',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
    },
    {
      title: 'Storage',
      value: '2TB NVMe SSD',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
    },
  ],
};

const LaptopProduct = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationInterval = useRef<NodeJS.Timeout | undefined>(undefined);

  const getSmallCardContent = (cardIndex: number) => {
    const contentIndex = (cardIndex - activeIndex + 4) % 5;
    if (contentIndex === 0) {
      return (
        <div className="relative w-full h-full overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            src={laptopProduct.video}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50" />
        </div>
      );
    }
    return (
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={laptopProduct.images[contentIndex - 1]}
          alt={`${laptopProduct.name} view ${contentIndex}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50" />
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

  const renderCard = (index: number) => {
    return (
      <div
        key={index}
        className={`${
          index === 0 
            ? 'md:col-span-3 md:row-span-2 h-[700px]'
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
                    src={laptopProduct.video}
                  />
                ) : (
                  <img
                    src={laptopProduct.images[activeIndex - 1]}
                    alt={`${laptopProduct.name} view ${activeIndex}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h2 className="text-4xl font-bold text-white">{laptopProduct.name}</h2>
                        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                          {laptopProduct.description}
                        </p>
                      </div>
                      <span className="text-3xl font-bold text-cyan-400 ml-8">{laptopProduct.price}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex gap-6">
                        {laptopProduct.specs.slice(0, 2).map((spec) => (
                          <div key={spec.title} className="flex items-center space-x-2 text-gray-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={spec.icon} />
                            </svg>
                            <span className="text-sm">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                      <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl 
                        hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 
                        font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105
                        transform active:scale-95">
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
    );
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-20 px-6">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          Gaming Laptops
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-16 mx-auto">
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={`${
                index === 0 
                  ? 'md:col-span-3 md:row-span-2 h-[700px] w-[800px]'
                  : index <= 2 
                    ? 'md:col-span-3 h-[340px] w-[585px] left-[100px]'
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
                          src={laptopProduct.video}
                        />
                      ) : (
                        <img
                          src={laptopProduct.images[activeIndex - 1]}
                          alt={`${laptopProduct.name} view ${activeIndex}`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                        <div className="space-y-6">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <h2 className="text-4xl font-bold text-white">{laptopProduct.name}</h2>
                              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                                {laptopProduct.description}
                              </p>
                            </div>
                            <span className="text-3xl font-bold text-cyan-400 ml-8">{laptopProduct.price}</span>
                          </div>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <div className="flex gap-6">
                              {laptopProduct.specs.slice(0, 2).map((spec) => (
                                <div key={spec.title} className="flex items-center space-x-2 text-gray-300">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={spec.icon} />
                                  </svg>
                                  <span className="text-sm">{spec.value}</span>
                                </div>
                              ))}
                            </div>
                            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl 
                              hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 
                              font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105
                              transform active:scale-95">
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
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {laptopProduct.specs.map((spec) => (
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