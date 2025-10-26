import React, { useState } from "react"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  Sector,
  SectorProps
} from "recharts"

type Coordinate = { x: number; y: number }

type PieSectorData = {
  percent?: number
  name?: string | number
  midAngle?: number
  middleRadius?: number
  tooltipPosition?: Coordinate
  value?: number
  paddingAngle?: number
  dataKey?: string
  payload?: { name: string; value: number; color: string }
}

type PieSectorDataItem = React.SVGProps<SVGPathElement> &
  Partial<SectorProps> &
  PieSectorData

const balanceData = [
  { name: "Expense", value: 2000, color: "#9CA3AF" },
  { name: "Balance", value: 3250, color: "#4B5563" },
]

const expenses = [
  { name: "Office Rent", date: "10/20/2025", amount: "CAD 800" },
  { name: "Other", date: "10/17/2025", amount: "CAD 400" },
  { name: "Internet", date: "10/21/2025", amount: "CAD 140" },
  { name: "Usability Test", date: "10/25/2025", amount: "CAD 130" },
]

const flow = [
  { name: "May", value: 1000, income: 2000 },
  { name: "Jun", value: 2000, income: 2500 },
  { name: "Jul", value: 1000, income: 1800 },
  { name: "Aug", value: 3000, income: 3200 },
  { name: "Sep", value: 2700, income: 2900 },
  { name: "Oct", value: 3100, income: 3300 },
]

// Custom active shape renderer for pie
const renderActiveShape = ({
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
}: PieSectorDataItem) => {
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={(outerRadius ?? 0) + 2}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <text x={cx} y={(cy ?? 0) - 8} textAnchor="middle" className="text-sm" fill="#111">
        {payload?.name}
      </text>
      <text x={cx} y={(cy ?? 0) + 10} textAnchor="middle" className="text-xs" fill="#666">
        {`CAD ${value}`}
      </text>
      <text x={cx} y={(cy ?? 0) + 25} textAnchor="middle" className="text-xs" fill="#888">
        {`(${((percent ?? 0) * 100).toFixed(1)}%)`}
      </text>
    </g>
  )
}

export function FinancialOverview() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="space-y-4">
      {/* Wrapper now uses responsive layout */}
      <div className="flex flex-col xl:flex-row xl:justify-between gap-4">
        {/* Balance donut */}
        <div className="bg-white rounded-2xl shadow-sm p-4 flex-1">
          <h3 className="text-gray-700 font-medium mb-2">This Month Balance</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  activeShape={renderActiveShape}
                  data={balanceData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(-1)}
                >
                  {balanceData.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Expenses */}
        <div className="bg-white rounded-2xl shadow-sm p-4 flex-1">
          <h3 className="text-gray-700 font-medium mb-2">Top Expenses</h3>
          <div className="divide-y">
            {expenses.map((e, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between py-2 text-sm"
              >
                <div>
                  <p className="font-medium text-gray-800">{e.name}</p>
                  <p className="text-xs text-gray-500">{e.date}</p>
                </div>
                <span className="text-gray-800">{e.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Money Flow */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <h3 className="text-gray-700 font-medium mb-2">Money Flow</h3>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={flow}>
              <defs>
                <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4B5563" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4B5563" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                fillOpacity={1}
                fill="url(#expensesGradient)"
                name="Expenses"
                stroke=""
              />
              <Area
                type="monotone"
                dataKey="income"
                fillOpacity={1}
                fill="url(#incomeGradient)"
                name="Income"
                stroke=""
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}