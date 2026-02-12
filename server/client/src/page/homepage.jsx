import React, { useEffect, useState } from 'react';
import PostCard from '../components/postcard';
import Navbar from '../components/Navbar';
import IdentityRail from '../components/IdentityRail';
import Feed from '../components/Feed';


const HomePage = ({ user, setUser }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null); 
  };

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
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f111a] font-sans">
      <Navbar />
      
      <main className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-8 p-6">
        
        {/* Left Column */}
        <IdentityRail user={user} />

        {/* Middle Column */}
        <Feed posts={fetchPosts} />

        {/* Right Column (Widgets) */}
        <aside className="hidden xl:flex flex-col gap-6">
          <div className="bg-[#1a1d26] rounded-[2.5rem] p-6 border border-white/5">
             <h3 className="text-white font-bold text-sm mb-4">Who viewed your profile</h3>
             <p className="text-gray-400 text-xs">33 people this week</p>
          </div>
          
          <div className="bg-[#1a1d26] rounded-[2.5rem] p-6 border border-white/5">
             <h3 className="text-white font-bold text-sm mb-4">Upcoming Events</h3>
             <div className="text-xs text-purple-400 font-medium">AI & Ethics Summit - Jan 30</div>
          </div>
        </aside>

      </main>
    </div>
  );
};

export default HomePage;