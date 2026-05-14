import React from 'react'
import { useApp } from '../../context/AppContext'
import { FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi'

const RecentTransactions = () => {
  const { transactions } = useApp()

  // Show only the latest 7 transactions
  const recent = transactions.slice(0, 7)

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
      <h3 className="text-white font-semibold mb-4">Recent Transactions</h3>

      <div className="space-y-3">
        {recent.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between py-2 border-b border-slate-800/50 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  t.type === 'income' ? 'bg-emerald-500/10' : 'bg-red-500/10'
                }`}
              >
                {t.type === 'income' ? (
                  <FiArrowUpRight className="text-emerald-500" />
                ) : (
                  <FiArrowDownRight className="text-red-500" />
                )}
              </div>
              <div>
                <p className="text-white text-sm font-medium">{t.description}</p>
                <p className="text-slate-500 text-xs">{t.category}</p>
              </div>
            </div>

            <span
              className={`text-sm font-semibold ${
                t.type === 'income' ? 'text-emerald-500' : 'text-red-400'
              }`}
            >
              {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentTransactions
