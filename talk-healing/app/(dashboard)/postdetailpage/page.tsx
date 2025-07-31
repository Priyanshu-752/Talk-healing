'use client'

import React from 'react';
import Header from '@/app/componenets/Header/Header';
import AboutUserCard from '@/app/componenets/postdetail/aboutusercard';
import PostComment from '@/app/componenets/postdetail/post-comment';
import RelatedPostCard from '@/app/componenets/postdetail/relatedpost';

export default function PostDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header - Fixed at top */}
      <Header />

      {/* Main content wrapper */}
      <div className="flex flex-1 h-screen pt-[140px] md:pt-[70px] overflow-hidden min-w-0">
        
        {/* Mobile stacked layout (sm only) */}
        <div className="flex-1 flex flex-col gap-6 md:hidden px-4 absolute top-[100px] left-0 right-0 z-10 bg-gray-50 dark:bg-gray-900">
          {/* About Card */}
          <AboutUserCard />
          {/* Post Comment */}
          <PostComment />
          {/* Related Posts */}
          <RelatedPostCard />
        </div>
        
        {/* Desktop/Tablet - About sidebar, main post, related sidebar */}
        {/* Left Sidebar */}
        <div className="hidden md:block md:w-64 lg:w-90 px-8 flex-shrink-0 fixed top-[110px] left-0 h-[calc(100vh-110px)] overflow-y-auto z-10">
          <AboutUserCard />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 py-6 md:px-8 md:py-6 md:ml-64 lg:ml-80 md:mr-64 lg:mr-80 overflow-y-auto space-y-7 scrollbar-none min-w-0">
          <PostComment />
        </div>

        {/* Right Sidebar */}
        <div className="hidden md:flex md:w-64 lg:w-80 px-3 flex-shrink-0 fixed top-[110px] right-5 h-[calc(100vh-110px)] overflow-y-auto bg-gray-50 dark:bg-gray-900 z-10 flex-col gap-7">
          <RelatedPostCard />
        </div>
      </div>
    </div>
  );
}
