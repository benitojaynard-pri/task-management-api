import React, { useState, useEffect } from 'react';

const TaskList = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // 1. Fetch Tasks based on user role
  const fetchTasks = async () => {
    try {
      const endpoint = user.isAdmin 
        ? 'http://localhost:5001/api/tasks/all' 
        : 'http://localhost:5001/api/tasks';
      
      const response = await fetch(endpoint, {
        headers: { 
            'userid': user.id, // Passing ID for simple auth simulation
            'isadmin': user.isAdmin.toString() 
        }
      });
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. Add Task (POST /api/tasks)
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTaskTitle.length < 3) return alert("Title must be at least 3 characters");

    await fetch('http://localhost:5001/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTaskTitle, userId: user.id })
    });

    setNewTaskTitle('');
    fetchTasks();
  };

  // 3. Delete Task (DELETE /api/tasks/:id)
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5001/api/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  // 4. Update Task (PUT /api/tasks/:id) - Handles Title & Completion
  const handleUpdate = async (id, updates) => {
    await fetch(`http://localhost:5001/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    fetchTasks();
  };

  return (
    <div style={styles.wrapper}>
      <h2>{user.isAdmin ? "Admin Dashboard: All Tasks" : "My Task List"}</h2>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} style={styles.addForm}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.addBtn}>Add Task</button>
      </form>

      {/* Task List Table/List */}
      <div style={styles.listContainer}>
        {tasks.map((task) => (
          <div key={task._id} style={styles.taskItem}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleUpdate(task._id, { completed: !task.completed })}
            />
            
            <input
              type="text"
              defaultValue={task.title}
              onBlur={(e) => handleUpdate(task._id, { title: e.target.value })}
              style={{
                ...styles.taskTitle,
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#888' : '#000'
              }}
            />

            <div style={styles.actions}>
              {user.isAdmin && <span style={styles.badge}>UserID: {task.userId}</span>}
              <button 
                onClick={() => handleDelete(task._id)} 
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {tasks.length === 0 && <p>No tasks found.</p>}
      </div>
    </div>
  );
};

const styles = {
  wrapper: { padding: '20px', maxWidth: '800px', margin: '0 auto' },
  addForm: { display: 'flex', gap: '10px', marginBottom: '30px' },
  input: { flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ddd' },
  addBtn: { padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  listContainer: { display: 'flex', flexDirection: 'column', gap: '10px' },
  taskItem: { display: 'flex', alignItems: 'center', padding: '15px', border: '1px solid #eee', borderRadius: '8px', background: '#fff' },
  taskTitle: { flex: 1, border: 'none', fontSize: '16px', marginLeft: '10px', outline: 'none' },
  actions: { display: 'flex', alignItems: 'center', gap: '10px' },
  deleteBtn: { padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  badge: { fontSize: '10px', background: '#e9ecef', padding: '2px 5px', borderRadius: '4px' }
};

export default TaskList;