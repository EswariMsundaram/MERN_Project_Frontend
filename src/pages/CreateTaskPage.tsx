import { useState } from "react";
import { apiClient } from "../clients/api";
import { useNavigate, useParams } from "react-router-dom";

// Page to create a task inside a project
export default function CreateTaskPage() {
  const [title, setTitle] = useState("");
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Send new task to backend
  const handleCreate = async () => {
    await apiClient.post(`/projects/${projectId}/tasks`, { title });
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">Create Task</h1>

      {/* Task title */}
      <input
        className="block mt-4 p-2 text-black"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        onClick={handleCreate}
        className="bg-green-600 px-4 py-2 mt-4 rounded"
      >
        Create Task
      </button>
    </div>
  );
}