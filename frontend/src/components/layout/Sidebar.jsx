import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import {
  FiActivity,
  FiHome,
  FiList,
  FiPieChart,
  FiCpu,
  FiUser,
  FiLogOut,
  FiX,
} from 'react-icons/fi'

// Each item in the sidebar menu
const menuItems = [
  { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
  { path: '/dashboard/transactions', icon: FiList, label: 'Transactions' },
  { path: '/dashboard/budget', icon: FiPieChart, label: 'Budget' },
  { path: '/dashboard/ai-insights', icon: FiCpu, label: 'AI Insights' },
  { path: '/dashboard/profile', icon: FiUser, label: 'Profile' },
]

const Sidebar = ({ isOpen, onClose }) => {
  const { logout, user } = useApp()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      {/* Dark overlay on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-800 z-50 
        flex flex-col transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0`}
      >
        {/* Logo + close button */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FiActivity className="text-emerald-500 text-xl" />
            <span className="text-white text-lg font-bold">
              FinPilot <span className="text-emerald-500">AI</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User info + Logout at bottom */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 text-sm font-bold">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-slate-500 text-xs truncate">
                {user?.email || ''}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <FiLogOut size={18} />
            Log out
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
