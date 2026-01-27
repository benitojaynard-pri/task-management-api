import React, { useState, useEffect } from 'react';

const Tasks = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const fetchTasks = async () => {
    const endpoint = user.isAdmin ? '/api/tasks/all' : '/api/tasks';
    const response = await fetch(`http://localhost:5001${endpoint}`, {
      headers: { 'userid': user._id, 'isadmin': user.isAdmin.toString() }
    });
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => { fetchTasks(); }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this task?")) {
      await fetch(`http://localhost:5001/api/tasks/${id}`, { method: 'DELETE' });
      fetchTasks();
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
  };

  const saveEdit = async (id) => {
    await fetch(`http://localhost:5001/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle }),
    });
    setEditingId(null);
    fetchTasks();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, {user.name}!</h2>
      
      {/* Add Task Form omitted for brevity but keep your existing one */}

      <div style={{ display: 'grid', gap: '10px' }}>
        {tasks.map(task => (
          <div key={task._id} style={{ 
            padding: '15px', border: '1px solid #ddd', borderRadius: '8px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div>
              {editingId === task._id ? (
                <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
              ) : (
                <strong>{task.title}</strong>
              )}
              
              <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                {/* 🚀 Changed from User ID to Name */}
                Assigned to: {user.isAdmin ? task.assignedTo : user.name}
              </div>
            </div>

            <div>
              {editingId === task._id ? (
                <button onClick={() => saveEdit(task._id)}>Save</button>
              ) : (
                <>
                  <button onClick={() => handleEdit(task)} style={{ marginRight: '5px' }}>Edit</button>
                  <button onClick={() => handleDelete(task._id)} style={{ color: 'red' }}>Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;