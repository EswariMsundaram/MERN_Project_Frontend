
import { useEffect,useState } from "react"
import { apiClient } from "../clients/api"
import { useParams } from "react-router-dom"
import type { Project } from "../types"
function ProjectDetailsPage(){
     const [project,setProject]=useState<Project|null>(null)
        const [loading,setLoading]=useState(false)
        const [error,setError]=useState('')

        const {projectId}=useParams()
    
        useEffect(()=>{
            const fetchProjectDetails=async ()=>{
                try{
                    setLoading(true)
                    const res=await apiClient.get(`/api/projects/${projectId}`);
                    console.log(res.data)
                    setProject(res.data)
                }catch(error:any){
                    console.log(error)
                    setError(error.message)
                }finally{
                    setLoading(false)
                }
            }
            fetchProjectDetails()
        },[projectId])

        useEffect(() => {
    // const fetchProjectTasks = async () => {
    //     try {
    //         const tasks = await apiClient.get(`/api/projects/${projectId}/tasks`);
            // state
            // loading error
    //     } catch (error) {
    //         console.error(error);
            
    //     }
    // }
    //  fetchProjectTasks()
  }, [projectId])

  if(loading)return <div className="text-3xl text-white">Loading...</div>
  if (error) return <div className="text-3xl text-white">Error loading Project</div>;
    return(
        <div className="text-white">
            <h1>Project Details</h1>
            <div>
                <div className="text-2xl">{project?.name}</div>
                <div className="text-xl">{project?.description}</div>
            </div>
        </div>
    )
}
export default ProjectDetailsPage