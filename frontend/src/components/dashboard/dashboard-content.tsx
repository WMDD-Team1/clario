import { StatCard } from "./stat-card"
import { AIInsights } from "./ai-insights"
import { FinancialOverview } from "./financial-overview"
import { Reminders } from "./reminders"
import DashboardHeader from "./DashboardHeader";

export function DashboardContent() {
  return (
    <div className="px-6">
      {/* Header section */}
      <div className="mb-6 flex items-start">
        <div>
          <DashboardHeader name="Arlette" />
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
