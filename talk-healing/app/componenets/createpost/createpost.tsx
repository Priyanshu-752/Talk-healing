import React, { useState } from 'react';
import { BsImage, BsEmojiSmile } from 'react-icons/bs';
import { BiPoll } from 'react-icons/bi';

const CreatePost: React.FC = () => {
  const [shareText, setshareText] = useState('');
  const isPostButtonDisabled = shareText.trim().length === 0;
  const [selectedCategory, setSelectedCategory] = useState('Public');
  const categories = ['Public', 'Private'];

  return (
    <div className="bg-white text-gray-800 p-4 border border-gray-200 rounded-lg shadow-sm">
      <div className="flex space-x-4">
        {/* Profile Picture placeholder 
        <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>*/}
        
        <div className="flex-1">
          {/* Textarea */}
          <textarea
            className="bg-transparent w-full focus:outline-none resize-none text-xl placeholder-gray-500"
            placeholder="Share your thoughts..."
            rows={3}
            value={shareText}
            onChange={(e) => setshareText(e.target.value)}
          />

          {/* Divider line */}
          <div className="border-t border-gray-200 my-5"></div>

          {/* Section with icons and dropdown */}
          <div className="flex justify-between items-center">
            {/* Icon group */}
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

            {/* Right side with dropdown */}
            <div className="flex items-center">
              {/* Category Dropdown */}
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
            </div>
          </div>

          
          <div className="border-t border-gray-200 my-4"></div>

          {/* Post button  */}
          <div className="flex justify-end">
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