import React from 'react';
import LoginPage from './page/login'; // Adjust path if your file is in /pages or /components
import './App.css'; // O kung saan mo man nilagay ang Tailwind directives

function App() {
  return (
    <div className="App">
      {/* For now, we render the Login page directly to verify it works */}
      <LoginPage />
    </div>
  );
}

export default App;