import React, { useState } from 'react';
import { LuSearch, LuChevronDown } from 'react-icons/lu';

const CommunityExplore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = [ 'none','Diabetes', 'Stroke', 'Cancer', 'Asthma', 'Arthritis'];

  return (
   
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-5">Explore Communities</h2>
      
     
      <div className="flex flex-col gap-4">

       
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <LuSearch size={20} />
          </span>
          <input
            type="text"
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
           
            className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
        </div>

       
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            
            className="w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <LuChevronDown size={20} />
          </span>
        </div>
        <button
  className="px-5 py-2 rounded-full font-bold transition-colors duration-200 bg-blue-500 text-white hover:bg-blue-600"
>
  Find
</button>
      </div>
      {/* Community list  */}
    </div>
  );
}

export default CommunityExplore;