'use client';
import React from "react";
import Header from "@/app/componenets/Header";
import { Button } from "@/components/ui/button";
import { IconBell } from '@tabler/icons-react';
import AboutCommunityCard from "@/app/componenets/aboutcommunitycard";
import PostCard from "@/app/componenets/postcard";
import PostCard2 from "@/app/componenets/postcard2";

export default function CommunityHomePage() {
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
                                <h2 className="text-2xl font-semibold text-gray-900">Asthma</h2>
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

                        {/* ✅ AboutCommunityCard shown only on mobile below header */}
                        <div className="block md:hidden mb-6">
                            <AboutCommunityCard />
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
                                <PostCard />
                                <PostCard />
                                <PostCard2 />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar - AboutCommunityCard (Desktop only) */}
                <div className="hidden md:flex md:flex-col w-80 lg:w-84 px-4 py-6 bg-gray-50 flex-shrink-0">
                    <div className="w-full md:w-64 lg:w-80 px-4 flex-shrink-0 fixed top-[110px] right-5 h-[calc(100vh-110px)] overflow-y-auto bg-gray-50 z-10 hidden md:flex md:flex-col gap-7">
                        <AboutCommunityCard />
                    </div>
                </div>
            </div>

            {/* Floating bell icon on mobile */}
            <div className="md:hidden fixed bottom-4 right-4 z-50">
                <Button className="rounded-full p-3 bg-blue-500 text-white shadow-lg">
                    <IconBell className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}
