require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
// Auto-create table on startup
pool.query(`
  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false
  )
`).then(() => console.log('Tasks table ready'))
  .catch(err => console.error('Table creation error:', err));

app.use(cors());
app.use(express.json());

// GET all tasks
app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new task
app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    const result = await pool.query(
      "INSERT INTO tasks (title, completed) VALUES ($1, false) RETURNING *",
      [title]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (update) a task
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const result = await pool.query(
      "UPDATE tasks SET title=$1, completed=$2 WHERE id=$3 RETURNING *",
      [title, completed, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM tasks WHERE id=$1", [id]);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));