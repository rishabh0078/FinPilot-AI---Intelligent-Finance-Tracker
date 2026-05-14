import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { expenseCategories, categoryColors } from '../utils/dummyData'
import {
  FiDollarSign,
  FiTarget,
  FiPlus,
  FiTrash2,
  FiEdit3,
  FiCheck,
  FiX,
} from 'react-icons/fi'

const Budget = () => {
  const { user, setUser, budgets, addBudget, updateBudget, deleteBudget } =
    useApp()

  // Local state for editing income & savings goal
  const [editIncome, setEditIncome] = useState(false)
  const [incomeVal, setIncomeVal] = useState(user?.monthlyIncome || 0)
  const [editSavings, setEditSavings] = useState(false)
  const [savingsVal, setSavingsVal] = useState(user?.savingsGoal || 0)

  // New budget form
  const [showAdd, setShowAdd] = useState(false)
  const [newBudget, setNewBudget] = useState({ category: 'Groceries', limit: '' })

  const saveIncome = () => {
    setUser({ ...user, monthlyIncome: Number(incomeVal) })
    setEditIncome(false)
  }

  const saveSavingsGoal = () => {
    setUser({ ...user, savingsGoal: Number(savingsVal) })
    setEditSavings(false)
  }

  const handleAddBudget = (e) => {
    e.preventDefault()
    if (!newBudget.limit) return
    addBudget({ category: newBudget.category, limit: Number(newBudget.limit), spent: 0 })
    setNewBudget({ category: 'Groceries', limit: '' })
    setShowAdd(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Budget Management</h1>
        <p className="text-slate-400 text-sm mt-1">
          Set your income, savings goal, and category budgets
        </p>
      </div>

      {/* Income & Savings Goal cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Monthly Income card */}
        <div className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <FiDollarSign className="text-emerald-500" />
              </div>
              <span className="text-slate-400 text-sm font-medium">
                Monthly Income
              </span>
            </div>
            <button
              onClick={() => {
                setEditIncome(!editIncome)
                setIncomeVal(user?.monthlyIncome || 0)
              }}
              className="text-slate-500 hover:text-emerald-500 transition-colors"
            >
              {editIncome ? <FiX size={16} /> : <FiEdit3 size={16} />}
            </button>
          </div>

          {editIncome ? (
            <div className="flex gap-2">
              <input
                type="number"
                value={incomeVal}
                onChange={(e) => setIncomeVal(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={saveIncome}
                className="bg-emerald-500 text-white px-3 py-2 rounded-lg hover:bg-emerald-600"
              >
                <FiCheck />
              </button>
            </div>
          ) : (
            <p className="text-3xl font-bold text-white">
              ₹{(user?.monthlyIncome || 0).toLocaleString()}
            </p>
          )}
        </div>

        {/* Savings Goal card */}
        <div className="bg-slate-900/50 border border-violet-500/20 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center">
                <FiTarget className="text-violet-500" />
              </div>
              <span className="text-slate-400 text-sm font-medium">
                Savings Goal
              </span>
            </div>
            <button
              onClick={() => {
                setEditSavings(!editSavings)
                setSavingsVal(user?.savingsGoal || 0)
              }}
              className="text-slate-500 hover:text-violet-500 transition-colors"
            >
              {editSavings ? <FiX size={16} /> : <FiEdit3 size={16} />}
            </button>
          </div>

          {editSavings ? (
            <div className="flex gap-2">
              <input
                type="number"
                value={savingsVal}
                onChange={(e) => setSavingsVal(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-violet-500"
              />
              <button
                onClick={saveSavingsGoal}
                className="bg-violet-500 text-white px-3 py-2 rounded-lg hover:bg-violet-600"
              >
                <FiCheck />
              </button>
            </div>
          ) : (
            <p className="text-3xl font-bold text-white">
              ₹{(user?.savingsGoal || 0).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {/* Category Budgets */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Category Budgets</h2>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400 text-sm font-medium transition-colors"
        >
          {showAdd ? <FiX /> : <FiPlus />}
          {showAdd ? 'Cancel' : 'Add Budget'}
        </button>
      </div>

      {/* Add budget form */}
      {showAdd && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          onSubmit={handleAddBudget}
          className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row gap-3"
        >
          <select
            value={newBudget.category}
            onChange={(e) =>
              setNewBudget({ ...newBudget, category: e.target.value })
            }
            className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500"
          >
            {expenseCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={newBudget.limit}
            onChange={(e) =>
              setNewBudget({ ...newBudget, limit: e.target.value })
            }
            placeholder="Monthly limit (₹)"
            required
            min="0"
            className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500 placeholder:text-slate-500"
          />
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium transition-all"
          >
            Add
          </button>
        </motion.form>
      )}

      {/* Budget cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgets.map((budget) => {
          const pct = Math.min(100, Math.round((budget.spent / budget.limit) * 100))
          const color = categoryColors[budget.category] || '#64748b'
          const isOver = pct >= 90

          return (
            <motion.div
              key={budget.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-white font-medium text-sm">
                    {budget.category}
                  </span>
                </div>
                <button
                  onClick={() => deleteBudget(budget.id)}
                  className="text-slate-600 hover:text-red-400 transition-colors"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>

              <div className="flex items-end justify-between mb-2">
                <span className="text-2xl font-bold text-white">
                  ₹{budget.spent}
                </span>
                <span className="text-slate-500 text-sm">
                  / ₹{budget.limit}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: isOver ? '#ef4444' : color,
                  }}
                />
              </div>
              <p
                className="text-xs mt-2"
                style={{ color: isOver ? '#ef4444' : color }}
              >
                {pct}% used
              </p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default Budget
