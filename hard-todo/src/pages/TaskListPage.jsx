import { Link } from "react-router-dom";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";
import { seedTasks } from "../data/seedTasks.js";

export default function TaskListPage() {
  const [tasks, setTasks] = useLocalStorage("hard_todo_tasks", seedTasks);

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editNotes, setEditNotes] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;

    const newTask = {
      id: crypto.randomUUID(),
      title: t,
      notes: notes.trim(),
      done: false,
    };

    setTasks([newTask, ...tasks]);
    setTitle("");
    setNotes("");
  };

  const clearAll = () => {
    setTasks([]);
    setTitle("");
    setNotes("");
    cancelEdit();
  };

  const toggleDone = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditNotes(task.notes || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditNotes("");
  };

  const saveEdit = () => {
    const t = editTitle.trim();
    if (!t) return;

    setTasks(
      tasks.map((task) =>
        task.id === editingId
          ? { ...task, title: t, notes: editNotes.trim() }
          : task
      )
    );
    cancelEdit();
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    if (editingId === id) cancelEdit();
  };

  return (
    <div>
      {/* Add Form */}
      <form className="form-card" onSubmit={addTask}>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title (required)"
        />

        <input
          className="input"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes (optional)"
        />

        <div className="btn-row">
          <button className="btn btn-primary" type="submit">
            Add Task
          </button>

          <button className="btn btn-ghost" type="button" onClick={clearAll}>
            Clear All
          </button>
        </div>
      </form>

      <div className="section-title">Your Tasks</div>

      <div className="task-grid">
        {tasks.map((t) => {
          const isEditing = editingId === t.id;

          return (
            <div className="task-card" key={t.id}>
              <div className="task-top">
                <div style={{ flex: 1 }}>
                  {!isEditing ? (
                    <>
                      <h3 className="task-title">{t.title}</h3>
                      {t.notes ? <p className="task-notes">{t.notes}</p> : null}
                    </>
                  ) : (
                    <>
                      <input
                        className="input"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Edit title"
                      />
                      <input
                        className="input"
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        placeholder="Edit notes (optional)"
                        style={{ marginTop: 8 }}
                      />
                    </>
                  )}
                </div>

                <span className={`badge ${t.done ? "badge-done" : "badge-open"}`}>
                  {t.done ? "Done" : "Open"}
                </span>
              </div>

              <div className="task-actions">
                {!isEditing ? (
                  <>
                    <button className="btn" type="button" onClick={() => toggleDone(t.id)}>
                      {t.done ? "Mark Open" : "Mark Done"}
                    </button>

                    <button className="btn" type="button" onClick={() => startEdit(t)}>
                      Edit
                    </button>

                    <button className="btn" type="button" onClick={() => deleteTask(t.id)}>
                      Delete
                    </button>

                    <Link className="btn link" to={`/task/${t.id}`}>
                      Details →
                    </Link>
                  </>
                ) : (
                  <>
                    <button className="btn btn-primary" type="button" onClick={saveEdit}>
                      Save
                    </button>

                    <button className="btn" type="button" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}

        {tasks.length === 0 && (
          <div className="task-card">
            <p style={{ margin: 0, opacity: 0.85 }}>No tasks yet. Add one above ✨</p>
          </div>
        )}
      </div>
    </div>
  );
}
