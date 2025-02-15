import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function OrderSuccess() {
  const router = useRouter();
  const { orderId } = router.query;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Prevent scrolling from other pages
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Clean up any existing routes
    const handleRouteChange = () => {
      router.events.emit('routeChangeComplete', router.asPath);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  if (!mounted) return null;

  const handleNavigation = (path: string) => {
    router.push(path).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="fixed inset-0 z-50 isolate bg-black">
      <Head>
        <title>Order Successful | Gaming Laptops</title>
        <meta name="description" content="Your order has been successfully placed" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="fixed inset-0 bg-black -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-gray-900 to-purple-900/50" />
        <div className="absolute inset-0 bg-[url('/image/grid.svg')] opacity-20 bg-repeat bg-[length:32px_32px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_100%)]" />
      </div>

      <div className="absolute inset-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <Navbar />
        
        <div className="pt-32 pb-16 px-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="w-20 h-20 bg-green-500/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Order Successful!</h1>
              <p className="text-blue-400 font-medium mb-2">Order ID: {orderId}</p>
              <p className="text-gray-300 mb-8">
                Thank you for your purchase. Your order has been confirmed and will be shipped to your doorstep soon.
              </p>
              <div className="text-left bg-white/5 rounded-lg p-4 mb-8">
                <h2 className="text-lg font-semibold text-white mb-2">Next Steps:</h2>
                <ul className="text-gray-300 space-y-2">
                  <li>• You will receive an order confirmation email shortly</li>
                  <li>• Track your order status in the dashboard</li>
                  <li>• Expected delivery: 3-5 business days</li>
                </ul>
              </div>
              <div className="space-y-4">
                <Link href="/dashboard" className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg px-6 py-3 font-medium hover:from-blue-500 hover:to-purple-500 transition-all duration-300">
                  View Order Status
                </Link>
                <Link href="/" className="block w-full bg-white/10 text-white rounded-lg px-6 py-3 font-medium hover:bg-white/20 transition-all duration-300" onClick={() => handleNavigation('/')}>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 