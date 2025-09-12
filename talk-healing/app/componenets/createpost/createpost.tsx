import React, { useState } from 'react';
import { BsImage, BsEmojiSmile } from 'react-icons/bs';
import { BiPoll } from 'react-icons/bi';
import { useStores } from '@/models';

const CreatePost: React.FC<{
  onPostSuccess?: () => void
}> = ({ onPostSuccess }) => {
  const { postStore } = useStores(); // change this to your actual store name!
  const [shareText, setShareText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Public');
  const [isPosting, setIsPosting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const isPostButtonDisabled = shareText.trim().length === 0 || isPosting;
  const categories = ['Public', 'Private'];

  async function handlePost() {
    setIsPosting(true);
    setMessage(null);
    try {
      // MobX store API call, no direct fetch!
      const result = await postStore.createPost({
        content: shareText,
        category: selectedCategory,
      });
      if (result === true) {
        setMessage('Successfully posted!');
        setShareText('');
        setSelectedCategory('Public');
        if (onPostSuccess) onPostSuccess();
      } else {
        setMessage('Error posting!');
      }
    } catch (err: any) {
      setMessage('Error posting!');
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <div className="bg-white text-gray-800 p-4 border border-gray-200 rounded-lg shadow-sm w-full">
      <div className="flex space-x-4">
        <div className="flex-1">
          <textarea
            className="bg-transparent w-full focus:outline-none resize-none text-xl placeholder-gray-500"
            placeholder="Share your thoughts..."
            rows={3}
            value={shareText}
            onChange={(e) => setShareText(e.target.value)}
            disabled={isPosting}
          />

          <div className="border-t border-gray-200 my-5"></div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-1 text-blue-500">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200" disabled>
                <BsImage size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200" disabled>
                <BiPoll size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200" disabled>
                <BsEmojiSmile size={20} />
              </button>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  disabled={isPosting}
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

          {message && (
            <div className="mb-2 text-center text-sm font-bold"
              style={{ color: message.startsWith('Error') ? '#dc2626' : '#16a34a' }}>
              {message}
            </div>
          )}

          <div className="flex justify-end">
            <button
              className={`px-5 py-2 rounded-full font-bold transition-colors duration-200 ${
                isPostButtonDisabled
                  ? 'bg-blue-300 text-white cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
              disabled={isPostButtonDisabled}
              onClick={handlePost}
              type="button"
            >
              {isPosting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
