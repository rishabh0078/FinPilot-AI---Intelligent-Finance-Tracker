import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { FiUser, FiMail, FiTarget, FiSave } from 'react-icons/fi'
import { FaRupeeSign } from 'react-icons/fa'

const Profile = () => {
  const { user, updateUserProfile } = useApp()

  // Local form state (initialized from global user state)
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    monthlyIncome: user?.monthly_income || 0,
    savingsGoal: user?.savings_goal || 0,
  })

  const [saved, setSaved] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Call the real API
    const success = await updateUserProfile({
      name: form.name,
      email: form.email,
      monthly_income: Number(form.monthlyIncome),
      savings_goal: Number(form.savingsGoal),
    })
    
    if (success) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage your account and financial preferences
        </p>
      </div>

      {/* Profile avatar */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center">
            <span className="text-emerald-500 text-2xl font-bold">
              {user?.name?.[0] || 'U'}
            </span>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">
              {user?.name || 'User'}
            </h2>
            <p className="text-slate-400 text-sm">{user?.email || ''}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-slate-300 text-sm font-medium block mb-2">
              Full Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
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
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              />
            </div>
          </div>

          {/* Monthly Income */}
          <div>
            <label className="text-slate-300 text-sm font-medium block mb-2">
              Monthly Income (₹)
            </label>
            <div className="relative">
              <FaRupeeSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="number"
                value={form.monthlyIncome}
                onChange={(e) =>
                  setForm({ ...form, monthlyIncome: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              />
            </div>
          </div>

          {/* Savings Goal */}
          <div>
            <label className="text-slate-300 text-sm font-medium block mb-2">
              Savings Goal (₹)
            </label>
            <div className="relative">
              <FiTarget className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="number"
                value={form.savingsGoal}
                onChange={(e) =>
                  setForm({ ...form, savingsGoal: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              />
            </div>
          </div>

          {/* Save button */}
          <button
            type="submit"
            className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all ${
              saved
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
            }`}
          >
            <FiSave />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile
