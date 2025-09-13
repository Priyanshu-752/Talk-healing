'use client';

import React, { useState } from 'react';
import Header from '@/app/componenets/Header/Header';
import TopicsCard from '@/app/componenets/topicscards/topics';
import CreatePostModal from '@/app/componenets/Modals/CreatePost/CreatePostModal';
import CommunityExplore from '@/app/componenets/communitycards/community';
import PostCard from '@/app/componenets/postcard';
import TopicsMobile from '@/app/componenets/topicscards/topicsmobile';
import { BsImage } from 'react-icons/bs';

export default function HomeSection({ }) {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  const openCreatePostModal = () => setIsCreatePostModalOpen(true);
  const closeCreatePostModal = () => setIsCreatePostModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main content wrapper - Fixed height with flex */}
      <div className="flex flex-1 h-screen pt-[140px] md:pt-[70px] overflow-hidden ">

        {/* Left Sidebar  */}

        <div className="w-full md:hidden block md:w-64 lg:w-80 px-4 flex-shrink-0 absolute top-[100px] left-0 right-0 h-auto z-10 bg-gray-50 ">
          <TopicsMobile />
        </div> 
        <div className="w-full md:block hidden md:w-64 lg:w-90 px-8 flex-shrink-0 fixed top-[110px] left-0 h-[calc(100vh-110px)] overflow-y-auto  z-10">
          <TopicsCard />
        </div>

        {/* Main Content - Scrollable  */}
        <div className="flex-1 px-4 py-6 md:pt[110px] md:px-8 md:py-6 md:ml-64 lg:ml-80 md:mr-64 lg:mr-80 overflow-y-auto space-y-7 scrollbar-none">
          {/*<div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Welcome to Talkhealing</h2>
            <p className="text-xl text-gray-700">Explore topics, connect with communities, and share your thoughts.</p>
          </div>
        */}
          {/* CreatePost on mobile */}
          <div className="block md:hidden mt-0">
            <div className="bg-white text-gray-800 p-4 border border-gray-200 rounded-lg shadow-sm w-full">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <div
                    className="bg-transparent w-full focus:outline-none resize-none text-xl placeholder-gray-500 cursor-pointer py-3 px-2 border border-gray-300 rounded-lg"
                    onClick={openCreatePostModal}
                  >
                    Share your thoughts...
                  </div>
                  <div className="border-t border-gray-200 my-5"></div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-1 text-blue-500">
                      <button 
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
                        onClick={openCreatePostModal}
                      >
                        <BsImage size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Post Cards */}
          <PostCard />
          
        </div>

        {/* Right Sidebar*/}
        <div className="w-full md:w-64 lg:w-80 px-4 flex-shrink-0 fixed top-[110px] right-5 h-[calc(100vh-110px)] overflow-y-auto bg-gray-50 z-10 hidden md:flex md:flex-col gap-7 ">
          {/* CreatePost visible only on md  */}
          <div className="bg-white text-gray-800 p-4 border border-gray-200 rounded-lg shadow-sm w-full">
            <div className="flex space-x-4">
              <div className="flex-1">
                <div
                  className="bg-transparent w-full focus:outline-none resize-none text-xl placeholder-gray-500 cursor-pointer py-3 px-2 border border-gray-300 rounded-lg"
                  onClick={openCreatePostModal}
                >
                  Share your thoughts...
                </div>
                <div className="border-t border-gray-200 my-5"></div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-1 text-blue-500">
                    <button 
                      type="button"
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
                      onClick={openCreatePostModal}
                    >
                      <BsImage size={20} />
                    </button>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="px-5 py-2 rounded-full font-bold transition-colors duration-200 bg-blue-500 text-white hover:bg-blue-600"
                      onClick={openCreatePostModal}
                      type="button"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CommunityExplore on md  */}
          <div className="block">
            <CommunityExplore />
          </div>
        </div>

      </div>

      {/* CreatePost Modal */}
      <CreatePostModal
        opened={isCreatePostModalOpen}
        onClose={closeCreatePostModal}
        calledAt="feeds"
      />
    </div>
  );
}   