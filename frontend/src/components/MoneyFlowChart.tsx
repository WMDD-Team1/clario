import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

interface MoneyFlowChartProps {
  variant?: "line" | "area";
  data?: { [key: string]: number | string }[];
}

const defaultData = [
  { week: "Week 1", income: 800, expense: 1300 },
  { week: "Week 2", income: 1100, expense: 1800 },
  { week: "Week 3", income: 1500, expense: 1200 },
  { week: "Week 4", income: 2000, expense: 1700 },
  { week: "Week 5", income: 1800, expense: 1500 },
  { week: "Week 6", income: 2500, expense: 1600 },
];

const MoneyFlowChart: React.FC<MoneyFlowChartProps> = ({
  variant = "line",
  data = defaultData,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <h3 className="font-medium text-gray-700 mb-2">
        Income / Expense
      </h3>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {variant === "area" ? (
            // --- Area Chart Version (your provided code) ---
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4B5563" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4B5563" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="week"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#9CA3AF"
                fill=""
                strokeWidth={1}
                name="Income"
              />
              <Area
                type="monotone"
                dataKey="expense"
                stroke="#4B5563"
                fill=""
                strokeWidth={1}
                name="Expense"
              />
            </AreaChart>
          ) : (
            <LineChart
              data={data}
              margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#000000"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Income"
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#9CA3AF"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Expense"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MoneyFlowChart;
