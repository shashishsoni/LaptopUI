import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LaptopProduct } from '../data/asusdata';
import { useRouter } from 'next/router';

interface ConfigOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface ConfigCategory {
  name: string;
  options: ConfigOption[];
  required: boolean;
}

interface LaptopConfig {
  id: string;
  name: string;
  brand: string;
  basePrice: number;
  image: string;
  categories: {
    processor: ConfigCategory;
    graphics: ConfigCategory;
    memory: ConfigCategory;
    storage: ConfigCategory;
    display: ConfigCategory;
  };
}

const DraggableOption = ({ 
  option, 
  categoryKey,
  onDragStart,
  isSelected,
}: { 
  option: ConfigOption;
  categoryKey: string;
  onDragStart: (category: string, option: ConfigOption) => void;
  isSelected: boolean;
}) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="relative">
      <div
        draggable={!isSelected}
        onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
          e.dataTransfer.setData('text/plain', JSON.stringify({ categoryKey, option }));
          onDragStart(categoryKey, option);
          setIsDragging(true);
        }}
        onDragEnd={() => {
          setIsDragging(false);
        }}
        className={`
          group relative p-4 rounded-xl transition-all duration-300
          ${isSelected ? 'bg-cyan-500/5 border-cyan-500/20' : 'bg-white/5 border-white/10'}
          ${!isSelected && 'cursor-grab active:cursor-grabbing border backdrop-blur-md'}
          ${!isSelected && 'hover:bg-white/10 hover:border-cyan-500/30'}
          mb-3 last:mb-0
          ${isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
        `}
      >
        <div className="absolute -left-2 top-1/2 -translate-y-1/2">
          <div className={`
            w-1 h-8 rounded-full transition-all duration-300
            ${!isSelected && 'bg-white/20 group-hover:bg-cyan-500/50'}
          `} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-white/90 group-hover:text-white transition-colors">
              {option.name}
            </h4>
            <span className="text-cyan-400 font-semibold group-hover:scale-110 transition-transform">
              +${option.price}
            </span>
          </div>
          <p className="text-sm text-gray-400/80 group-hover:text-gray-400 transition-colors">
            {option.description}
          </p>
        </div>
      </div>
      {isDragging && (
        <div className="absolute inset-0 border-2 border-dashed border-cyan-500/30 rounded-xl bg-cyan-500/5" />
      )}
    </div>
  );
};

