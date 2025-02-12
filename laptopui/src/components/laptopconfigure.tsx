import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    cpu: ConfigCategory;
    gpu: ConfigCategory;
    ram: ConfigCategory;
    storage: ConfigCategory;
    display: ConfigCategory;
    cooling: ConfigCategory;
  };
}

// Add this type near your other interfaces
type CategoryKey = keyof LaptopConfig['categories'];

const LaptopConfigure = () => {
  const router = useRouter();
  const { laptopId } = router.query;
  const [selectedConfig, setSelectedConfig] = useState<Record<string, ConfigOption>>({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [laptop, setLaptop] = useState<LaptopConfig | null>(null);

  useEffect(() => {
    // In a real app, fetch laptop data based on laptopId
    // For now, using mock data
    const mockLaptop: LaptopConfig = {
      id: laptopId as string,
      name: "ROG Strix G15",
      brand: "ASUS",
      basePrice: 1499,
      image: "/images/rog-strix-g15.png",
      categories: {
        cpu: {
          name: "Processor",
          required: true,
          options: [
            {
              id: "i7-12700H",
              name: "Intel Core i7-12700H",
              price: 0,
              description: "12 cores, up to 4.7GHz"
            },
            {
              id: "i9-12900H",
              name: "Intel Core i9-12900H",
              price: 300,
              description: "14 cores, up to 5.0GHz"
            }
          ]
        },
        gpu: {
          name: "Graphics",
          required: true,
          options: [
            {
              id: "rtx3060",
              name: "NVIDIA RTX 3060 6GB",
              price: 0,
              description: "Ray Tracing enabled, DLSS"
            },
            {
              id: "rtx3070ti",
              name: "NVIDIA RTX 3070 Ti 8GB",
              price: 500,
              description: "Enhanced Ray Tracing, DLSS"
            }
          ]
        },
        ram: {
          name: "Memory",
          required: true,
          options: [
            {
              id: "16gb",
              name: "16GB DDR5",
              price: 0,
              description: "4800MHz Dual Channel"
            },
            {
              id: "32gb",
              name: "32GB DDR5",
              price: 200,
              description: "4800MHz Dual Channel"
            }
          ]
        },
        storage: {
          name: "Storage",
          required: true,
          options: [
            {
              id: "512gb",
              name: "512GB NVMe SSD",
              price: 0,
              description: "PCIe 4.0 x4"
            },
            {
              id: "1tb",
              name: "1TB NVMe SSD",
              price: 150,
              description: "PCIe 4.0 x4"
            }
          ]
        },
        display: {
          name: "Display",
          required: true,
          options: [
            {
              id: "fhd144",
              name: "15.6\" FHD 144Hz",
              price: 0,
              description: "1920x1080, 100% sRGB"
            },
            {
              id: "qhd165",
              name: "15.6\" QHD 165Hz",
              price: 200,
              description: "2560x1440, 100% DCI-P3"
            }
          ]
        },
        cooling: {
          name: "Cooling",
          required: false,
          options: [
            {
              id: "standard",
              name: "ROG Intelligent Cooling",
              price: 0,
              description: "Liquid Metal Thermal Compound"
            },
            {
              id: "premium",
              name: "ROG Premium Cooling",
              price: 100,
              description: "Enhanced Fans + Liquid Metal"
            }
          ]
        }
      }
    };

    setLaptop(mockLaptop);
    setTotalPrice(mockLaptop.basePrice);
  }, [laptopId]);

  const handleOptionSelect = (category: string, option: ConfigOption) => {
    setSelectedConfig(prev => ({
      ...prev,
      [category]: option
    }));
  };

  useEffect(() => {
    if (!laptop) return;
    
    let price = laptop.basePrice;
    Object.values(selectedConfig).forEach(option => {
      price += option.price;
    });
    setTotalPrice(price);
  }, [selectedConfig, laptop]);

  if (!laptop) return null;

  const renderConfigOption = (option: ConfigOption, category: string, isSelected: boolean) => (
    <motion.div
      key={option.id}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/50' 
          : 'bg-black/20 border-white/10'
      } border hover:border-purple-500/30 backdrop-blur-sm`}
      onClick={() => handleOptionSelect(category, option)}
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-medium text-white text-lg">{option.name}</h4>
        <span className={`font-semibold ${isSelected ? 'text-purple-400' : 'text-cyan-400'}`}>
          {option.price > 0 ? `+$${option.price}` : 'Included'}
        </span>
      </div>
      <p className="text-gray-400">{option.description}</p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Configure Your {laptop.name}
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            Customize your laptop to match your needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Options */}
          <div className="lg:col-span-2 space-y-8">
            {Object.entries(laptop.categories).map(([key, category]) => (
              <div key={key} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                  {category.required && (
                    <span className="text-red-400 text-sm">Required</span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.options.map(option => 
                    renderConfigOption(
                      option,
                      key,
                      selectedConfig[key]?.id === option.id
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">Summary</h3>
                
                {Object.entries(selectedConfig).map(([category, option]) => (
                  <div key={category} className="flex justify-between items-start py-3 border-b border-white/10">
                    <div>
                      <p className="text-gray-400">{laptop.categories[category as CategoryKey].name}</p>
                      <p className="text-white font-medium">{option.name}</p>
                    </div>
                    <span className="text-cyan-400 font-semibold">
                      {option.price > 0 ? `+$${option.price}` : 'Included'}
                    </span>
                  </div>
                ))}

                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400">Base Price</span>
                    <span className="text-white font-semibold">${laptop.basePrice}</span>
                  </div>
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-xl font-bold text-white">Total</span>
                    <span className="text-2xl font-bold text-cyan-400">${totalPrice}</span>
                  </div>

                  <button 
                    onClick={() => {
                      // Handle purchase logic here
                      console.log('Configuration:', selectedConfig);
                    }}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 
                      hover:from-purple-700 hover:to-cyan-700 rounded-xl font-semibold text-white 
                      shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaptopConfigure;

