import axios from 'axios'

// Get the backend URL from the environment (Railway), or fallback to localhost for local dev
const BACKEND_URL = import.meta.env.VITE_API_URL;

// Create an Axios instance pointing to our Python backend
const API = axios.create({
  baseURL: BACKEND_URL
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
