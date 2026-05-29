import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import {
  expenseCategories,
  incomeCategories,
  categoryColors,
} from '../utils/constants'
import {
  FiPlus,
  FiTrash2,
  FiArrowUpRight,
  FiArrowDownRight,
  FiX,
  FiFilter,
} from 'react-icons/fi'

const Transactions = () => {
  const { transactions, addTransaction, deleteTransaction } = useApp()

  // Show/hide the "Add Transaction" form
  const [showForm, setShowForm] = useState(false)

  // Filter state
  const [filterType, setFilterType] = useState('all') // 'all', 'income', 'expense'

  // New transaction form state
  const [form, setForm] = useState({
    type: 'expense',
    category: 'Groceries',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0], // today's date
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.amount || !form.description) return
    addTransaction({ ...form, amount: Number(form.amount) })
    // Reset form
    setForm({
      type: 'expense',
      category: 'Groceries',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    })
    setShowForm(false)
  }

  // Filter transactions based on selected type
  const filtered =
    filterType === 'all'
      ? transactions
      : transactions.filter((t) => t.type === filterType)

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Transactions</h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your income and expenses
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-emerald-500/20"
        >
          {showForm ? <FiX /> : <FiPlus />}
          {showForm ? 'Cancel' : 'Add Transaction'}
        </button>
      </div>

      {/* Add Transaction Form (toggleable) */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 overflow-hidden"
          >
            <h3 className="text-white font-semibold mb-4">New Transaction</h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Type selector */}
              <div>
                <label className="text-slate-400 text-sm block mb-1.5">
                  Type
                </label>
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      type: e.target.value,
                      category:
                        e.target.value === 'income' ? 'Salary' : 'Groceries',
                    })
                  }
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="text-slate-400 text-sm block mb-1.5">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500"
                >
                  {(form.type === 'income'
                    ? incomeCategories
                    : expenseCategories
                  ).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="text-slate-400 text-sm block mb-1.5">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  placeholder="0.00"
                  required
                  min="0"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500 placeholder:text-slate-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-slate-400 text-sm block mb-1.5">
                  Description
                </label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="What was this for?"
                  required
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500 placeholder:text-slate-500"
                />
              </div>

              {/* Date */}
              <div>
                <label className="text-slate-400 text-sm block mb-1.5">
                  Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Submit */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-lg font-medium transition-all"
                >
                  Add Transaction
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {['all', 'income', 'expense'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
              filterType === type
                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                : 'text-slate-400 hover:text-white bg-slate-800/50 border border-slate-800'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Transactions list */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-slate-500 text-center py-12">
            No transactions found.
          </p>
        ) : (
          <div className="divide-y divide-slate-800/50">
            {filtered.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-between px-5 py-4 hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      t.type === 'income'
                        ? 'bg-emerald-500/10'
                        : 'bg-red-500/10'
                    }`}
                  >
                    {t.type === 'income' ? (
                      <FiArrowUpRight className="text-emerald-500" />
                    ) : (
                      <FiArrowDownRight className="text-red-500" />
                    )}
                  </div>

                  {/* Details */}
                  <div>
                    <p className="text-white text-sm font-medium">
                      {t.description}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor:
                            (categoryColors[t.category] || '#64748b') + '15',
                          color: categoryColors[t.category] || '#64748b',
                        }}
                      >
                        {t.category}
                      </span>
                      <span className="text-slate-500 text-xs">{t.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Amount */}
                  <span
                    className={`font-semibold ${
                      t.type === 'income' ? 'text-emerald-500' : 'text-red-400'
                    }`}
                  >
                    {t.type === 'income' ? '+' : '-'}₹
                    {t.amount.toLocaleString()}
                  </span>

                  {/* Delete button */}
                  <button
                    onClick={() => deleteTransaction(t.id)}
                    className="text-slate-600 hover:text-red-400 transition-colors"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Transactions
