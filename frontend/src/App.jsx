import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Budget from './pages/Budget'
import AiInsights from './pages/AiInsights'
import Profile from './pages/Profile'

// Layout
import DashboardLayout from './components/layout/DashboardLayout'

import { Toaster } from 'react-hot-toast'

function App() {
  return (
    // AppProvider wraps everything so all pages can access global state
    <AppProvider>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          {/* Public pages — anyone can visit */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard pages — wrapped in DashboardLayout (sidebar + topbar) */}
          {/* DashboardLayout also redirects to /login if not authenticated */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="budget" element={<Budget />} />
            <Route path="ai-insights" element={<AiInsights />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
