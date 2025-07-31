'use client';
import React, { useState } from 'react';
import { FaRegComment, FaRetweet } from 'react-icons/fa';
import { IoHeartOutline, IoHeart, IoStatsChartOutline, IoShareOutline } from 'react-icons/io5'; // Import IoHeart for toggled like
import { FiMoreHorizontal } from 'react-icons/fi';

export default function ActionBar() {
  const [replyCount, setReplyCount] = useState(900);
  const [retweetCount, setRetweetCount] = useState(4960);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(9200);
  

  // Button handlers
  const handleLike = () => {
    setLikeCount(likeCount + (liked ? -1 : 1));
    setLiked(!liked);
  };

  const handleRetweet = () => {
    setRetweetCount(retweetCount + 1);
  };

  const handleReply = () => {
   
    setReplyCount(replyCount + 1);
    alert('Reply clicked!');
  };

  const handleShare = () => {
   
    alert('Share clicked!');
  };

  return (
    <div className="flex justify-between items-center mt-4 text-gray-500">
      {/* Reply */}
      <div className="flex items-center gap-1 group">
        <button
          className="p-2 group-hover:bg-blue-100 rounded-full"
          onClick={handleReply}
        >
          <FaRegComment size={18} className="group-hover:text-blue-500" />
        </button>
        <span className="text-sm group-hover:text-blue-500">{replyCount.toLocaleString()}</span>
      </div>

      {/* Retweet */}
      <div className="flex items-center gap-1 group">
        <button
          className="p-2 group-hover:bg-green-100 rounded-full"
          onClick={handleRetweet}
        >
          <FaRetweet size={18} className="group-hover:text-green-500" />
        </button>
        <span className="text-sm group-hover:text-green-500">{retweetCount.toLocaleString()}</span>
      </div>

      {/* Like */}
      <div className="flex items-center gap-1 group">
        <button
          className="p-2 group-hover:bg-pink-100 rounded-full"
          onClick={handleLike}
        >
          {liked ? (
            <IoHeart size={20} className="text-pink-500" />
          ) : (
            <IoHeartOutline size={20} className="group-hover:text-pink-500" />
          )}
        </button>
        <span className="text-sm group-hover:text-pink-500">{likeCount.toLocaleString()}</span>
      </div>

      {/* Views  */}
      <div className="flex items-center gap-1 group">
        <button className="p-2 group-hover:bg-gray-200 dark:group-hover:bg-gray-800 rounded-full" disabled>
          <IoStatsChartOutline size={20} className="group-hover:text-gray-700 dark:group-hover:text-white" />
        </button>
        <span className="text-sm group-hover:text-gray-700 dark:group-hover:text-white">29K</span>
      </div>

      {/* Share */}
      <div>
        <button
          className="p-2 hover:bg-blue-100 rounded-full hover:text-blue-500"
          onClick={handleShare}
        >
          <IoShareOutline size={20} />
        </button>
      </div>
    </div>
  );
}
