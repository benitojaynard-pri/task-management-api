import React, { useState, useEffect } from 'react';
import Auth from './Auth';
import Tasks from './page/Task';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // Check if user is already logged in on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem('username');
    const savedId = localStorage.getItem('userId');
    const savedAdmin = localStorage.getItem('isAdmin') === 'true';

    if (savedId) {
      setCurrentUser({ _id: savedId, username: savedUser, isAdmin: savedAdmin });
    }
  }, []);

  const onLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser(null);
  };

  return (
    <div className="App">
      {!currentUser ? (
        <Auth onLoginSuccess={onLoginSuccess} />
      ) : (
        <div>
          <nav style={{ padding: '10px', background: '#eee', display: 'flex', justifyContent: 'space-between' }}>
            <span>Logged in as: <b>{currentUser.username}</b></span>
            <button onClick={handleLogout}>Logout</button>
          </nav>
          <Tasks user={currentUser} />
        </div>
      )}
    </div>
  );
}

export default App;