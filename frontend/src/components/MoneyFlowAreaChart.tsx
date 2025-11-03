import { MoneyFlowItem } from '@api/types/dashboardApi';
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchMoneyFlow } from '@api/services/dashboardService';
import { formatDate } from '@utils/formatDate';

const MoneyFlowAreaChart: React.FC = () => {
  const [data, setData] = useState<MoneyFlowItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const DUMMY_DATA: MoneyFlowItem[] = [
    { month: '2025-05', income: 5000, expense: 3500 },
    { month: '2025-06', income: 4200, expense: 3000 },
    { month: '2025-07', income: 6800, expense: 4700 },
    { month: '2025-08', income: 6100, expense: 4200 },
    { month: '2025-09', income: 7300, expense: 5000 },
    { month: '2025-10', income: 7900, expense: 6100 },
  ];
  useEffect(() => {
    const loadMoneyFlow = async () => {
      try {
        setLoading(true);
        const res = await fetchMoneyFlow();

        const formatted =
          res?.data?.map((item) => ({
            month: formatDate(item.month, { shortMonth: true }),
            income: item.income ?? 0,
            expense: item.expense ?? 0,
          })) ?? [];

        const isAllZero =
          formatted.length > 0 &&
          formatted.every((item) => item.income === 0 && item.expense === 0);

        setData(isAllZero ? DUMMY_DATA : formatted);
      } catch (err) {
        console.error('Failed to fetch money flow:', err);
        setData(DUMMY_DATA);
      } finally {
        setLoading(false);
      }
    };

    loadMoneyFlow();
  }, []);
  return (
    <div className="w-full h-80 bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Money Flow</h2>

      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
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

          <XAxis dataKey="month" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              borderRadius: '12px',
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
