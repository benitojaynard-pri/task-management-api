import React, { useEffect, useState } from 'react';
import PostCard from '../components/postcard';
import Navbar from '../components/Navbar';

const HomePage = ({ user, setUser }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null); 
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/posts', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f111a] text-white">
      {/* Navbar Section */}
      <Navbar user={user} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="max-w-2xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">Recent Feed</h2>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">
                + New Post
            </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-20">
             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500 mb-4"></div>
             <p className="text-gray-500 italic">Gathering thoughts...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map(post => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="text-center py-20 bg-[#1a1d26] rounded-3xl border border-dashed border-white/10">
            <p className="text-gray-500">No posts yet. Be the first to say hi!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;