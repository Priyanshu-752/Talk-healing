'use client';

import React from 'react';
import Header from '@/app/componenets/Header';
import CommunityCards from '@/app/componenets/communitycards';

export default function CommunityPage() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-none px-4 sm:px-6 md:px-8 pt-[110px] pb-8 space-y-7">
          {/* Search and Create Button Row */}
          <div className="bg-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 rounded-lg shadow-md p-4">
            {/* Search Bar */}
            <input
              className="w-full sm:w-80 px-4 py-2 rounded-full border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              placeholder="Search community..."
            />
            {/* Create Button */}
            <button className="px-4 py-2 bg-green-500 text-white rounded-full font-medium transition hover:scale-105 hover:bg-green-600">
              Create Community
            </button>
          </div>

          {/* Community Cards Grid */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 16 }).map((_, i) => (
                <CommunityCards key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
