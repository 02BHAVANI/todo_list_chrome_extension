/* global chrome */

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.get('tasks', (result) => {
        if (result.tasks) {
          setTasks(result.tasks);
        }
      });
    } else {
      console.error('Chrome API is not available.');
    }
  }, []);

  const addTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    chrome.storage.sync.set({ tasks: updatedTasks });
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    chrome.storage.sync.set({ tasks: updatedTasks });
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <input type="text" id="todo-input" placeholder="Add a new task" />
      <button onClick={() => addTask(document.getElementById('todo-input').value)}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
