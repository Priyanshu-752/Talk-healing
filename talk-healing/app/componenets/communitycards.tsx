import React from 'react';
import { Button } from '@/components/ui/button';
import { Images } from '@/public';

export default function CommunityCards({
  title = "Community",
  image,
  members = "1000+",
  showButtons = true,
}: {
  title: string;
  image: string;
  members?: string;
  showButtons?: boolean;
}) {
  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl font-sans hover:shadow-lg transition">
      <div className="p-4">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <img src={Images.communityCardImage} alt={`${title} card`} className="w-full object-cover h-40" />
        </div>

        {/* Title */}
        <div className="text-center text-xl font-bold text-black dark:text-white pt-4">
          {title}
        </div>

        {/* Buttons and members */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-4">
          {showButtons && (
            <>
    
              <Button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:scale-105 hover:bg-blue-700">
                Join
              </Button>
            </>
          )}
          <span className="text-sm text-gray-600 dark:text-gray-300">{members} Members</span>
        </div>
      </div>
    </div>
  );
}
