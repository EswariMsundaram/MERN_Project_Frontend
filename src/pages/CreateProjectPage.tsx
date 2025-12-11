import { useState } from "react";
import { apiClient } from "../clients/api";
import { useNavigate } from "react-router-dom";

// Page to create new project
export default function CreateProjectPage() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  // Send project to backend
  const handleCreate = async () => {
    await apiClient.post("/projects", { title });
    navigate("/projects");
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">Create Project</h1>

      {/* Title input */}
      <input
        className="block mt-4 p-2 text-black"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Create button */}
      <button
        onClick={handleCreate}
        className="bg-green-600 px-4 py-2 mt-4 rounded"
      >
        Create
      </button>
    </div>
  );
}