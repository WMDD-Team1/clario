import React, { useEffect, useState } from 'react';
import InfoRow from '@/components/InfoRow';
import { ExpenseItem } from '@api/types/dashboardApi';
import { fetchTopExpenses } from '@api/services/dashboardService';

export const ExpensesTable: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [loading, setLoading] = useState(true);

  const DUMMY_DATA: ExpenseItem[] = [
    { title: 'Office Rent', date: '2025-10-20', amount: 800, category: 'Rent' },
    { title: 'Other', date: '2025-10-17', amount: 4000, category: 'Misc' },
    { title: 'Internet', date: '2025-10-21', amount: 140, category: 'Utilities' },
    { title: 'Usability Test', date: '2025-10-25', amount: 130, category: 'Research' },
  ];

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const res = await fetchTopExpenses();
        if (res?.data?.length) setExpenses(res.data);
        else setExpenses(DUMMY_DATA);
      } catch (err) {
        console.error('Failed to fetch top expenses:', err);
        setExpenses(DUMMY_DATA);
      } finally {
        setLoading(false);
      }
    };
    loadExpenses();
  }, []);

  return (
    <div
      className="
        flex flex-col justify-start items-start
        w-[310.5px] h-[313px] p-5 shrink-0
        rounded-[20px] bg-white
        shadow-[0_95px_27px_0_rgba(0,0,0,0),_0_61px_24px_0_rgba(0,0,0,0.01),_0_34px_21px_0_rgba(0,0,0,0.02),_0_15px_15px_0_rgba(0,0,0,0.04),_0_4px_8px_0_rgba(0,0,0,0.04)]
      "
    >
      <h3 className="font-semibold text-base text-gray-700 mb-3">Top Expenses</h3>

      <div className="w-full flex flex-col justify-between gap-2 text-sm text-gray-700">
        {expenses.slice(0, 4).map((expense, idx) => (
          <div key={idx} className="flex justify-between items-center text-[13px] border-b border-gray-200 pb-2">
            <div className="flex flex-col">
              <span className="font-medium">{expense.title}</span>
              <span className="text-gray-400 text-[12px]">{expense.date}</span>
            </div>
            <span className="font-semibold text-gray-800">
              CAD {expense.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensesTable;
