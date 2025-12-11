import { useState } from "react";
import { apiClient } from "../clients/api";
import { useNavigate, useParams } from "react-router-dom";

// Page to create a task inside a project
export default function CreateTaskPage() {
  const [title, setTitle] = useState("");
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"todo" | "inprogress" | "done">("todo");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Send new task to backend
  const handleCreate = async () => {
    if(!projectId) return;
    try{
      setLoading(true)
      setError("")
        await apiClient.post(`/api/projects/${projectId}/tasks`, { title, description,status });
    
    navigate(`/projects/${projectId}`);
  }catch(error:any){
    setError(error.message || "Failed to create task")
  }finally{
    setLoading(false)
  }
  };

  return (
    <div className="text-white p-5">
      <h1 className="text-2xl font-bold">Create Task</h1>

      {error && <p className="text-red-500">{error}</p>}

      <input
        className="block mt-2 p-2 text-black"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="block mt-2 p-2 text-black"
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="block mt-2 p-2 text-black"
        value={status}
        onChange={(e) => setStatus(e.target.value as "todo" | "inprogress" | "done")}
      >
        <option value="todo">To Do</option>
        <option value="inprogress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <button
        className="bg-green-600 py-2 px-4 mt-4 rounded"
        onClick={handleCreate}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Task"}
      </button>
    </div>
  );
}