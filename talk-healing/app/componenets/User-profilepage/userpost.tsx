'use client';

import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/models';
import { Images } from '@/public';
import { FiMoreHorizontal } from 'react-icons/fi';
import ActionBar from '../actionbar/actionbar';
import Link from 'next/link';

interface UserPostProps {
  maxPosts?: number; // Limit the number of posts to display
  showHeader?: boolean; // Whether to show the section header
}

const UserPost: React.FC<UserPostProps> = observer(({ 
  maxPosts, 
  showHeader = true 
}) => {
  const { homeStore, userStore } = useStores();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loggedInUser = userStore.loggedInUserData?.user;
  const loggedInUserId = loggedInUser?.id;

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!loggedInUserId) {
        setError('No logged-in user found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Fetch all posts and then filter for current user
        await homeStore.getPostInIdHomeData();
        
      } catch (err) {
        console.error('Error fetching user posts:', err);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [homeStore, loggedInUserId]);

  // Filter posts to show only the logged-in user's posts
  const allPosts = homeStore.postInIdHomeData?.results || [];
  const userPosts = allPosts.filter(post => {
    // Check if the post creator matches the logged-in user
    return post.creator?.id === loggedInUserId || 
           post.author === loggedInUserId;
  });

  // Limit posts if maxPosts is specified
  const displayPosts = maxPosts ? userPosts.slice(0, maxPosts) : userPosts;

  if (loading) {
    return (
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-6">
        <div className="text-red-500 text-center py-4">
          <p className="font-medium">Error loading posts</p>
          <p className="text-sm text-gray-500 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!loggedInUser) {
    return (
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-6">
        <div className="text-gray-500 text-center py-4">
          <p>Please log in to view your posts.</p>
        </div>
      </div>
    );
  }

  if (displayPosts.length === 0) {
    return (
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-6">
        {showHeader && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-black dark:text-white">Your Posts</h3>
            <p className="text-sm text-gray-500">Posts you've created</p>
          </div>
        )}
        <div className="text-gray-500 text-center py-8">
          <div className="text-4xl mb-2">📝</div>
          <p className="font-medium">No posts yet</p>
          <p className="text-sm mt-1">Your posts will appear here once you start sharing.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl font-sans">
      {showHeader && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-black dark:text-white">Your Posts</h3>
              <p className="text-sm text-gray-500">{userPosts.length} post{userPosts.length !== 1 ? 's' : ''}</p>
            </div>
            {maxPosts && userPosts.length > maxPosts && (
              <Link 
                href="/user-profile" 
                className="text-blue-500 hover:text-blue-600 text-sm font-medium"
              >
                View All
              </Link>
            )}
          </div>
        </div>
      )}

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {displayPosts.map((post, index) => (
          <div key={post.id || index} className="p-4">
            {/* Post Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={loggedInUser.avatar || Images.userProfileImage}
                  alt="Your profile"
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = Images.userProfileImage;
                  }}
                />
                <div>
                  <p className="font-semibold text-black dark:text-white text-sm">
                    {loggedInUser.full_name || "You"}
                  </p>
                  <p className="text-gray-500 text-xs">
                    @{loggedInUser.id || "you"}
                  </p>
                  {post.created_on && (
                    <p className="text-xs text-gray-400">
                      {new Date(post.created_on).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <button className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-1.5 transition-colors">
                <FiMoreHorizontal size={16} />
              </button>
            </div>

            {/* Post Content */}
            <div className="mb-3">
              {post.title && (
                <h4 className="font-semibold text-black dark:text-white mb-1">
                  {post.title}
                </h4>
              )}
              {post.content && (
                <p className="text-black dark:text-white text-sm leading-relaxed">
                  {post.content}
                </p>
              )}
            </div>

            {/* Post Media */}
            {(post.image || (post.media && post.media.length > 0)) && (
              <Link href={`/postdetailpage/${post.id}`} className="block mb-3">
                <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title || "Post image"}
                      className="w-full max-h-64 object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : post.media && post.media.length > 0 && (post.media[0].image || post.media[0].media) && (
                    <img
                      src={post.media[0].image || post.media[0].media || ""}
                      alt={post.title || "Post media"}
                      className="w-full max-h-64 object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                </div>
              </Link>
            )}

            {/* Post Actions */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
              <ActionBar />
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button (if there are more posts) */}
      {maxPosts && userPosts.length > maxPosts && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Link 
            href="/user-profile"
            className="block w-full text-center py-2 px-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
          >
            View All {userPosts.length} Posts
          </Link>
        </div>
      )}
    </div>
  );
});

export default UserPost;
