import axios from 'axios'

export const apiClient=axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    headers:{
        Authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY5MzljOWY3MmUwZGViYTJlZWFlZTJjZCIsInVzZXJuYW1lIjoidXNlcjMiLCJlbWFpbCI6InVzZXIzQHRlc3QuY29tIn0sImlhdCI6MTc2NTM5NTA0MSwiZXhwIjoxNzY1NDgxNDQxfQ.3R067VNC7W7dP-A-lMwvD4bQon5nYFkSx0RrnM9MP5w'
    }
})

// apiClient.interceptors.request.use((config)=>{
//     try{
//         const token=localStorage.getItem("token")
//         if(token && config.headers){
//             config.headers["Authorization"]=`Bearer ${JSON.parse(token)}`
//         }
//     }catch(error){
//         //ignore parsing errors
//     }
//     return config;
// })