import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useApp } from '../../context/AppContext'

// Curated color palette for categories
const COLORS = [
  '#3b82f6', // blue
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#f97316'  // orange
]

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl">
        <p className="text-white font-medium text-sm mb-1">{payload[0].name}</p>
        <p className="text-slate-300 text-sm">
          Spent: <span className="font-bold text-white">₹{payload[0].value.toLocaleString()}</span>
        </p>
      </div>
    )
  }
  return null
}

const SpendingChart = () => {
  const { transactions } = useApp()

  // Compute expense data by category
  const expenseData = React.useMemo(() => {
    const dataMap = {}
    
    transactions.forEach(t => {
      // We only want to plot expenses in the donut chart
      if (t.type !== 'expense') return
      
      const cat = t.category || 'Other'
      if (!dataMap[cat]) {
        dataMap[cat] = 0
      }
      dataMap[cat] += parseFloat(t.amount)
    })

    // Convert object to array and sort largest first
    return Object.entries(dataMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }, [transactions])

  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex flex-col h-full min-h-[350px]">
      <h3 className="text-white font-semibold mb-4">Expense Breakdown</h3>

      {expenseData.length > 0 ? (
        <div className="flex-1 flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={110}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Centered Total Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
            <span className="text-slate-400 text-xs uppercase tracking-wider mb-1">Total</span>
            <span className="text-white text-2xl font-bold">
              ₹{totalExpenses.toLocaleString()}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
          <p>No expenses yet</p>
          <p className="text-sm mt-1">Add transactions to see breakdown</p>
        </div>
      )}
    </div>
  )
}

export default SpendingChart
