import { useState } from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { DashboardContent } from "./dashboard-content"
import { AIInsights } from "./ai-insights"
import { Reminders } from "./reminders"
import { FinancialOverview } from "./financial-overview"
import { MobileHeader } from "./mobile-header"
import { MobileToggle, type TabKey } from "./mobile-toggle"
import { MobileNav } from "./mobile-nav"
import { StatCard } from "./stat-card"

// eslint-disable-next-line no-undef
export function DashboardLayout({ children }: { children?: React.ReactNode }) {
  const [active, setActive] = useState<TabKey>("dashboard")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* DESKTOP HEADER AND LAYOUT */}
      <div className="hidden md:block">
        <Header />
        <Sidebar
          items={[
            { id: "dashboard", label: "Dashboard" },
            { id: "money-flow", label: "Money Flow" },
            { id: "my-work", label: "My Work" },
            { id: "settings", label: "Settings" },
          ]}
          activeItem={"dashboard"}
          onItemClick={() => {}}
          position="top"
        />
        <Sidebar
          items={[
            { id: "support", label: "Support & FAQ" },
            { id: "logout", label: "Log Out" },
          ]}
          activeItem={"dashboard"}
          onItemClick={() => {}}
          position="bottom"
        />

        {/* Main content */}
        <main className="pt-5 md:pl-25 min-h-screen pb-24 md:pb-0">
          {/* If children (like FinancialDashboard) are passed, render them instead */}
          {children ? children : <DashboardContent />}
        </main>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden">
        <MobileHeader />
        <MobileToggle value={active} onChange={setActive} />
        <main className="p-4 pb-28 space-y-6">
          {active === "insights" && <AIInsights />}

          {active === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <StatCard title="Income" value={"$12,000"} />
                <StatCard title="Expense" value={"$8,000"} />
                <StatCard title="Clients" value={"30"} />
                <StatCard title="Active Projects" value={"5"} />
                <StatCard title="Completed" value={"10"} />
              </div>
              <FinancialOverview />
            </div>
          )}

          {active === "reminders" && <Reminders />}
        </main>
      </div>

      <MobileNav />
    </div>
  )
}
