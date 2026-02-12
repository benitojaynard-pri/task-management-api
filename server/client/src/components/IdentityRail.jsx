import React from "react";

const IdentityRail = ({ user }) => (
    <aside className="w-64 hidden lg:flex flex-col gap-6">
      <div className="bg-[#1a1d26] rounded-[2rem] p-6 border border-white/5">
        <div className="flex items-center gap-3 mb-4">
          <img src={user.profilePicture || "/api/placeholder/50/50"} alt="Avatar" className="w-12 h-12 rounded-full object-cover" />
          <div>
            <h3 className="text-white font-bold text-sm">{user.name}</h3>
            <p className="text-gray-500 text-[10px] uppercase tracking-wider italic">AI Architect</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-gray-400 text-xs mb-1">Nexus Score: <span className="text-white font-bold text-lg">92</span></p>
          <div className="h-12 w-full bg-gradient-to-r from-purple-500/20 to-transparent rounded-lg flex items-end p-1">
            {/* Sparkline chart placeholder */}
            <div className="w-full h-4 border-b-2 border-purple-500 rounded-sm opacity-50" />
          </div>
        </div>
      </div>
  
      <nav className="space-y-2 px-2">
        {['Growth Hub', 'Upcoming Events', 'Personal Reach Metrics'].map((item) => (
          <button key={item} className="w-full text-left text-gray-400 hover:text-white py-2 px-4 rounded-xl hover:bg-white/5 transition-all text-sm flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> {item}
          </button>
        ))}
      </nav>
    </aside>
  );

  export default IdentityRail;