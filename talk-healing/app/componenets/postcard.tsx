import { FiMoreHorizontal } from "react-icons/fi";
import Link from "next/link";
import ActionBar from "./actionbar/actionbar";
import React, { useEffect, useState } from "react";
import { useStores } from "@/models";
import { Images } from "@/public";

export default function PostCard() {
  const { homeStore } = useStores();
  const [loading, setLoading] = useState(true);

  // Fetch posts on load
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await homeStore.getPostInIdHomeData();
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [homeStore]);

  const posts = homeStore.postInIdHomeData?.results || [];

  if (loading) {
    return <div className="p-4 text-center text-gray-500">Loading posts...</div>;
  }

  if (posts.length === 0) {
    return <div className="p-4 text-center text-gray-500">No posts yet.</div>;
  }

  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl max-w mx-auto my-4 font-sans">
      {posts.map((post, index) => (
        <React.Fragment key={post.id || index}>
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <img
                  src={post.creator?.avatar || Images.userProfileImage}
                  alt="profile"
                  className="w-12 h-12 rounded-full"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = Images.userProfileImage;
                  }}
                />
                <div>
                  <p className="font-bold text-black dark:text-white">
                    {post.creator?.full_name || "Unknown User"}
                  </p>
                  <p className="text-gray-500">
                    @{post.creator?.id || post.author || "unknown"}
                  </p>
                  <p className="text-xs text-gray-400">{post.created_on}</p>
                </div>
              </div>
              <button className="text-gray-500 hover:bg-blue-100 dark:hover:bg-gray-800 rounded-full p-2">
                <FiMoreHorizontal size={20} />
              </button>
            </div>

            {post.title && (
              <div className="mt-2 text-black dark:text-white font-semibold">{post.title}</div>
            )}
            {post.content && (
              <div className="mt-1 text-black dark:text-white">{post.content}</div>
            )}

            {/* Post media/images */}
            {(post.image || (post.media && post.media.length > 0)) && (
              <Link href={`/postdetailpage/${post.id}`} className="block">
                <div className="mt-4 flex justify-center">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden max-w-full">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title || "post"}
                        className="rounded-2xl max-h-[650px] object-cover w-full"
                      />
                    ) : post.media && post.media.length > 0 && (post.media[0].image || post.media[0].media) && (
                      <img
                        src={post.media[0].image || post.media[0].media || ""}
                        alt={post.title || "post"}
                        className="rounded-2xl max-h-[650px] object-cover w-full"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                </div>
              </Link>
            )}

            <div className="border-t border-gray-200 my-4"></div>
            <ActionBar />
          </div>
          {index < posts.length - 1 && <div className="border-t border-gray-200 my-4"></div>}
        </React.Fragment>
      ))}
    </div>
  );
}
