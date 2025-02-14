'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import { authApi } from '../server/services/api';
import Head from 'next/head';

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
      const response = await authApi.login(formData);
      
      if (response?.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userData', JSON.stringify(response.user));
        
        dispatch(setUser({
          user: response.user,
          token: response.token
        }));

        window.location.href = '/';
      }
    } catch (error: any) {
      if (isMounted.current) {
        setError(error.message || 'Login failed');
        setLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignupClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/signup';
  };

  return (
    <>
      <Head>
        <title>Login | Gaming Laptops</title>
      </Head>
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/5 p-6 rounded-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-white/60 mt-2">
              Enter your credentials to continue
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white 
                  focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all
                  placeholder:text-white/30"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white 
                  focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all
                  placeholder:text-white/30"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-white/60">
                <input type="checkbox" className="mr-2 rounded border-white/20 bg-white/5" />
                Remember me
              </label>
              <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white 
                rounded-lg font-medium transition-all focus:ring-2 focus:ring-cyan-500/20 
                hover:scale-[1.02] ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-cyan-600 hover:to-blue-600'}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-white/60">
            <span>Don't have an account? </span>
            <a
              href="/signup"
              onClick={handleSignupClick}
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium
                hover:underline decoration-2 underline-offset-4"
            >
              Sign Up
            </a>
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
      </div>
    </>
  );
};

export default LoginPage;
