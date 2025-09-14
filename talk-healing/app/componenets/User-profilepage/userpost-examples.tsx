/**
 * UserPost Component Usage Examples
 * 
 * This file demonstrates various ways to use the UserPost component
 * for displaying logged-in user's posts in different contexts.
 */

import React from 'react';
import UserPost from './userpost';
import UserActivityCard from './useractivitycard';

// 1. Full User Posts Display (for dedicated user profile page)
export const FullUserPostsExample = () => (
  <div className="max-w-2xl mx-auto">
    <UserPost 
      showHeader={true}
      // No maxPosts limit - shows all user posts
    />
  </div>
);

// 2. Limited Posts Display (for dashboard widgets)
export const DashboardWidgetExample = () => (
  <div className="max-w-md">
    <UserPost 
      maxPosts={3}
      showHeader={true}
    />
  </div>
);

// 3. Compact Activity Card (for sidebar or profile summary)
export const ActivityCardExample = () => (
  <div className="max-w-sm">
    <UserActivityCard className="shadow-lg" />
  </div>
);

// 4. Tab Content (no header, for use within tabs)
export const TabContentExample = () => (
  <div>
    <UserPost 
      showHeader={false}
      maxPosts={5}
    />
  </div>
);

// 5. Recent Activity Widget (for home page)
export const RecentActivityExample = () => (
  <div className="bg-white rounded-lg shadow p-4">
    <h3 className="text-lg font-semibold mb-4">Your Recent Activity</h3>
    <UserPost 
      maxPosts={2}
      showHeader={false}
    />
  </div>
);

/**
 * Component Features:
 * 
 * 1. Automatic User Filtering: Only shows posts from the logged-in user
 * 2. Loading States: Shows skeleton loading while fetching data
 * 3. Error Handling: Displays appropriate error messages
 * 4. Empty States: Shows helpful message when user has no posts
 * 5. Responsive Design: Adapts to different screen sizes
 * 6. Media Support: Displays images and media from posts
 * 7. Action Integration: Includes ActionBar for likes, comments, shares
 * 8. Navigation: Links to detailed post view
 * 9. Flexible Display: Configurable header and post limits
 * 10. Dark Mode: Supports dark/light theme switching
 * 
 * Props:
 * - maxPosts?: number - Limit number of posts displayed
 * - showHeader?: boolean - Whether to show the "Your Posts" header
 * 
 * Data Sources:
 * - Uses homeStore.postInIdHomeData to get all posts
 * - Filters by logged-in user ID from userStore.loggedInUserData
 * - Matches posts by creator.id, author, or user fields
 * 
 * Styling:
 * - Consistent with existing postcard styling
 * - Responsive design with Tailwind CSS
 * - Dark mode support
 * - Hover effects and transitions
 */