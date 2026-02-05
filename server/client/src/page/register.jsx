import React, { useState } from 'react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Re-using your /api/add endpoint from the repo
      const response = await fetch('http://localhost:5001/api/add', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration Successful! Please Login.");
        window.location.href = "/login";
      }
    } catch (err) {
      console.error("Register error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f111a] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-[#1a1d26] rounded-[2.5rem] border border-white/5 p-12 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-white text-5xl font-bold mb-4">Join the Nexus</h2>
          <p className="text-gray-400 text-xl">Create your Identity Rail profile</p>
        </div>

        <form onSubmit={handleRegister} className="max-w-md mx-auto space-y-4">
          <input 
            type="text" 
            placeholder="Full Name" 
            className="w-full bg-[#12141c] border-2 border-[#a855f7]/20 rounded-2xl px-6 py-4 text-white focus:border-[#a855f7] outline-none transition-all"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full bg-[#12141c] border-2 border-[#a855f7]/20 rounded-2xl px-6 py-4 text-white focus:border-[#a855f7] outline-none transition-all"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-[#12141c] border-2 border-[#a855f7]/20 rounded-2xl px-6 py-4 text-white focus:border-[#a855f7] outline-none transition-all"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          
          <button type="submit" className="w-full bg-gradient-to-r from-[#a855f7] to-[#d946ef] text-white font-bold py-4 rounded-2xl mt-4 hover:scale-105 transition-transform">
            Initialize Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;