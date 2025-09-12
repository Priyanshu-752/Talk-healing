import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Loader2, Image, X } from "lucide-react";

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/models';

interface CreatePostModalProps {
  opened: boolean;
  onClose: () => void;
  calledAt: string;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  opened,
  onClose,
  calledAt,
}) => {
  const { communityStore } = useStores();

  const [shareText, setShareText] = useState('');
  const [forumMediaData, setForumMediaData] = useState<File | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const isPostButtonDisabled = shareText.trim().length === 0 || isCreatingPost;

  const postTypeDecider = (placeCalledFrom: string) =>
    placeCalledFrom === 'community' ? 'Community Post' : 'Individual Post';

  const postContent = async () => {
    const attachedContentData = {
      content: shareText,
      post_type: postTypeDecider(calledAt),
      community: null, // No selection, post as individual or handle as required
    };
    await communityStore.postInCommunityContent(attachedContentData);
    return communityStore.postInCommunityData?.id as string;
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
    await communityStore.createPostInCommunityMedia(mediaForm);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        alert('File size must be less than 10MB');
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image (JPEG, PNG, GIF, WebP) or video (MP4, WebM) file');
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

  const handleCreatePost = async () => {
    setIsCreatingPost(true);
    setErrorMessage('');
    try {
      const communityContentId = await postContent();
      if (forumMediaData) {
        const mediaFormData = createMediaFormData(communityContentId);
        await postMedia(mediaFormData);
      }
      setShareText('');
      setForumMediaData(null);
      setMediaPreviewUrl(null);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error creating post:', error);
      setErrorMessage('Failed to create post. Please try again.');
    } finally {
      setIsCreatingPost(false);
    }
  };

  useEffect(() => {
    return () => {
      if (mediaPreviewUrl) {
        URL.revokeObjectURL(mediaPreviewUrl);
      }
    };
  }, [mediaPreviewUrl]);

  return (
    <Dialog open={opened} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a Post</DialogTitle>
          <DialogDescription>
            Share your thoughts.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}
          <textarea
            className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base placeholder-gray-500"
            placeholder="What's happening?!"
            rows={4}
            value={shareText}
            onChange={(e) => setShareText(e.target.value)}
            disabled={isCreatingPost}
          />
          {/* Media Preview */}
          {mediaPreviewUrl && (
            <div className="relative inline-block">
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
                disabled={isCreatingPost}
                type="button"
                title="Remove media"
              >
                <X size={16} />
              </button>
            </div>
          )}
          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp,video/mp4,video/webm"
                onChange={handleFileChange}
                className="hidden"
                id="media-upload"
                disabled={isCreatingPost}
              />
              <button
                type="button"
                onClick={() => document.getElementById('media-upload')?.click()}
                className="inline-flex items-center px-3 py-2 border border-blue-200 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                disabled={isCreatingPost}
                title="Upload image or video"
              >
                <Image size={18} className="mr-1" />
                {forumMediaData ? 'Change Media' : 'Add Media'}
              </button>
            </div>
            <Button
              onClick={handleCreatePost}
              disabled={isPostButtonDisabled}
              className="px-6 bg-blue-600 hover:bg-blue-700"
            >
              {isCreatingPost ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Post'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default observer(CreatePostModal);
