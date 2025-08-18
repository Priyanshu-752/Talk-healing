import React from 'react';
import { Button } from '@/components/ui/button';
import { Images } from '@/public';
import Link from 'next/link';

export default function CommunityCards({
  title = "Community",
  image = Images.communityCardImage,
  members = "1000+",
  showButtons = true,
}) {
  // Robustly detect MST array, normal array, or fallback
  const memberCount = (() => {
    if (Array.isArray(members)) return members.length;
    if (typeof members === 'object' && members !== null && 'length' in members) return members.length;
    if (typeof members === 'string' && /^\d+$/.test(members)) return parseInt(members, 10);
    return 0;
  })();
  const memberDisplay = `${memberCount} Members`;

  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl font-sans hover:shadow-lg transition">
      <div className="p-4">
        <Link href="/communityhome" className="block">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <img
              src={image}
              alt={`${title} card`}
              className="w-full object-cover h-40"
            />
          </div>

          {/* Title */}
          <div className="text-center text-xl font-bold text-black dark:text-white pt-4">
            {title}
          </div>

          {/* Buttons and members */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-4">
            {showButtons && (
              <>
                {/* Optionally add future buttons */}
              </>
            )}
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {memberDisplay}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
