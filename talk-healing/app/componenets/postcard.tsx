import { FiMoreHorizontal } from "react-icons/fi";
import { Images } from "@/public"; // Make sure Images.userProfileImage, etc. exist
import Link from "next/link";
import ActionBar from "./actionbar/actionbar";
import React, { useEffect, useState } from "react";
import { useStores } from "@/models"; // ✅ Import MobX stores

export default function PostCard({ posts = [] }) {
  const { homeStore } = useStores(); // ✅ Get homeStore
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await homeStore.getPostInIdHomeData();
        if (homeStore.postInIdHomeData) {
          const postData = homeStore.postInIdHomeData.results;

          if (Array.isArray(postData) && postData.length > 0) {
            setData(postData);
          } else {
            setData([
              {
                id: 1,
                user: {
                  name: "Default User",
                  username: "@default_user",
                  profileImage: Images.userProfileImage,
                },
                image: Images.userProfileImage,
                altText: "Default Post",
              },
            ]);
          }
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setData([
          {
            id: 1,
            user: {
              name: "Default User",
              username: "@default_user",
              profileImage: Images.userProfileImage,
            },
            image: Images.userProfileImage,
            altText: "Default Post",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [homeStore]); // ✅ add homeStore in dependency

  // Combine passed-in posts with API/default posts
  const postsToRender = posts.length > 0 ? posts : data;

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500">Loading posts...</div>
    );
  }

  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl max-w mx-auto my-4 font-sans">
      {postsToRender.map((post, index) => (
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
                  <p className="text-gray-500">
                    {post.user?.username || "@unknown"}
                  </p>
                </div>
              </div>
              <button className="text-gray-500 hover:bg-blue-100 dark:hover:bg-gray-800 rounded-full p-2">
                <FiMoreHorizontal size={20} />
              </button>
            </div>

            {/* Post image */}
            <Link href={`/postdetailpage`} className="block">
              <div className="mt-4 flex justify-center">
                <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden max-w-full">
                  <img
                    src={post.image || Images.userProfileImage}
                    alt={post.altText || "post"}
                    className="rounded-2xl max-h-[650px] object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = Images.userProfileImage;
                    }}
                  />
                </div>
              </div>
            </Link>

            {/* Action bar */}
            <div className="border-t border-gray-200 my-4"></div>
            <ActionBar />
          </div>

          {/* Divider between posts */}
          {index < postsToRender.length - 1 && (
            <div className="border-t border-gray-200 my-4"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
