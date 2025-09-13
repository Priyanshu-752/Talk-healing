import React from 'react';
import CreatePostModal from '../Modals/CreatePost/CreatePostModal';

interface AboutCommunityCardProps {
  communityName: string;
  description: string;
  memberCount: number;
  communityImage?: string;
  createdDate?: string;
  communityType?: string;
}

export default function AboutCommunityCard({
  communityName,
  description,
  memberCount,
  communityImage,
  createdDate,
  communityType = 'General',
}: AboutCommunityCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-2">
      <h2 className="text-2xl font-semibold text-gray-900">{communityName}</h2>
      <p className="text-gray-700 text-base">{description}</p>
      <div>
        <span className="text-xl text-gray-900">About this community</span>
      </div>
      <div className="border-t border-gray-200 my-2"></div>
      <div className='text-gray-600'>
        <h1>{communityName} Community</h1>
        <p>Created {createdDate || 'recently'}</p>
        <p>Type: {communityType}</p>
      </div>
      
      {/* Stats Section */}
      <div className="flex justify-around border-y border-gray-200 py-4 text-center">
        <div className="flex-1">
          <div className="mb-1 text-xl font-bold text-gray-900">{memberCount}</div>
          <div className="text-xs text-gray-500">Posts</div>
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-center text-xl font-bold text-gray-900">
            <span className="mr-2 h-3.5 w-3.5 rounded-full bg-green-500"></span>
            {Math.floor(memberCount / 10)}
          </div>
          <div className="text-xs text-gray-500">Active</div>
        </div>
        <div className="flex-1">
          <div className="mb-1 text-xl font-bold text-gray-900">
            {memberCount > 50 ? 'Top 10%' : 'Growing'}
          </div>
          <div className="text-xs text-gray-500">Community Rank</div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Community Guidelines</h3>
        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
          <li>Be respectful and supportive.</li>
          <li>Share accurate and helpful information.</li>
          <li>No spam or self-promotion.</li>
          <li>Protect your privacy and others'.</li>
        </ul>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-gray-600 text-sm">{memberCount}+ Posts</span>
      </div>
    </div>
  );
}
