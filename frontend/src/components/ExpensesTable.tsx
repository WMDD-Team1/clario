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
        if (res?.data?.length) {
          setExpenses(res.data);
        } else {
          setExpenses(DUMMY_DATA);
        }
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
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <h3 className="font-semibold text-lg mb-2">Top Expenses</h3>
      <div className="space-y-2  divide-y ">
        {expenses.map((expense, idx) => (
          <InfoRow key={idx} expense={expense} />
        ))}
      </div>
    </div>
  );
};

export default ExpensesTable;
