// components/PostCard.jsx
import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className="bg-[#1a1d26] border border-white/5 rounded-2xl p-6 mb-6 shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        {/* Profile Pic Placeholder */}
        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
          {post.username[0].toUpperCase()}
        </div>
        <div>
          <h4 className="text-white font-semibold">{post.username}</h4>
          <p className="text-gray-500 text-xs">{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      
      <p className="text-gray-300 leading-relaxed mb-4">
        {post.content}
      </p>

      <div className="flex gap-4 border-t border-white/5 pt-4">
        <button className="text-gray-500 hover:text-purple-400 text-sm transition-colors">❤️ Like</button>
        <button className="text-gray-500 hover:text-purple-400 text-sm transition-colors">💬 Comment</button>
      </div>
    </div>
  );
};

export default PostCard;