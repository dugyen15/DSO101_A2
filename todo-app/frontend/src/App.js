import { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch all tasks on load
 useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          setTasks([]);
        }
      })
      .catch(() => setTasks([]));
  }, []);

  // Add a new task
  const addTask = async () => {
    if (!newTask.trim()) return;
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask }),
    });
    const task = await res.json();
    setTasks([...tasks, task]);
    setNewTask("");
  };

  // Delete a task
  const deleteTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Start editing
  const startEdit = (task) => {
    setEditingTask(task.id);
    setEditText(task.title);
  };

  // Save edit
  const saveEdit = async (id) => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editText, completed: false }),
    });
    const updated = await res.json();
    setTasks(tasks.map((t) => (t.id === id ? updated : t)));
    setEditingTask(null);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", fontFamily: "Arial" }}>
      <h1>📝 To-Do List</h1>

      {/* Add Task */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={addTask} style={{ padding: "8px 16px" }}>Add</button>
      </div>

      {/* Task List */}
      {tasks.map((task) => (
        <div key={task.id} style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "center" }}>
          {editingTask === task.id ? (
            <>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                style={{ flex: 1, padding: "8px" }}
              />
              <button onClick={() => saveEdit(task.id)}>Save</button>
            </>
          ) : (
            <>
              <span style={{ flex: 1 }}>{task.title}</span>
              <button onClick={() => startEdit(task)}>Edit</button>
              <button onClick={() => deleteTask(task.id)} style={{ color: "red" }}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;