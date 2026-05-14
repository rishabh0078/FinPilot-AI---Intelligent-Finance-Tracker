import React from 'react'
import { Link } from 'react-router-dom'
import { FiActivity } from 'react-icons/fi'

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <FiActivity className="text-emerald-500 text-2xl" />
            <span className="text-white text-xl font-bold tracking-wide">
              FinPilot <span className="text-emerald-500">AI</span>
            </span>
          </Link>

          {/* Auth buttons */}
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-lg font-medium transition-all shadow-lg shadow-emerald-500/20"
            >
              Get Started
            </Link>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
