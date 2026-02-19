import React from "react";

// Idagdag ang { onLogout, user } sa arguments para matanggap ang props
const Navbar = ({ onLogout, user }) => (
    <nav className="flex items-center justify-between py-6 px-8 bg-[#0f111a] sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-black tracking-tighter text-white">NEXUS</span>
        <div className="w-5 h-5 bg-purple-500 rotate-45 flex items-center justify-center">
           <div className="w-2 h-2 bg-[#0f111a] rotate-45" />
        </div>
      </div>
  
      <div className="flex-1 max-w-xl mx-10">
        <div className="relative group">
          {/* Ginamit ang .nexus-input class mula sa App.css */}
          <input 
            type="text" 
            placeholder="Search network..." 
            className="nexus-input !py-2 !px-12" 
          />
          <div className="absolute left-4 top-2.5 text-gray-500 text-sm">🔍</div>
        </div>
      </div>
  
      <div className="flex items-center gap-6">
        <div className="text-gray-400 text-[10px] uppercase tracking-widest hidden sm:block">
          {user?.username ? `Active: ${user.username}` : 'AI Filtered Feed'}
        </div>
        
        <button className="relative text-gray-400 hover:text-white transition-colors">
          🔔<span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full border-2 border-[#0f111a]"></span>
        </button>

        {/* Ginagamit na natin ang onLogout prop dito */}
        <button 
          onClick={onLogout} 
          className="btn-nexus-danger !py-2 !px-4 !w-auto text-[10px] uppercase tracking-tighter"
        >
          Logout
        </button>
      </div>
    </nav>
);

export default Navbar;