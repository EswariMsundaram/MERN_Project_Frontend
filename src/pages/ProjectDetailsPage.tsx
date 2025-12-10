
import { useEffect,useState } from "react"
import { apiClient } from "../clients/api"
import { useParams } from "react-router-dom"
import type { Project,Task } from "../types"
function ProjectDetailsPage(){
     const [project,setProject]=useState<Project|null>(null)
     const [tasks,setTasks]=useState<Task[]>([])

        const [loadingProject,setLoadingProject]=useState(true)
        const [loadingTasks,setLoadingTasks]=useState(true)
        const [error,setError]=useState('')
        
        const {projectId}=useParams()
    
        useEffect(()=>{
            const fetchProjectDetails=async ()=>{
                try{
                    setLoadingProject(true)//start loading project
                    const res=await apiClient.get(`/api/projects/${projectId}`);
                    console.log(res.data)
                    setProject(res.data)
                }catch(error:any){
                    console.log(error)
                    setError("Failed to load project")
                }finally{
                    setLoadingProject(false) //done loading project
                }
            }
            fetchProjectDetails()
        },[projectId])

        useEffect(() => {
    const fetchProjectTasks = async () => {
    try {
            setLoadingTasks(true) //starts loading tasks
            const taskRes = await apiClient.get(`/api/projects/${projectId}/tasks`);
            setTasks(taskRes.data ||[])
        } catch (error) {
            console.error(error);
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
            <h1>Project Details</h1>
            <div>
                <div className="text-2xl">{project?.name}</div>
                <div className="text-xl">{project?.description}</div>
            </div>

            <div>
                <h2>Tasks</h2>
                {tasks.length===0 ?
                (<div>No task yet</div>):
                (
                    <ul>
                        {tasks.map((t)=>(
                            <li key={t._id}>
                                <div>{t.title}</div>
                                <div>{t.description}</div>
                                <div>{t.status}</div>
                            </li>
                        ))}
                    </ul>
                )
                }
            </div>
        </div>
    )
}
export default ProjectDetailsPage