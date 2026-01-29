import React from 'react';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#0f111a] flex flex-col items-center justify-center p-6">
      
      {/* 1. Main Brand Header */}
      <div className="flex items-center gap-3 mb-12">
        <h1 className="text-white text-5xl font-bold tracking-tighter">NEXUS</h1>
        <div className="w-8 h-8 bg-[#a855f7] rotate-45 rounded-sm flex items-center justify-center">
          <div className="w-4 h-4 bg-[#0f111a] rotate-45"></div>
        </div>
      </div>

      {/* 2. The Main "Welcome to Nexus" Box */}
      <div className="w-full max-w-2xl bg-[#1a1d26] rounded-[2.5rem] border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] p-12">
        
        <div className="text-center mb-10">
          <h2 className="text-white text-5xl font-bold mb-4">Welcome to Nexus</h2>
          <p className="text-gray-400 text-xl tracking-wide">Connect. Collaborate. Create</p>
        </div>

        {/* 3. The Inner Form Container */}
        <div className="max-w-md mx-auto space-y-6">
          <div className="space-y-4">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-[#12141c] border-2 border-[#a855f7]/20 rounded-2xl px-6 py-4 text-white focus:border-[#a855f7] outline-none transition-all placeholder:text-gray-600"
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full bg-[#12141c] border-2 border-[#a855f7]/20 rounded-2xl px-6 py-4 text-white focus:border-[#a855f7] outline-none transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <button className="w-1/2 bg-gradient-to-r from-[#a855f7] to-[#d946ef] text-white font-bold py-4 rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-purple-500/20">
              Log In
            </button>
            <a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">Forgot Password?</a>
          </div>

          <div className="text-center py-4">
            <p className="text-gray-400">
              Don't have an account? <span className="text-[#a855f7] font-semibold cursor-pointer hover:underline">Sign Up</span>
            </p>
          </div>

          {/* 4. Social Integration Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
            <SocialBtn label="Google" />
            <SocialBtn label="Microsoft" />
            <SocialBtn label="Apple" />
          </div>
        </div>
      </div>

      {/* 5. Footer Timestamp (As seen in your screenshot) */}
      <div className="mt-12 text-gray-600 text-[10px] uppercase tracking-[0.2em]">
        Wednesday, January 28, 2026 at 7:17:54 PM PST
      </div>
    </div>
  );
};

const SocialBtn = ({ label }) => (
  <button className="flex items-center justify-center bg-white/5 border border-white/10 text-white/70 px-2 py-3 rounded-xl hover:bg-white/10 hover:text-white transition-all text-xs truncate">
    Continue with {label}
  </button>
);

export default LoginPage;