'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/app/componenets/Header/Header';
import CommunityCards from '@/app/componenets/communitycards/communitycards';
import CreateCommunityModal from '@/app/componenets/Modals/CreateCommunity/CreateCommunityModal';
import CreatePostModal from '@/app/componenets/Modals/CreatePost/CreatePostModal';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/models';
import { Images } from '@/public';

const CommunityPage = observer(() => {
  const { communityStore } = useStores();
  const [showModal, setShowModal] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    communityStore.getCommunity();
  }, [communityStore]);

  const filteredData = communityStore.communityData?.results.filter((card) => {
    const filterCardString = [card.community_name].join(' ').toLowerCase();
    return filterCardString.includes(searchText.toLowerCase());
  }) || [];

  const handleCommunityCreated = () => {
    communityStore.getCommunity();
    setShowModal(false);
  };

  const handleCreatePost = (communityId: string) => {
    setSelectedCommunityId(communityId);
    setShowCreatePostModal(true);
  };

  const handlePostSuccess = () => {
    // Refresh communities data if needed
    communityStore.getCommunity();
    setShowCreatePostModal(false);
    setSelectedCommunityId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-6 md:px-8 pt-[110px] pb-8 space-y-7">
          {/* Search and Create Button Row */}
          <div className="bg-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 rounded-lg shadow-md p-4">
            <input
              className="w-full sm:w-80 px-4 py-2 rounded-full border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              placeholder="Search community..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white rounded-full px-6 py-2 font-medium shadow hover:bg-blue-600 transition"
              onClick={() => setShowModal(true)}
            >
              Create community
            </button>
          </div>

          {/* Community Cards Grid */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredData.length === 0 ? (
                <div className="col-span-full text-center py-10 text-gray-400">No communities found.</div>
              ) : (
                filteredData.map((community) => (
                  <CommunityCards
                    key={community.id}
                    communityId={community.id}
                    title={community.community_name}
                    image={community.community_img || Images.communityCardImage}
                    members={community.member} // can be string or array
                    creatorId={community.author || undefined}
                    onCreatePost={handleCreatePost}
                    // showButtons={true} // uncomment if you want to force 'Join' etc.
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal - pass callback for after create */}
      {showModal && (
        <CreateCommunityModal
          opened={showModal}
          onClose={() => setShowModal(false)}
          onCommunityCreated={handleCommunityCreated}
        />
      )}

      {/* CreatePost Modal */}
      {showCreatePostModal && selectedCommunityId && (
        <CreatePostModal
          opened={showCreatePostModal}
          onClose={() => {
            setShowCreatePostModal(false);
            setSelectedCommunityId(null);
          }}
          communityId={selectedCommunityId}
          onPostSuccess={handlePostSuccess}
        />
      )}
    </div>
  );
});

export default CommunityPage;
