/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppSelector } from '@/store/hooks';
import Card from '@/components/Card';
import  BalanceChart  from '@/components/BalanceChart';
import { ExpensesTable } from '@/components/ExpensesTable';
import MoneyFlowAreaChart from '@/components/MoneyFlowAreaChart';
import { Sparkles } from 'lucide-react';
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
    { name: 'May', income: 1000, expense: 800 },
    { name: 'Jun', income: 2000, expense: 1200 },
    { name: 'Jul', income: 1500, expense: 1000 },
    { name: 'Aug', income: 3000, expense: 2000 },
    { name: 'Sep', income: 2700, expense: 2300 },
    { name: 'Oct', income: 3100, expense: 2500 },
  ];

  const expenses = [
    { label: 'Office Rent', date: '10/20/2025', amount: 'CAD 800' },
    { label: 'Other', date: '10/17/2025', amount: 'CAD 400' },
    { label: 'Internet', date: '10/21/2025', amount: 'CAD 140' },
    { label: 'Usability Test', date: '10/25/2025', amount: 'CAD 130' },
  ];

  const reminders = [
    { title: 'Rebranding - ACME', client: 'ACME INC', dueDate: '10/11/2025' },
    { title: 'Content - Clario', client: 'NorthFace', dueDate: '10/14/2025' },
    { title: 'Web Development - Clario', client: 'Arvo', dueDate: '10/20/2025' },
    { title: 'Branding - PropEase', client: 'PropEase', dueDate: '10/21/2025' },
    { title: 'Web Redesign - Langara', client: 'Langara', dueDate: '10/23/2025' },
    { title: 'UX Research - Pet Care', client: 'Pet Care', dueDate: '10/25/2025' },
  ];

  //Mobile View
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
                <Sparkles className="w-3 h-3 " />
                {item.title}
              </div>
              <span className="text-xs font-semibold text-gray-600">{item.period}</span>
            </div>
            <p className="text-xs text-gray-600 leading-snug">{item.text}</p>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <>
      {/* DESKTOP VIEW */}
      <div className="hidden sm:block">
        <div className="flex flex-col gap-6 w-full overflow-hidden">
          {/* Welcome */}
          <WelcomeBanner userName={user?.name || 'User'} />

          {/* Main Body (Left + Center + Right) */}
          <div className="flex flex-col xl:flex-row gap-6">
            {/* Left + Center Section */}
            <div className="flex flex-col flex-1 min-w-0 gap-2">
              {/* Top Stats Row */}
              <Overview />
              {/* Insights + Charts Row */}
              <div className="flex flex-col lg:flex-row gap-4 w-full">
                {/* Insights (Left) */}
                <Insight />
                {/* Charts (Center) */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col flex-wrap md:flex-row gap-4">
                    <div className="flex-1">
                      <BalanceChart data={balanceData} />
                    </div>
                    <div className="flex-1">
                      <ExpensesTable expenses={expenses} />
                    </div>
                  </div>
                  <div>
                    <MoneyFlowAreaChart data={flowData} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Reminders */}
            <div className="flex flex-col w-full xl:w-[26%] gap-4">
              <RemindersList />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="block sm:hidden px-4 pb-10">
        {/* Placeholder for hidden header */}
        <div className="h-10"></div>

        <h2 className="text-xl font-semibold mt-4 mb-2">Hi {user?.name || 'User'}, Welcome Back</h2>

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
        {activeTab === 'reminders' && renderReminders()}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'insights' && renderInsights()}
      </div>
    </>
  );
};

export default Dashboard;
