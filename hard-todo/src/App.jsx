import { Routes, Route } from "react-router-dom";
import TaskListPage from "./pages/TaskListPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import "./App.css";

export default function App() {
  return (
    <div className="app-overlay">
      <div className="container">
        <h1 className="page-title">Brittany's To-Do List</h1>
        <p className="page-subtitle">
          Add, edit, delete tasks • Click a task to view details
        </p>

        <Routes>
          <Route path="/" element={<TaskListPage />} />
          <Route path="/task/:id" element={<TaskDetailPage />} />
        </Routes>
      </div>
    </div>
  );
}
