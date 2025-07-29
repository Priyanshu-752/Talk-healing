'use client';

import { useState } from 'react';
import { IconBell, IconMenu2, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NotificationModal from './Modals/Notification/NotificationModal';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Nav */}
        <div className="flex justify-between items-center h-20">
          {/* Left: Logo + Hamburger */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded hover:bg-gray-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
            </button>

            <Link href="/home">
              <h1 className="text-2xl font-bold text-black">Talkhealing</h1>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { name: 'Home', href: '/' },
              { name: 'Community', href: '/community' },
              { name: 'Research', href: '/research' },
              { name: 'User', href: '/user-profile' },
            ].map(({ name, href }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {name}
              </Link>
            ))}
          </div>

          {/* Right - Search & Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <input
              className="px-4 py-2 w-80 rounded-full border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              placeholder="Search..."
            />
            <NotificationModal />
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
          <div className="md:hidden mt-2 px-2 pb-4 space-y-3">
            {[
              { name: 'Home', href: '/' },
              { name: 'Community', href: '/community' },
              { name: 'Research', href: '/research' },
            ].map(({ name, href }) => (
              <Link
                key={href}
                href={href}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {name}
              </Link>
            ))}

            {/* Optional Search Bar in Mobile */}
            <input
              className="block w-full px-4 py-2 rounded-full border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              placeholder="Search..."
            />

            {/* Notification */}
            <div className="pt-2">
              <NotificationModal />
            </div>

            {/* Auth Buttons */}
            <Link
              href="/login"
              className="block w-full text-center px-4 py-2 bg-green-500 text-white rounded-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
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
