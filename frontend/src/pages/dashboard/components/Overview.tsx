import InsightCard from '@components/InsightCard';
import { fetchOverview } from '@api/services/dashboardService';
import { OverviewResponse } from '@api/types/dashboardApi';
import { formatCurrency } from '@utils/formatCurrency';
import React, { useEffect, useState } from 'react';

const Overview = () => {
  const [overview, setOverview] = useState<OverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const mapOverviewToStats = (data: OverviewResponse) => [
    { label: 'Income', value: data.income },
    { label: 'Expense', value: data.expense },
    { label: 'Taxes', value: data.taxes },
    { label: 'Recurring Income', value: data.recurringIncome },
    { label: 'Recurring Expense', value: data.recurringExpense },
  ];

  const stats = mapOverviewToStats(
    overview ?? {
      income: 0,
      expense: 0,
      taxes: 0,
      recurringIncome: 0,
      recurringExpense: 0,
    },
  );

  useEffect(() => {
    const loadOverview = async () => {
      try {
        setLoading(true);
        const res = await fetchOverview();
        setOverview(res);
      } catch (err) {
        console.error('Failed to fetch overview:', err);
      } finally {
        setLoading(false);
      }
    };

    loadOverview();
  }, []);

  return (
    <>
      <div className="w-full flex flex-wrap justify-between gap-4 pb-2 overflow-hidden">
        {stats.map(({ label, value }, idx) => (
          <InsightCard
            key={idx}
            title={label}
            value={value}
            className="flex-1 min-w-[180px] max-w-[220px] flex flex-col justify-center items-center 
                      py-4 rounded-2xl shadow-sm border border-gray-100 bg-white transition-all duration-200"
          />
        ))}
      </div>
    </>
  );
};

export default Overview;
