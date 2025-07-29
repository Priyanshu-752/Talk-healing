import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import React, { useState } from 'react';
import { BsImage, BsEmojiSmile } from 'react-icons/bs';
import { BiPoll } from 'react-icons/bi';

  

export default function CreatePostModal({ onClose }: { onClose: () => void }) {
    const [shareText, setshareText] = useState('');
  const isPostButtonDisabled = shareText.trim().length === 0;
  const [selectedCategory, setSelectedCategory] = useState('Public');
  const categories = ['Public', 'Private'];
  return (
<Dialog>
  <DialogTrigger><button
              className={"px-28 mt-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:scale-105 hover:bg-blue-700"}
            >
              Post
            </button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create a Post</DialogTitle>
      <DialogDescription className="flex flex-col gap-2">
        <textarea
            className="bg-transparent w-full focus:outline-none resize-none text-xl placeholder-gray-500"
            placeholder="share your thoughts..."
            rows={2}
            value={shareText}
            onChange={(e) => setshareText(e.target.value)}
          />
          <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
          <button
              className={`px-5 py-2 rounded-full font-bold transition-colors duration-200 ${
                isPostButtonDisabled
                  ? 'bg-blue-300 text-white cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
              disabled={isPostButtonDisabled}
            >
              Create
            </button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    );
    };