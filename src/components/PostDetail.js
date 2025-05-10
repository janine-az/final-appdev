// components/PostDetail.js
import React from "react";

const PostDetail = ({ post, comments, onClose }) => {
  const postComments = comments.filter((comment) => comment.postId === post.id);

  return (
    <div className="bg-[#1f2a48] p-6 rounded-lg shadow-md text-white">
      <button
        onClick={onClose}
        className="text-red-400 hover:text-red-300 mb-4"
      >
        Close
      </button>
      <h2 className="text-2xl font-bold text-blue-300 mb-2">{post.title}</h2>
      <p className="text-gray-300 mb-4">{post.body}</p>
      <h3 className="text-xl font-semibold text-green-300 mb-2">Comments</h3>
      <ul className="space-y-2">
        {postComments.map((comment) => (
          <li key={comment.id} className="bg-[#131c3c] p-3 rounded-md">
            <p className="text-gray-300">{comment.body}</p>
            <p className="text-sm text-gray-400 mt-1">By: {comment.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetail;