const DroppableTarget = ({ 
  category, 
  categoryKey, 
  selectedConfig,
  isActiveCategory,
  onDrop,
  onDragLeave,
}: { 
  category: ConfigCategory;
  categoryKey: string;
  selectedConfig: Record<string, ConfigOption>;
  isActiveCategory: boolean;
  onDrop: (categoryKey: string, option: ConfigOption) => void;
  onDragLeave: () => void;
}) => {
  const [isOver, setIsOver] = useState(false);

  return (
    <motion.div
      layout
      animate={{
        scale: isOver ? 1.02 : 1,
        borderColor: isOver ? 'rgba(6, 182, 212, 0.5)' : 
          isActiveCategory ? 'rgba(6, 182, 212, 0.3)' : 'rgba(255, 255, 255, 0.1)',
        backgroundColor: isOver ? 'rgba(6, 182, 212, 0.1)' : 
          isActiveCategory ? 'rgba(6, 182, 212, 0.05)' : 'rgba(255, 255, 255, 0.05)',
      }}
      className="p-4 rounded-xl border-2 border-dashed backdrop-blur-xl
        transition-all duration-300 relative"
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsOver(false);
        onDragLeave();
      }}
      onDrop={(e) => {
        e.preventDefault();
        setIsOver(false);
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        if (data.categoryKey === categoryKey) {
          onDrop(categoryKey, data.option);
        }
      }}
    >
      <div className="absolute -right-2 top-1/2 -translate-y-1/2">
        <div className={`w-1 h-12 rounded-full transition-all duration-300
          ${isOver ? 'bg-cyan-500 scale-y-125' : 
            isActiveCategory ? 'bg-cyan-500/50' : 'bg-white/20'}`} />
      </div>
      <div className="text-white p-4">
        <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
          {category.name}
        </h3>
        <motion.div
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={selectedConfig[categoryKey] ? 
            "flex justify-between items-center bg-white/5 p-3 rounded-lg" :
            `text-white/40 text-center py-8 border-2 border-dashed rounded-lg backdrop-blur-sm
            transition-colors ${isOver ? 'border-cyan-500/50 bg-cyan-500/5' : 
              isActiveCategory ? 'border-purple-500/30' : 'border-white/10'}`
          }
        >
          {selectedConfig[categoryKey] ? (
            <motion.div 
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DraggableOption
                option={selectedConfig[categoryKey]}
                categoryKey={categoryKey}
                onDragStart={onDragLeave}
                isSelected={false}
              />
            </motion.div>
          ) : (
            `Drop ${category.name} here`
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

const LaptopConfigure: React.FC<{ laptop: LaptopProduct }> = ({ laptop }) => {
  const router = useRouter();
  const [selectedConfig, setSelectedConfig] = useState<Record<string, ConfigOption>>({});
  const [laptopConfig, setLaptopConfig] = useState<LaptopConfig | null>(null);
  const [activeDragCategory, setActiveDragCategory] = useState<string | null>(null);
  const [draggedOption, setDraggedOption] = useState<ConfigOption | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const basePrice = parseInt(laptop.price.replace(/[^0-9]/g, ''));
    
    setLaptopConfig({
      id: laptop.id.toString(),
      name: laptop.name,
      brand: laptop.brand,
      basePrice: basePrice,
      image: laptop.images[0],
      categories: laptop.configurations
    });

    // Set default selections (base options)
    const defaultSelections: Record<string, ConfigOption> = {};
    let defaultTotal = basePrice;

    Object.entries(laptop.configurations).forEach(([key, category]) => {
      const baseOption = category.options.find(opt => opt.id === 'base');
      if (baseOption) {
        defaultSelections[key] = baseOption;
        defaultTotal += baseOption.price;
      }
    });
    
    setSelectedConfig(defaultSelections);
    setTotalPrice(defaultTotal);

  }, [laptop]);

  const handleDragStart = (categoryKey: string, option: ConfigOption) => {
    setActiveDragCategory(categoryKey);
    setDraggedOption(option);
  };

  const handleDragLeave = () => {
    // Only reset if we're actually dragging to prevent unwanted state updates
    if (draggedOption) {
      setDraggedOption(null);
    }
  };

  const handleDrop = (categoryKey: string, option: ConfigOption) => {
    // Get the old option's price
    const oldOption = selectedConfig[categoryKey];
    const oldPrice = oldOption?.price || 0;
    
    // Calculate new total price
    const newTotal = totalPrice - oldPrice + option.price;

    setSelectedConfig(prev => ({
      ...prev,
      [categoryKey]: option
    }));

    setTotalPrice(newTotal);

    setActiveDragCategory(null);
    setDraggedOption(null);
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      // Instead of creating order directly, redirect to payment gateway
      router.push({
        pathname: '/payment',
        query: {
          amount: totalPrice,
          basePrice: laptop.price,
          config: JSON.stringify(selectedConfig),
          model: laptop.name
        }
      });

    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(error.message || 'Failed to proceed to checkout. Please try again.');
    }
  };

  if (!laptopConfig) return null;

  return (
    <div className="space-y-12 max-w-[1400px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="text-center space-y-6 mb-16">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 
          bg-clip-text text-transparent">
          Build Your Dream Machine
        </h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          Select premium components to create your ultimate gaming setup
        </p>
        <div className="flex items-center justify-center gap-3 text-sm text-white/40">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
            Base Components
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
            Premium Upgrades
          </span>
        </div>
      </div>

      {/* Product Preview Section */}
      <div className="relative h-[70vh] rounded-2xl overflow-hidden group 
        shadow-2xl shadow-purple-500/10 border border-white/10">
        {laptop.video ? (
          <video
            className="w-full h-full object-cover transition-transform duration-700 
              group-hover:scale-105"
            autoPlay
            loop
            muted
            playsInline
            src={laptop.video}
          />
        ) : (
          <img
            src={laptop.images[0]}
            alt={laptop.name}
            className="w-full h-full object-cover transition-transform duration-700 
              group-hover:scale-105"
          />
        )}
        
        {/* Overlay with Product Info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-4xl font-bold text-white">{laptop.name}</h2>
            <p className="text-lg text-white/80">{laptop.description}</p>
            <div className="flex gap-6 pt-4">
              {laptop.specs.map((spec, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-5 h-5 text-cyan-400"
                    stroke="currentColor"
                  >
                    <path d={spec.icon} strokeWidth="2" />
                  </svg>
                  <div>
                    <p className="text-sm text-white/60">{spec.title}</p>
                    <p className="text-sm font-medium text-white">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Image Gallery Thumbnails */}
        <div className="absolute top-8 right-8 flex gap-2">
          {laptop.images.map((image, index) => (
            <div
              key={index}
              className="w-16 h-16 rounded-lg overflow-hidden border-2 border-white/20 
                hover:border-cyan-400 transition-colors cursor-pointer"
            >
              <img
                src={image}
                alt={`${laptop.name} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Configuration Section */}
      <div className="relative mt-16">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 mb-12">
          <div className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 
            border border-white/10 backdrop-blur-xl shadow-lg shadow-purple-500/10 mb-12">
            <span className="text-white/80">Step 2:</span>
            <span className="ml-2 text-white font-medium">Select Your Components</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-24">
          {/* Left Column - Options */}
          <div className="space-y-8">
            {Object.entries(laptopConfig.categories).map(([key, category]) => (
              <motion.div 
                key={key} 
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-8
                  border border-white/10 hover:border-white/20 transition-colors space-y-4"
                animate={{
                  opacity: activeDragCategory && activeDragCategory !== key ? 0.5 : 1,
                }}
              >
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  {category.name}
                </h3>
                {category.options.map((option) => (
                  <DraggableOption
                    key={option.id}
                    option={option}
                    categoryKey={key}
                    onDragStart={handleDragStart}
                    isSelected={selectedConfig[key]?.id === option.id}
                  />
                ))}
              </motion.div>
            ))}
          </div>

          {/* Right Column - Drop Zones & Payment */}
          <div className="space-y-8 lg:sticky lg:top-24 transition-all duration-300" 
            style={{ 
              maxHeight: 'calc(100vh - 6rem)',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}>
            {/* Hide scrollbar for Chrome/Safari/Opera */}
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* Configuration Zones */}
            <div className="space-y-4">
              {Object.entries(laptopConfig.categories).map(([key, category]) => (
                <DroppableTarget 
                  key={key} 
                  category={category} 
                  categoryKey={key} 
                  selectedConfig={selectedConfig}
                  isActiveCategory={activeDragCategory === key}
                  onDrop={handleDrop}
                  onDragLeave={handleDragLeave}
                />
              ))}
            </div>

            {/* Payment Summary Box */}
            <div className="mt-8 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 
              backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg shadow-purple-500/10">
              <div className="p-8 space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  Order Summary
                  <span className="text-sm font-normal text-white/40">
                    {Object.keys(selectedConfig).length} of {Object.keys(laptopConfig.categories).length} components selected
                  </span>
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Base Configuration</span>
                    <span className="text-white">${laptopConfig.basePrice}</span>
                  </div>
                  
                  {Object.entries(selectedConfig).map(([key, option]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-white/60">
                        {laptopConfig.categories[key as keyof typeof laptopConfig.categories].name}
                      </span>
                      <span className="text-cyan-400">+${option.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-8 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 
                border-t border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 
                    bg-clip-text text-transparent">
                    ${totalPrice}
                  </span>
                </div>
                
                <button 
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 
                    rounded-xl font-semibold text-white shadow-lg shadow-purple-500/20
                    hover:shadow-xl hover:shadow-purple-500/40 hover:from-purple-500 hover:to-cyan-500
                    transition-all duration-300 transform hover:scale-[1.02]
                    disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={Object.keys(selectedConfig).length < 
                    Object.values(laptopConfig.categories).filter(cat => cat.required).length}
                  onClick={handleCheckout}
                >
                  {Object.keys(selectedConfig).length < 
                    Object.values(laptopConfig.categories).filter(cat => cat.required).length
                    ? 'Complete Required Selections'
                    : 'Proceed to Checkout'}
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-sm text-white/40 text-center">
              <p>All configurations include free shipping and setup</p>
              <p>24/7 premium support included</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaptopConfigure;