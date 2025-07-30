'use client'

import React from 'react';
import Header from '@/app/componenets/Header';
import AboutUserCard from '@/app/componenets/postdetailcomponents/aboutusercard';
import PostCard from '@/app/componenets/postcard';
import RelatedPostCard from '@/app/componenets/relatedpost';


export default function PostDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col ">
        {/* Header - Fixed at top */}
      <Header />

      {/* main contetent */}
      <div className='flex flex-1 h-screen -[140px] md:pt-[70px] overflow-hidden'>

        {/* left sidebar - fixed position */}
        <div className='w-full md:w-64 lg:w-90 px-8 flex-shrink-0 fixed top-[110px] left-0 h--[calc(100vh-110px)] overflow-y-auto z-10 '>
            <AboutUserCard/>
        </div>
      </div>
       <div className='flex-1 px-4 py-6 md:pt[110px] md:px-8 md:py-6 md:ml-64 lg:ml-80 md:mr-64 lg:mr-80 overflow-y-auto space-y-7 scrollbar-none'>
        <PostCard/>
       </div>
      
     {/*right sidebar*/}
     <div className='w-full md:w-64 lg:w-80 px-4 flex-shrink-0 fixed top-[110px] right-5 h-[calc(100vh-110px)] overflow-y-auto bg-gray-50 z-10 hidden md:flex md:flex-col gap-7 '>
        <div><RelatedPostCard/></div>
     </div>
    </div>
  );
}
