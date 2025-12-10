import axios from 'axios'

export const apiClient=axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    headers:{
        Authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY5MzhhMTI0ZjM0MWE3Y2VkMjk0ZGZiMyIsInVzZXJuYW1lIjoidXNlcjIiLCJlbWFpbCI6InVzZXIyQHRlc3QuY29tIn0sImlhdCI6MTc2NTMxOTA0MiwiZXhwIjoxNzY1NDA1NDQyfQ.JPafbs2zvyWqHyI3VRTHOdjV8rixNc6OkLKpQDs0Wfo'
    }
})