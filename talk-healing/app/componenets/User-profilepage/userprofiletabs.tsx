'use client';

import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStores } from '@/models';
import CommentCard from "./commentcard";
import UserPost from "./userpost";
import { FiCalendar, FiFilter, FiTrendingUp } from 'react-icons/fi';
import { IoStatsChart, IoChatbubble, IoBookmark, IoDocument } from 'react-icons/io5';

interface ActivityStats {
  totalPosts: number;
  totalComments: number;
  totalSaves: number;
  lastActivityDate: string | null;
}

const UserProfileActivityTab: React.FC = observer(() => {
  const { homeStore, communityStore, userStore } = useStores();
  const [stats, setStats] = useState<ActivityStats>({
    totalPosts: 0,
    totalComments: 0,
    totalSaves: 0,
    lastActivityDate: null
  });
  const [filterPeriod, setFilterPeriod] = useState<'all' | '7days' | '30days'>('all');
  const [isLoading, setIsLoading] = useState(true);

  const loggedInUser = userStore.loggedInUserData?.user;
  const loggedInUserId = loggedInUser?.id;

  useEffect(() => {
    const fetchActivityStats = async () => {
      if (!loggedInUserId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        
        // Fetch data for stats calculation
        await Promise.all([
          homeStore.getPostInIdHomeData(),
          communityStore.getCommentsFeed()
        ]);

        // Calculate stats
        const allPosts = homeStore.postInIdHomeData?.results || [];
        const userPosts = allPosts.filter(post => 
          post.creator?.id === loggedInUserId || post.author === loggedInUserId
        );

        const allComments = communityStore.feedComments?.results || [];
        const userComments = allComments.filter(comment => {
          if (typeof comment.user === 'string') {
            return comment.user === loggedInUserId;
          } else if (comment.user && typeof comment.user === 'object') {
            return comment.user.id === loggedInUserId;
          }
          return false;
        });

        // Find last activity date
        const allActivities = [
          ...userPosts.map(p => ({ date: p.created_on, type: 'post' })),
          ...userComments.map(c => ({ date: c.created_on, type: 'comment' }))
        ].filter(a => a.date);

        const sortedActivities = allActivities.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setStats({
          totalPosts: userPosts.length,
          totalComments: userComments.length,
          totalSaves: 0, // TODO: Implement saves count
          lastActivityDate: sortedActivities.length > 0 ? sortedActivities[0].date : null
        });
      } catch (error) {
        console.error('Error fetching activity stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivityStats();
  }, [homeStore, communityStore, loggedInUserId]);

  const getFilteredPeriodText = () => {
    switch (filterPeriod) {
      case '7days': return 'Last 7 days';
      case '30days': return 'Last 30 days';
      default: return 'All time';
    }
  };

  const ActivityStatsCard = () => (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-6 border border-blue-100 dark:border-blue-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <IoStatsChart className="text-blue-600 dark:text-blue-400" size={20} />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Activity Overview</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FiCalendar size={14} />
          <span>{getFilteredPeriodText()}</span>
        </div>
      </div>
      
      {isLoading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex-1"></div>
          <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex-1"></div>
          <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex-1"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 md:p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 md:p-2 rounded-lg">
                <IoDocument className="text-blue-600 dark:text-blue-400" size={16} />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{stats.totalPosts}</p>
                <p className="text-xs md:text-sm text-gray-500">Posts</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 md:p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="bg-green-100 dark:bg-green-900/30 p-1.5 md:p-2 rounded-lg">
                <IoChatbubble className="text-green-600 dark:text-green-400" size={16} />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{stats.totalComments}</p>
                <p className="text-xs md:text-sm text-gray-500">Comments</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 md:p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-1.5 md:p-2 rounded-lg">
                <IoBookmark className="text-purple-600 dark:text-purple-400" size={16} />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSaves}</p>
                <p className="text-xs md:text-sm text-gray-500">Saves</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {stats.lastActivityDate && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <FiTrendingUp size={14} />
            <span>Last activity: {new Date(stats.lastActivityDate).toLocaleDateString()}</span>
          </div>
        </div>
      )}
    </div>
  );

  const FilterControls = () => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex items-center gap-2">
        <FiFilter className="text-gray-600 dark:text-gray-400" size={16} />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by:</span>
      </div>
      <div className="flex gap-1 sm:gap-2 w-full sm:w-auto">
        {(['all', '7days', '30days'] as const).map((period) => (
          <button
            key={period}
            onClick={() => setFilterPeriod(period)}
            className={`flex-1 sm:flex-none px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-md transition-colors ${
              filterPeriod === period
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            {period === 'all' ? 'All Time' : period === '7days' ? '7 Days' : '30 Days'}
          </button>
        ))}
      </div>
    </div>
  );

  const SavedPostsTab = () => (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-6">
      <div className="text-gray-500 text-center py-8">
        <div className="text-4xl mb-2">🔖</div>
        <p className="font-medium text-gray-900 dark:text-white">Saved Posts</p>
        <p className="text-sm mt-1 text-gray-500">Your bookmarked posts will appear here.</p>
        <p className="text-xs mt-2 text-gray-400">Feature coming soon - Save posts to view them later!</p>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-full">
      <ActivityStatsCard />
      <FilterControls />
      
      <Tabs defaultValue="Posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3 gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg mb-6">
          <TabsTrigger 
            value="Posts" 
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
          >
            <IoDocument size={16} />
            <span className="hidden sm:inline">Posts</span>
            <span className="sm:hidden">Posts</span>
            {stats.totalPosts > 0 && (
              <span className="bg-blue-100 text-blue-600 text-xs px-1.5 py-0.5 rounded-full ml-1">
                {stats.totalPosts}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="Comments"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm"
          >
            <IoChatbubble size={16} />
            <span className="hidden sm:inline">Comments</span>
            <span className="sm:hidden">Comments</span>
            {stats.totalComments > 0 && (
              <span className="bg-green-100 text-green-600 text-xs px-1.5 py-0.5 rounded-full ml-1">
                {stats.totalComments}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="Saves"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm"
          >
            <IoBookmark size={16} />
            <span className="hidden sm:inline">Saves</span>
            <span className="sm:hidden">Saves</span>
            {stats.totalSaves > 0 && (
              <span className="bg-purple-100 text-purple-600 text-xs px-1.5 py-0.5 rounded-full ml-1">
                {stats.totalSaves}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Posts" className="mt-0">
          <UserPost showHeader={false} />
        </TabsContent>
        
        <TabsContent value="Comments" className="mt-0">
          <CommentCard showHeader={false} />
        </TabsContent>
        
        <TabsContent value="Saves" className="mt-0">
          <SavedPostsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
});

export default UserProfileActivityTab;