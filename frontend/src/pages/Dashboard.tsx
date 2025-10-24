import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector } from "@/store/hooks";
import DashboardShell from "@/components/DashboardShell";
import Card from "@/components/Card";
import { BalanceChart } from "@/components/BalanceChart";
import { ExpensesTable } from "@/components/ExpensesTable";
import { MoneyFlowChart } from "@/components/MoneyFlowChart";
import { Sparkles } from "lucide-react";
import { RemindersList } from "@/components/RemindersList";
import { WelcomeBanner } from "@/components/WelcomeBanner";
import type { RootState } from "@/store";

export const Dashboard = () => {
  const { user } = useAuth0();
  const { data: appUser } = useAppSelector((state: RootState) => state.user);

  const balanceData = [
    { value: 3250, label: "Available" },
    { value: 2000, label: "Spent" },
  ];

  const flowData = [
    { name: "May", income: 1000, expense: 800 },
    { name: "Jun", income: 2000, expense: 1200 },
    { name: "Jul", income: 1500, expense: 1000 },
    { name: "Aug", income: 3000, expense: 2000 },
    { name: "Sep", income: 2700, expense: 2300 },
    { name: "Oct", income: 3100, expense: 2500 },
  ];

  const expenses = [
    { label: "Office Rent", date: "10/20/2025", amount: "CAD 800" },
    { label: "Other", date: "10/17/2025", amount: "CAD 400" },
    { label: "Internet", date: "10/21/2025", amount: "CAD 140" },
    { label: "Usability Test", date: "10/25/2025", amount: "CAD 130" },
  ];

  const reminders = [
    { title: "Rebranding - ACME", client: "ACME INC", dueDate: "10/11/2025" },
    { title: "Content - Clario", client: "NorthFace", dueDate: "10/14/2025" },
    { title: "Web Development - Clario", client: "Arvo", dueDate: "10/20/2025" },
    { title: "Branding - PropEase", client: "PropEase", dueDate: "10/21/2025" },
    { title: "Web Redesign - Langara", client: "Langara", dueDate: "10/23/2025" },
    { title: "UX Research - Pet Care", client: "Pet Care", dueDate: "10/25/2025" },
  ];

  return (
  <DashboardShell>
    <WelcomeBanner userName={user?.name || "User"} />

    {/* ===== TOP STATS (spans across left + center columns) */}
    <div className="flex flex-wrap justify-between gap-4 pb-8 w-full xl:col-span-2">
      {[
        { label: "Income", value: "$12,000" },
        { label: "Expense", value: "$8,000" },
        { label: "Completed", value: "10" },
        { label: "Active Projects", value: "5" },
        { label: "Clients", value: "30" },
      ].map((stat, index) => (
        <div
          key={index}
          className="flex-1 min-w-[150px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px] flex flex-col justify-center items-center py-4 rounded-2xl shadow-sm border border-gray-100 bg-white"
        >
          <p className="font-semibold text-gray-600 text-sm">{stat.label}</p>
          <p className="text-xl font-bold text-gray-800">{stat.value}</p>
        </div>
      ))}
    </div>

    {/* MAIN CONTENT GRID */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* LEFT COLUMN - Insights */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">Insights of Your Work</h2>
      {/* Earning Trend */}
      <Card style="card1">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-white" />
            Earning Trend
          </div>
          <span className="text-sm font-semibold text-gray-600">This Month</span>
        </div>
        <p className="text-sm text-gray-600 leading-snug">
          Your income grew 18% compared to last month mostly from Project A. Youre trending toward a more stable cashflow.
        </p>
      </Card>

      {/* Client Dependency */}
      <Card style="card1">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-white" />
            Client Dependency
          </div>
          <span className="text-sm font-semibold text-gray-600">This Month</span>
        </div>
        <p className="text-sm text-gray-600 leading-snug">
          75% of your total income came from a single client this month — consider diversifying your portfolio.
        </p>
      </Card>

      {/* Income Projection */}
      <Card style="card1">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-white" />
            Income Projection
          </div>
          <span className="text-sm font-semibold text-gray-600">Next Month</span>
        </div>
        <p className="text-sm text-gray-600 leading-snug">
          You have $2,800 in confirmed recurring income for the next 30 days.
        </p>
      </Card>

      {/* Payment Timeliness */}
      <Card style="card1">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-white" />
            Payment Timeliness
          </div>
          <span className="text-sm font-semibold text-gray-600">Next Month</span>
        </div>
        <p className="text-sm text-gray-600 leading-snug">
          Client B usually pays 8 days late — consider updating your contract terms.
        </p>
      </Card>      
</div>

      {/* CENTER COLUMN - Charts */}
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <BalanceChart data={balanceData} />
          <ExpensesTable expenses={expenses} />
        </div>
        <MoneyFlowChart data={flowData} />
      </div>

      {/* RIGHT COLUMN - Reminders */}
      <div className="space-y-4">
        <RemindersList reminders={reminders} />
      </div>
    </div>
  </DashboardShell>
  );
};
