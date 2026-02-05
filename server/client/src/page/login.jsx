import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // Pinagsamang state para sa form base sa iyong pattern
    const [formData, setFormData] = useState({ 
        name: '', 
        username: '', 
        password: '', 
        isAdmin: false 
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const endpoint = isRegistering ? '/api/users' : '/api/auth';
        
        try {
            const response = await fetch(`http://localhost:5001${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                if (isRegistering) {
                    alert("Registration successful! Please login.");
                    setIsRegistering(false);
                    // I-reset ang form pagkatapos mag-register
                    setFormData({ name: '', username: '', password: '', isAdmin: false });
                } else {
                    // Success! Save to local storage
                    localStorage.setItem('userId', data._id);
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('isAdmin', data.isAdmin);

                    onLoginSuccess(data); 
                    navigate('/'); // Navigate to home/tasks
                }
            } else {
                alert(data.message || "Invalid credentials");
            }
        } catch (err) {
            console.error("Auth Error:", err);
            alert("Server is not responding. Check port 5001.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f111a] flex flex-col items-center justify-center p-6 font-sans">
            {/* Nexus Brand Logo */}
            <div className="flex items-center gap-3 mb-12">
                <h1 className="text-white text-5xl font-bold tracking-tighter">NEXUS</h1>
                <div className="w-8 h-8 bg-[#a855f7] rotate-45 rounded-sm flex items-center justify-center">
                    <div className="w-4 h-4 bg-[#0f111a] rotate-45"></div>
                </div>
            </div>

            {/* Login/Register Card Container */}
            <div className="w-full max-w-2xl bg-[#1a1d26] rounded-[2.5rem] border border-white/5 shadow-2xl p-12">
                <div className="text-center mb-10">
                    <h2 className="text-white text-5xl font-bold mb-4">
                        {isRegistering ? 'Join Nexus' : 'Welcome to Nexus'}
                    </h2>
                    <p className="text-gray-400 text-xl tracking-wide">Connect. Collaborate. Create</p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
                    <div className="space-y-4">
                        {/* Conditionally show Name field during Registration */}
                        {isRegistering && (
                            <input 
                                type="text" 
                                required
                                placeholder="Full Name" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-[#12141c] border-2 border-[#a855f7]/20 rounded-2xl px-6 py-4 text-white focus:border-[#a855f7] outline-none transition-all placeholder:text-gray-600"
                            />
                        )}

                        <input 
                            type="text" 
                            required
                            placeholder="Username" 
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            className="w-full bg-[#12141c] border-2 border-[#a855f7]/20 rounded-2xl px-6 py-4 text-white focus:border-[#a855f7] outline-none transition-all placeholder:text-gray-600"
                        />
                        
                        <input 
                            type="password" 
                            required
                            placeholder="Password" 
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="w-full bg-[#12141c] border-2 border-[#a855f7]/20 rounded-2xl px-6 py-4 text-white focus:border-[#a855f7] outline-none transition-all placeholder:text-gray-600"
                        />

                        {/* Admin Checkbox during Registration */}
                        {isRegistering && (
                            <div className="flex items-center gap-3 px-2">
                                <input 
                                    type="checkbox" 
                                    id="isAdmin"
                                    checked={formData.isAdmin}
                                    onChange={(e) => setFormData({...formData, isAdmin: e.target.checked})}
                                    className="w-5 h-5 accent-[#a855f7]"
                                />
                                <label htmlFor="isAdmin" className="text-gray-400 cursor-pointer text-sm">
                                    Register as Administrator
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-1/2 bg-gradient-to-r from-[#a855f7] to-[#d946ef] text-white font-bold py-4 rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-purple-500/20 disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : (isRegistering ? 'Sign Up' : 'Log In')}
                        </button>
                    </div>

                    <div className="text-center py-4">
                        <p className="text-gray-400">
                            {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                            <button 
                                type="button"
                                onClick={() => setIsRegistering(!isRegistering)}
                                className="text-[#a855f7] font-semibold ml-2 hover:underline focus:outline-none"
                            >
                                {isRegistering ? 'Log In' : 'Sign Up'}
                            </button>
                        </p>
                    </div>
                </form>
            </div>

            <div className="mt-12 text-gray-600 text-[10px] uppercase tracking-[0.2em]">
                {new Date().toLocaleString()} PST
            </div>
        </div>
    );
};

export default LoginPage;