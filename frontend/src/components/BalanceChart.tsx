/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Sector,
} from "recharts";

type PieSectorData = {
  percent?: number;
  name?: string | number;
  midAngle?: number;
  middleRadius?: number;
  value?: number;
  dataKey?: string;
  payload?: { name: string; value: number; color: string };
  cx?: number;
  cy?: number;
  innerRadius?: number;
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  fill?: string;
};

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
}: PieSectorData) => {
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={(outerRadius ?? 0) + 3}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <text
        x={cx}
        y={(cy ?? 0) - 8}
        textAnchor="middle"
        className="text-sm"
        fill="#111"
      >
        {payload?.name}
      </text>
      <text
        x={cx}
        y={(cy ?? 0) + 10}
        textAnchor="middle"
        className="text-xs"
        fill="#666"
      >
        {`CAD ${value}`}
      </text>
      <text
        x={cx}
        y={(cy ?? 0) + 25}
        textAnchor="middle"
        className="text-xs"
        fill="#888"
      >
        {`(${((percent ?? 0) * 100).toFixed(1)}%)`}
      </text>
    </g>
  );
};

export function BalanceChart({ data }: { data: any[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col items-center justify-center">
      <h3 className="font-semibold mb-3 self-start">This Month Balance</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            activeShape={renderActiveShape}
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={3}
            onMouseEnter={onPieEnter}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || "#4B5563"} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
