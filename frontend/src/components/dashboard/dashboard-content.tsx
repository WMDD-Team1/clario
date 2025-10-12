import { StatCard } from "./stat-card"
import { IncomeExpenseChart } from "./income-expense-chart"
import { RecentTransactions } from "./recent-transactions"
import { AIInsights } from "./ai-insights"

const recentIncome = [
  { date: "Sept 12", amount: 1200 },
  { date: "Sept 14", amount: 2500 },
  { date: "Sept 17", amount: 1900 },
  { date: "Sept 18", amount: 200 },
  { date: "Sept 20", amount: 600 },
  { date: "Sept 21", amount: 900 },
  { date: "Sept 28", amount: 1000 },
]

const recentExpense = [
  { date: "Sept 12", amount: 1200 },
  { date: "Sept 14", amount: 2500 },
  { date: "Sept 17", amount: 1900 },
  { date: "Sept 18", amount: 200 },
  { date: "Sept 20", amount: 600 },
  { date: "Sept 21", amount: 900 },
  { date: "Sept 28", amount: 1000 },
]

export function DashboardContent() {
  return (
    <div className="p-4 md:p-4">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl font-mono">Dashboard</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button className="md:hidden w-8 h-8 bg-gray-200 rounded-lg" aria-label="Menu">
            <div className="w-4 h-0.5 bg-gray-600 mx-auto mb-1"></div>
            <div className="w-4 h-0.5 bg-gray-600 mx-auto mb-1"></div>
            <div className="w-4 h-0.5 bg-gray-600 mx-auto"></div>
          </button>
          <button className="hidden md:flex items-center gap-2 bg-gray-200 hover:bg-gray-300 transition-colors rounded-full px-6 py-3 font-mono text-sm">
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            Add Income
          </button>
          <button className="hidden md:flex items-center gap-2 bg-gray-200 hover:bg-gray-300 transition-colors rounded-full px-6 py-3 font-mono text-sm">
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            Add Expense
          </button>
          <button className="hidden md:flex items-center gap-2 bg-gray-200 hover:bg-gray-300 transition-colors rounded-full px-6 py-3 font-mono text-sm">
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            View All
          </button>
        </div>
      </div>
      <div className="flex md:grid md:grid-cols-4 gap-4 mb-6 overflow-x-auto md:overflow-x-visible pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex-shrink-0 w-[280px] md:w-auto">
          <StatCard icon={<div className="w-4 h-4 rounded-full"></div>} label="Total Income" value="$12,000" />
        </div>
        <div className="flex-shrink-0 w-[280px] md:w-auto">
          <StatCard icon={<div className="w-4 h-4 rounded-full"></div>} label="Total Expense" value="$6,000" />
        </div>
        <div className="flex-shrink-0 w-[280px] md:w-auto">
          <StatCard icon={<div className="w-4 h-4 rounded-full"></div>} label="Net Balance" value="$6,000" />
        </div>
        <div className="flex-shrink-0 w-[280px] md:w-auto">
          <StatCard icon={<div className="w-4 h-4 rounded-full"></div>} label="Recurring" value="5 Active" />
        </div>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <IncomeExpenseChart />
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 mt-6">
            <RecentTransactions
              title="Recent Income"
              transactions={recentIncome}
              icon={<div className="w-4 h-4 rounded-full"></div>}
            />
            <RecentTransactions
              title="Recent Expense"
              transactions={recentExpense}
              icon={<div className="w-4 h-4 rounded-full"></div>}
            />
          </div>
        </div>
        <div>
          <AIInsights />
        </div>
      </div>
    </div>
  )
}
