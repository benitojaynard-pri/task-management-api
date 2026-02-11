import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const LoginPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobileNumber: "",
    birthdate: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked!"); // <--- TEST LOG
    console.log("Current Payload:", isRegistering ? formData : { username: formData.username, password: formData.password });
    setLoading(true);

    const endpoint = isRegistering
      ? "http://localhost:5001/api/users"
      : "http://localhost:5001/api/auth/login";

    const payload = isRegistering
      ? formData
      : { username: formData.username, password: formData.password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      if (isRegistering) {
        alert("Registration successful! Please log in.");
        setIsRegistering(false);
      } else {
        // Save auth data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        onLoginSuccess(data.user);
        navigate("/");
      }
    } catch (err) {
      alert("Server not responding on port 5001");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="brand">
        <h1>NEXUS</h1>
        <div className="logo-box">
          <div className="logo-inner" />
        </div>
      </div>

      <div className="card">
        <h2>{isRegistering ? "Join Nexus" : "Welcome to Nexus"}</h2>
        <p className="subtitle">Connect. Collaborate. Create</p>

        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <input
                name="name"
                placeholder="Full Name"
                required
                onChange={handleChange}
              />

              <input
                name="email"
                placeholder="Email (optional)"
                onChange={handleChange}
              />

              <input
                name="mobileNumber"
                placeholder="Mobile Number (optional)"
                onChange={handleChange}
              />

              <input
                name="birthdate"
                type="date"
                required
                onChange={handleChange}
              />
            </>
          )}

          <input
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={formData.password} // Idagdag ito
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : isRegistering ? "Sign Up" : "Log In"}
          </button>

          <p className="toggle">
            {isRegistering ? "Already have an account?" : "Don't have an account?"}
            <span onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? " Log In" : " Sign Up"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;