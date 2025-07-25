'use client';

import React from 'react';
import Header from '@/app/componenets/Header';
import TopicsCard from '@/app/componenets/topics';
import CreatePost from '@/app/componenets/createpost';
import CommunityExplore from '@/app/componenets/community';
import PostCard from '@/app/componenets/postcard';
import PostCard2 from '@/app/componenets/postcard2';
import PostCard3 from '@/app/componenets/postcard3';
import TopicsMobile from '@/app/componenets/topicsmobile';

export default function HomeSection({ }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main content wrapper */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">

        {/* Left Sidebar */}
        <div className="w-full md:hidden block md:w-64 lg:w-80 px-4 pt-25 md:pt-[110px] flex-shrink-0">
          <TopicsMobile />
        </div>
        <div className="w-full md:block hidden md:w-64 lg:w-80 px-4 pt-6 md:pt-[110px] flex-shrink-0">
          <TopicsCard />
        </div>

        {/* Main Content  */}
        <div className="flex-1 px-4 py-6 md:px-8 md:py-6 md:pt-[110px] overflow-y-auto    h-full space-y-7 
                        md:overflow-y-scroll md:h-[calc(100vh-110px)] scrollbar-none">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Welcome to Talkhealing</h2>
            <p className="text-xl text-gray-700">Explore topics, connect with communities, and share your thoughts.</p>
          </div>

          {/* CreatePost visible only on mobile */}
          <div className="block md:hidden">
            <CreatePost />
          </div>

          {/* Post Cards */}
          <PostCard />
          <PostCard2 />
          <PostCard3 />
          <PostCard />
          <PostCard2 />
          <PostCard3 />
        </div>

        {/* Right Sidebar */}
        <div className="w-full md:w-64 lg:w-80 px-4 pt-6 md:pt-[110px] flex-shrink-0 flex flex-col gap-7">
          {/* CreatePost visible only on md and up */}
          <div className="hidden md:block">
            <CreatePost />
          </div>

          {/* CommunityExplore only visible on md and up */}
          <div className="hidden md:block">
            <CommunityExplore />
          </div>
        </div>

      </div>
    </div>
  );
}
