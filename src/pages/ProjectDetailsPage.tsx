
import { useEffect,useState } from "react"
import { apiClient } from "../clients/api"
import { useParams, Link } from "react-router-dom"
import type { Project,Task } from "../types"
function ProjectDetailsPage(){
     const [project,setProject]=useState<Project|null>(null)
     const [tasks,setTasks]=useState<Task[]>([])

        const [loadingProject,setLoadingProject]=useState(true)
        const [loadingTasks,setLoadingTasks]=useState(true)
        const [error,setError]=useState('')
        
        const {projectId}=useParams()
    
        useEffect(()=>{
            const fetchProject=async ()=>{
                try{
                    setLoadingProject(true)//start loading project
                    const res=await apiClient.get(`/api/projects/${projectId}`);
                    //console.log(res.data)
                    setProject(res.data)
                }catch(error:any){
                    //console.log(error)
                    setError("Failed to load project")
                }finally{
                    setLoadingProject(false) //done loading project
                }
            }
            fetchProject()
        },[projectId])

        useEffect(() => {
    const fetchProjectTasks = async () => {
    try {
            setLoadingTasks(true) //starts loading tasks
            const taskRes = await apiClient.get(`/api/projects/${projectId}/tasks`);
            setTasks(taskRes.data ||[])
        } catch (error) {
            //console.error(error);
            setError("Failed to load tasks")
            
        }finally{
            setLoadingTasks(false) //done loading tasks
        }
    }
     fetchProjectTasks()
  }, [projectId])

  if(loadingProject || loadingTasks)return <div className="text-3xl text-white">Loading...</div>
  if (error) return <div className="text-3xl text-white">{error}</div>;
    return(
        <div className="text-white">
                <h1 className="text-2xl text-white">{project?.name}</h1>
                <p className="text-xl text-white">{project?.description}</p>
           <Link to={`/projects/${projectId}/tasks/create`} className="bg-sky-500 py-1 px-2 rounded mt-4 inline-block">Create Task</Link>

           
                <h2 className="text-2xl mt-6">Tasks</h2>
                {tasks.length===0 ?
                (<p>No task yet</p>):
                (
                    <ul>
                        {tasks.map((t)=>(
                            <li key={t._id}>
                                <h3>{t.title}</h3>
                                <p>{t.description}</p>
                                <p>Status: {t.status || "To Do"}</p>
                            </li>
                        ))}
                    </ul>
                )
                }
            </div>
    )
}
export default ProjectDetailsPage