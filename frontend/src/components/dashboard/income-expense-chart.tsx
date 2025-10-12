import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const chartData = [
  { week: "Week 1", income: 800, expense: 1500 },
  { week: "Week 2", income: 1000, expense: 1800 },
  { week: "Week 3", income: 1300, expense: 1500 },
  { week: "Week 4", income: 2000, expense: 1300 },
  { week: "Week 5", income: 1800, expense: 1500 },
  { week: "Week 6", income: 2500, expense: 1700 },
]

const chartConfig = {
  income: {
    label: "Income",
    color: "#000000",
  },
  expense: {
    label: "Expense",
    color: "#9ca3af",
  },
}

export function IncomeExpenseChart() {
  return (
    <div className="bg-gray-100 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-mono">Income / Expense </h3>
        <div className="flex flex-col items-right gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono">Income</span>
            <div className="w-8 h-3 bg-black rounded"></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono">Expense</span>
            <div className="w-8 h-3 bg-gray-400 rounded"></div>
          </div>
        </div>
      {/* ChartContainer, ChartTooltip, and ChartTooltipContent are commented out due to missing module */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="0" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6b7280", fontSize: 12, fontFamily: "monospace" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6b7280", fontSize: 12, fontFamily: "monospace" }}
              tickFormatter={(value) => `$${value}`}
            />
            {/* <ChartTooltip content={<ChartTooltipContent />} /> */}
            <Line type="monotone" dataKey="income" stroke="#000000" strokeWidth={2} dot={{ fill: "#000000", r: 4 }} />
            <Line type="monotone" dataKey="expense" stroke="#9ca3af" strokeWidth={2} dot={{ fill: "#9ca3af", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
  )
}
