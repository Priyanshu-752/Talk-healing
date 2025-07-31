'use client';

import React from 'react';
import Header from '@/app/componenets/Header/Header';
import ProfileCard from '@/app/componenets/User-profilepage/profilecard';
import SettingsCard from '@/app/componenets/User-profilepage/settingscard';
import UserProfileActivityTab from '@/app/componenets/User-profilepage/userprofiletabs';

export default function UserProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Fixed at top */}
      <Header />

      {/* Main content wrapper */}
      <div className="flex flex-1 h-screen pt-[140px] md:pt-[70px] overflow-hidden">
        
        {/* Left Sidebar for Desktop */}
        <div className="w-full md:block hidden md:w-64 lg:w-90 px-8 flex-shrink-0 fixed top-[110px] left-0 h-[calc(100vh-110px)] overflow-y-auto z-10">
          <ProfileCard />
        </div>

        {/* Main Scrollable Content */}
        <div className="flex-1 px-4 py-6 md:px-8 md:py-10 md:ml-64 lg:ml-80 md:mr-64 lg:mr-80 overflow-y-auto space-y-7">
          
          {/* ProfileCard for Mobile */}
          <div className="block md:hidden">
            <ProfileCard />
          </div>

          {/* Activities Section */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Activities</h2>
            <div>
              <UserProfileActivityTab />
            </div>
          </div>

          {/* SettingsCard for Mobile */}
          <div className="block md:hidden">
            <SettingsCard />
          </div>
        </div>

        {/* Right Sidebar for Desktop */}
        <div className="w-full md:w-64 lg:w-80 px-4 flex-shrink-0 fixed top-[110px] right-5 h-[calc(100vh-110px)] overflow-y-auto bg-gray-50 z-10 hidden md:flex md:flex-col gap-7">
          <div className="block">
            <SettingsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
