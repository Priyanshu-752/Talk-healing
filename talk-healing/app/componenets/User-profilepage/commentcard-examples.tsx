/**
 * CommentCard Component Usage Examples
 * 
 * This file demonstrates various ways to use the CommentCard component
 * for displaying logged-in user's comments in different contexts.
 */

import React from 'react';
import CommentCard from './commentcard';
import UserCompleteActivityCard from './usercompletactivitycard';

// 1. Full User Comments Display (for dedicated user profile page)
export const FullUserCommentsExample = () => (
  <div className="max-w-2xl mx-auto">
    <CommentCard 
      showHeader={true}
      // No maxComments limit - shows all user comments
    />
  </div>
);

// 2. Limited Comments Display (for dashboard widgets)
export const DashboardCommentsWidgetExample = () => (
  <div className="max-w-md">
    <CommentCard 
      maxComments={5}
      showHeader={true}
    />
  </div>
);

// 3. Tab Content (no header, for use within tabs)
export const TabCommentsContentExample = () => (
  <div>
    <CommentCard 
      showHeader={false}
      maxComments={10}
    />
  </div>
);

// 4. Recent Comments Widget (for sidebar)
export const RecentCommentsExample = () => (
  <div className="bg-white rounded-lg shadow p-4">
    <h3 className="text-lg font-semibold mb-4">Your Recent Comments</h3>
    <CommentCard 
      maxComments={3}
      showHeader={false}
    />
  </div>
);

// 5. Complete Activity Card (posts + comments)
export const CompleteActivityExample = () => (
  <div className="max-w-lg">
    <UserCompleteActivityCard 
      maxItems={3}
      className="shadow-lg"
    />
  </div>
);

/**
 * CommentCard Component Features:
 * 
 * 1. Automatic User Filtering: Only shows comments from the logged-in user
 * 2. Loading States: Shows skeleton loading while fetching data
 * 3. Error Handling: Displays appropriate error messages
 * 4. Empty States: Shows helpful message when user has no comments
 * 5. Responsive Design: Adapts to different screen sizes
 * 6. Comment Context: Links back to original posts
 * 7. Action Integration: Includes reply and like buttons
 * 8. Flexible Display: Configurable header and comment limits
 * 9. Dark Mode: Supports dark/light theme switching
 * 10. User Detection: Handles both string and object user references
 * 
 * Props:
 * - maxComments?: number - Limit number of comments displayed
 * - showHeader?: boolean - Whether to show the "Your Comments" header
 * 
 * Data Sources:
 * - Uses communityStore.feedComments to get all comments
 * - Filters by logged-in user ID from userStore.loggedInUserData
 * - Matches comments by user field (string or object)
 * 
 * API Integration:
 * - Calls communityStore.getCommentsFeed() to fetch comments
 * - Uses community/comment/ endpoint
 * - Supports pagination for large comment lists
 * 
 * Schema Structure:
 * - Comment includes: id, content, community_post, user
 * - User can be string (user ID) or object (user details)
 * - Links to original posts via community_post field
 * 
 * Styling:
 * - Consistent with existing comment styling in post-comment.tsx
 * - Responsive design with Tailwind CSS
 * - Dark mode support
 * - Hover effects and transitions
 * - Comment bubble styling for content
 */