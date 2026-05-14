import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { FiActivity, FiMail, FiLock, FiArrowRight } from 'react-icons/fi'

const Login = () => {
  const { login } = useApp()
  const navigate = useNavigate()

  // Form state — stores what user types
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault() // prevent page reload
    const success = await login(email, password)
    if (success) {
      navigate('/dashboard') // go to dashboard after login
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 font-sans">
      {/* Card */}
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <FiActivity className="text-emerald-500 text-3xl" />
          <span className="text-white text-2xl font-bold">
            FinPilot <span className="text-emerald-500">AI</span>
          </span>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-white mb-2 text-center">
            Welcome back
          </h1>
          <p className="text-slate-400 text-center mb-8">
            Log in to your account to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email field */}
            <div>
              <label className="text-slate-300 text-sm font-medium block mb-2">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label className="text-slate-300 text-sm font-medium block mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/20"
            >
              Log in <FiArrowRight />
            </button>
          </form>

          {/* Link to register */}
          <p className="text-slate-400 text-center mt-6 text-sm">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className="text-emerald-500 hover:text-emerald-400 font-medium"
            >
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
