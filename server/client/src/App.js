import React, { useState } from 'react';
import Auth from './Auth';
import TaskList from './TaskList'; // Assume your main Task logic is here

function App() {
  // 1. Define the state and the setter function here
  const [currentUser, setCurrentUser] = useState(null);

  const onLoginSuccess = (currentUser) => {
    setCurrentUser(currentUser); // Now this will work!
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData); // userData should contain { id, username, isAdmin }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      {!currentUser ? (
        <Auth onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#f4f4f4' }}>
            <span>Logged in as: <strong>{currentUser.username}</strong> {currentUser.isAdmin && '(Admin)'}</span>
            <button onClick={handleLogout}>Logout</button>
          </nav>
          <TaskList currentUser={currentUser} />
        </div>
      )}
    </div>
  );
}

export default App;