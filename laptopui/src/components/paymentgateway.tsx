import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import Head from 'next/head';
import Navbar from './navbar';

// Replace with your Stripe publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

type PaymentMethod = 'card' | 'upi';

const CheckoutForm = ({ amount, onSuccess }: { amount: number; onSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [upiId, setUpiId] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (paymentMethod === 'upi') {
      // Handle UPI payment
      try {
        // Add your UPI payment processing logic here
        // This is just a mock success for demonstration
        await new Promise(resolve => setTimeout(resolve, 1500));
        onSuccess();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'UPI payment failed';
        setError(errorMessage);
      }
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Create payment intent on your server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
      } else if (paymentIntent.status === 'succeeded') {
        onSuccess();
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Payment failed';
      console.error('Payment error:', error);
      setError(errorMessage);
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Payment Method Selection */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setPaymentMethod('card')}
          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
            paymentMethod === 'card'
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-white/10 hover:border-white/20'
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
            </svg>
            <span className="font-medium">Card Payment</span>
          </div>
        </button>
        <button
          type="button"
          onClick={() => setPaymentMethod('upi')}
          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
            paymentMethod === 'upi'
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-white/10 hover:border-white/20'
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            <Image src="/image/upi-icon.webp" alt="UPI" width={24} height={24} />
            <span className="font-medium">UPI Payment</span>
          </div>
        </button>
      </div>

      {/* Payment Form */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        {paymentMethod === 'card' ? (
          <div className="bg-white/10 rounded-lg p-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#ffffff',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#fa755a',
                  },
                },
              }}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                UPI ID
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourname@upi"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <Image src="/image/gpay.avif" alt="GPay" width={32} height={32} />
              <Image src="/image/phonepe.png" alt="PhonePe" width={32} height={32} />
              <Image src="/image/paytm.jpg" alt="Paytm" width={32} height={32} />
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl px-6 py-4 font-medium 
          ${processing ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-500 hover:to-purple-500'} 
          transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30`}
      >
        {processing ? (
          <div className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
          </div>
        ) : (
          `Pay $${Number(amount || 0).toFixed(2)}`
        )}
      </button>
    </form>
  );
};

const PaymentGateway = () => {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { amount, basePrice, config, model } = router.query;
  const selectedConfig = config ? JSON.parse(config as string) as Record<string, { name: string; price: number }> : {};
  const upgradesCost = Number(amount || 0) - Number(basePrice || 0);

  useEffect(() => {
    setMounted(true);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  if (!mounted) return null;

  const handlePaymentSuccess = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const orderData = {
        items: [{
          productId: model,
          productName: String(model),
          brand: "Gaming Laptop", // Add appropriate brand
          basePrice: Number(basePrice),
          configuration: Object.entries(selectedConfig).map(([category, option]) => ({
            category,
            selected: {
              name: option.name,
              price: option.price,
              description: ''
            }
          })),
          price: Number(amount)
        }],
        total: Number(amount),
        status: 'PROCESSING',
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
      };

      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save order');
      }

      router.push('/orders');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Payment failed';
      console.error('Payment error:', error);
      setError(errorMessage);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 isolate"
      >
        <Head>
          <title>Secure Payment | Gaming Laptops</title>
          <meta name="description" content="Complete your purchase securely" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        {/* Background */}
        <div className="fixed inset-0 bg-black -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-gray-900 to-purple-900/50" />
          <div className="absolute inset-0 bg-[url('/image/grid.svg')] opacity-20 bg-repeat bg-[length:32px_32px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_100%)]" />
        </div>

        <div className="absolute inset-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <Navbar />

          <div className="pt-32 pb-16 px-4">
            <div className="max-w-3xl mx-auto">
              {error && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                  {error}
                </div>
              )}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              >
                <h1 className="text-3xl font-bold text-white mb-8">Complete Your Purchase</h1>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-gray-300">
                      <span>Model:</span>
                      <span>{model}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Base Price:</span>
                      <span>${Number(basePrice || 0).toFixed(2)}</span>
                    </div>
                    {Object.entries(selectedConfig).map(([category, option]) => (
                      <div key={category} className="flex justify-between text-gray-300">
                        <span>{category}:</span>
                        <div className="text-right">
                          <div>{option.name}</div>
                          {option.price > 0 && (
                            <div className="text-sm text-blue-400">+₹{option.price.toFixed(2)}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {upgradesCost > 0 && (
                    <div className="flex justify-between text-gray-300 border-t border-white/10 pt-2">
                      <span>Upgrades Total:</span>
                      <span className="text-blue-400">+₹{upgradesCost.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center mb-4 mt-6 pt-4 border-t border-white/10">
                    <span className="text-gray-300">Order Total:</span>
                    <span className="text-2xl font-bold text-white">
                      ${Number(amount || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="h-px bg-white/10" />
                </div>
                <Elements stripe={stripePromise}>
                  <CheckoutForm 
                    amount={Number(amount || 0)} 
                    onSuccess={handlePaymentSuccess}
                  />
                </Elements>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentGateway;

