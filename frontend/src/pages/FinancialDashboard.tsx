import React, { useMemo, useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import Card from "@/components/Card";
import Button from "@/components/Button";
import MoneyFlowChart from "@/components/MoneyFlowChart";
import { formatCurrency } from "@/utils/formatCurrency";

type Txn = { date: string; amount: number | string };

const FinancialDashboard: React.FC = () => {
  const totalIncome = 12000;
  const totalExpense = 6000;
  const netBalance = totalIncome - totalExpense;
  const recurringActive = 5;

  const recentIncome: Txn[] = [
    { date: "Sept 12", amount: 1200 },
    { date: "Sept 14", amount: 2500 },
    { date: "Sept 17", amount: 1900 },
    { date: "Sept 18", amount: 200 },
    { date: "Sept 20", amount: 600 },
    { date: "Sept 21", amount: 900 },
    { date: "Sept 28", amount: 1000 },
  ];

  const recentExpense: Txn[] = [
    { date: "Sept 12", amount: 1200 },
    { date: "Sept 14", amount: 2500 },
    { date: "Sept 17", amount: 1900 },
    { date: "Sept 18", amount: 200 },
    { date: "Sept 20", amount: 600 },
    { date: "Sept 21", amount: 900 },
    { date: "Sept 28", amount: 1000 },
  ];

  const [incomePage, setIncomePage] = useState(1);
  const [expensePage, setExpensePage] = useState(1);
  const pageSize = 6;

  const incomeSlice = useMemo(
    () => recentIncome.slice((incomePage - 1) * pageSize, incomePage * pageSize),
    [recentIncome, incomePage]
  );
  const expenseSlice = useMemo(
    () => recentExpense.slice((expensePage - 1) * pageSize, expensePage * pageSize),
    [recentExpense, expensePage]
  );

  return (
    <>
      {/* === DESKTOP VIEW (unchanged) === */}
      <div className="hidden sm:block">
        <DashboardShell>
          <div className="flex flex-col gap-8">
            {/* Header + actions */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <h1 className="text-2xl font-semibold">Financial Dashboard</h1>
              <div className="flex items-center gap-3">
                <Button buttonColor="lightButton">Add Income</Button>
                <Button buttonColor="lightButton">Add Expense</Button>
                <Button buttonColor="regularButton">View All</Button>
              </div>
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <Card style="card1">
                <div className="flex flex-col md:items-center">
                  <span className="text-[var(--border)]">Total Income</span>
                  <span className="text-3xl font-semibold">
                    ${formatCurrency(totalIncome)}
                  </span>
                </div>
              </Card>

              <Card style="card1">
                <div className="flex flex-col md:items-center">
                  <span className="text-[var(--border)]">Total Expense</span>
                  <span className="text-3xl font-semibold">
                    ${formatCurrency(totalExpense)}
                  </span>
                </div>
              </Card>

              <Card style="card1">
                <div className="flex flex-col md:items-center">
                  <span className="text-[var(--border)]">Net Balance</span>
                  <span className="text-3xl font-semibold">
                    ${formatCurrency(netBalance)}
                  </span>
                </div>
              </Card>

              <Card style="card1">
                <div className="flex flex-col md:items-center">
                  <span className="text-[var(--border)]">Recurring</span>
                  <span className="text-3xl font-semibold">
                    {recurringActive} Active
                  </span>
                </div>
              </Card>
            </div>

            {/* Chart + AI Insights */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Chart + Recent Tables */}
              <div className="xl:col-span-2 flex flex-col gap-6">
                <MoneyFlowChart variant="area" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Recent Income */}
                  <Card style="card1">
                    <div>
                      <h3 className="font-medium text-gray-700 mb-3">
                        Recent Income
                      </h3>
                      <div className="space-y-2">
                        {incomeSlice.map((r, i) => (
                          <div
                            key={i}
                            className="flex justify-between border-b border-gray-100 pb-2 text-sm"
                          >
                            <span className="text-gray-600">{r.date}</span>
                            <span className="font-medium text-gray-800">
                              ${formatCurrency(r.amount)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>

                  {/* Recent Expense */}
                  <Card style="card1">
                    <div>
                      <h3 className="font-medium text-gray-700 mb-3">
                        Recent Expense
                      </h3>
                      <div className="space-y-2">
                        {expenseSlice.map((r, i) => (
                          <div
                            key={i}
                            className="flex justify-between border-b border-gray-100 pb-2 text-sm"
                          >
                            <span className="text-gray-600">{r.date}</span>
                            <span className="font-medium text-gray-800">
                              ${formatCurrency(r.amount)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* AI Insights */}
              <Card style="card1">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">AI Insights</h3>
                  <div className="h-[400px] border border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                    <p>AI-generated insights will appear here.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </DashboardShell>
      </div>
      {/* === MOBILE VIEW === */}
      <div className="block sm:hidden px-4 pb-24">
        {/* Space for hidden header */}

        {/* Page Title */}
        <h2 className="text-xl font-semibold mb-4">Financial Dashboard</h2>

        {/* KPI CARDS — horizontally scrollable row */}
        <div className="flex gap-4 overflow-x-auto mb-8 no-scrollbar">
          <Card style="card1">
            <div className="min-w-[140px] p-3 flex flex-col justify-center items-start">
              <span className="text-gray-600 text-xs">Total Income</span>
              <span className="font-semibold text-lg">
                ${formatCurrency(totalIncome)}
              </span>
            </div>
          </Card>

          <Card style="card1">
            <div className="min-w-[140px] p-3 flex flex-col justify-center items-start">
              <span className="text-gray-600 text-xs">Total Expense</span>
              <span className="font-semibold text-lg">
                ${formatCurrency(totalExpense)}
              </span>
            </div>
          </Card>

          <Card style="card1">
            <div className="min-w-[140px] p-3 flex flex-col justify-center items-start">
              <span className="text-gray-600 text-xs">Net Balance</span>
              <span className="font-semibold text-lg">
                ${formatCurrency(netBalance)}
              </span>
            </div>
          </Card>

          <Card style="card1">
            <div className="min-w-[140px] p-3 flex flex-col justify-center items-start">
              <span className="text-gray-600 text-xs">Recurring</span>
              <span className="font-semibold text-lg">
                {recurringActive} Active
              </span>
            </div>
          </Card>
        </div>

        {/* CHART SECTION */}
        <div className="mb-8">
          <h3 className="font-medium text-gray-700 mb-2 text-sm">
            Income / Expense
          </h3>
          <MoneyFlowChart variant="area" />
        </div>

        {/* RECENT INCOME */}
        <Card style="card1" className="mb-6">
          <div className="p-4">
            <h3 className="font-medium text-gray-700 mb-3 text-base">
              Recent Income
            </h3>
            <div className="space-y-2">
              {incomeSlice.map((r, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b border-gray-100 pb-2 text-sm"
                >
                  <span className="text-gray-600">{r.date}</span>
                  <span className="font-medium text-gray-800">
                    ${formatCurrency(r.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* RECENT EXPENSE */}
        <Card style="card1" className="mt-6">
          <div className="p-4">
            <h3 className="font-medium text-gray-700 mb-3 text-base">
              Recent Expense
            </h3>
            <div className="space-y-2">
              {expenseSlice.map((r, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b border-gray-100 pb-2 text-sm"
                >
                  <span className="text-gray-600">{r.date}</span>
                  <span className="font-medium text-gray-800">
                    ${formatCurrency(r.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* AI INSIGHTS */}
        <Card style="card1" className="mt-6">
          <div className="p-4">
            <h3 className="font-medium text-gray-700 mb-3 text-base">
              AI Insights
            </h3>
            <div className="h-[220px] border border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm text-center">
              <p>AI-generated insights will appear here.</p>
            </div>
          </div>
        </Card>
      </div>



    </>
  );
};

export default FinancialDashboard;
