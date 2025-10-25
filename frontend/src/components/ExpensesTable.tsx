import React from "react";
import InfoRow from "@/components/InfoRow";

interface Expense {
  label: string;
  date: string;
  amount: string;
}
export const ExpensesTable: React.FC<{ expenses: Expense[] }> = ({ expenses }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <h3 className="font-semibold text-lg mb-2">Top Expenses</h3>
      <div className="space-y-2">
        {expenses.map((item, idx) => (
          <InfoRow
            key={idx}
            label={`${item.label} (${item.date})`}
            value={item.amount}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpensesTable;
