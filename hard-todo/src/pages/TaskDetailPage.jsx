import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";
import { seedTasks } from "../data/seedTasks.js";


export default function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useLocalStorage("hard_todo_tasks", seedTasks);

  const task = tasks.find((t) => t.id === id);

  const [title, setTitle] = useState(task?.title || "");
  const [notes, setNotes] = useState(task?.notes || "");

  if (!task) {
    return (
      <div>
        <Link to="/" className="btn">← Back</Link>
        <p style={{ marginTop: 14, opacity: 0.85 }}>Task not found.</p>
      </div>
    );
  }

  const toggleDone = () => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const save = () => {
    const t = title.trim();
    if (!t) return;

    setTasks(tasks.map((x) => (x.id === id ? { ...x, title: t, notes: notes.trim() } : x)));
  };

  const remove = () => {
    setTasks(tasks.filter((t) => t.id !== id));
    navigate("/");
  };

  return (
    <div>
      <Link to="/" className="btn">← Back to list</Link>

      <h1 style={{ marginTop: 14 }}>Task Details</h1>

      <div className="card" style={{ display: "grid", gap: 10 }}>
        <div className="row">
          <input type="checkbox" checked={task.done} onChange={toggleDone} />
          <span style={{ opacity: 0.85 }}>{task.done ? "Completed" : "Not completed"}</span>
        </div>

        <label className="small">Title</label>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label className="small">Notes</label>
        <input className="input" value={notes} onChange={(e) => setNotes(e.target.value)} />

        <div className="row" style={{ marginTop: 6 }}>
          <button className="btn btn-accent" type="button" onClick={save}>
            Save Changes
          </button>
          <button className="btn btn-danger" type="button" onClick={remove}>
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}
