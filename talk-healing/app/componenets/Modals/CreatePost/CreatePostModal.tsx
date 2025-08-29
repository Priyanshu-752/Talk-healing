import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
      setForumMediaData(file);
      if (file.type.startsWith('image/')) {
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
  };

  const handleCreatePost = async () => {
    setIsCreatingPost(true);
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
    } catch {
      // Optionally handle error UI here if desired
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
              <img
                src={mediaPreviewUrl}
                alt="Media preview"
                className="max-w-full max-h-64 rounded-lg border"
              />
              <button
                onClick={removeMedia}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                disabled={isCreatingPost}
                type="button"
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
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
                id="media-upload"
                disabled={isCreatingPost}
              />
              <label htmlFor="media-upload">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                  disabled={isCreatingPost}
                >
                  <Image size={18} />
                </Button>
              </label>
            </div>
            <Button
              onClick={handleCreatePost}
              disabled={isPostButtonDisabled}
              className="px-6"
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
