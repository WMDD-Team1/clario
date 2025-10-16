import React from "react";
import { DashboardLayout } from "../components/dashboard/dashboard-layout";
import { StatCard } from "../components/dashboard/stat-card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { week: "Week 1", income: 800, expense: 1500 },
  { week: "Week 2", income: 1000, expense: 1800 },
  { week: "Week 3", income: 1400, expense: 1600 },
  { week: "Week 4", income: 2000, expense: 1300 },
  { week: "Week 5", income: 1800, expense: 1500 },
  { week: "Week 6", income: 2500, expense: 1700 },
];

export default function FinancialDashboard() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-8">
        {/* --- Top Summary Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Total Income" value="$12,000" />
          <StatCard title="Total Expense" value="$6,000" />
          <StatCard title="Net Balance" value="$6,000" />
          <StatCard title="Recurring" value="5 Active" />
        </div>

        {/* --- Main Section: Chart + AI Insights --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (Chart + Recent Income/Expense) */}
          <div className="col-span-2 flex flex-col gap-6">
            {/* Income / Expense Chart */}
            <div className="bg-white rounded-2xl p-6 shadow">
              <h3 className="text-lg font-semibold mb-4">
                Income / Expense (Last 6 Weeks)
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#000000"
                    strokeWidth={2}
                    name="Income"
                  />
                  <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="#9ca3af"
                    strokeWidth={2}
                    name="Expense"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bottom Row: Recent Income + Expense */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Income */}
              <div className="bg-white rounded-2xl p-6 shadow">
                <h3 className="text-lg font-semibold mb-4">Recent Income</h3>
                <ul className="divide-y divide-gray-200 text-sm">
                  {[
                    { date: "Sept 12", amount: "$1,200" },
                    { date: "Sept 14", amount: "$2,500" },
                    { date: "Sept 17", amount: "$1,900" },
                    { date: "Sept 18", amount: "$200" },
                    { date: "Sept 20", amount: "$600" },
                    { date: "Sept 21", amount: "$900" },
                    { date: "Sept 28", amount: "$1,000" },
                  ].map((item, i) => (
                    <li key={i} className="flex justify-between py-2">
                      <span>{item.date}</span>
                      <span className="font-medium">{item.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Expense */}
              <div className="bg-white rounded-2xl p-6 shadow">
                <h3 className="text-lg font-semibold mb-4">Recent Expense</h3>
                <ul className="divide-y divide-gray-200 text-sm">
                  {[
                    { date: "Sept 12", amount: "$1,200" },
                    { date: "Sept 14", amount: "$2,500" },
                    { date: "Sept 17", amount: "$1,900" },
                    { date: "Sept 18", amount: "$200" },
                    { date: "Sept 20", amount: "$600" },
                    { date: "Sept 21", amount: "$900" },
                    { date: "Sept 28", amount: "$1,000" },
                  ].map((item, i) => (
                    <li key={i} className="flex justify-between py-2">
                      <span>{item.date}</span>
                      <span className="font-medium">{item.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column (AI Insights) */}
          <div className="bg-white rounded-2xl p-6 shadow flex flex-col">
            <h3 className="text-lg font-semibold mb-4">AI Insights</h3>
            <p className="text-sm text-gray-500">
              Your net balance has increased 12% compared to last month. Keep
              tracking recurring expenses for better savings.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
