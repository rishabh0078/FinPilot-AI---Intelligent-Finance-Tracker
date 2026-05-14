import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { FiActivity, FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi'

const Register = () => {
  const { register } = useApp()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await register(name, email, password)
    if (success) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 font-sans">
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
            Create your account
          </h1>
          <p className="text-slate-400 text-center mb-8">
            Start tracking your finances in seconds
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name field */}
            <div>
              <label className="text-slate-300 text-sm font-medium block mb-2">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
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

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/20"
            >
              Create Account <FiArrowRight />
            </button>
          </form>

          <p className="text-slate-400 text-center mt-6 text-sm">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-emerald-500 hover:text-emerald-400 font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
