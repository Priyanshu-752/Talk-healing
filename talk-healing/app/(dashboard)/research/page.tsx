'use client';

import React from 'react';
import TopicsCard from '@/app/componenets/topics'; 
import Header from '@/app/componenets/Header';
import TopicsMobile from '@/app/componenets/topicsmobile';
import ResearchCard from '@/app/componenets/researchcard';

export default function ResearchPage({ }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Fixed at top */}
      <Header />
      
      {/* Main content wrapper - Fixed height with flex */}
      <div className="flex flex-1 h-screen pt-[140px] md:pt-[89px] overflow-hidden">
        <div className="w-full md:hidden block md:w-64 lg:w-80 px-4 flex-shrink-0 absolute top-[100px] left-0 right-0 h-auto z-10 bg-gray-50">
                  <TopicsMobile />
                </div> 
                <div className="w-full md:block hidden md:w-64 lg:w-90 px-8 flex-shrink-0 fixed top-[110px] left-0 h-[calc(100vh-110px)] overflow-y-auto  z-10">
                  <TopicsCard />
                </div>

                {/* Main Content - Scrollable with proper margins */}
        <div className="flex-1 px-4 py-6 md:pt[90px] md:px-8 md:py-6 md:ml-94 lg:ml-80 md:mr-64 lg:mr-0 overflow-y-auto space-y-7 scrollbar-none">
          <div className="bg-white rounded-2xl shadow-md p-3 flex flex-row gap-152">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Latest Research</h2>
            <input
              className="w-full sm:w-80 px-4 py-2 rounded-full border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              placeholder="Search research..."
            />
          </div>
          <ResearchCard/>
          <ResearchCard/>
          <ResearchCard/>
          <ResearchCard/>

      </div>
      </div>
      </div>
  );
};