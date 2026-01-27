import React, { useEffect, useState } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/tasks', {
          headers: {
            'userid': userId // Sending the ID in headers as your backend expects
          }
        });
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    if (userId) fetchTasks();
  }, [userId]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, {username}!</h2>
      <h3>Your Tasks:</h3>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map(task => (
            <li key={task._id} style={{ marginBottom: '10px' }}>
              <strong>{task.title}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found. Time to relax! ☕</p>
      )}
      <button onClick={() => { localStorage.clear(); window.location.href='/'; }}>
        Logout
      </button>
    </div>
  );
};

export default Tasks;