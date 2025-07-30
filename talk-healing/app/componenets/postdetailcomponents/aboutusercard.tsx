'use client';

import React from "react";
import { Images } from "@/public";

export default function AboutUserCard() {
  return (
    <div className="bg-white dark:bg-black rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 p-6 space-y-6 w-full max-w-sm mx-auto">
      {/* Profile Image & Name */}
      <div className="flex flex-col items-center text-center gap-4">
        <img
          src={Images.userProfileImage}
          alt="User profile"
          className="w-44 h-44 rounded-full object-cover border border-gray-300"
        />
        <h2 className="text-xl font-bold text-black dark:text-white">Guest User</h2>
      </div>

      {/* Stats Section */}
      <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 border rounded-xl px-4 py-2">
        <div className="text-center">
          <p className="font-semibold">0</p>
          <p>Following</p>
        </div>
        <div className="text-center">
          <p className="font-semibold">0</p>
          <p>Followers</p>
        </div>
        <div className="text-center">
          <p className="font-semibold">5</p>
          <p>Posts</p>
        </div>
      </div>
    </div>
  );
}
