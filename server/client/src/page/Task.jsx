import React, { useState, useEffect } from 'react';
import '../App.css'; // Import the new CSS

const Tasks = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const fetchTasks = async () => {
    const endpoint = user.isAdmin ? '/api/tasks/all' : '/api/tasks';
    try {
      const response = await fetch(`http://localhost:5001${endpoint}`, {
        headers: { 'userid': user._id, 'isadmin': user.isAdmin.toString() }
      });
      const data = await response.json();
      setTasks(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchTasks(); }, [user]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    await fetch('http://localhost:5001/api/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTaskTitle, userId: user._id }),
    });
    setNewTaskTitle('');
    fetchTasks();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete task?")) {
      await fetch(`http://localhost:5001/api/tasks/${id}`, { method: 'DELETE' });
      fetchTasks();
    }
  };

  const startEdit = (task) => {
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

  const toggleComplete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/tasks/${id}/toggle`, {
        method: 'PUT',
      });
      if (response.ok) {
        fetchTasks(); // Refresh list to show updated status
      }
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Welcome, {user.name} {user.isAdmin && <span className="badge">Admin</span>}</h2>
        
        {/* ADD TASK FORM */}
        <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
          <input 
            type="text" 
            placeholder="What needs to be done?" 
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>

        <div className="task-list">
          {tasks.map(task => (
            <div key={task._id} className="task-item">
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              {/* CHECKBOX FOR COMPLETION */}
              <input 
                type="checkbox" 
                className="checkbox-custom"
                checked={task.completed}
                onChange={() => toggleComplete(task._id)}
              />
              
              <div style={{ flex: 1 }}>
                {editingId === task._id ? (
                  <input 
                    value={editTitle} 
                    onChange={(e) => setEditTitle(e.target.value)}
                    onBlur={() => saveEdit(task._id)}
                    autoFocus
                  />
                ) : (
                  <>
                    {/* APPLY COMPLETED CLASS CONDITIONALLY */}
                    <div className={`task-title ${task.completed ? 'completed' : ''}`} style={{ fontWeight: '500' }}>
                      {task.title}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      Assigned to: {user.isAdmin ? (task.assignedToName || "...") : user.name}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => startEdit(task)} style={{ background: '#f1f5f9', color: '#1e293b' }}>Edit</button>
              <button onClick={() => handleDelete(task._id)} className="btn-delete">Delete</button>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;