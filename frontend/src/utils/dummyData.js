// ==========================================
// DUMMY DATA - This will be replaced by real
// data from the backend API later
// ==========================================

// Colors for each spending category (used in charts & badges)
export const categoryColors = {
  Groceries: '#10b981',
  Transport: '#3b82f6',
  Entertainment: '#f59e0b',
  Utilities: '#8b5cf6',
  Dining: '#ef4444',
  Shopping: '#ec4899',
  Health: '#06b6d4',
  Education: '#6366f1',
  Rent: '#f97316',
  Salary: '#10b981',
  Freelance: '#14b8a6',
  Investment: '#a855f7',
  Other: '#64748b',
}

// Categories the user can pick when adding an expense
export const expenseCategories = [
  'Groceries', 'Transport', 'Entertainment', 'Utilities',
  'Dining', 'Shopping', 'Health', 'Education', 'Rent', 'Other',
]

// Categories for income
export const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Other']

// Sample transactions
export const dummyTransactions = [
  { id: 1, type: 'income', category: 'Salary', amount: 5000, description: 'Monthly salary', date: '2026-05-01' },
  { id: 2, type: 'expense', category: 'Rent', amount: 1200, description: 'Monthly rent', date: '2026-05-01' },
  { id: 3, type: 'expense', category: 'Groceries', amount: 85, description: 'Weekly groceries', date: '2026-05-03' },
  { id: 4, type: 'expense', category: 'Transport', amount: 45, description: 'Gas refill', date: '2026-05-04' },
  { id: 5, type: 'expense', category: 'Dining', amount: 32, description: 'Dinner with friends', date: '2026-05-05' },
  { id: 6, type: 'expense', category: 'Utilities', amount: 120, description: 'Electricity bill', date: '2026-05-06' },
  { id: 7, type: 'expense', category: 'Entertainment', amount: 15, description: 'Netflix', date: '2026-05-07' },
  { id: 8, type: 'expense', category: 'Shopping', amount: 200, description: 'New headphones', date: '2026-05-08' },
  { id: 9, type: 'expense', category: 'Health', amount: 50, description: 'Gym membership', date: '2026-05-09' },
  { id: 10, type: 'expense', category: 'Groceries', amount: 65, description: 'Fruits & vegetables', date: '2026-05-10' },
  { id: 11, type: 'income', category: 'Freelance', amount: 800, description: 'Design project', date: '2026-05-10' },
  { id: 12, type: 'expense', category: 'Education', amount: 30, description: 'Udemy course', date: '2026-05-11' },
  { id: 13, type: 'expense', category: 'Transport', amount: 25, description: 'Uber rides', date: '2026-05-11' },
  { id: 14, type: 'expense', category: 'Dining', amount: 18, description: 'Coffee & lunch', date: '2026-05-12' },
  { id: 15, type: 'expense', category: 'Groceries', amount: 95, description: 'Monthly essentials', date: '2026-05-12' },
]

// Monthly summary for charts (last 6 months)
export const monthlyData = [
  { month: 'Dec', income: 5000, expenses: 3100 },
  { month: 'Jan', income: 5200, expenses: 3400 },
  { month: 'Feb', income: 5000, expenses: 2900 },
  { month: 'Mar', income: 5800, expenses: 3600 },
  { month: 'Apr', income: 5000, expenses: 3200 },
  { month: 'May', income: 5800, expenses: 1980 },
]

// Budget limits per category
export const dummyBudgets = [
  { id: 1, category: 'Groceries', limit: 400, spent: 245 },
  { id: 2, category: 'Transport', limit: 150, spent: 70 },
  { id: 3, category: 'Entertainment', limit: 100, spent: 15 },
  { id: 4, category: 'Dining', limit: 200, spent: 50 },
  { id: 5, category: 'Utilities', limit: 200, spent: 120 },
  { id: 6, category: 'Shopping', limit: 300, spent: 200 },
]

// Default user profile
export const dummyUser = {
  name: 'Rishabh',
  email: 'rishabh@example.com',
  monthlyIncome: 5000,
  savingsGoal: 1000,
}

// Initial AI assistant message
export const dummyAiMessages = [
  {
    role: 'assistant',
    content:
      "Hello! I'm your FinPilot AI assistant. I can analyze your spending, suggest savings, and answer financial questions. What would you like to know?",
  },
]
