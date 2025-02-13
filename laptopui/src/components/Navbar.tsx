// src/components/Navbar.tsx
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setUser } from '../redux/slices/userSlice';
import type { RootState } from '../redux/store';
import { routes } from '../routes/routes';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  {
    name: 'Profile',
    path: '/profile',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    name: 'Cart',
    path: '/cart',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    name: 'Orders',
    path: '/orders',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  }
];

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { profile: user, isAuthenticated } = useSelector((state: RootState) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const lastScrollY = useRef(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 50;
      
      if (currentScrollY < scrollThreshold) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/productpage' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  if (!isMounted) {
    return null; // or a loading skeleton
  }

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Modern Glassmorphism Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/75 to-black/60 
          backdrop-blur-xl border-b border-white/5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)] animate-shimmer" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo */}
            <Link href="/" className="group flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl 
                  opacity-75 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-2
                  transform group-hover:scale-110 transition-all duration-300">
                  <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 14.5V8.5C21 7.4 20.1 6.5 19 6.5H5C3.9 6.5 3 7.4 3 8.5V14.5C3 15.6 3.9 16.5 5 16.5H19C20.1 16.5 21 15.6 21 14.5ZM19 14.5H5V8.5H19V14.5ZM6 13.5H18V9.5H6V13.5Z"/>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text
                  group-hover:from-blue-300 group-hover:to-cyan-300 transition-all duration-300">
                  LaptopUI
                </span>
                <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors duration-300">
                  Premium Tech
                </span>
              </div>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group
                    hover:bg-white/5 rounded-lg`}
                >
                  <span className={`relative z-10 ${
                    router.pathname === item.path ? 'text-blue-400' : 'text-white/70 group-hover:text-white'
                  }`}>
                    {item.name}
                  </span>
                  {router.pathname === item.path && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-white/5 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
              
              {/* Enhanced Auth Section */}
              {isAuthenticated ? (
                <div className="relative ml-6" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-3 px-4 py-2 rounded-xl 
                      bg-gradient-to-r from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 
                      border border-white/10 hover:border-white/20 transition-all duration-300
                      group"
                  >
                    <div className="relative w-8 h-8">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full 
                        opacity-75 group-hover:opacity-100 blur-md transition-opacity duration-300" />
                      <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500
                        flex items-center justify-center text-white font-medium transform group-hover:scale-105 
                        transition-all duration-300">
                        {user?.fullName?.charAt(0)}
                      </div>
                    </div>
                    <span className="text-white/90 group-hover:text-white transition-colors duration-300">
                      {user?.fullName}
                    </span>
                    <svg className={`w-4 h-4 text-white/70 transition-transform duration-300 
                      ${isDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        className="absolute right-0 mt-2 w-56 bg-gradient-to-b from-black/95 to-black/90 
                          backdrop-blur-xl rounded-xl border border-white/10 shadow-xl shadow-black/20 
                          overflow-hidden"
                      >
                        <div className="p-2 space-y-1">
                          {menuItems.map((item) => (
                            <button
                              key={item.name}
                              onClick={() => {
                                setIsDropdownOpen(false);
                                router.push(item.path);
                              }}
                              className="relative w-full p-2 text-sm text-white/70 hover:text-white 
                                hover:bg-white/5 rounded-lg transition-all duration-300 text-left group"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center
                                  group-hover:bg-white/10 transition-colors duration-300 text-blue-400">
                                  {item.icon}
                                </div>
                                <span>{item.name}</span>
                              </div>
                            </button>
                          ))}

                          {/* Logout Button */}
                          <div className="px-2 pt-2 border-t border-white/10">
                            <button
                              onClick={() => {
                                dispatch(logout());
                                router.push('/login');
                              }}
                              className="w-full p-2 text-sm text-red-400 hover:text-red-300 
                                hover:bg-white/5 rounded-lg transition-all duration-300 text-left
                                flex items-center space-x-3 group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center
                                group-hover:bg-white/10 transition-colors duration-300">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                              </div>
                              <span>Logout</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-4 ml-6">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white 
                      bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300
                      border border-white/10 hover:border-white/20 hover:scale-105"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="relative group px-4 py-2 text-sm font-medium"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl 
                      opacity-75 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
                    <span className="relative z-10 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl
                      text-white group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300
                      flex items-center space-x-2 transform group-hover:scale-[1.02]">
                      <span>Sign up</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" 
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                </div>
              )}
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-10 h-10 rounded-xl bg-gradient-to-r from-white/5 to-white/10
                hover:from-white/10 hover:to-white/15 border border-white/10 hover:border-white/20 
                transition-all duration-300 flex items-center justify-center group"
            >
              <div className={`w-5 h-5 flex flex-col justify-center space-y-1.5 transition-all duration-300
                ${isMenuOpen ? 'transform rotate-180' : ''}`}>
                <span className={`block w-5 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transform 
                  transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-5 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 
                  transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transform 
                  transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              className="md:hidden bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-xl
                border-t border-white/5"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="block px-4 py-3 rounded-xl text-white/70 hover:text-white
                      hover:bg-white/5 transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </AnimatePresence>
  );
};

export default Navbar;