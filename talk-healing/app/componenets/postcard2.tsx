import React from 'react';
import { FaRegComment, FaRetweet } from 'react-icons/fa';
import { IoHeartOutline, IoStatsChartOutline, IoShareOutline } from 'react-icons/io5';
import { FiMoreHorizontal } from 'react-icons/fi';
import Image from 'next/image';
import { Images } from '@/public';

export default function PostCard2() {
  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl max-w mx-auto my-4 font-sans">
      <div className="p-4">
        <div className="flex items-start justify-between">
          {/* User Info Section */}
          <div className="flex items-center gap-3">
            <img 
              src="pr" 
              alt="profile" 
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-bold text-black dark:text-white">user</p>
              <p className="text-gray-500">@_user12345</p>
            </div>
          </div>
          <button className="text-gray-500 hover:bg-blue-100 dark:hover:bg-gray-800 rounded-full p-2">
            <FiMoreHorizontal size={20} />
          </button>
        </div>

        {/* Post Content */}
        <div className="mt-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
             <img 
              src={Images.worship}
              alt="post"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mt-4 text-gray-500">
          {/* Reply */}
          <div className="flex items-center gap-1 group">
            <button className="p-2 group-hover:bg-blue-100 rounded-full">
              <FaRegComment size={18} className="group-hover:text-blue-500" />
            </button>
            <span className="text-sm group-hover:text-blue-500">900</span>
          </div>

          {/* Retweet */}
          <div className="flex items-center gap-1 group">
            <button className="p-2 group-hover:bg-green-100 rounded-full">
              <FaRetweet size={18} className="group-hover:text-green-500" />
            </button>
            <span className="text-sm group-hover:text-green-500">4960</span>
          </div>

          {/* Like */}
          <div className="flex items-center gap-1 group">
            <button className="p-2 group-hover:bg-pink-100 rounded-full">
              <IoHeartOutline size={20} className="group-hover:text-pink-500" />
            </button>
            <span className="text-sm group-hover:text-pink-500">9.2K</span>
          </div>

          {/* Views */}
          <div className="flex items-center gap-1 group">
            <button className="p-2 group-hover:bg-gray-200 dark:group-hover:bg-gray-800 rounded-full">
               <IoStatsChartOutline size={20} className="group-hover:text-gray-700 dark:group-hover:text-white" />
            </button>
            <span className="text-sm group-hover:text-gray-700 dark:group-hover:text-white">29K</span>
          </div>

          {/* Share */}
          <div>
            <button className="p-2 hover:bg-blue-100 rounded-full hover:text-blue-500">
              <IoShareOutline size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}