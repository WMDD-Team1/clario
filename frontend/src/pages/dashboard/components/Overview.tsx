import InsightCard from '@components/InsightCard';
import { fetchOverview } from '@api/services/dashboardService';
import { OverviewResponse } from '@api/types/dashboardApi';
import { formatCurrency } from '@utils/formatCurrency';
import React, { useEffect, useState } from 'react';

const Overview = () => {
  const [overview, setOverview] = useState<OverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);

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

  const DUMMY_DATA = [
    { label: 'Income', value: '$12,000' },
    { label: 'Expense', value: '$8,000' },
    { label: 'Completed', value: '10' },
    { label: 'Recurring Income', value: '5' },
    { label: 'Recurring Expense', value: '30' },
  ];
  const mapOverviewToStats = (data: OverviewResponse) => [
    { label: 'Income', value: `$${data.income.toLocaleString()}` },
    { label: 'Expense', value: `$${data.expense.toLocaleString()}` },
    { label: 'Taxes', value: `$${data.taxes.toLocaleString()}` },
    { label: 'Recurring Income', value: `$${data.recurringIncome.toLocaleString()}` },
    { label: 'Recurring Expense', value: `$${data.recurringExpense.toLocaleString()}` },
  ];
  const isAllZero = (data: OverviewResponse | null) => {
    if (!data) return true;
    return Object.values(data).every((val) => val === 0);
  };

  const stats = overview && !isAllZero(overview) ? mapOverviewToStats(overview) : DUMMY_DATA;

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
