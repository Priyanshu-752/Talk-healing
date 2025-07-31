// TrendingCard.tsx
import React from 'react';

interface TrendingTopic {
  id: number;
  hashtag: string;
  postsCount: string;
  category?: string;
  location?: string;
}

interface TrendingCardProps {
  title?: string;
  topics?: TrendingTopic[];
}

const RelatedPostCard: React.FC<TrendingCardProps> = ({ 
  title = "What's happening",
  topics = []
}) => {
  // Default dummy data matching the image
  const defaultTopics: TrendingTopic[] = [
    {
      id: 1,
      hashtag: "Tsunami",
      postsCount: "155K posts",
      category: "News • Trending"
    },
    {
      id: 2,
      hashtag: "Virat", 
      postsCount: "2,089 posts",
      category: "Trending in India"
    },
    {
      id: 3,
      hashtag: "BB27",
      postsCount: "28.1K posts", 
      category: "Trending in India"
    },
    {
      id: 4,
      hashtag: "football",
      postsCount: "2,683 posts",
      category: "Trending"
    }
  ];

  const topicsToShow = topics.length > 0 ? topics : defaultTopics;

  const handleTopicClick = (topic: TrendingTopic) => {
    console.log(`Clicked on ${topic.hashtag}`);
    // Add your navigation/search logic here
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl max-w-sm mx-1 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path d="M10 4a2 2 0 100-4 2 2 0 000 4z"/>
              <path d="M10 20a2 2 0 100-4 2 2 0 000 4z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="divide-y divide-gray-100">
        {topicsToShow.map((topic) => (
          <div
            key={topic.id}
            onClick={() => handleTopicClick(topic)}
            className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                {topic.category && (
                  <p className="text-gray-500 text-sm mb-1">
                    {topic.category}
                  </p>
                )}
                <p className="text-gray-900 font-semibold text-base mb-1 group-hover:underline">
                  #{topic.hashtag}
                </p>
                <p className="text-gray-500 text-sm">
                  {topic.postsCount}
                </p>
              </div>
              <button className="text-gray-400 hover:text-gray-600 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path d="M10 4a2 2 0 100-4 2 2 0 000 4z"/>
                  <path d="M10 20a2 2 0 100-4 2 2 0 000 4z"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show more link
      <div className="px-4 py-3 border-t border-gray-200">
        <button className="text-blue-500 hover:text-blue-600 hover:underline text-base">
          Show more
        </button>
      </div> */}

      {/* Footer links 
      <div className="px-4 py-3 text-xs text-gray-400 space-x-2">
        <span className="hover:text-gray-600 cursor-pointer">Terms of Service</span>
        <span>|</span>
        <span className="hover:text-gray-600 cursor-pointer">Privacy Policy</span>
        <span>|</span>
        <span className="hover:text-gray-600 cursor-pointer">Cookie Policy</span>
      </div>*/}
    </div>
  );
};

export default RelatedPostCard;
