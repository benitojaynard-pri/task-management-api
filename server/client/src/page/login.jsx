import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pinagsamang fields para sa Login at Register base sa register.jsx mo
  const [formData, setFormData] = useState({
    name: "",
    username: "", // Gagamitin para sa login
    email: "",    // Gagamitin para sa register
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    /* Endpoint Logic: 
       Login: /api/auth/login
       Register: /api/add (mula sa iyong register.jsx)
    */
    const endpoint = isRegistering 
      ? "http://localhost:5001/api/api/users" 
      : "http://localhost:5001/api/auth/login";

    const payload = isRegistering 
      ? { name: formData.name, email: formData.email, password: formData.password }
      : { username: formData.username, password: formData.password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || "Action failed");

      if (isRegistering) {
        alert("Registration Successful! Please Login.");
        setIsRegistering(false); // Balik sa login mode
        setFormData({ ...formData, password: "" }); // Clear password for safety
      } else {
        // Login Success
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        onLoginSuccess(data.user);
        navigate("/");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="brand-text">
        <span>NEXUS</span>
        <div className="logo-square">
          <div className="logo-inner" />
        </div>
      </div>

      <div className="auth-card">
        <div className="text-center mb-10">
          <h2 className="text-white text-5xl font-bold mb-4">
            {isRegistering ? "Join the Nexus" : "Welcome Back"}
          </h2>
          <p className="text-gray-400 text-xl tracking-wide">
            {isRegistering ? "Create your Identity Rail profile" : "Connect. Collaborate. Create"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <div className="space-y-4">
            {/* Register-only Fields */}
            {isRegistering && (
              <>
                <input
                  name="name"
                  placeholder="Full Name"
                  className="nexus-input"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="nexus-input"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </>
            )}

            {/* Login-only Field */}
            {!isRegistering && (
              <input
                name="username"
                placeholder="Username"
                className="nexus-input"
                required
                value={formData.username}
                onChange={handleChange}
              />
            )}

            {/* Field for both */}
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="nexus-input"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col items-center gap-6 pt-4">
            <button 
              type="submit" 
              disabled={loading} 
              className="btn-nexus-primary w-full py-4 text-sm uppercase tracking-widest bg-gradient-to-r from-[#a855f7] to-[#d946ef]"
            >
              {loading ? "Processing..." : isRegistering ? "Initialize Profile" : "Access Nexus"}
            </button>
            
            <p className="text-gray-400 text-sm">
              {isRegistering ? "Already have an account?" : "New to the network?"}
              <span 
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-[#a855f7] font-bold ml-2 cursor-pointer hover:underline"
              >
                {isRegistering ? "Log In" : "Sign Up"}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;