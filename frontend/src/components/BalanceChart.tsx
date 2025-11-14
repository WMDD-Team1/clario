import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import { fetchCurrentMonth } from '@api/services/dashboardService';
import { CurrentMonthResponse } from '@api/types/dashboardApi';
import { formatCurrency } from '@utils/formatCurrency';

type ChartItem = {
  name: string;
  value: number;
  color: string;
};

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

const COLORS = ['#F04438', '#17B26A'];

const DUMMY_DATA: ChartItem[] = [
  { name: 'Income', value: 12000, color: COLORS[1] },
  { name: 'Expense', value: 8000, color: COLORS[0] },
];

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
  const itemColor = payload?.color || fill || '#888';

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={(outerRadius ?? 0) + 3}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={itemColor}
      />
      <text x={cx} y={(cy ?? 0) - 8} textAnchor="middle" className="text-sm" fill={itemColor}>
        {payload?.name}
      </text>
      <text x={cx} y={(cy ?? 0) + 10} textAnchor="middle" className="text-xs" fill={itemColor}>
        {`CAD ${formatCurrency(value ?? 0, 0)}`}
      </text>
      <text x={cx} y={(cy ?? 0) + 25} textAnchor="middle" className="text-xs" fill={itemColor}>
        {`(${((percent ?? 0) * 100).toFixed(1)}%)`}
      </text>
    </g>
  );
};

const BalanceChart: React.FC = () => {
  const [data, setData] = useState<ChartItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const loadBalance = async () => {
      try {
        setLoading(true);
        const res: CurrentMonthResponse | null = await fetchCurrentMonth();
        const isEmpty = !res || (res.income === 0 && res.expense === 0);

        const chartData: ChartItem[] = isEmpty
          ? DUMMY_DATA
          : [
              { name: 'Income', value: res.income, color: COLORS[1] },
              { name: 'Expense', value: res.expense, color: COLORS[0] },
            ];

        setData(chartData);
      } catch (err) {
        console.error('Failed to fetch current month balance:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBalance();
  }, []);

  if (loading) return <p>Loading balance...</p>;

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-full sm:max-w-[100%] h-auto sm:h-[313px] p-5 hover:shadow-md rounded-2xl bg-white shadow-sm relative">
      <h3 className="self-start text-[18px]">This Month Balance</h3>
      <div className="w-full h-[250px] flex justify-center items-center relative z-[60]">
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
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalanceChart;
