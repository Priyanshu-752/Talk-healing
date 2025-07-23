import React, { useState } from 'react';
import { BsImage, BsEmojiSmile } from 'react-icons/bs';
import { BiPoll } from 'react-icons/bi';

const CreatePost: React.FC = () => {
  const [shareText, setshareText] = useState('');
  const isPostButtonDisabled = shareText.trim().length === 0;

  return (
    // --- CHANGED: Main container to a light theme ---
    <div className="bg-white text-gray-800 p-4 border border-gray-200 rounded-lg shadow-sm">
      <div className="flex space-x-4">
        {/* Profile Picture (no change) 
        <img
          src="https://via.placeholder.com/150"
          alt="Profile Avatar"
          className="w-12 h-12 rounded-full"
        />*/}
        
        <div className="flex-1">
          {/* Textarea (updated placeholder color) */}
          
          <textarea
            className="bg-transparent w-full focus:outline-none resize-none text-xl placeholder-gray-500"
            placeholder="Share your thoughts..."
            rows={3}
            value={shareText}
            onChange={(e) => setshareText(e.target.value)}
          />

          {/* --- CHANGED: Divider line to a light theme --- */}
          <div className="border-t border-gray-200 my-5"></div>

          <div className="flex justify-between items-center">
            {/* --- CHANGED: Icon group to a light theme --- */}
            <div className="flex space-x-1 text-blue-500">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <BsImage size={20} />
              </button>
              
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <BiPoll size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <BsEmojiSmile size={20} />
              </button>
        
            </div>

            {/* --- CHANGED: Post button to a primary action style --- */}
            <button
              className={`px-5 py-2 rounded-full font-bold transition-colors duration-200 ${
                isPostButtonDisabled
                  ? 'bg-blue-300 text-white cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
              disabled={isPostButtonDisabled}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;