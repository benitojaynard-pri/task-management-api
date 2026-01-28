import React from 'react';

const NexusLogin = () => {
  return (
    <div className="min-h-screen bg-nexusDark flex items-center justify-center font-sans text-white">
      <div className="w-full max-w-md bg-nexusCard p-8 rounded-2xl border border-white/5 shadow-2xl">
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl font-bold tracking-tighter">NEXUS</span>
            <div className="w-6 h-6 bg-nexusPurple rotate-45 rounded-sm"></div>
          </div>
          <p className="text-nexusText text-sm italic">What are you building today?</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-nexusText">Identity Rail ID</label>
            <input 
              type="email" 
              className="w-full bg-nexusDark border border-white/10 rounded-lg px-4 py-3 focus:border-nexusPurple outline-none transition-all"
              placeholder="anya.sharma@nexus.ai"
            />
          </div>
          
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-nexusText">Secure Key</label>
            <input 
              type="password" 
              className="w-full bg-nexusDark border border-white/10 rounded-lg px-4 py-3 focus:border-nexusPurple outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button className="w-full bg-nexusPurple hover:bg-purple-600 text-white font-bold py-3 rounded-lg shadow-lg shadow-purple-500/20 transition-all transform hover:-translate-y-0.5">
            Initialize Sync
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-nexusText text-xs">
            New to the ecosystem? <span className="text-nexusPurple cursor-pointer">Request Access</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NexusLogin;