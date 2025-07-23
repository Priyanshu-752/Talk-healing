import React from 'react';
import Link from 'next/link';
import Header from '@/app/componenets/Header';
import TopicsCard from '@/app/componenets/topics';
import CreatePost from '@/app/componenets/createpost';
import CommunityExplore from '@/app/componenets/community';


export default function HomeSection({ }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeSection={''} 
        setActiveSection={function (section: 'home' | 'community'): void {
          throw new Error('Function not implemented.');
        }} 
      />
      <main className="fixed container mx-auto px-24 py-33">
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <div className="w-80 flex-shrink-0">
            <TopicsCard />
          </div>
          
          {/* Main content area */}
          <div className="flex-1 flex flex-col gap-7">
            {/* main content here */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Welcome to Talkhealing</h2>
              <p className="text-xl-gray-700">Explore topics, connect with communities, and share your thoughts.</p>
          </div>
          <div className='bg-white rounded-2xl shadow-md p-6 '>
            <h2 className='text-xl-black'></h2>
            <div className="mt-4">
        <p className="text-gray-800 text-base">
          Just finished a beautiful hike in the mountains! The air was so fresh and the views were absolutely breathtaking. Feeling so refreshed and grateful for moments like these. 🌲⛰️ #Nature #Hiking #Wellness
        </p>
        <img
          className="mt-4 rounded-lg w-full"
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" // Placeholder image
          alt="Scenic mountain landscape"
        />
      </div>
          </div>
          </div>
         {/* right sidebar*/}
          <div className='w-80 flex-shrink-0 flex flex-col gap-7'>
            <CreatePost/>
            <CommunityExplore/>
          </div>
          
        </div>
      </main>
    </div>
  );
}