import React from 'react'
import { useApp } from '../../context/AppContext'
import { categoryColors } from '../../utils/constants'

const BudgetProgress = () => {
  const { budgets, transactions } = useApp()

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
      <h3 className="text-white font-semibold mb-4">Budget Overview</h3>

      <div className="space-y-4">
        {budgets.map((budget) => {
          // Calculate spent amount from real transactions
          const spent = transactions
            .filter(t => t.type === 'expense' && t.category === budget.category)
            .reduce((sum, t) => sum + parseFloat(t.amount), 0)

          const percentage = Math.min(100, Math.round((spent / budget.limit) * 100))
          const isOver = percentage >= 90
          const color = categoryColors[budget.category] || '#64748b'

          return (
            <div key={budget.id}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-slate-300 text-sm font-medium">{budget.category}</span>
                <span className="text-slate-400 text-xs">
                  ₹{spent} <span className="text-slate-600">/ ₹{budget.limit}</span>
                </span>
              </div>

              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: isOver ? '#ef4444' : color,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BudgetProgress
