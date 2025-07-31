'use client';

import React from 'react';
import CreatePostModal from '../Modals/CreatePost/CreatePostModal';

export default function ProfileCard() {
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-md border px-6 py-5 space-y-4">
      {/* Header Section with icon */}
      <div className="flex justify-between items-center">
        <img 
              src="pr" 
              alt="profile" 
              className="w-12 h-12 rounded-full"
            />
        <h2 className="text-xl font-bold">Guest User</h2>
      </div>

      {/* Email */}
      <p className="text-sm text-muted-foreground">guest@example.com</p>

      {/* Last Active */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>🗓️</span> Last Active known
      </div>

      {/* Stats */}
      <div className="flex justify-between text-sm font-medium text-gray-700 border rounded-xl px-4 py-2">
        <div><strong>0</strong> Following</div>
        <div><strong>0</strong> Followers</div>
        <div><strong>5</strong> Posts</div>
      </div>

      {/* Button */}
     <CreatePostModal/>
    </div>
  );
}
