"use client";

import { useState } from 'react';
import { IconBell, IconMenu2, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-21">
          
          <div className="flex items-center gap-3">
            
            <button
              className="md:hidden p-2 rounded hover:bg-gray-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
            </button>
            {/* Logo */}
            <Link href="/home" >
            <h1 className="text-2xl font-bold text-black">Talkhealing</h1>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link
              href="/community"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/community' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Community
            </Link>
            <Link
              href="/research"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/research' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Research
            </Link>
          </div>

          {/* Search and Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            <input
              className="px-4 py-2 w-80 rounded-full border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              placeholder="Search..."
            />
            <button className="p-2 rounded-full hover:bg-gray-200">
              <IconBell className="h-6 w-6 text-gray-600" />
            </button>
            <Link
              href="/login"
              className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:scale-105 hover:bg-green-600"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:scale-105 hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-3 px-2 pb-4">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/community"
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/community' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Community
            </Link>
            <Link
              href="/research"
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/research' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Research
            </Link>
            <Link
              href="/login"
              className="block text-center px-3 py-2 bg-green-500 text-white rounded-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="block text-center px-3 py-2 bg-blue-600 text-white rounded-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
