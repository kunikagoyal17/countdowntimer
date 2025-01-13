import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  // Load tasks from local storage on initial render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(newTasks);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task..."
        style={{ padding: '10px', width: '300px' }}
      />
      <button onClick={addTask} style={{ marginLeft: '10px', padding: '10px' }}>
        Add Task
      </button>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tasks.map((t, index) => (
          <li
            key={index}
            style={{
              margin: '10px 0',
              textDecoration: t.completed ? 'line-through' : 'none',
              cursor: 'pointer',
            }}
          >
            <span onClick={() => toggleTaskCompletion(index)}>{t.text}</span>
            <button
              onClick={() => deleteTask(index)}
              style={{ marginLeft: '10px', padding: '5px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
