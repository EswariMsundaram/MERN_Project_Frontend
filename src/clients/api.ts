import axios from 'axios'

export const apiClient=axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
    // headers:{
    //     Authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY5MzljOWY3MmUwZGViYTJlZWFlZTJjZCIsInVzZXJuYW1lIjoidXNlcjMiLCJlbWFpbCI6InVzZXIzQHRlc3QuY29tIn0sImlhdCI6MTc2NTQxNzE3MiwiZXhwIjoxNzY1NTAzNTcyfQ.p2MLNPARIV8auXVnvq7x7GUEVkfa86P5S0TVcH0AY-M'
    // }
})

apiClient.interceptors.request.use((config)=>{
    try{
        const token=localStorage.getItem("token")
        if(token){
            config.headers["Authorization"]=`Bearer ${JSON.parse(token)}`
        }
    }catch(error){
        //ignore parsing errors
    }
    return config;
})