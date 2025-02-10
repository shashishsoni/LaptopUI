// src/components/Navbar.tsx
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { routes } from '../routes/routes';

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Check if we're past the first viewport height
      if (currentScrollY > window.innerHeight) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => router.pathname === path;

  const navigate = (path: string) => {
    setIsMenuOpen(false); // Close mobile menu when navigating
    router.push(path);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isHidden 
          ? '-translate-y-full hover:translate-y-0' 
          : 'bg-gradient-to-r from-black/80 to-gray-900/80 backdrop-blur-md border-b border-white/20'
      }`}
      onMouseEnter={() => isHidden && setIsHidden(false)}
      onMouseLeave={() => window.scrollY > window.innerHeight && setIsHidden(true)}
    >
      <div className={`w-full ${isHidden ? 'bg-black/80 backdrop-blur-md shadow-lg' : ''}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href={routes.home} className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition-transform duration-300">
              LaptopUI
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <ul className="flex space-x-8 items-center">
                <li>
                  <Link 
                    href={routes.home}
                    className={`text-white/70 hover:text-white transition-colors ${
                      isActive(routes.home) ? 'text-white' : ''
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href={routes.products.main}
                    className={`text-white/70 hover:text-white transition-colors ${
                      router.pathname.includes('/products') ? 'text-white' : ''
                    }`}
                  >
                    Products
                  </Link>
                </li>
              </ul>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-4">
                <Link 
                  href={routes.login}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 
                    text-white font-medium hover:from-cyan-600 hover:to-blue-600 
                    transition-all hover:scale-105 focus:ring-2 focus:ring-cyan-500/20"
                >
                  Login
                </Link>
                <Link 
                  href={routes.signup}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 
                    hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300"
                >
                  Sign up
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800/95 backdrop-blur-sm">
          <div className="px-4 py-6 space-y-4">
            <ul className="space-y-4">
              <li>
                <Link 
                  href={routes.home}
                  className={`flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300 ${
                    isActive(routes.home) ? 'text-blue-400' : ''
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  href={routes.products.main}
                  className={`flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300 ${
                    router.pathname.includes('/products') ? 'text-blue-400' : ''
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>Products</span>
                </Link>
              </li>
            </ul>
            <div className="space-y-3">
              <Link 
                href={routes.login}
                className="block w-full px-4 py-2 text-center rounded-lg bg-cyan-500 
                  hover:bg-cyan-600 transition-colors duration-300"
              >
                Login
              </Link>
              <Link href={routes.signup} className="block w-full px-4 py-2 text-center rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors duration-300">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;