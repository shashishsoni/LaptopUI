import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-blue-950/10" />
      </div>

      {/* Login Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative w-full max-w-md z-10"
      >
        <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl border border-white/20 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-white/60 mt-2">
              {isLogin ? 'Enter your credentials to continue' : 'Sign up for a new account'}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white 
                  focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all
                  placeholder:text-white/30"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white 
                  focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all
                  placeholder:text-white/30"
                placeholder="Enter your password"
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium">Confirm Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white 
                    focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all
                    placeholder:text-white/30"
                  placeholder="Confirm your password"
                />
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-white/60">
                  <input type="checkbox" className="mr-2 rounded border-white/20 bg-white/5" />
                  Remember me
                </label>
                <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white 
                rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-all
                focus:ring-2 focus:ring-cyan-500/20 hover:scale-[1.02]"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-6 text-center text-white/60">
            <span>{isLogin ? "Don't have an account? " : 'Already have an account? '}</span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#0a0a0a]/50 text-white/40 backdrop-blur-xl">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {['Google', 'GitHub', 'Discord'].map((provider) => (
                <button
                  key={provider}
                  className="flex items-center justify-center px-4 py-2 border border-white/10 
                    rounded-lg text-white/80 hover:bg-white/5 transition-all backdrop-blur-sm
                    hover:border-cyan-500/50"
                >
                  {provider}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
