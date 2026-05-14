import React, { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Sidebar from './Sidebar'
import { FiMenu } from 'react-icons/fi'

// This layout wraps ALL dashboard pages.
// It renders the Sidebar + a top bar + the page content (via <Outlet />)
const DashboardLayout = () => {
  const { isAuthenticated } = useApp()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // If user is not logged in, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area — pushed right on desktop to make room for sidebar */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center px-4 sm:px-6 sticky top-0 z-30">
          {/* Hamburger menu (mobile only) */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-slate-400 hover:text-white mr-4"
          >
            <FiMenu size={22} />
          </button>

          {/* Page title area — you can customize this per page if needed */}
          <div className="flex-1" />
        </header>

        {/* Page content — <Outlet /> renders the current nested route's component */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
