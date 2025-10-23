import React from "react";

const expenseData = [
  { date: "Sept 12", amount: "$1,200" },
  { date: "Sept 14", amount: "$2,500" },
  { date: "Sept 17", amount: "$1,900" },
  { date: "Sept 18", amount: "$200" },
  { date: "Sept 20", amount: "$600" },
  { date: "Sept 21", amount: "$900" },
  { date: "Sept 28", amount: "$1,000" },
];

export function RecentExpense() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h3 className="text-lg font-semibold mb-4">Recent Expense</h3>
      <ul className="divide-y divide-gray-200 text-sm">
        {expenseData.map((item, i) => (
          <li key={i} className="flex justify-between py-2">
            <span>{item.date}</span>
            <span className="font-medium">{item.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
