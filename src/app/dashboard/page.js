"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Users,
  FileText,
  MessageSquare,
  LogOut,
  Activity,
  LayoutDashboard,
} from "lucide-react";

import UserDetail from "@/components/UserDetail";
import PostDetail from "@/components/PostDetail";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, postsRes, commentsRes] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/users"),
          fetch("https://jsonplaceholder.typicode.com/posts"),
          fetch("https://jsonplaceholder.typicode.com/comments"),
        ]);
        const [usersData, postsData, commentsData] = await Promise.all([
          usersRes.json(),
          postsRes.json(),
          commentsRes.json(),
        ]);
        setUsers(usersData);
        setPosts(postsData);
        setComments(commentsData);
      } catch (error) {
        console.error("Data fetching error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    router.push("/login");
  };

  const chartOptions = {
    chart: { id: "dashboardStats" },
    labels: ["Users", "Posts", "Comments"],
    legend: { labels: { colors: "#ccc" } },
    colors: ["#a855f7", "#38bdf8", "#34d399"],
    theme: { mode: "dark" },
  };

  const chartSeries = [users.length, posts.length, comments.length];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0d1224] text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex bg-[#0d1224] text-white h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0f1f] p-6 flex-shrink-0">
        <h1 className="text-2xl font-bold text-purple-500 mb-8">
          Admin Dashboard
        </h1>
        <nav className="space-y-6">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-3 ${
              activeTab === "dashboard" ? "text-purple-400" : "text-gray-400"
            } hover:text-purple-300`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("users");
              setSelectedUser(null);
            }}
            className={`flex items-center gap-3 ${
              activeTab === "users" ? "text-pink-400" : "text-gray-400"
            } hover:text-pink-300`}
          >
            <Users className="w-5 h-5" />
            <span>Users</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("posts");
              setSelectedPost(null);
            }}
            className={`flex items-center gap-3 ${
              activeTab === "posts" ? "text-blue-400" : "text-gray-400"
            } hover:text-blue-300`}
          >
            <FileText className="w-5 h-5" />
            <span>Posts</span>
          </button>
          <button
            onClick={() => setActiveTab("comments")}
            className={`flex items-center gap-3 ${
              activeTab === "comments" ? "text-green-400" : "text-gray-400"
            } hover:text-green-300`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Comments</span>
          </button>
          <div
            className="flex items-center gap-3 text-red-400 cursor-pointer mt-12 hover:text-red-300"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 space-y-8">
        {activeTab === "dashboard" && (
          <>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#131c3c] p-6 rounded-2xl shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-gray-400 text-sm">Users</h3>
                  <Users className="text-purple-400 w-5 h-5" />
                </div>
                <div className="text-3xl font-bold mt-2">{users.length}</div>
                <div className="text-green-400 text-sm mt-1">+3.5% ↑</div>
              </div>
              <div className="bg-[#131c3c] p-6 rounded-2xl shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-gray-400 text-sm">Posts</h3>
                  <FileText className="text-blue-400 w-5 h-5" />
                </div>
                <div className="text-3xl font-bold mt-2">{posts.length}</div>
                <div className="text-green-400 text-sm mt-1">+18.7% ↑</div>
              </div>
              <div className="bg-[#131c3c] p-6 rounded-2xl shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-gray-400 text-sm">Comments</h3>
                  <MessageSquare className="text-green-400 w-5 h-5" />
                </div>
                <div className="text-3xl font-bold mt-2">{comments.length}</div>
                <div className="text-red-400 text-sm mt-1">-3.2% ↓</div>
              </div>
            </section>

            <section className="bg-[#131c3c] p-6 rounded-2xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Activity className="text-cyan-400 w-5 h-5" />
                  Dashboard Summary
                </h2>
                <button className="bg-[#1f2a48] px-3 py-1 rounded text-sm hover:bg-[#26334f]">
                  Export ↓
                </button>
              </div>
              <Chart
                options={chartOptions}
                series={chartSeries}
                type="donut"
                height={350}
              />
            </section>
          </>
        )}

        {activeTab === "users" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Users</h2>
            {selectedUser ? (
              <UserDetail
                user={selectedUser}
                onClose={() => setSelectedUser(null)}
              />
            ) : (
              users.map((user) => (
                <div
                  key={user.id}
                  className="bg-[#131c3c] p-4 rounded-md cursor-pointer hover:bg-[#1a233a]"
                  onClick={() => setSelectedUser(user)}
                >
                  <h3 className="text-xl font-semibold text-purple-300">
                    {user.name}
                  </h3>
                  <p className="text-gray-300">Email: {user.email}</p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "posts" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Posts</h2>
            {selectedPost ? (
              <PostDetail
                post={selectedPost}
                comments={comments}
                onClose={() => setSelectedPost(null)}
              />
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-[#131c3c] p-4 rounded-md cursor-pointer hover:bg-[#1a233a]"
                  onClick={() => setSelectedPost(post)}
                >
                  <h3 className="text-xl font-semibold text-blue-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-300">{post.body}</p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "comments" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Comments</h2>
            {comments.map((comment) => (
              <div key={comment.id} className="bg-[#131c3c] p-4 rounded-md">
                <h4 className="text-green-300">{comment.name}</h4>
                <p className="text-gray-300">{comment.body}</p>
                <p className="text-sm text-gray-400">
                  Post ID: {comment.postId}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
