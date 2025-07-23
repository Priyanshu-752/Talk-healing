"use client";
import React from 'react';

export default function Footer (){
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-4">
          
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                Th
              </div>
              <span className="font-bold text-xl">Talkhealing</span>
            </div>
            <p className="text-gray-400">
              A supportive community for sharing and finding strength in your health journey.
            </p>
          </div>
          
          {/* Resources Links */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <div className="flex flex-col gap-2 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Crisis Support</a>
              <a href="#" className="hover:text-white transition-colors">Research</a>
              <a href="#" className="hover:text-white transition-colors">Community Forums</a>
            </div>
          </div>
          
          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="flex flex-col gap-2 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Help Center</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>
          
          {/* Connect Links */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex flex-col gap-2 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Newsletter</a>
              <a href="#" className="hover:text-white transition-colors">Social Media</a>
              <a href="#" className="hover:text-white transition-colors">Partner Organizations</a>
              <a href="#" className="hover:text-white transition-colors">Volunteer</a>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; 2025 Talkhealing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

