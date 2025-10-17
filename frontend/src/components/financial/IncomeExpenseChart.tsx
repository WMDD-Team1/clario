import React from "react";
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

export function IncomeExpenseChart() {
  return (
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
  );
}
