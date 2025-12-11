
import {Route, Routes} from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProjectsPage from "./pages/ProjectsPage"
import Navbar from "./components/Navbar"
import ProjectDetailsPage from "./pages/ProjectDetailsPage"
import AuthPage from "./pages/AuthPage"
import CreateTaskPage from "./pages/CreateTaskPage"
import ProtectedRoute from "./components/ProtectedRoute"


function App() {
  
  return (
    
    <div className="p-5 bg-zinc-700 h-screen">  
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/projects" element={
          <ProtectedRoute>
            <ProjectsPage/>
            </ProtectedRoute>}/>

        <Route path="/projects/:projectId" element={
          <ProtectedRoute>
            <ProjectDetailsPage/>
            </ProtectedRoute>}/>

        <Route path="/projects/:projectId/tasks/create" element={
          <ProtectedRoute>
            <CreateTaskPage/>
            </ProtectedRoute>}/>
       
      </Routes>
    </div>
  
    
  )
}

export default App