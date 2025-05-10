"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then(setPost);

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((res) => res.json())
      .then(setComments);
  }, [id]);

  if (!post) return <p className="p-4">Loading post...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="mb-6">{post.body}</p>

      <h2 className="text-xl font-semibold mb-2">Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4 p-4 bg-gray-100 rounded">
          <p className="font-bold">{comment.name}</p>
          <p className="text-sm text-gray-600">{comment.email}</p>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
}
