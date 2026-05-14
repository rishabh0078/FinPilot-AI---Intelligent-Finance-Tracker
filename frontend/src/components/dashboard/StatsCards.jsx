import React from 'react'
import { motion } from 'framer-motion'
import { FiTrendingUp, FiTrendingDown, FiTarget } from 'react-icons/fi'
import { FaRupeeSign } from 'react-icons/fa'
import { useApp } from '../../context/AppContext'

const StatsCards = () => {
  const { totalIncome, totalExpenses, currentSavings, user } = useApp()
  const savingsGoal = user?.savings_goal ?? 0

  const stats = [
    {
      label: 'Total Income',
      value: totalIncome,
      icon: FiTrendingUp,
      bgColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-500',
      borderColor: 'border-emerald-500/20',
    },
    {
      label: 'Total Expenses',
      value: totalExpenses,
      icon: FiTrendingDown,
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-500',
      borderColor: 'border-red-500/20',
    },
    {
      label: 'Net Savings',
      value: currentSavings,
      icon: FaRupeeSign,
      bgColor: 'bg-cyan-500/10',
      textColor: 'text-cyan-500',
      borderColor: 'border-cyan-500/20',
    },
    {
      label: 'Savings Goal',
      value: savingsGoal,
      icon: FiTarget,
      bgColor: 'bg-violet-500/10',
      textColor: 'text-violet-500',
      borderColor: 'border-violet-500/20',
      subtitle: savingsGoal > 0 
        ? `${Math.min(100, Math.round((currentSavings / savingsGoal) * 100))}% achieved`
        : 'Go to Profile to set a goal',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className={`bg-slate-900/50 border ${stat.borderColor} rounded-xl p-5`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-sm font-medium">{stat.label}</span>
            <div className={`w-9 h-9 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={`${stat.textColor} text-lg`} />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">₹{stat.value.toLocaleString()}</p>
          {stat.subtitle && (
            <p className={`text-xs mt-1 ${stat.textColor}`}>{stat.subtitle}</p>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default StatsCards
