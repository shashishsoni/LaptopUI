import { asusLaptops } from '../data/asusdata';
import type { LaptopProduct } from '../data/asusdata';
import { lenovoProducts } from '../data/lenovodata';
import type { LenovoProduct } from '../data/lenovodata';
import { msiProducts } from '../data/msidata';
import { alienwareLaptops } from '../data/alienwaresdata';
import { acerProducts } from '../data/AcerData';
import type { AcerProduct } from '../data/AcerData';
import { razerProducts } from '../data/razerdata';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type Product = LaptopProduct | LenovoProduct | AcerProduct;

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      {/* Image Wrapper */}
      <div className="relative">
        {/* Shimmer Effect while loading */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        <div className="relative h-[240px] bg-gray-900 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="group-hover:scale-110 transition-all duration-700 ease-in-out"
            loading="lazy"
            quality={90}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/image/placeholder.jpg'; // Add a placeholder image
            }}
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Hover Effect */}
          <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          className="absolute top-4 left-4"
        >
          <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-500/20">
            {product.category}
          </span>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4 relative z-10 bg-gray-900/50 backdrop-blur-sm">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">{product.name}</h2>
          <p className="text-gray-400">{product.description}</p>
        </div>

        <div className="space-y-2">
          {product.specs.slice(0, 4).map((spec, index) => typeof spec === 'string' && (
            <div key={index} className="flex items-center text-sm text-gray-300 hover:text-gray-200 transition-colors">
              <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {spec}
            </div>
          ))}
        </div>

        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 pt-2">
          {product.price}
        </div>

        <div className="flex gap-4">
          <Link
            href={`/configure/${product.id}`}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-center rounded-lg text-sm transition-all duration-300 font-medium group-hover:shadow-lg group-hover:shadow-blue-500/25"
          >
            Configure Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const ProductPage = () => {
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Reset any existing page state
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    if (!mounted) {
      setMounted(true);
      const allProducts = [
        ...asusLaptops,
        ...lenovoProducts,
        ...msiProducts,
        ...alienwareLaptops,
        ...acerProducts,
        ...razerProducts
      ];
      setProducts(allProducts);
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50"
      >
        {/* Dynamic Background */}
        <div className="fixed inset-0 bg-black">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-gray-900 to-purple-900/50" />
          <div className="absolute inset-0 bg-[url('/image/grid.svg')] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_100%)]" />
        </div>

        <Head>
          <title>Gaming Laptops | Premium Collection</title>
          <meta name="description" content="Explore our premium gaming laptop collection" />
          <meta name="robots" content="noindex" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="absolute inset-0 overflow-y-auto">
          <Navbar />
          <div className="pt-20 w-full">
            <div className="max-w-7xl mx-auto px-4 py-16">
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4 text-center">
                Premium Gaming Laptops
              </h1>
              <p className="text-gray-300 text-center mb-16 text-lg">
                Discover the perfect gaming machine
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductPage;