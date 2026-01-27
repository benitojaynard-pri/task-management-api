import React, { useState } from 'react';

const Auth = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? '/api/users' : '/api/auth';
    
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
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
          // Success! Pass user data (including isAdmin) back to App.js
          onLoginSuccess(data.user); 
        }
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Auth Error:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {isRegistering && (
          <input 
            name="name" 
            placeholder="Full Name" 
            onChange={handleChange} 
            required 
            style={styles.input}
          />
        )}
        <input 
          name="username" 
          placeholder="Username" 
          onChange={handleChange} 
          required 
          style={styles.input}
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          onChange={handleChange} 
          required 
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>
      <p onClick={() => setIsRegistering(!isRegistering)} style={styles.toggle}>
        {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
      </p>
    </div>
  );
};

const styles = {
  container: { maxWidth: '400px', margin: '100px auto', textAlign: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  input: { padding: '10px', fontSize: '16px' },
  button: { padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' },
  toggle: { marginTop: '15px', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }
};

export default Auth;