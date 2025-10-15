import { StatCard } from "./stat-card"
import { AIInsights } from "./ai-insights"
import { FinancialOverview } from "./financial-overview"
import { Reminders } from "./reminders"

export function DashboardContent() {
  return (
    <div className="px-6">
      {/* Header section */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mt-4">
            Hi Arlette, Welcome Back,
          </h1>
          <p className="text-gray-600 mt-2">
            Here’s your business overview and latest insights.
          </p>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <label htmlFor="range" className="sr-only">
            Range
          </label>
          <select
            id="range"
            className="h-10 rounded-xl border border-gray-300 bg-white px-3 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            defaultValue="this-month"
          >
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
            <option value="this-year">This Year</option>
          </select>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left and middle content */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
            <StatCard title="Income" value={"$12,000"} />
            <StatCard title="Expense" value={"$8,000"} />
            <StatCard title="Completed" value={10} />
            <StatCard title="Active Projects" value={5} />
            <StatCard title="Clients" value={30} />
          </div>

          {/* Insights and Financial overview */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="xl:col-span-6">
              <AIInsights />
            </div>
            <div className="xl:col-span-6">
              <FinancialOverview />
            </div>
          </div>
        </div>

        {/* Right column */}
        <aside className="col-span-12 lg:col-span-4">
          <Reminders />
        </aside>
      </div>
    </div>
  )
}
