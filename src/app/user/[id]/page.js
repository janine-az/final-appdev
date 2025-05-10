"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (
      !loggedInUser ||
      loggedInUser.role !== "user" ||
      loggedInUser.id !== Number(id)
    ) {
      router.push("/");
      return;
    }

    const fetchData = async () => {
      try {
        const [userRes, postsRes, commentsRes] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/users/${id}`),
          fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`),
          fetch("https://jsonplaceholder.typicode.com/comments"),
        ]);

        const [userData, postsData, commentsData] = await Promise.all([
          userRes.json(),
          postsRes.json(),
          commentsRes.json(),
        ]);

        setUser(userData);
        setPosts(postsData);
        setComments(commentsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  if (loading)
    return <div className="p-8 text-center text-white">Loading...</div>;
  if (!user)
    return <div className="p-8 text-center text-red-400">User not found.</div>;

  // Get comments for the user's posts
  const getCommentsForUser = () => {
    const userPostIds = posts.map((post) => post.id);
    return comments.filter((comment) => userPostIds.includes(comment.postId));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Logout Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            localStorage.removeItem("loggedInUser");
            router.push("/login");
          }}
          className="bg-blue-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition"
        >
          Logout
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">👤 {user.name}</h1>
        <div className="space-y-2 text-gray-300">
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Website:</strong> {user.website}
          </p>
          <p>
            <strong>Company:</strong> {user.company?.name}
          </p>
          11
          <div className="mt-4 space-y-2">
            <p>
              <strong>Address:</strong> {user.address?.street},{" "}
              {user.address?.suite}, {user.address?.city},{" "}
              {user.address?.zipcode}
            </p>
            <div className="w-full h-64 rounded-md overflow-hidden mt-2 border border-gray-700">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBGcUWDk9nUN4sF3dVA4qCvgXin0j5RvqU&center=${user.address?.geo.lat},${user.address?.geo.lng}&zoom=14`}
              ></iframe>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mt-8 border-b border-gray-600">
          <button
            className={`py-2 px-4 font-semibold ${
              activeTab === "posts"
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </button>
          <button
            className={`py-2 px-4 font-semibold ${
              activeTab === "comments"
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("comments")}
          >
            Comments
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6 space-y-4">
          {activeTab === "posts" &&
            (posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-700 p-4 rounded-md shadow hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold mb-1 text-blue-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-200">{post.body}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No posts found.</p>
            ))}

          {activeTab === "comments" &&
            (getCommentsForUser().length > 0 ? (
              getCommentsForUser().map((comment) => (
                <div
                  key={comment.id}
                  className="bg-gray-700 p-4 rounded-md shadow hover:shadow-lg transition"
                >
                  <h4 className="font-semibold text-blue-300">
                    {comment.name}
                  </h4>
                  <p className="text-gray-200">{comment.body}</p>
                  <p className="text-sm text-gray-400">
                    From post ID: {comment.postId}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No comments found.</p>
            ))}
        </div>
      </div>
    </div>
  );
}
