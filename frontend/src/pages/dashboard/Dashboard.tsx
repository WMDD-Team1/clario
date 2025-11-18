/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppSelector } from '@/store/hooks';
import BalanceChart from '@/components/BalanceChart';
import { ExpensesTable } from '@/components/ExpensesTable';
import MoneyFlowAreaChart from '@/components/MoneyFlowAreaChart';
import { WelcomeBanner } from '@/components/WelcomeBanner';
import type { RootState } from '@/store';
import { RemindersList } from './components/RemindersList';
import Overview from './components/Overview';
import Insight from './components/Insight';

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
    <div className="flex flex-col w-full gap-4">
      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4 sm:gap-4">
        {[
          { label: 'Income', value: '$12,000' },
          { label: 'Expense', value: '$8,000' },
          { label: 'Completed', value: '10' },
          { label: 'Active Projects', value: '5' },
          { label: 'Clients', value: '30' },
        ].map((stat, index, arr) => (
          <div
            key={index}
            className={`flex flex-col justify-center items-center py-3 bg-white backdrop-blur-sm rounded-2xl hover:shadow-lg border border-gray-100 
        ${index === arr.length - 1 ? 'col-span-2 sm:col-span-1' : ''}`}
          >
            <p className="font-normal text-[var(--tertiary-text)] text-sm">{stat.label}</p>
            <p className="text-lg font-bold text-[var(--brand-alpha)]">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className=" flex bg-transparent rounded-2xl item-center justify-center w-full sm:px-0 px-0 overflow-hidden">
        <BalanceChart />
      </div>

      <div className="flex bg-transparent rounded-2xl justify-center w-full overflow-hidden">
        <ExpensesTable />
      </div>

      <div className="flex bg-transparent rounded-2xl justify-center w-full overflow-hidden">
        <MoneyFlowAreaChart />
      </div>
    </div>
  );

  const renderReminders = () =>
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto px-0 md:px-4">
      <RemindersList />
    </div>
  const renderInsights = () =>
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto px-0 md:px-4">
      <Insight />
    </div>

  /** ---------------- DESKTOP DASHBOARD ---------------- **/
  return (
    <>
      <div className="sticky top-35 z-99 bg-[color-mix(in_srgb,var(--background),transparent_10%)] hidden sm:block">
        <div className="w-full max-w-[1440px] mx-auto">
          <WelcomeBanner userName={appUser?.name || 'User'} />
        </div>
      </div>

      <div className="hidden sm:block w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col w-full gap-4 overflow-hidden">
          <div className="flex flex-col xl:flex-row gap-4 w-full items-start font-['Red_Hat_Display']">
            {/* LEFT SECTION */}
            <div className={`flex flex-col flex-1 gap-4 xl:min-w-0 lg:min-w-[100%] sm:min-w-[100%]`}>
              <Overview />

              <div className="flex flex-col lg:flex-row gap-4 w-full items-stretch ">
                <div className="flex flex-col lg:w-[39%] xl:w-[39%] gap-4">
                  <Insight />
                </div>

                <div className="flex flex-col flex-1 gap-4 min-w-0">
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full">
                    <div className="min-w-0 md:min-w-[50%]">
                      <BalanceChart />
                    </div>
                    <div className="min-w-0 md:min-w-[50%]">
                      <ExpensesTable />
                    </div>
                  </div>
                  <MoneyFlowAreaChart />
                </div>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex flex-col sm:min-w-[100%] md:min-w-[100%] xl:min-w-[25%] gap-4">
              <h3 className="font-semibold text-2xl text-[var(--primary-text)]">Reminders</h3>
              <RemindersList />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="block sm:hidden w-full max-w-[1440px] mx-auto">
        <p className="text-[28px] font-semibold mt-4 mb-2">
          <WelcomeBanner userName={appUser?.name || 'User'} />
        </p>

        {/* Toggle Buttons */}
        <div className="flex justify-center w-full mt-4 mb-6">
          <div className="flex bg-[var(--general-alpha)] text-[var(--background-focus)] rounded-xl p-1 w-full max-w-md justify-between">
            {['insights', 'dashboard', 'reminders'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-2 rounded-xl text-[var(--background-focus)] text-sm font-medium transition-all ${activeTab === tab
                  ? 'bg-[var(--background-unfocused-toggle)] text-[var(--background-toggle2)] shadow-md'
                  : 'text-[var(--background-focus)]'
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