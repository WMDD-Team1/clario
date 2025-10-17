import React from "react";
import { DashboardLayout } from "../components/dashboard/dashboard-layout";
import { SummaryCards } from "../components/financial/SummaryCards";
import { IncomeExpenseChart } from "../components/financial/IncomeExpenseChart";
import { RecentIncome } from "../components/financial/RecentIncome";
import { RecentExpense } from "../components/financial/RecentExpense";
import { AIInsights } from "../components/financial/AIInsights";

export default function FinancialDashboard() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-4 md:p-8">
        {/* Top Section — Title */}
        <h2 className="text-2xl font-mono font-semibold mb-2">
          Financial Dashboard
        </h2>

        {/* Summary Cards — Responsive grid */}
        <SummaryCards />

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (Chart + Recent Tables) */}
          <div className="col-span-2 flex flex-col gap-6">
            <IncomeExpenseChart />

            {/* Recent Income & Expense — side-by-side on desktop, stacked on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RecentIncome />
              <RecentExpense />
            </div>
          </div>

          {/* Right Column (AI Insights) */}
          <AIInsights />
        </div>
      </div>
    </DashboardLayout>
  );
}
