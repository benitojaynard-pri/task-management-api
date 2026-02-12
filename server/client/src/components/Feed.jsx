import React from "react";

const Feed = ({ posts = [] }) => { // Default value as empty array
  return (
    <div className="flex-1 space-y-6">
      {/* Composer Area */}
      <div className="bg-[#1a1d26] rounded-[2rem] p-6 border border-white/5">
        <h2 className="text-white text-xl font-semibold mb-6">What are you building today?</h2>
        <div className="flex gap-4 items-center">
           <div className="flex-1 flex gap-2 bg-[#12141c] rounded-full px-4 py-2 border border-white/5">
              <button className="text-[10px] text-gray-400 hover:text-white px-2">Add Media</button>
              <button className="text-[10px] text-gray-400 hover:text-white px-2">Tag People</button>
           </div>
           <button className="bg-purple-600 text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-purple-700 transition-all">Post</button>
        </div>
      </div>
  
      {/* List of Posts with Safeguard */}
      {!Array.isArray(posts) || posts.length === 0 ? (
        <div className="text-gray-500 text-center py-10">No posts available.</div>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="bg-[#1a1d26] rounded-[2rem] overflow-hidden border border-white/5 group">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {/* Check if author exists before accessing username */}
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-bold">
                  {post.author?.username?.[0].toUpperCase() || "?"}
                </div>
                <div>
                   <h4 className="text-white text-sm font-bold">{post.author?.username || "Unknown"}</h4>
                   <p className="text-gray-500 text-[10px] italic">Nexus Member</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{post.content}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;