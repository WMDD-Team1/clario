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
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-4">
      {stats.map(({ label, value }, idx) => (
        <InsightCard
          key={idx}
          title={label}
          value={formatCurrency(value)}
          className="flex flex-col justify-center items-center p-4 rounded-2xl shadow-sm border border-gray-100 bg-white transition-all duration-200"
        />
      ))}
    </div>
  );
};

export default Overview;
