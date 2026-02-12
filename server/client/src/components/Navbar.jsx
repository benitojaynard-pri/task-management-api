import React from "react";

const Navbar = () => (
    <nav className="flex items-center justify-between py-6 px-8 bg-[#0f111a]">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-black tracking-tighter text-white">NEXUS</span>
        <div className="w-5 h-5 bg-purple-500 rotate-45 flex items-center justify-center">
           <div className="w-2 h-2 bg-[#0f111a] rotate-45" />
        </div>
      </div>
  
      <div className="flex-1 max-w-xl mx-10">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-[#1a1d26] border border-white/10 rounded-full px-12 py-2 text-sm text-white focus:border-purple-500 outline-none"
          />
          <div className="absolute left-4 top-2 text-gray-500">🔍</div>
        </div>
      </div>
  
      <div className="flex items-center gap-6">
        <div className="text-gray-400 text-xs hidden sm:block">AI Filtered Notifications</div>
        <button className="relative text-gray-400">🔔<span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full"></span></button>
        <button className="bg-purple-600 text-white w-8 h-8 rounded-lg font-bold">+</button>
      </div>
    </nav>
  );

  export default Navbar;