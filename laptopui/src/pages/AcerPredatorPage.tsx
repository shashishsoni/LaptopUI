import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import type { AcerProduct } from '../data/AcerData';
import { acerProducts } from '../data/AcerData';
import Link from 'next/link';
import Image from 'next/image';
import VideoPlayer from '../components/VideoPlayer';

const DetailedSpecsSection = React.memo(({ specs }: { specs: AcerProduct['detailedSpecs'] }) => (
  <div className="mt-8 relative">
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 rounded-2xl -z-10" />
    <div className="p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
      <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 
        flex items-center gap-3">
        <span>Technical Specifications</span>
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 animate-pulse" />
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {specs.map((category, idx) => (
          <div 
            key={idx}
            className="group relative p-4 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent
              border border-white/5 hover:border-cyan-500/30 transition-all duration-300
              backdrop-blur-sm hover:shadow-[0_0_20px_rgba(34,211,238,0.07)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 
              group-hover:from-cyan-500/[0.03] group-hover:to-blue-500/[0.03] transition-all duration-300 rounded-xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r 
                  from-cyan-400 to-blue-400">
                  {category.category}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />
              </div>
              
              <div className="space-y-3">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="group/item">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 mt-2 rounded-full bg-gradient-to-r from-cyan-500/50 to-blue-500/50 
                        group-hover/item:shadow-[0_0_8px_rgba(34,211,238,0.3)] transition-all duration-300" />
                      <div>
                        <h4 className="text-white/80 font-medium mb-1 group-hover/item:text-cyan-400 
                          transition-colors text-sm">
                          {item.title}
                        </h4>
                        <p className="text-white/50 text-xs leading-relaxed group-hover/item:text-white/60
                          transition-colors">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
));
DetailedSpecsSection.displayName = 'DetailedSpecsSection';

const AcerPredatorPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeLaptop] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      filter: "blur(10px)",
    });
    
    return () => {
      tl.kill();
      void 0;  // Explicitly return void
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white">
      {/* Scrollable Content */}
      <div className="relative z-20 min-h-screen">
        {/* Hero Section */}
        <div ref={titleRef} className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/20 mb-4">
              <span className="text-cyan-400">Acer</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="text-white/60">Predator Series</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {acerProducts[activeLaptop].name}
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">
              {acerProducts[activeLaptop].description}
            </p>
          </div>

          {/* Main Product Display */}
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
            <MainCard
              product={acerProducts[activeLaptop]}
              activeIndex={activeIndex}
              category={acerProducts[activeLaptop].category}
              price={acerProducts[activeLaptop].price}
            />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4 mb-16">
            {acerProducts[activeLaptop].images.map((image, idx) => (
              <ThumbnailCard
                key={idx}
                image={image}
                isActive={activeIndex === idx}
                onClick={() => setActiveIndex(idx)}
              />
            ))}
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {acerProducts[activeLaptop].features.map((feature, idx) => (
                <FeatureCard key={idx} {...feature} />
              ))}
            </div>
          </div>

          {/* Performance Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Performance Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {acerProducts[activeLaptop].performance.map((stat, idx) => (
                <StatCard key={idx} {...stat} />
              ))}
            </div>
          </div>

          {/* Detailed Specs Section */}
          <DetailedSpecsSection specs={acerProducts[activeLaptop].detailedSpecs} />
        </div>
      </div>
    </div>
  );
};

const MainCard = React.memo(({ product, activeIndex, category, price }: {
  product: AcerProduct;
  activeIndex: number;
  category: string;
  price: string;
}) => {
  return (
    <div className="relative w-full h-full group">
      {/* Content */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 
        group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Media Content */}
      {activeIndex === 0 && product.cloudinaryVideo ? (
        <VideoPlayer
          publicId={product.cloudinaryVideo}
          className="w-full h-full object-cover"
        />
      ) : (
        <Image
          src={product.images[activeIndex]}
          alt={product.name}
          width={1200}
          height={800}
          priority={activeIndex === 0}
          className="w-full h-full object-cover"
        />
      )}

      {/* Overlay with Button */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 text-sm">
                {category}
              </span>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                {price}
              </span>
            </div>
          </div>
          <Link
            href={`/configure/${product.id}`}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-cyan-600 
              rounded-lg hover:from-green-500 hover:to-cyan-500 transition-all duration-300 
              text-white font-medium shadow-lg shadow-green-500/20"
          >
            Configure Now
          </Link>
        </div>
      </div>
    </div>
  );
});
MainCard.displayName = 'MainCard';

const ThumbnailCard = React.memo(({ image, isActive, onClick }: { 
  image: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all duration-300
      ${isActive ? 'ring-2 ring-cyan-500 scale-[1.02]' : 'hover:ring-2 hover:ring-cyan-500/50'}
      group`}
  >
    <Image
      src={image}
      alt="Thumbnail"
      width={400}
      height={300}
      className="w-full h-full object-cover"
    />
    <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 
      transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
  </div>
));
ThumbnailCard.displayName = 'ThumbnailCard';

const FeatureCard = React.memo(({ icon, title, description }: {
  icon: string;
  title: string;
  description: string;
}) => (
  <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] 
    border border-white/10 hover:border-cyan-500/30 transition-all duration-300
    backdrop-blur-sm hover:scale-[1.02]">
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 
      group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300 rounded-2xl" />
    <div className="relative z-10">
      <span className="text-3xl mb-4 block">{icon}</span>
      <h3 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r 
        from-cyan-400 to-blue-400">{title}</h3>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  </div>
));
FeatureCard.displayName = 'FeatureCard';

const StatCard = React.memo(({ label, value, color }: {
  label: string;
  value: number;
  color: string;
}) => (
  <div className="group relative p-5 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent 
    border border-white/5 hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm">
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 
      group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-300 rounded-xl" />
    <div className="relative z-10">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-medium text-white/70 group-hover:text-cyan-400 transition-colors">{label}</h3>
        <div className="flex items-center gap-1.5">
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            {value}
          </span>
          <span className="text-white/30 text-xs">/ 100</span>
        </div>
      </div>
      <div className="relative h-2 bg-white/[0.02] rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
        <div
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${color} rounded-full opacity-60
            transition-all duration-1000 group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]`}
          style={{ width: `${value}%` }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] 
            animate-shimmer bg-[length:250%_250%]" />
        </div>
      </div>
    </div>
  </div>
));
StatCard.displayName = 'StatCard';

const SideCard = React.memo(({ index, image, onClick }: {
  index: number;
  image: string;
  onClick: () => void;
}) => (
  <div onClick={onClick}>
    <Image
      src={image}
      alt={`View ${index}`}
      width={400}
      height={300}
      className="w-full h-full object-cover"
    />
  </div>
));
SideCard.displayName = 'SideCard';

const SpecBadge = React.memo(({ spec }: { spec: string }) => (
  <div className="group hover-card-effect bg-black/60 backdrop-blur-xl rounded-xl p-4 border border-white/20 
    hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 
      group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10 flex flex-col items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-cyan-500/30 flex items-center justify-center 
        group-hover:scale-110 transition-transform border border-cyan-500/30">
        <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <span className="text-white text-sm font-medium group-hover:text-cyan-300 transition-colors text-center">
        {spec}
      </span>
    </div>
  </div>
));
SpecBadge.displayName = 'SpecBadge';

export default AcerPredatorPage;