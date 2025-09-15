'use client';

import { useKBar } from 'kbar';
import { useEffect, useState } from 'react';
import { IconMenu2, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NotificationModal from '../Modals/Notification/NotificationModal';

// Pull the auth flag from your existing MST store
import { useStores } from '@/models';
// If you want a profile dropdown like the old header, import your component:
// import { ProfileSection } from '../ProfileSection/ProfileSection'; // adjust the path if needed

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { query } = useKBar();

  // Store + mounted guard to avoid hydration mismatch on first client render
  const { userStore } = useStores();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isLoggedIn = Boolean(userStore?.is_logged_in);
  const isAuthed = mounted && isLoggedIn;

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Nav */}
        <div className="flex justify-between items-center h-20">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded hover:bg-gray-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
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
              readOnly
              onClick={() => query.toggle()}
              className="px-4 py-2 w-80 rounded-full border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              type="text"
              placeholder="Search..."
            />

            {/* Notifications - visible for both states */}
            <NotificationModal />

            {/* Auth area */}
            {isAuthed ? (
              <div className="flex items-center gap-4">
                {/* If using your existing profile component from the old header, uncomment: */}
                {/* <ProfileSection /> */}
                <Link
                  href="/user-profile"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:scale-105 hover:bg-green-600"
                >
                  My Profile
                </Link>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 px-2 pb-4 space-y-3">
            {/* Mobile Search */}
            <input
              readOnly
              onClick={() => query.toggle()}
              className="block w-full px-4 py-2 rounded-full border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              type="text"
              placeholder="Search..."
            />

            {[
              { name: 'Home', href: '/' },
              { name: 'Community', href: '/community' },
              { name: 'Research', href: '/research' },
            ].map(({ name, href }) => (
              <Link
                key={href}
                href={href}
                className={`block px-30 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {name}
              </Link>
            ))}

            {/* Notification */}
            <div className="pt-2">
              <NotificationModal />
            </div>

            {/* Auth area (mobile) */}
            {isAuthed ? (
              <Link
                href="/user-profile"
                className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:scale-105 hover:bg-green-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Profile
              </Link>
            ) : (
              <>
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
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
