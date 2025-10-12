import React from "react";

interface Transaction {
  date: string
  amount: number
}

interface RecentTransactionsProps {
  title: string
  transactions: Transaction[]
  icon: React.ReactNode
}

export function RecentTransactions({ title, transactions, icon }: RecentTransactionsProps) {
  return (
    <div className="bg-gray-100 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">{icon}</div>
        <h3 className="text-lg font-mono">{title}</h3>
      </div>
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
            <span className="text-sm font-mono text-gray-700">{transaction.date}</span>
            <span className="text-sm font-mono font-semibold">${transaction.amount.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
