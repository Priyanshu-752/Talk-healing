import React from 'react';
import { FaRegComment, FaRetweet } from 'react-icons/fa';
import { IoHeartOutline, IoStatsChartOutline, IoShareOutline } from 'react-icons/io5';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Images } from '@/public';
import Link from 'next/link';
import ActionBar from '../actionbar/actionbar';


export default function PostComment() {
   
    const comments = [
        {
            id: 1,
            username: "john_doe",
            handle: "@johndoe",
            profileImg: "/api/placeholder/32/32",
            text: "Great post! Thanks for sharing 👍",
            time: "2h"
        },
        {
            id: 2,
            username: "sarah_smith",
            handle: "@sarahsmith",
            profileImg: "/api/placeholder/32/32",
            text: "This is exactly what I was looking for! Amazing work 🔥",
            time: "1h"
        },
        {
            id: 3,
            username: "mike_wilson",
            handle: "@mikewilson",
            profileImg: "/api/placeholder/32/32",
            text: "Could you explain this part in more detail? Really helpful content!",
            time: "45m"
        },
        {
            id: 4,
            username: "emma_jones",
            handle: "@emmajones",
            profileImg: "/api/placeholder/32/32",
            text: "Love this content, very insightful. Bookmarking for future reference!",
            time: "30m"
        }
    ];

    return (
        <div className='bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl my-4 mx-auto  font-sans'>
            {/* Post Header */}
            <div className='p-4'>
                <div className='flex items-start justify-between'>
                    <div className='flex items-center gap-3'>
                        <img src="/api/placeholder/48/48" alt="profile" className='w-12 h-12 rounded-full object-cover' />
                        <div>
                            <p className='font-bold text-black dark:text-white'>user</p>
                            <p className='text-gray-500 text-sm'>@_user12345</p>
                        </div>
                    </div>
                    <button className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-2 transition-colors">
                        <FiMoreHorizontal size={20} />
                    </button>
                </div>

                {/* Post Content */}
                <div className="mt-4">
                    <p className="text-black dark:text-white mb-3">
                        My new photo
                    </p>
                    <div className="flex justify-center">
                        <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden max-w-full">
                            <img 
                                src={Images.userProfileImage} 
                                alt="post" 
                                className="rounded-2xl max-h-[400px] w-full object-cover" 
                            />
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className='border-t border-gray-200 dark:border-gray-700 mt-4 pt-3'>
                    <ActionBar /> 
                </div>

                {/* Comments Section */}
                <div className='border-t border-gray-200 dark:border-gray-700 mt-4 pt-4'>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Comments</h3>
                        
                        {/* Comment Input */}
                        <div className="flex gap-3 mb-4">
                            <img src="/api/placeholder/32/32" alt="your profile" className="w-8 h-8 rounded-full object-cover" />
                            <div className="flex-1">
                                <textarea 
                                    placeholder="Write a comment..."
                                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg resize-none bg-gray-50 dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent row-2"
                                  
                                />
                                <div className="flex justify-end mt-2">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors">
                                        Post
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Comments List */}
                        <div className="space-y-4">
                            {comments.map((comment) => (
                                <div key={comment.id} className="flex gap-3">
                                    <img 
                                        src={comment.profileImg} 
                                        alt={`${comment.username} profile`} 
                                        className="w-8 h-8 rounded-full object-cover flex-shrink-0" 
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-semibold text-black dark:text-white text-sm">{comment.username}</p>
                                                <p className="text-gray-500 text-xs">{comment.handle}</p>
                                                <span className="text-gray-400 text-xs">•</span>
                                                <p className="text-gray-500 text-xs">{comment.time}</p>
                                            </div>
                                            <p className="text-black dark:text-white text-sm leading-relaxed">{comment.text}</p>
                                        </div>
                                        
                                        {/* Comment Actions */}
                                        <div className="flex items-center gap-4 mt-2 text-gray-500">
                                            <button className="flex items-center gap-1 hover:text-blue-500 text-xs">
                                                <FaRegComment size={12} />
                                                <span>Reply</span>
                                            </button>
                                            <button className="flex items-center gap-1 hover:text-pink-500 text-xs">
                                                <IoHeartOutline size={14} />
                                                <span>Like</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More Comments */}
                        <div className="mt-4 text-center">
                            <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                                View more comments
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
