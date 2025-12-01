import React, { useEffect, useState } from 'react';
import { ExpenseItem } from '@api/types/dashboardApi';
import { fetchTopExpenses } from '@api/services/dashboardService';
import InfoCard from './InfoCard';
import { formatDate } from '@utils/formatDate';
import { useNavigate } from "react-router-dom";

export const ExpensesTable: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const truncateTitle = (title: string) => {
    const words = title.trim().split(/\s+/); 
    return words.length > 2 ? `${words[0]} ${words[1]} ...` : title;
  };

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
        w-full max-w-full sm:max-w-[100%] h-auto sm:h-[313px] shrink-0 
        rounded-[20px] bg-[var(--general-alpha)] border border-[var(--sublight-2)] p-4
      "
    >
      <h3 className="text-[1.125rem] text-[var(--primary-text)] mb-3">Top Expenses</h3>
      <div className="w-full flex flex-col justify-between gap-2">
        {expenses.slice(0, 4).map((expense, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center border-b !border-[var(--sublight-2)] pb-2 last:border-none"
          >
            <div className="flex flex-col">
              <span className="text-[var(--secondary-text)] text-[1rem]">{truncateTitle(expense.title)}</span>
              <span className="text-[var(--sub-text)] text-base">{formatDate(expense.date)}</span>
            </div>
            <span className="text-[var(--secondary-text)] text-[1.125rem]">
              CAD {expense.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensesTable;