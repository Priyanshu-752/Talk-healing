'use client';

import React from 'react';
import { IconCalendarMonth } from '@tabler/icons-react';
import { useStores } from '@/models';
import { Images } from '@/public';
import CreatePostModal from '../Modals/CreatePost/CreatePostModal';

export default function ProfileCard() {
  const { userStore } = useStores();
  const loggedInUserData = userStore.loggedInUserData?.user;

  const [opened, setOpened] = React.useState(false);
  const open = () => setOpened(true);
  const close = () => setOpened(false);

  const avatarSrc = loggedInUserData?.avatar || (Images?.default_profile_avatar as any);
  const fullName = loggedInUserData?.full_name || 'Guest User';
  const email = loggedInUserData?.email || 'guest@example.com';

  const lastActive = (() => {
    try {
      return loggedInUserData?.last_login
        ? new Date(loggedInUserData.last_login).toLocaleString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          })
        : 'Unknown';
    } catch {
      return 'Unknown';
    }
  })();

  const following = loggedInUserData?.following ?? 0;
  const followers = loggedInUserData?.followers ?? 0;
  const posts = loggedInUserData?.posts ?? 5;

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-md border px-6 py-5 space-y-4">
      {/* Header (settings button removed) */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src={avatarSrc as any}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <h2 className="text-xl font-bold">{fullName}</h2>
        </div>
      </div>

      {/* Email */}
      <p className="text-sm text-gray-500">{email}</p>

      {/* Last Active */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <IconCalendarMonth size={18} />
        <span>Last Active {lastActive}</span>
      </div>

      {/* Stats */}
      <div className="flex justify-between text-sm font-medium text-gray-700 border rounded-xl px-4 py-2">
        <div>
          <strong>{following}</strong> Following
        </div>
        <div>
          <strong>{followers}</strong> Followers
        </div>
        <div>
          <strong>{posts}</strong> Posts
        </div>
      </div>

      {/* Create Post */}
      <button
        type="button"
        onClick={open}
        className="w-full bg-green-500 text-white rounded-xl py-2.5 font-semibold hover:bg-green-600"
      >
        Create Post
      </button>

      {/* Modal controlled by React state */}
      <CreatePostModal opened={opened} onClose={close} calledAt="feeds" />
    </div>
  );
}
