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
        rounded-[20px] bg-white shadow-sm hover:shadow-md p-4 cursor-pointer
      "
      onClick={() => {
        console.log("Clicked!"); 
        navigate("/transactions", {
          state: {
            name: "Money flow",
            path: "/transactions"
          },
        });
      }}
    >
      <h3 className="font-semibold text-[18px] text-gray-700 mb-3">Top Expenses</h3>

      <div className="w-full flex flex-col justify-between gap-2 text-sm text-gray-700">
        {expenses.slice(0, 4).map((expense, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center text-[13px] border-b border-gray-500 pb-2"
          >
            <div className="flex flex-col">
              <span className="font-medium text-[16px]">{expense.title}</span>
              <span className="text-gray-400 text-[16px]">{formatDate(expense.date)}</span>
            </div>
            <span className="font-semibold text-[18px] text-gray-800">
              CAD {expense.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensesTable;