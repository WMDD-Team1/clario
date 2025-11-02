/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppSelector } from '@/store/hooks';
import Card from '@/components/Card';
import BalanceChart from '@/components/BalanceChart';
import { ExpensesTable } from '@/components/ExpensesTable';
import MoneyFlowAreaChart from '@/components/MoneyFlowAreaChart';
import { WelcomeBanner } from '@/components/WelcomeBanner';
import type { RootState } from '@/store';
import { RemindersList } from './components/RemindersList';
import Overview from './components/Overview';
import Insight from './components/Insight';
import { Sparkles } from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth0();
  const { data: appUser } = useAppSelector((state: RootState) => state.user);
  const [activeTab, setActiveTab] = useState<'reminders' | 'dashboard' | 'insights'>('dashboard');

  const balanceData = [
    { name: 'Expense', value: 2000, color: '#9CA3AF' },
    { name: 'Balance', value: 3250, color: '#4B5563' },
  ];
  const flowData = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mar', income: 2000, expense: 9800 },
];

const expenses = [
  { id: 1, category: 'Rent', amount: 1200 },
  { id: 2, category: 'Groceries', amount: 300 },
];

  //Mobile View
  const renderDashboard = () => (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {[
          { label: 'Income', value: '$12,000' },
          { label: 'Expense', value: '$8,000' },
          { label: 'Completed', value: '10' },
          { label: 'Active Projects', value: '5' },
          { label: 'Clients', value: '30' },
        ].map((stat, index) => (
          <div
            key={index}
            className="flex-1 min-w-[150px] flex flex-col justify-center items-center py-3 rounded-2xl shadow-sm border border-gray-100 bg-white"
          >
            <p className="font-semibold text-gray-600 text-sm">{stat.label}</p>
            <p className="text-lg font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <Card style="card1">
        <BalanceChart data={balanceData} />
      </Card>

      <Card style="card1">
        <MoneyFlowAreaChart data={flowData} />
      </Card>

      <Card style="card1">
        <ExpensesTable expenses={expenses} />
      </Card>
    </div>
  );

  const renderReminders = () => <RemindersList />;

  const renderInsights = () => (
    <div className="flex flex-col gap-3">
      {[
        {
          title: 'Earning Trend',
          period: 'This Month',
          text: "Your income grew 18% compared to last month mostly from Project A. You're trending toward a more stable cashflow.",
        },
        {
          title: 'Client Dependency',
          period: 'This Month',
          text: '75% of your total income came from a single client this month — consider diversifying your portfolio.',
        },
        {
          title: 'Income Projection',
          period: 'Next Month',
          text: 'You have $2,800 in confirmed recurring income for the next 30 days.',
        },
        {
          title: 'Payment Timeliness',
          period: 'Next Month',
          text: 'Client B usually pays 8 days late — consider updating your contract terms.',
        },
      ].map((item, idx) => (
        <Card key={idx} style="card1">
          <div className="py-3 px-4 rounded-xl bg-white width-full">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2 bg-white text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                <Sparkles className="w-3 h-3" />
                {item.title}
              </div>
              <span className="text-xs font-semibold">{item.period}</span>
            </div>
            <p className="text-xs text-gray-600 leading-snug">{item.text}</p>
          </div>
        </Card>
      ))}
    </div>
  );

  // Desktop layout reorganized to match final design
  return (
    <>

      {/* DESKTOP VIEW */}
      <div className="hidden sm:block">
        <div className="flex flex-col w-full gap-4 overflow-hidden">
          {/* Welcome Section */}
          <WelcomeBanner userName={user?.name || 'User'} />

          {/* MAIN GRID — Overview + Insights + Charts (Left), Reminders (Right) */}
          <div className="flex flex-col xl:flex-row gap-6 w-full items-start">
            {/* LEFT SECTION (Main content area) */}
            <div className="flex flex-col flex-1 gap-6 min-w-0">
              {/* Overview Row – stays inside left section only */}
              <Overview />

            {/* Insights + Charts Row */}
            <div className="flex flex-col lg:flex-row gap-4 w-full items-stretch">
              {/* LEFT COLUMN – Insights */}
              <div className="flex flex-col lg:w-[39%] xl:w-[39%] gap-4">
                <Insight />
              </div>

              {/* CENTER COLUMN – Charts + Expenses + Money Flow */}
              <div className="flex flex-col flex-1 gap-6 min-w-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="min-w-0">
                    <BalanceChart data={balanceData} />
                  </div>
                  <div className="min-w-0">
                    <ExpensesTable expenses={expenses} />
                  </div>
                </div>

                <MoneyFlowAreaChart data={flowData} />
              </div>
            </div>
            </div>

            {/* RIGHT COLUMN – Reminders */}
            <div className="flex flex-col xl:w-[25%] gap-4">
              <RemindersList />
            </div>
          </div>
        </div>
      </div>




      {/* MOBILE VIEW */}
      <div className="block sm:hidden px-4 pb-10">
        {/* Placeholder header spacing */}
        <div className="h-10"></div>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          Hi {user?.name || 'User'}, Welcome Back
        </h2>

        {/* Toggle Buttons */}
        <div className="flex justify-center w-full mt-4 mb-6">
          <div className="flex bg-gray-800 text-white rounded-full p-1 w-full max-w-md justify-between">
            {['insights', 'dashboard', 'reminders'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Conditional Content */}
        {activeTab === 'reminders' && renderReminders()}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'insights' && <Insight />}
      </div>
    </>
  );
};

export default Dashboard;
