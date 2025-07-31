import React from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Images } from '@/public';
import Link from 'next/link';
import ActionBar from './actionbar/actionbar';

export default function PostCard({ posts = [] }) {
  // Default fallback data if no posts provided
  const defaultPosts = [
    {
      id: 1,
      user: {
        name: 'user',
        username: '@_user12345',
        profileImage: 'pr'
      },
      image: Images.userProfileImage,
      altText: 'post'
    },
    {
      id: 2,
      user: {
        name: 'user',
        username: '@_user12345',
        profileImage: 'pr'
      },
      image: Images.talkhealingLogo,
      altText: 'post'
    },
    {
      id: 3,
      user: {
        name: 'user',
        username: '@_user12345',
        profileImage: 'pr'
      },
      image: Images.worship,
      altText: 'post'
    }
  ];

  const postsToRender = posts.length > 0 ? posts : defaultPosts;
 {/*/${post.id || index}*/}
  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl max-w mx-auto my-4 font-sans">
      {postsToRender.map((post, index) => (
        <React.Fragment key={post.id || index}>
          <div className="p-4">
            
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={post.user.profileImage} 
                    alt="profile" 
                    className="w-12 h-12 rounded-full" 
                  />
                  <div>
                    <p className="font-bold text-black dark:text-white">
                      {post.user.name}
                    </p>
                    <p className="text-gray-500">{post.user.username}</p>
                  </div>
                </div>
                <button className="text-gray-500 hover:bg-blue-100 dark:hover:bg-gray-800 rounded-full p-2">
                  <FiMoreHorizontal size={20} />
                </button>
              </div>
              
              <Link href={`/postdetailpage`} className="block">
              <div className="mt-4 flex justify-center">
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden max-w-full">
                  <img 
                    src={post.image} 
                    alt={post.altText || 'post'} 
                    className="rounded-2xl max-h-[650px] object-cover" 
                  />
                </div>
              </div>
              </Link>
              
              <div className="border-t border-gray-200 my-4"></div>
              <ActionBar  />
            
          </div>
          
          {/* Add divider between posts, but not after the last one */}
          {index < postsToRender.length - 1 && (
            <div className="border-t border-gray-200 my-4"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
