import { motion } from 'framer-motion';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import type { Order } from '../types/orders';

// Add type for order items
interface OrderItem {
  productId: string;
  productName: string;
  brand: string;
  basePrice: number;
  configuration: Array<{
    category: string;
    selected: {
      name: string;
      price: number;
      description: string;
    };
  }>;
  price: number;
}

export default function OrdersPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { profile: user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    setMounted(true);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token || !user?.id) {
          router.push('/login');
          return;
        }

        const response = await fetch(`/api/orders/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [router, user?.id]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 isolate bg-black">
      <Head>
        <title>Your Orders | Gaming Laptops</title>
        <meta name="description" content="View and track your gaming laptop orders" />
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
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Your Orders</h1>
                <Link 
                  href="/"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg px-6 py-3 font-medium hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
              
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-6">No orders found</p>
                  <Link 
                    href="/"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg px-6 py-3 font-medium hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => {
                    // Safely parse items or use default empty array
                    let items: OrderItem[] = [];
                    try {
                      items = typeof order.items === 'string' 
                        ? JSON.parse(order.items)
                        : Array.isArray(order.items) 
                          ? order.items 
                          : [];
                    } catch (error) {
                      console.error('Error parsing order items:', error);
                    }
                    
                    return (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                          <div>
                            <div className="flex items-center gap-4 mb-4">
                              <h3 className="text-xl font-semibold text-white">{items[0]?.productName || 'Order'}</h3>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium 
                                ${order.status === 'PROCESSING' ? 'bg-blue-500/20 text-blue-400' :
                                  order.status === 'SHIPPED' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-green-500/20 text-green-400'}`}
                              >
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-gray-400 mb-2">Order ID: {order.orderId}</p>
                            <p className="text-gray-400 mb-4">
                              Ordered on {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                            <div className="space-y-2">
                              {items.map((item, index) => (
                                <div key={index} className="flex justify-between text-sm text-gray-300">
                                  <span className="capitalize">{item.productName}</span>
                                  <div className="text-right">
                                    <span>${item.price.toFixed(2)}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white mb-2">
                              ${order.total.toFixed(2)}
                            </div>
                            <p className="text-sm text-gray-400 mb-4">
                              Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                            </p>
                            <button
                              onClick={() => {/* Add tracking logic */}}
                              className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition-colors"
                            >
                              Track Order
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 