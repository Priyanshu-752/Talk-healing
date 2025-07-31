'use client';
import React from 'react';
import { FaRegCalendarAlt } from "react-icons/fa";
import { Button } from '@/components/ui/button';

const EyeOpenIcon = () => (
  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

export default function ResearchCard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4 w-full">
      <h3 className="text-xl font-semibold text-gray-800">Genes diversity curing Cancer</h3>
      <p className="text-gray-600">
        Coronary Artery Disease was very frightening and a life-threating experience for me.
      </p>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
        {/* Left section */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="flex items-center gap-2 bg-green-500 text-white rounded-lg font-medium hover:scale-105 hover:bg-green-600">
            <EyeOpenIcon />
            Bryce Walker
          </Button>
          <Button className="flex items-center gap-2 bg-green-500 text-white rounded-lg font-medium hover:scale-105 hover:bg-green-600">
            <FaRegCalendarAlt className="mr-1" />
            Sep 2021
          </Button>
        </div>

        {/* Right button */}
        <Button className="bg-blue-600 text-white rounded-lg font-medium hover:scale-105 hover:bg-blue-700">
          Read More
        </Button>
      </div>
    </div>
  );
}
