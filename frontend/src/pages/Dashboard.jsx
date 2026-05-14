import React from 'react'
import { useApp } from '../context/AppContext'
import StatsCards from '../components/dashboard/StatsCards'
import SpendingChart from '../components/dashboard/SpendingChart'
import RecentTransactions from '../components/dashboard/RecentTransactions'
import BudgetProgress from '../components/dashboard/BudgetProgress'

const Dashboard = () => {
  const { user } = useApp()

  return (
    <div className="space-y-6">
      {/* Welcome heading */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {user?.name || 'User'} 👋
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Here&apos;s your financial overview for this month.
        </p>
      </div>

      {/* Stats cards row */}
      <StatsCards />

      {/* Charts + Recent transactions row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <SpendingChart />
        <RecentTransactions />
      </div>

      {/* Budget progress */}
      <BudgetProgress />
    </div>
  )
}

export default Dashboard
