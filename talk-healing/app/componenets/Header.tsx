"use client";

import Link from 'next/link';
import { IconBell } from '@tabler/icons-react';


type HeaderProps = {
  activeSection: string;
  setActiveSection: (section: 'home' | 'community') => void;
};

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            {/*<div className="w-8 h-8 rounded-lg bg-green-500"></div>*/}
            <h1 className="text-3xl font-bold text-black">Talkhealing</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Navigation Links - hidden on mobile, visible on medium screens and up */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => setActiveSection('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === 'home' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Home
              </button>
              
              <button 
                onClick={() => setActiveSection('community')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === 'community' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Community
              </button>
            </div>
            
            {/* Search Bar */}
            <div className="hidden lg:block">
              <input 
                className="px-4 py-2 w-80 rounded-full border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                type="text" 
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Icon */}
            <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
              <IconBell className="h-6 w-6 text-gray-600 " />
            </button>

            {/* login / signup buttons */}
            <div className="flex items-center gap-3">
              <Link href="/login" className=" hidden sm:block px-4 py-2 bg-green-500 text-white rounded-lg font-medium transition hover:scale-105 hover:bg-green-600">
              
                Login
              </Link>
              <Link href="/signup" className="hidden sm:block px-4 py-2 bg-blue-600 text-white rounded-lg font-medium transition hover:scale-105 hover:bg-blue-700">
                Sign Up
              </Link>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}