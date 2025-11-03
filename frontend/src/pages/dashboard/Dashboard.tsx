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

  /** ---------------- MOBILE DASHBOARD ---------------- **/
  const renderDashboard = () => (
    <div className="flex flex-col gap-6">
      {/* Stats Section */}
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
            className="flex flex-col justify-center items-center py-3 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100"
          >
            <p className="font-semibold text-gray-600 text-sm">{stat.label}</p>
            <p className="text-lg font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="bg-transparent rounded-2xl overflow-hidden">
        <BalanceChart data={balanceData} />
      </div>

      <div className="bg-transparent rounded-2xl overflow-hidden">
        <ExpensesTable expenses={expenses} />
      </div>

      <div className="bg-transparent rounded-2xl overflow-hidden">
        <MoneyFlowAreaChart data={flowData} />
      </div>
    </div>
  );

  const renderReminders = () => <RemindersList />;
  const renderInsights = () => <Insight />;

  /** ---------------- DESKTOP DASHBOARD ---------------- **/
  return (
    <>
      {/* DESKTOP VIEW */}
      <div className="hidden sm:block">
        <div className="flex flex-col w-full gap-4 overflow-hidden">
          <WelcomeBanner userName={user?.name || 'User'} />

          <div className="flex flex-col xl:flex-row gap-6 w-full items-start">
            {/* LEFT SECTION */}
            <div className="flex flex-col flex-1 gap-6 min-w-0">
              <Overview />

              <div className="flex flex-col lg:flex-row gap-4 w-full items-stretch">
                <div className="flex flex-col lg:w-[39%] xl:w-[39%] gap-4">
                  <Insight />
                </div>

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

            {/* RIGHT SECTION */}
            <div className="flex flex-col xl:w-[25%] gap-4">
              <RemindersList />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="block sm:hidden px-4 pb-10">
        <div className="h-10"></div>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          Hi {user?.name || 'User'}, Welcome Back
        </h2>

        {/* Toggle Buttons */}
        <div className="flex justify-center w-full mt-4 mb-6">
          <div className="flex bg-white text-[#02357C] rounded-xl p-1 w-full max-w-md justify-between">
            {['insights', 'dashboard', 'reminders'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-2 rounded-xl text[#02357C] text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-[#0665EC] text-white shadow-md'
                    : 'text-[#02357C] hover:text-white'
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
        {activeTab === 'insights' && renderInsights()}
      </div>
    </>
  );
};

export default Dashboard;
