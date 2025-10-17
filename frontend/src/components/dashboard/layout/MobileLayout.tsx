import { useState } from "react";
import { MobileHeader } from "../mobile-header";
import { MobileToggle, type TabKey } from "../mobile-toggle";
import { MobileNav } from "../mobile-nav";
import { AIInsights } from "../ai-insights";
import { Reminders } from "../reminders";
import { FinancialOverview } from "../financial-overview";
import { StatCard } from "../stat-card";

export function MobileLayout() {
  const [active, setActive] = useState<TabKey>("dashboard");

  return (
    <>
      <MobileHeader />
      <MobileToggle value={active} onChange={setActive} />

      <main className="p-4 pb-28 space-y-6">
        {active === "insights" && <AIInsights />}

        {active === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <StatCard title="Income" value="$12,000" />
              <StatCard title="Expense" value="$8,000" />
              <StatCard title="Clients" value="30" />
              <StatCard title="Active Projects" value="5" />
              <StatCard title="Completed" value="10" />
            </div>
            <FinancialOverview />
          </div>
        )}

        {active === "reminders" && <Reminders />}
      </main>

      <MobileNav />
    </>
  );
}
