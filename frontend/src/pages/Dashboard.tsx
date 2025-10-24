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
    { name: "Expense", value: 2000, color: "#9CA3AF" },
    { name: "Balance", value: 3250, color: "#4B5563" },
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
      <div className="flex flex-col gap-6 w-full overflow-hidden">
        {/* Welcome */}
        <WelcomeBanner userName={user?.name || "User"} />

        {/* === Main Body (Left + Center + Right) === */}
        <div className="flex flex-col xl:flex-row gap-6">
          {/* ==== Left + Center Section ==== */}
          <div className="flex flex-col flex-1 min-w-0 gap-6">
            {/* --- Top Stats Row --- */}
            <div className="w-full flex flex-wrap justify-between gap-4 pb-2">
              {[
                { label: "Income", value: "$12,000" },
                { label: "Expense", value: "$8,000" },
                { label: "Completed", value: "10" },
                { label: "Active Projects", value: "5" },
                { label: "Clients", value: "30" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="flex-1 min-w-[160px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px]
                  flex flex-col justify-center items-center py-4 rounded-2xl shadow-sm border border-gray-100 bg-white"
                >
                  <p className="font-semibold text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* --- Insights + Charts Row --- */}
            <div className="flex flex-col lg:flex-row gap-6 w-full">
              {/* Insights (Left) - Smaller width */}
              <div className="flex flex-col flex-[0.8] gap-3">
                <h2 className="text-lg font-semibold text-gray-700">
                  Insights of Your Work
                </h2>

              {[
                {
                  title: "Earning Trend",
                  period: "This Month",
                  text:
                    "Your income grew 18% compared to last month mostly from Project A. You're trending toward a more stable cashflow.",
                },
                {
                  title: "Client Dependency",
                  period: "This Month",
                  text:
                    "75% of your total income came from a single client this month — consider diversifying your portfolio.",
                },
                {
                  title: "Income Projection",
                  period: "Next Month",
                  text:
                    "You have $2,800 in confirmed recurring income for the next 30 days.",
                },
                {
                  title: "Payment Timeliness",
                  period: "Next Month",
                  text:
                    "Client B usually pays 8 days late — consider updating your contract terms.",
                },
              ].map((item, idx) => (
                <Card key={idx} style="card1">
                  <div className="py-3 px-4 shadow-sm rounded-xl border border-gray-100 bg-white scale-[0.98]">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                        <Sparkles className="w-3 h-3 text-white" />
                        {item.title}
                      </div>
                      <span className="text-xs font-semibold text-gray-600">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-snug">{item.text}</p>
                  </div>
                </Card>
              ))}
              </div>
              {/* Charts (Center) - Wider width */}
              <div className="flex flex-col flex-[1.2] gap-6">
                {/* Balance + Top Expenses */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <BalanceChart data={balanceData} />
                  </div>
                  <div className="flex-1">
                    <ExpensesTable expenses={expenses} />
                  </div>
                </div>

                {/* Money Flow */}
                <div>
                  <MoneyFlowChart data={flowData} />
                </div>
              </div>
            </div>
          </div>

          {/* ==== Right Column - Reminders ==== */}
          <div className="flex flex-col w-full xl:w-[26%] gap-4">
            <RemindersList reminders={reminders} />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default Dashboard;
