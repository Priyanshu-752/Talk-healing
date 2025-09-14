'use client';

import React from 'react';
import { observer } from 'mobx-react-lite';
import UserPost from './userpost';
import CommentCard from './commentcard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UserCompleteActivityCardProps {
  className?: string;
  maxItems?: number; // Max items per category
}

const UserCompleteActivityCard: React.FC<UserCompleteActivityCardProps> = observer(({ 
  className = "",
  maxItems = 3
}) => {
  return (
    <div className={`user-complete-activity-card ${className}`}>
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-4">
        <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
          Your Activity
        </h2>
        
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts">Recent Posts</TabsTrigger>
            <TabsTrigger value="comments">Recent Comments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="mt-4">
            <UserPost 
              maxPosts={maxItems} 
              showHeader={false}
            />
          </TabsContent>
          
          <TabsContent value="comments" className="mt-4">
            <CommentCard 
              maxComments={maxItems} 
              showHeader={false}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
});

export default UserCompleteActivityCard;