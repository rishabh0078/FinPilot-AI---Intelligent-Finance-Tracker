import axios from 'axios'

// Create an Axios instance pointing to our Python backend
const API = axios.create({
  baseURL: 'http://127.0.0.1:8000'
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
