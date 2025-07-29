'use client';

import React from 'react';
import Header from '@/app/componenets/Header';
import ProfileCard from '@/app/componenets/profilecard';
import SettingsCard from '@/app/componenets/settingscard';


export default function HomeSection({ }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Fixed at top */}
      <Header />

      {/* Main content wrapper - Fixed height with flex */}
      <div className="flex flex-1 h-screen pt-[140px] md:pt-[70px] overflow-hidden ">

        {/* Left Sidebar - Fixed position */}
 
        <div className="w-full md:block hidden md:w-64 lg:w-90 px-8 flex-shrink-0 fixed top-[110px] left-0 h-[calc(100vh-110px)] overflow-y-auto  z-10">
          <ProfileCard />
        </div>

        {/* Main Content - Scrollable with proper margins */}
        <div className="flex-1 px-4 py-6 md:pt[110px] md:px-8 md:py-6 md:ml-64 lg:ml-80 md:mr-64 lg:mr-80 overflow-y-auto space-y-7 scrollbar-none">
          {/*<div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Welcome to Talkhealing</h2>
            <p className="text-xl text-gray-700">Explore topics, connect with communities, and share your thoughts.</p>
          </div>
        */}
          {/* CreatePost visible only on mobile */}
          <div className="block md:hidden mt-0">
            <SettingsCard />
          </div>

          {/* Post Cards */}
          
          
        </div>

        {/* Right Sidebar - Fixed position */}
        <div className="w-full md:w-64 lg:w-80 px-4 flex-shrink-0 fixed top-[110px] right-5 h-[calc(100vh-110px)] overflow-y-auto bg-gray-50 z-10 hidden md:flex md:flex-col gap-7 ">
          {/* CreatePost visible only on md and up */}
          <div className="block">
            <SettingsCard />
          </div>

          
        </div>

      </div>
    </div>
  );
}   