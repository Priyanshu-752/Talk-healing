import React, { useState, useEffect } from 'react';
import { BsImage, BsEmojiSmile } from 'react-icons/bs';
import { BiPoll } from 'react-icons/bi';
import { X } from 'lucide-react';
import { useStores } from '@/models';

const CreatePost: React.FC<{
  onPostSuccess?: () => void;
  calledAt?: string;
}> = ({ onPostSuccess, calledAt = 'feeds' }) => {
  const { communityStore } = useStores();
  const [shareText, setShareText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Public');
  const [isPosting, setIsPosting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [forumMediaData, setForumMediaData] = useState<File | null>(null);
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState<string | null>(null);

  const isPostButtonDisabled = shareText.trim().length === 0 || isPosting;
  const categories = ['Public', 'Private'];

  const postTypeDecider = (placeCalledFrom: string) =>
    placeCalledFrom === 'community' ? 'Community Post' : 'Individual Post';

  const postContent = async () => {
    const attachedContentData = {
      content: shareText,
      post_type: postTypeDecider(calledAt),
      community: null, // No selection, post as individual or handle as required
    };
    console.log('Posting content:', attachedContentData);
    
    const result = await communityStore.postInCommunityContent(attachedContentData);
    console.log('Post content result:', result);
    console.log('Post data from store:', communityStore.postInCommunityData);
    
    if (!communityStore.postInCommunityData?.id) {
      throw new Error('Failed to create post - no ID returned');
    }
    
    return communityStore.postInCommunityData.id as string;
  };

  const createMediaFormData = (postedContentId: string) => {
    const mediaData = new FormData();
    mediaData.append('community_post', postedContentId);
    if (forumMediaData) {
      if (forumMediaData.type.startsWith('image/')) {
        mediaData.append('image', forumMediaData);
      } else {
        mediaData.append('media', forumMediaData);
      }
    }
    return mediaData;
  };

  const postMedia = async (mediaForm: FormData) => {
    console.log('Calling postMedia API...');
    console.log('FormData entries:');
    for (let [key, value] of mediaForm.entries()) {
      console.log(`${key}:`, value);
    }
    
    const result = await communityStore.createPostInCommunityMedia(mediaForm);
    console.log('Media upload result:', result);
    console.log('Media data from store:', communityStore.postInCommunityMedia);
    
    return result;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        setMessage('File size must be less than 10MB');
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];
      if (!allowedTypes.includes(file.type)) {
        setMessage('Please select a valid image (JPEG, PNG, GIF, WebP) or video (MP4, WebM) file');
        return;
      }

      setForumMediaData(file);
      if (file.type.startsWith('image/')) {
        setMediaPreviewUrl(URL.createObjectURL(file));
      } else {
        // For video files, create a preview
        setMediaPreviewUrl(URL.createObjectURL(file));
      }
    }
  };

  const removeMedia = () => {
    setForumMediaData(null);
    if (mediaPreviewUrl) {
      URL.revokeObjectURL(mediaPreviewUrl);
      setMediaPreviewUrl(null);
    }
    // Reset the file input
    const fileInput = document.getElementById('media-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  useEffect(() => {
    return () => {
      if (mediaPreviewUrl) {
        URL.revokeObjectURL(mediaPreviewUrl);
      }
    };
  }, [mediaPreviewUrl]);

  async function handlePost() {
    setIsPosting(true);
    setMessage(null);
    try {
      console.log('Starting post creation...');
      console.log('Has media data:', !!forumMediaData);
      console.log('Media file:', forumMediaData);
      
      const communityContentId = await postContent();
      console.log('Post created with ID:', communityContentId);
      
      if (forumMediaData && communityContentId) {
        console.log('Creating media form data...');
        const mediaFormData = createMediaFormData(communityContentId);
        console.log('Media form data created:', mediaFormData);
        
        const mediaResult = await postMedia(mediaFormData);
        console.log('Media post result:', mediaResult);
      }
      
      setMessage('Successfully posted!');
      setShareText('');
      setSelectedCategory('Public');
      removeMedia(); // Use removeMedia function for proper cleanup
      if (onPostSuccess) onPostSuccess();
    } catch (error) {
      console.error('Error creating post:', error);
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

          {/* Media Preview */}
          {mediaPreviewUrl && (
            <div className="relative inline-block mt-3 mb-3">
              {forumMediaData?.type.startsWith('image/') ? (
                <img
                  src={mediaPreviewUrl}
                  alt="Media preview"
                  className="max-w-full max-h-64 rounded-lg border object-cover"
                />
              ) : (
                <video
                  src={mediaPreviewUrl}
                  controls
                  className="max-w-full max-h-64 rounded-lg border"
                >
                  Your browser does not support video playback.
                </video>
              )}
              <button
                onClick={removeMedia}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-lg"
                disabled={isPosting}
                type="button"
                title="Remove media"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="border-t border-gray-200 my-5"></div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-1 text-blue-500">
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp,video/mp4,video/webm"
                onChange={handleFileChange}
                className="hidden"
                id="media-upload"
                disabled={isPosting}
              />
              <label htmlFor="media-upload">
                <button 
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
                  disabled={isPosting}
                  onClick={() => document.getElementById('media-upload')?.click()}
                >
                  <BsImage size={20} />
                </button>
              </label>
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
