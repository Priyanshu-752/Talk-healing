import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Images } from '@/public';
import Link from 'next/link';
import { useStores } from '@/models';
import { observer } from 'mobx-react-lite';

interface CommunityCardsProps {
  title?: string;
  image?: string;
  members?: any;
  showButtons?: boolean;
  communityId?: string;
  creatorId?: string;
  isFollowing?: boolean;
  onFollow?: (communityId: string) => void;
  onUnfollow?: (communityId: string) => void;
  onCreatePost?: (communityId: string) => void;
}

const CommunityCards: React.FC<CommunityCardsProps> = observer(({
  title = "Community",
  image = Images.communityCardImage,
  members = "1000+",
  showButtons = true,
  communityId,
  creatorId,
  isFollowing = false,
  onFollow,
  onUnfollow,
  onCreatePost,
}) => {
  const { userStore } = useStores();
  const [followLoading, setFollowLoading] = useState(false);

  const currentUserId = userStore.loggedInUserData?.user?.id;
  // Robustly detect MST array, normal array, or fallback
  const memberCount = (() => {
    if (Array.isArray(members)) return members.length;
    if (typeof members === 'object' && members !== null && 'length' in members) return members.length;
    if (typeof members === 'string' && /^\d+$/.test(members)) return parseInt(members, 10);
    return 0;
  })();
  const memberDisplay = `${memberCount} Members`;

  // Check if current user is the creator of this community
  const isCreator = currentUserId && creatorId && currentUserId === creatorId;

  const handleFollow = async () => {
    if (!communityId) return;
    
    setFollowLoading(true);
    try {
      if (isFollowing) {
        onUnfollow?.(communityId);
      } else {
        onFollow?.(communityId);
      }
    } catch (error) {
      console.error('Follow/unfollow error:', error);
    } finally {
      setFollowLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl font-sans hover:shadow-lg transition">
      <div className="p-4">
        <Link href="/communityhome" className="block">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <img
              src={image}
              alt={`${title} card`}
              className="w-full object-cover h-40"
            />
          </div>

          {/* Title */}
          <div className="text-center text-xl font-bold text-black dark:text-white pt-4">
            {title}
          </div>
        </Link>

        {/* Buttons and members */}
        <div className="flex flex-col gap-3 pt-4">
          {showButtons && (
            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
              {isCreator ? (
                // Show Create Post button for community creator
                <Button
                  onClick={() => onCreatePost?.(communityId || '')}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  type="button"
                >
                  Create Post
                </Button>
              ) : (
                // Show Follow/Unfollow button for other users
                <Button
                  onClick={handleFollow}
                  disabled={followLoading}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isFollowing
                      ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                  type="button"
                >
                  {followLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                      <span>Loading...</span>
                    </div>
                  ) : isFollowing ? (
                    '✓ Following'
                  ) : (
                    '+ Follow'
                  )}
                </Button>
              )}
            </div>
          )}
          
          <div className="text-center">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {memberDisplay}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CommunityCards;
