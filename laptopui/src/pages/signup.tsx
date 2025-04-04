import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { authApi } from '../server/services/api';
import Head from 'next/head';

const SignupPage = () => {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError('');
    setLoading(true);

    try {
      const response = await authApi.signup(formData);
      if (response?.token) {
        window.location.href = '/login';
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An error occurred during signup');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialProviders = [
    { name: 'Google', icon: '🌐', color: 'from-red-500 to-yellow-500' },
    { name: 'GitHub', icon: '👾', color: 'from-gray-600 to-gray-800' },
    { name: 'Discord', icon: '💬', color: 'from-indigo-500 to-purple-500' }
  ];


  return (
    <>
      <Head>
        <title>Sign Up | Gaming Laptops</title>
      </Head>
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-blue-950/10" />
        </div>

        {/* Signup Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full max-w-xl z-10"
        >
          <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20 shadow-xl">
            {/* Header with Icon - reduced margins */}
            <div className="text-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
                className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center"
              >
                <span className="text-xl">🚀</span>
              </motion.div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Create Your Account
              </h1>
              <p className="text-white/60 mt-1 text-sm">
                Join us to explore premium gaming laptops
              </p>
            </div>

            {/* Form with reduced spacing */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="text-red-400 text-sm text-center">{error}</div>
              )}
              {/* Input fields with reduced padding */}
              <div className="space-y-1">
                <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                  <span className="text-base">👤</span> Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
                    focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all
                    placeholder:text-white/30 hover:bg-white/10"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                  <span className="text-base">📧</span> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
                    focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all
                    placeholder:text-white/30 hover:bg-white/10"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                  <span className="text-base">🔒</span> Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
                    focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all
                    placeholder:text-white/30 hover:bg-white/10"
                  placeholder="Create a password"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                  <span className="text-base">✅</span> Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
                    focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all
                    placeholder:text-white/30 hover:bg-white/10"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              {/* Enhanced Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white 
                  rounded-lg font-medium transition-all focus:ring-2 focus:ring-purple-500/20
                  hover:from-purple-600 hover:to-blue-600 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center justify-center gap-2">
                  Create Account
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </motion.button>
            </form>

            {/* Social Signup with reduced margins */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#0a0a0a]/50 text-white/40 backdrop-blur-xl text-xs">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {socialProviders.map((provider) => (
                  <motion.button
                    key={provider.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center justify-center gap-1 px-3 py-1.5 border border-white/10 
                      rounded-lg text-white/80 hover:bg-white/5 transition-all backdrop-blur-sm
                      hover:border-purple-500/50 bg-gradient-to-r ${provider.color} bg-opacity-10
                      hover:bg-opacity-20 text-sm`}
                  >
                    <span className="text-lg">{provider.icon}</span>
                    <span className="text-xs">{provider.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Login Link with reduced margin */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-center text-white/60 text-sm"
            >
              <span>Already have an account? </span>
              <Link href="/login" className="text-purple-400 hover:text-purple-300">
                Login
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SignupPage;
