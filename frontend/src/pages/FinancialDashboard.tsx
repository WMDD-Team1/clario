import React from "react";
import { DashboardLayout } from "../components/dashboard/dashboard-layout";
import { MobileHeader } from "../components/dashboard/mobile-header";
import { MobileNav } from "../components/dashboard/mobile-nav";
import { SummaryCards } from "../components/financial/SummaryCards";
import { IncomeExpenseChart } from "../components/financial/IncomeExpenseChart";
import { RecentIncome } from "../components/financial/RecentIncome";
import { RecentExpense } from "../components/financial/RecentExpense";
import { AIInsights } from "../components/financial/AIInsights";


interface MobileHeaderProps {
  title?: string;
}
export default function FinancialDashboard() {
  return (
    <>
      {/* ---------- Desktop View ---------- */}
      <div className="hidden md:block">
        <DashboardLayout>
          <div className="p-8 space-y-8">
            {/* Page Header */}
            <h2 className="text-2xl font-semibold font-mono mb-2">
              Financial Dashboard
            </h2>

            {/* Summary Cards */}
            <SummaryCards />

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart + Recent Transactions */}
              <div className="col-span-2 flex flex-col gap-6">
                <IncomeExpenseChart />

                <div className="grid grid-cols-2 gap-6">
                  <RecentIncome />
                  <RecentExpense />
                </div>
              </div>

              {/* AI Insights */}
              <AIInsights />
            </div>
          </div>
        </DashboardLayout>
      </div>

      {/* ---------- Mobile View ---------- */}
      <div className="block md:hidden flex flex-col min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <MobileHeader title="Financial Dashboard" />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
          <SummaryCards />
          <IncomeExpenseChart />
          <RecentIncome />
          <RecentExpense />
          <AIInsights />
        </div>

        {/* Bottom Navigation */}
        <MobileNav />
      </div>
    </>
  );
}
