import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import { Link } from "react-router-dom";
import type { Project } from "../types";
//import { AuthContext } from "../context/AuthProvider";

 function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //Fetch all projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get("/api/projects");
       // console.log(res.data);
        setProjects(res.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
       
        setError(error.message||"Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

 
//Creates new project
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await apiClient.post("/api/projects", { name, description });
      setProjects((prev) => [...prev, res.data]);
    setName("")
    setDescription("")
    } catch (error: any) {
      
      setError(error.message||"Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  // Delete project
  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/api/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (error: any) {
      setError(error.message || "Failed to delete project");
    }
  };

  // Update project 
  const handleUpdate = async (project: Project) => {
    const newName = prompt("Enter new project name:", project.name);
    const newDesc = prompt("Enter new description:", project.description);

    if (!newName || !newDesc) return; // if canceled

    try {
      const res = await apiClient.put(`/api/projects/${project._id}`, {
        name: newName,
        description: newDesc,
      });
      setProjects((prev) =>
        prev.map((p) => (p._id === project._id ? res.data : p))
      );
    } catch (error: any) {
      setError(error.message || "Failed to update project");
    }
  };


  if(loading) return <div className="text-white text-3xl">Loading...</div>
  return (
    <div className="text-white p-5">
      <h1 className="text-4xl font-bold text-white">Projects</h1>
    {/*Create Project Form */}
      <form
        onSubmit={handleSubmit}
        className=" border p-2 h-50 mt-10 flex flex-col gap-2 rounded"
      >
        
        <label>Project Name:</label>
        <input
          type="text"
          className="border text-white p-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
         required />


        <label>Project Description:</label>
        <input
          type="text"
          className="border text-white p-1"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="submit"
          value="Create Project"
          className="mt-auto bg-sky-500 rounded"
        />
      </form>

      {error && <div className="text-red-500 mt-2">{error}</div>}

{/* List of projects */}
      <div className="w-full flex gap-5 mt-10">
        {projects.map((project) => (
            <div
              key={project._id}
              className="text-white w-50 flex flex-col h-50 border border-red-500 p-2 text-center rounded"
            >
              <h2 className="font-bold">{project.name}</h2>
              <p>{project.description}</p>
              <Link
                to={`/projects/${project._id}`}
                className="mt-auto bg-sky-500 rounded"
              >
                View Project
              </Link>
              <button
                onClick={() => handleUpdate(project)}
                className="bg-yellow-500 px-2 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="bg-red-500 px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProjectsPage;