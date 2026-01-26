import React, { useState } from 'react';
import Auth from './Auth';
import TaskList from './TaskList'; // Assume your main Task logic is here

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData); // userData should contain { id, username, isAdmin }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      {!user ? (
        <Auth onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#f4f4f4' }}>
            <span>Logged in as: <strong>{user.username}</strong> {user.isAdmin && '(Admin)'}</span>
            <button onClick={handleLogout}>Logout</button>
          </nav>
          <TaskList user={user} />
        </div>
      )}
    </div>
  );
}

export default App;