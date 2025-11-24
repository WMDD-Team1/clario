import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchMoneyFlow } from '@api/services/dashboardService';
import { formatDate } from '@utils/formatDate';
import { MoneyFlowItem } from '@api/types/dashboardApi';

const dummyMoneyFlow = [
  { month: 'Jan', income: 3200, expense: 1500 },
  { month: 'Feb', income: 2800, expense: 1800 },
  { month: 'Mar', income: 3500, expense: 1700 },
  { month: 'Apr', income: 4000, expense: 2200 },
  { month: 'May', income: 3700, expense: 2000 },
  { month: 'Jun', income: 4200, expense: 2500 },
];
const MoneyFlowAreaChart: React.FC = () => {
  const [data, setData] = useState<MoneyFlowItem[]>([]);

  useEffect(() => {
    const loadMoneyFlow = async () => {
      try {
        const res = await fetchMoneyFlow();
        const apiData = res?.data ?? [];

        const allZero =
          apiData.length > 0 &&
          apiData.every((item: any) => (item.income ?? 0) === 0 && (item.expense ?? 0) === 0);

        if (allZero) {
          setData(dummyMoneyFlow);
          return;
        }

        if (apiData.length) {
          const formatted = apiData.map((item: any) => ({
            month: formatDate(item.month, { shortMonth: true }) ?? item.month,
            income: item.income ?? 0,
            expense: item.expense ?? 0,
          }));
          setData(formatted);
        } else {
          setData(dummyMoneyFlow);
        }
      } catch (err) {
        console.error('Failed to fetch money flow:', err);
        setData(dummyMoneyFlow);
      }
    };

    loadMoneyFlow();
  }, []);

  return (
    <div className="h-[320px] w-full p-5 rounded-[20px] bg-[var(--general-alpha)] hover:shadow-md shadow-sm">
      <p className="text-[1.125rem] mb-4 text-[var(--primary-text)]">Money Flow</p>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart 
            data={data}
            margin={{ top: 10, right: 0, left: -10, bottom: 0 }} 
        >
          <XAxis dataKey="month" />
          <YAxis width={40} tickFormatter={(value) => value.toLocaleString()} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--general-alpha)',
              borderColor: 'var(--sublight)',
              borderRadius: '10px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            labelStyle={{ color: 'var(--primary-text)' }}
            itemStyle={{
              padding: 0,
            }}
          />

          <Area
            type="monotone"
            dataKey="income"
            // Wrapped in var()
            stroke="var(--primitive-colors-success-500)"
            fill="var(--primitive-colors-success-100)"
            fillOpacity={0.4}
          />
          <Area
            type="monotone"
            dataKey="expense"
            // Wrapped in var()
            stroke="var(--primitive-colors-error-500)"
            fill="var(--primitive-colors-error-100)"
            fillOpacity={0.4}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoneyFlowAreaChart;
