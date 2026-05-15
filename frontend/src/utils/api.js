import axios from 'axios'

// Create an Axios instance pointing to our Python backend
const API = axios.create({
  baseURL: 'https://finpilot-backend-production-7e48.up.railway.app',
})

// Add a request interceptor to attach the JWT token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default API
