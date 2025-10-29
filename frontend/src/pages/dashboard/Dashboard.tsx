/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppSelector } from '@/store/hooks';
import Card from '@/components/Card';
import BalanceChart from '@components/BalanceChart';
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

  const renderDashboard = () => (
    <div className="flex flex-col gap-6">
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
        <BalanceChart />
      </Card>

      <Card style="card1">
        <MoneyFlowAreaChart />
      </Card>

      <Card style="card1">
        <ExpensesTable />
      </Card>
    </div>
  );

  return (
    <>
      {/* === DESKTOP VIEW (unchanged) === */}
      <div className="hidden sm:block">
        <div className="flex flex-col gap-6 w-full overflow-hidden">
          {/* Welcome */}
          <WelcomeBanner userName={user?.name || 'User'} />

          {/* === Main Body (Left + Center + Right) === */}
          <div className="flex flex-col xl:flex-row gap-6">
            {/* ==== Left + Center Section ==== */}
            <div className="flex flex-col flex-1 min-w-0 gap-6">
              {/* --- Top Stats Row --- */}
              <Overview />
              {/* --- Insights + Charts Row --- */}
              <div className="flex flex-col lg:flex-row gap-6 w-full">
                {/* Insights (Left) */}
                <Insight />
                {/* Charts (Center) */}
                <div className="flex flex-col flex-[1.2] gap-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <BalanceChart />
                    </div>
                    <div className="flex-1">
                      <ExpensesTable />
                    </div>
                  </div>
                  <div>
                    <MoneyFlowAreaChart />
                  </div>
                </div>
              </div>
            </div>

            {/* ==== Right Column - Reminders ==== */}
            <div className="flex flex-col w-full xl:w-[26%] gap-4">
              <RemindersList />
            </div>
          </div>
        </div>
      </div>

      {/* === MOBILE VIEW (≤580px) === */}
      <div className="block sm:hidden px-4 pb-10">
        {/* Placeholder for hidden header */}
        <div className="h-10"></div>

        <h2>Hi {user?.name || 'User'}, Welcome Back</h2>

        {/* Toggle */}
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

        {/* Content */}
        {activeTab === 'reminders' && <RemindersList />}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'insights' && <Insight />}
      </div>
    </>
  );
};

export default Dashboard;
