import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MoneyFlowAreaChartProps {
  data: {
    name: string;
    income: number;
    expense: number;
  }[];
}

const MoneyFlowAreaChart: React.FC<MoneyFlowAreaChartProps> = ({ data }) => {
  return (
    <div className="w-full h-80 bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Money Flow
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#656769ff" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#656769ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4c4646ff" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#4c4646ff" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="name" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "12px",
            }}
          />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#656769ff"
            fillOpacity={1}
            fill="url(#colorIncome)"
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#363535ff"
            fillOpacity={1}
            fill="url(#colorExpense)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoneyFlowAreaChart;
