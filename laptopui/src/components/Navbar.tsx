// src/components/Navbar.tsx
'use client'; // Mark this as a Client Component if it uses hooks or interactivity

import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link href="/" className="hover:text-gray-300 transition duration-300">
            Laptop Store
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            href="/products"
            className="hover:text-gray-300 transition duration-300"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="hover:text-gray-300 transition duration-300"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-300 transition duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Cart and User Actions */}
        <div className="flex items-center space-x-4">
          <Link
            href="/cart"
            className="relative hover:text-gray-300 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0h2v2h-2zM17 17h2v2h-2z"
              />
            </svg>
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
              3 {/* Example cart item count */}
            </span>
          </Link>

          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-300 hover:text-white transition duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;