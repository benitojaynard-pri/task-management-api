import { Routes, Route, Navigate } from 'react-router-dom'; // Inalis ang BrowserRouter dito
import React, { useState } from 'react';
import LoginPage from './page/login'; 
import HomePage from './page/homepage';
import './App.css';

function App() {
  // 1. Kunin ang user sa storage (Safe way)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return (saved && saved !== "undefined") ? JSON.parse(saved) : null;
  });

  const handleLoginSuccess = (userData) => {
    console.log("Login Success in App.js:", userData);
    setUser(userData); // Dito magti-trigger ang re-render papuntang HomePage
  };

  return (
    <Routes>
      {/* Kapag LOGIN na, bawal na siyang bumalik sa login page. Redirect sa Home */}
      <Route 
        path="/login" 
        element={user ? <Navigate to="/" replace /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} 
      />

      {/* Kapag HINDI pa login, bawal siyang pumasok sa Home. Redirect sa Login */}
      <Route 
        path="/" 
        element={user ? <HomePage user={user} setUser={setUser} /> : <Navigate to="/login" replace />} 
      />
      
      {/* 404 Fallback - Kung saan-saan nagpunta ang user */}
      <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
    </Routes>
  );
}

export default App;