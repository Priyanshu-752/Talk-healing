import { FiMoreHorizontal } from "react-icons/fi";
import { Images } from "@/public";
import Link from "next/link";
import ActionBar from "./actionbar/actionbar";
import React, { useEffect, useState } from "react";
import { useStores } from "@/models"; // ✅ MobX root store

export default function PostCard() {
  const { homeStore } = useStores(); // ✅ store with Swagger API methods
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await homeStore.getPostInIdHomeData(); // ✅ MobX action (calls Swagger endpoint)
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [homeStore]);

  if (loading) {
    return <div className="p-4 text-center text-gray-500">Loading posts...</div>;
  }

  // ✅ posts come directly from the store
  const posts = homeStore.postInIdHomeData?.results || [];

  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl max-w mx-auto my-4 font-sans">
      {posts.map((post, index) => (
        <React.Fragment key={post.id || index}>
          <div className="p-4">
            {/* User info */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.user?.profileImage || Images.userProfileImage}
                  alt="profile"
                  className="w-12 h-12 rounded-full"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = Images.userProfileImage;
                  }}
                />
                <div>
                  <p className="font-bold text-black dark:text-white">
                    {post.user?.name || "Unknown User"}
                  </p>
                  <p className="text-gray-500">{post.user?.username || "@unknown"}</p>
                  <p className="text-xs text-gray-400">{post.createdAt}</p>
                </div>
              </div>
              <button className="text-gray-500 hover:bg-blue-100 dark:hover:bg-gray-800 rounded-full p-2">
                <FiMoreHorizontal size={20} />
              </button>
            </div>

            {/* Caption */}
            {post.caption && (
              <div className="mt-2 text-black dark:text-white">{post.caption}</div>
            )}

            {/* Post image */}
            {post.image && (
              <Link href={`/postdetailpage/${post.id}`} className="block">
                <div className="mt-4 flex justify-center">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden max-w-full">
                    <img
                      src={post.image}
                      alt={post.caption || "post"}
                      className="rounded-2xl max-h-[650px] object-cover"
                    />
                  </div>
                </div>
              </Link>
            )}

            {/* Action bar */}
            <div className="border-t border-gray-200 my-4"></div>
            <ActionBar />
          </div>

          {/* Divider between posts */}
          {index < posts.length - 1 && <div className="border-t border-gray-200 my-4"></div>}
        </React.Fragment>
      ))}
    </div>
  );
}
