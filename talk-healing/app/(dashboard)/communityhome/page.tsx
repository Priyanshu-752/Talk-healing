'use client';
import React, { useEffect, useState } from "react";
import { observer } from 'mobx-react-lite';
import { useStores } from '@/models';
import Header from "@/app/componenets/Header/Header";
import { Button } from "@/components/ui/button";
import { IconBell } from '@tabler/icons-react';
import AboutCommunityCard from "@/app/componenets/communitycards/aboutcommunitycard";
import PostCard from "@/app/componenets/postcard";
import CreatePostModal from "@/app/componenets/Modals/CreatePost/CreatePostModal";
import { BsImage } from 'react-icons/bs';


const CommunityHomePage = observer(() => {
    const { communityStore } = useStores();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    // Get community ID from URL params or use first available community
    const [communityId, setCommunityId] = useState<string | null>(null);

    const openCreatePostModal = () => setIsCreatePostModalOpen(true);
    const closeCreatePostModal = () => setIsCreatePostModalOpen(false);

    const handlePostSuccess = async () => {
        console.log('Post success callback triggered, starting auto refresh...');
        setIsRefreshing(true);
        
        // Refresh community data after successful post
        try {
            if (communityId) {
                console.log('Refreshing community data after post creation...');
                
                // Refresh multiple data sources to ensure we get the latest posts
                const refreshPromises = [
                    communityStore.getIdSpecificCommunity(communityId),
                    communityStore.getPostInIdCommunityData(),
                    communityStore.getCommunityPostedData(), // Also refresh general community posts
                    communityStore.getCommunity(), // Refresh community list in case counts changed
                ];
                
                // Wait for all refresh operations to complete
                await Promise.allSettled(refreshPromises);
                
                console.log('All community data refreshed successfully');
                console.log('Updated community data:', communityStore.idCommunityData);
                console.log('Updated posts:', communityStore.postInIdCommunityData);
            }
        } catch (error) {
            console.error('Error refreshing community data:', error);
        } finally {
            setIsRefreshing(false);
        }
        
        // Close modal after refresh
        closeCreatePostModal();
        
        // Show success message briefly
        console.log('Auto refresh completed!');
    };

    useEffect(() => {
        const fetchCommunityData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // First, get all communities to find available ones
                console.log('Fetching all communities...');
                await communityStore.getCommunity();
                console.log('Communities fetched:', communityStore.communityData);
                
                const availableCommunities = communityStore.communityData?.results;
                console.log('Available communities:', availableCommunities);
                
                if (availableCommunities && availableCommunities.length > 0) {
                    // Use the first community ID from the list
                    const firstCommunity = availableCommunities[0];
                    const firstCommunityId = firstCommunity.id;
                    console.log('Using community:', firstCommunity);
                    console.log('Community ID:', firstCommunityId);
                    
                    if (firstCommunityId) {
                        setCommunityId(firstCommunityId);
                        
                        // Try to fetch specific community data, but don't fail if it doesn't work
                        try {
                            console.log('Fetching specific community data...');
                            await communityStore.getIdSpecificCommunity(firstCommunityId);
                            console.log('Specific community data:', communityStore.idCommunityData);
                        } catch (specificError) {
                            console.warn('Failed to fetch specific community data:', specificError);
                            // Continue anyway, we'll use the basic community data
                        }
                        
                        // Try to fetch community posts
                        try {
                            console.log('Fetching community posts...');
                            // Instead of general posts, we should fetch posts for this specific community
                            await communityStore.getPostInIdCommunityData(); // This should fetch posts for the specific community
                            console.log('Community posts:', communityStore.postInIdCommunityData);
                        } catch (postsError) {
                            console.warn('Failed to fetch community posts:', postsError);
                            // Continue anyway
                        }
                    } else {
                        setError('No valid community ID found');
                    }
                } else {
                    setError('No communities found in the system');
                }
            } catch (error) {
                console.error('Error fetching community data:', error);
                setError('Failed to load community data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCommunityData();
    }, [communityStore]);

    // Use specific community data if available, otherwise fallback to the first community from the list
    const communityData = communityStore.idCommunityData?.results?.[0] || 
                         (communityStore.communityData?.results?.[0] ? {
                             community_name: communityStore.communityData.results[0].community_name,
                             community_img: communityStore.communityData.results[0].community_img,
                             commmunity_type: 'General',
                             created_on: null,
                             post: [], // Empty posts array as fallback
                             id: communityStore.communityData.results[0].id
                         } : null);
                         
    // Use posts from the specific community data, or fallback to general community posts
    const postsData = communityStore.postInIdCommunityData || communityStore.communityPostedData;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-xl text-gray-600">Loading community...</div>
                </div>
            </div>
        );
    }

    if (error && !communityData) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-xl text-red-600 mb-4">
                            Failed to load community data
                        </div>
                        <div className="text-gray-600 mb-4">
                            Available communities: {communityStore.communityData?.results?.length || 0}
                        </div>
                        <div className="max-w-md mx-auto">
                            {communityStore.communityData?.results?.map((community, index) => (
                                <div key={community.id || index} className="mb-2 p-2 bg-white rounded border text-sm">
                                    <div className="font-medium">{community.community_name}</div>
                                    <div className="text-gray-500">ID: {community.id}</div>
                                </div>
                            ))}
                        </div>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            {/* Main content wrapper */}
            <div className="flex flex-1 pt-[110px]">
                {/* Main content area */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 pb-8 md:pr-2">
                    <div className="w-full">
                        {/* Community header */}
                        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                            <div className="flex  flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    {communityData?.community_name || 'Community'}
                                </h2>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <Button className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:scale-105 hover:bg-green-600 transition-transform">
                                        Join now
                                    </Button>
                                    <button className="p-2 rounded-full hover:bg-gray-200 self-start sm:self-center">
                                        <IconBell className="h-6 w-6 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Create Post Section */}
                        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <div
                                        className="bg-gray-50 w-full focus:outline-none resize-none text-gray-500 cursor-pointer py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                                        onClick={openCreatePostModal}
                                    >
                                        Share your thoughts with {communityData?.community_name || 'the community'}...
                                    </div>
                                    <div className="flex justify-between items-center mt-3">
                                        <div className="flex space-x-1 text-blue-500">
                                            <button 
                                                type="button"
                                                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
                                                onClick={openCreatePostModal}
                                            >
                                                <BsImage size={20} />
                                                <span className="text-sm text-gray-600">Photo/Video</span>
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                                onClick={async () => {
                                                    setIsRefreshing(true);
                                                    try {
                                                        if (communityId) {
                                                            await Promise.allSettled([
                                                                communityStore.getIdSpecificCommunity(communityId),
                                                                communityStore.getPostInIdCommunityData(),
                                                                communityStore.getCommunityPostedData(),
                                                            ]);
                                                        }
                                                    } catch (error) {
                                                        console.error('Manual refresh failed:', error);
                                                    } finally {
                                                        setIsRefreshing(false);
                                                    }
                                                }}
                                                disabled={isRefreshing}
                                                type="button"
                                            >
                                                {isRefreshing ? (
                                                    <div className="flex items-center gap-1">
                                                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600"></div>
                                                        <span>Refreshing</span>
                                                    </div>
                                                ) : (
                                                    '🔄 Refresh'
                                                )}
                                            </button>
                                            <button
                                                className="px-6 py-2 rounded-full font-bold transition-colors duration-200 bg-blue-500 text-white hover:bg-blue-600"
                                                onClick={openCreatePostModal}
                                                type="button"
                                            >
                                                Post
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* AboutCommunityCard shown only on mobile  */}
                        <div className="block md:hidden mb-6">
                            <AboutCommunityCard 
                                communityName={communityData?.community_name || 'Community'}
                                description={`Community Type: ${communityData?.commmunity_type || 'General'}`}
                                memberCount={communityData?.post?.length || 0}
                                communityImage={communityData?.community_img}
                                createdDate={communityData?.created_on ? new Date(communityData.created_on).toLocaleDateString() : undefined}
                                communityType={communityData?.commmunity_type}
                            />
                        </div>

                        {/* Filter and search section */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                {/* Filter buttons */}
                                <div className="flex flex-row gap-4 flex-wrap">
                                    <Button variant="outline" className="rounded-md text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                                        Best
                                    </Button>
                                    <Button variant="outline" className="rounded-md text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                                        Hot
                                    </Button>
                                    <Button variant="outline" className="rounded-md text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                                        New
                                    </Button>
                                    <Button variant="outline" className="rounded-md text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                                        Top
                                    </Button>
                                </div>

                                {/* Search Bar */}
                                <div className="w-full lg:w-80">
                                    <input
                                        className="w-full px-4 py-2 rounded-full border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        type="text"
                                        placeholder="Search community..."
                                    />
                                </div>
                            </div>

                            {/* Posts */}
                            <div className="mt-6 space-y-6">
                                {isRefreshing && (
                                    <div className="text-center py-4">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                            <span>Refreshing posts...</span>
                                        </div>
                                    </div>
                                )}
                                
                                {postsData?.results && postsData.results.length > 0 ? (
                                    postsData.results.map((post, index) => (
                                        <PostCard 
                                            key={post.id || index} 
                                            postData={post} 
                                            showMultiplePosts={false}
                                        />
                                    ))
                                ) : communityData?.post && communityData.post.length > 0 ? (
                                    communityData.post.map((post, index) => (
                                        <PostCard 
                                            key={post.id || index} 
                                            postData={post} 
                                            showMultiplePosts={false}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        {isRefreshing ? 'Loading posts...' : 'No posts available in this community'}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/*  AboutCommunityCard (Desktop only) */}
                <div className="hidden md:flex md:flex-col w-80 lg:w-84 px-4 py-6 bg-gray-50 flex-shrink-0">
                    <div className="w-full md:w-64 lg:w-80 px-4 flex-shrink-0 fixed top-[110px] right-5 h-[calc(100vh-110px)] overflow-y-auto bg-gray-50 z-10 hidden md:flex md:flex-col gap-7">
                        <AboutCommunityCard 
                            communityName={communityData?.community_name || 'Community'}
                            description={`Community Type: ${communityData?.commmunity_type || 'General'}`}
                            memberCount={communityData?.post?.length || 0}
                            communityImage={communityData?.community_img}
                            createdDate={communityData?.created_on ? new Date(communityData.created_on).toLocaleDateString() : undefined}
                            communityType={communityData?.commmunity_type}
                        />
                    </div>
                </div>
            </div>

            {/* Floating bell icon on mobile */}
            <div className="md:hidden fixed bottom-4 right-4 z-50">
                <Button className="rounded-full p-3 bg-blue-500 text-white shadow-lg">
                    <IconBell className="h-5 w-5" />
                </Button>
            </div>

            {/* CreatePost Modal */}
            <CreatePostModal
                opened={isCreatePostModalOpen}
                onClose={closeCreatePostModal}
                calledAt="community"
                communityId={communityId}
                communityName={communityData?.community_name}
                onPostSuccess={handlePostSuccess}
            />
        </div>
    );
});

export default CommunityHomePage;
