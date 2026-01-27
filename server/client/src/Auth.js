import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = ({ onLoginSuccess }) => {
  const navigate = useNavigate(); // 
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    username: '', 
    password: '', 
    isAdmin: false 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto' }}>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        
        {/* 2. Conditionally show the Name field only during Registration */}
        {isRegistering && (
          <input 
            type="text" 
            placeholder="Full Name" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
            style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
          />
        )}

        <input 
          type="text" 
          placeholder="Username" 
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})} 
          required 
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          required 
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
        />

          {isRegistering && (
            <div style={{ marginBottom: '10px', textAlign: 'left' }}>
              <label style={{ cursor: 'pointer', fontSize: '14px' }}>
                <input 
                  type="checkbox" 
                  checked={formData.isAdmin}
                  onChange={(e) => setFormData({...formData, isAdmin: e.target.checked})} 
                  style={{ marginRight: '8px' }}
                />
                Register as Administrator
              </label>
            </div>
          )}

        <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
          {isRegistering ? 'Create Account' : 'Login'}
        </button>
      </form>

      <p onClick={() => setIsRegistering(!isRegistering)} style={{ cursor: 'pointer', color: 'blue', textAlign: 'center', marginTop: '10px' }}>
        {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
      </p>
    </div>
  );
};

export default Auth;