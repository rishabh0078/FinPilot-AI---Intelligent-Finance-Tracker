import React, { createContext, useContext, useState, useEffect } from 'react'
import API from '../utils/api'
import toast from 'react-hot-toast'

// Create the context
const AppContext = createContext()

export const AppProvider = ({ children }) => {
  // --- Auth State ---
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // Wait for initial auth check

  // --- Finance State ---
  const [transactions, setTransactions] = useState([])
  const [budgets, setBudgets] = useState([])

  // --- AI Chat State ---
  const [aiMessages, setAiMessages] = useState([
    { role: 'assistant', content: 'Hello! I am FinPilot AI. Ask me any question about your finances.' }
  ])

  // --- Initial Data Load ---
  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }

      try {
        // Fetch User
        const userRes = await API.get('/auth/me')
        setUser(userRes.data)
        setIsAuthenticated(true)

        // Fetch Data
        await fetchFinancialData()
      } catch (error) {
        console.error("Auth check failed:", error)
        logout() // Clear bad token
      } finally {
        setLoading(false)
      }
    }

    checkAuthAndLoadData()
  }, [])

  const fetchFinancialData = async () => {
    try {
      const [txRes, budgetRes] = await Promise.all([
        API.get('/transactions/'),
        API.get('/budgets/')
      ])
      
      // The backend returns MongoDB documents where the ID is `_id` string, 
      // but our frontend expects `id`. Let's map it.
      setTransactions(txRes.data.map(t => ({ ...t, id: t._id })))
      setBudgets(budgetRes.data.map(b => ({ ...b, id: b._id })))
    } catch (error) {
      toast.error('Failed to load financial data')
      console.error(error)
    }
  }

  // ========== AUTH FUNCTIONS ==========

  const login = async (email, password) => {
    try {
      const res = await API.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      setUser(res.data.user)
      setIsAuthenticated(true)
      await fetchFinancialData()
      toast.success('Logged in successfully!')
      return true
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Login failed')
      return false
    }
  }

  const register = async (name, email, password) => {
    try {
      const res = await API.post('/auth/register', { name, email, password })
      localStorage.setItem('token', res.data.token)
      setUser(res.data.user)
      setIsAuthenticated(true)
      await fetchFinancialData()
      toast.success('Account created successfully!')
      return true
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Registration failed')
      return false
    }
  }
  
  const updateUserProfile = async (profileData) => {
    try {
      const res = await API.put('/auth/profile', profileData)
      setUser(res.data.user)
      toast.success('Profile updated!')
      return true
    } catch (error) {
      toast.error('Failed to update profile')
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setUser(null)
    setTransactions([])
    setBudgets([])
    setAiMessages([{ role: 'assistant', content: 'Hello! I am FinPilot AI. Ask me any question about your finances.' }])
  }

  // ========== TRANSACTION FUNCTIONS ==========

  const addTransaction = async (transaction) => {
    try {
      const res = await API.post('/transactions/', transaction)
      setTransactions((prev) => [{ ...res.data, id: res.data._id }, ...prev])
      toast.success('Transaction added!')
    } catch (error) {
      toast.error('Failed to add transaction')
    }
  }

  const deleteTransaction = async (id) => {
    try {
      await API.delete(`/transactions/${id}`)
      setTransactions((prev) => prev.filter((t) => t.id !== id))
      toast.success('Transaction deleted')
    } catch (error) {
      toast.error('Failed to delete transaction')
    }
  }

  // ========== BUDGET FUNCTIONS ==========

  const addBudget = async (budget) => {
    try {
      const res = await API.post('/budgets/', budget)
      setBudgets((prev) => [...prev, { ...res.data, id: res.data._id }])
      toast.success('Budget added!')
    } catch (error) {
      toast.error('Failed to add budget')
    }
  }

  const updateBudget = async (id, updated) => {
    try {
      await API.put(`/budgets/${id}`, updated)
      setBudgets((prev) =>
        prev.map((b) => (b.id === id ? { ...b, ...updated } : b))
      )
      toast.success('Budget updated!')
    } catch (error) {
      toast.error('Failed to update budget')
    }
  }

  const deleteBudget = async (id) => {
    try {
      await API.delete(`/budgets/${id}`)
      setBudgets((prev) => prev.filter((b) => b.id !== id))
      toast.success('Budget deleted')
    } catch (error) {
      toast.error('Failed to delete budget')
    }
  }

  // ========== AI CHAT FUNCTION ==========

  const sendAiMessage = async (message) => {
    // Add user message to UI immediately
    setAiMessages((prev) => [...prev, { role: 'user', content: message }])

    try {
      const res = await API.post('/ai/chat', { question: message })
      
      setAiMessages((prev) => [
        ...prev,
        { role: 'assistant', content: res.data.answer },
      ])
    } catch (error) {
      toast.error('AI is currently unavailable.')
      setAiMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Sorry, I ran into an error connecting to my brain. Please try again later." },
      ])
    }
  }

  // ========== COMPUTED VALUES ==========
  
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0)

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0)

  const currentSavings = totalIncome - totalExpenses

  // Prevent app render until auth is checked
  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading FinPilot AI...</div>
  }

  const value = {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    updateUserProfile,
    transactions,
    addTransaction,
    deleteTransaction,
    budgets,
    addBudget,
    updateBudget,
    deleteBudget,
    aiMessages,
    sendAiMessage,
    totalIncome,
    totalExpenses,
    currentSavings,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
