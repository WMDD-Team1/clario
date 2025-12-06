/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import BalanceChart from "@/components/BalanceChart";
import { ExpensesTable } from "@/components/ExpensesTable";
import MoneyFlowAreaChart from "@/components/MoneyFlowAreaChart";
import { WelcomeBanner } from "@/components/WelcomeBanner";
import type { RootState } from "@/store";
import { RemindersList } from "./components/RemindersList";
import Overview from "./components/Overview";
import Insight from "./components/Insight";
import FormDrawer from "@/components/forms/FormDrawer";

export const Dashboard = () => {
  const { data: user } = useAppSelector((state: RootState) => state.user);

  const [activeTab, setActiveTab] = useState<
    "reminders" | "dashboard" | "insights"
  >("dashboard");

  const [showFirstTimeDrawer, setShowFirstTimeDrawer] = useState(false);
  useEffect(() => {
    if (!user) return; 

    const drawerKey = `hasOpenedFormDrawer_${user.id}`;

    const hasOpened = localStorage.getItem(drawerKey);

    if (!hasOpened) {
      setShowFirstTimeDrawer(true);
      localStorage.setItem(drawerKey, "true");
    }
  }, [user]);

  /** ---------------- MOBILE DASHBOARD ---------------- **/
  const renderDashboard = () => (
    <div className="flex flex-col w-full gap-4">
      <div className="grid grid-cols-2 gap-4 sm:gap-4">
        {[
          { label: "YTD Income", value: "$12,000" },
          { label: "YTD Expense", value: "$8,000" },
          { label: "YTD Taxes", value: "10" },
          { label: "Active Projects", value: "5" },
          { label: "Clients", value: "30" },
        ].map((stat, index, arr) => (
          <div
            key={index}
            className={`flex flex-col justify-center items-center py-3 bg-[var(--general-alpha)] backdrop-blur-sm rounded-2xl border border-[var(--sublight-2)]
              ${index === arr.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
          >
            <p className="font-normal text-[var(--tertiary-text)] text-sm">
              {stat.label}
            </p>
            <p className="text-lg font-bold text-[var(--brand-alpha)]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <BalanceChart />
      <ExpensesTable />
      <MoneyFlowAreaChart />
    </div>
  );

  const renderReminders = () => (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto px-0 md:px-4">
      <RemindersList />
    </div>
  );

  const renderInsights = () => (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto px-0 md:px-4">
      <Insight />
    </div>
  );

  return (
    <>
      <style>
        {`
          /* Hide FormDrawer default header */
          .opening-drawer .bg-[var(--background-alternate)] {
            display: none !important;
          }

          /* Hide FormDrawer chevron button */
          .opening-drawer .absolute.w-12.h-12 {
            display: none !important;
          }

          /* Remove FormDrawer content padding + margin */
          .opening-drawer .flex-1 {
            padding: 0 !important;
            margin: 0 !important;
            overflow-y: visible !important;
          }

          /* Make drawer scroll naturally */
          .opening-drawer .fixed.right-0.top-0.h-full {
            overflow-y: auto !important;
          }

          /* Remove extra spacing around content wrapper */
          .opening-drawer .flex.flex-col.w-full.h-full {
            padding: 0 !important;
            margin: 0 !important;
          }
        `}
      </style>

      {/* DESKTOP HEADER */}
      <div className="sticky top-33 z-99 bg-[var(--full-bg)] backdrop-blur-sm hidden sm:block shadow-[0_10px_10px_-10px_rgba(0,0,0,0.1)]">
        <WelcomeBanner userName={user?.name || "User"} />
      </div>

      {/* DESKTOP PAGE */}
      <div className="hidden sm:block w-full mx-auto">
        <div className="flex flex-col w-full gap-4 overflow-hidden">
          <div className="flex flex-col xl:flex-row gap-4 w-full items-start">
            <div className="flex flex-col flex-1 gap-4">
              <Overview />

              <div className="flex flex-col lg:flex-row gap-4 w-full">
                <div className="flex flex-col lg:w-[39%] gap-4">
                  <Insight />
                </div>

                <div className="flex flex-col flex-1 gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <BalanceChart />
                    <ExpensesTable />
                  </div>
                  <MoneyFlowAreaChart />
                </div>
              </div>
            </div>

            <div className="flex flex-col xl:min-w-[25%] gap-4">
              <h3 className="font-semibold text-2xl text-[var(--primary-text)]">
                Reminders
              </h3>
              <RemindersList />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="block sm:hidden w-full max-w-[1440px] mx-auto">
        <div className="text-[28px] mt-4">
          <WelcomeBanner userName={user?.name || "User"} />
        </div>

        <div className="flex justify-center w-full mt-4 mb-6">
          <div className="flex bg-[var(--general-alpha)] h-[50px] rounded-xl p-1 w-full justify-between">
            {["insights", "dashboard", "reminders"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-[var(--background-toggle-active)] text-[var(--general-alpha)] h-[40px]"
                    : "text-[var(--background-focus)]"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "reminders" && renderReminders()}
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "insights" && renderInsights()}
      </div>

      <div className="opening-drawer">
        <FormDrawer
          title="Your Smart Workspace Awaits"
          isOpen={showFirstTimeDrawer}
          onClose={() => setShowFirstTimeDrawer(false)}
          divRef={undefined}
        >
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-col items-center text-center px-0">
              <h2 className="text-[32px] font-semibold text-[var(--secondary-text)] mb-3">
                Welcome to Clario!
              </h2>

              <img
                src="/src/assets/icons/client-upload-success.svg"
                alt="Success Icon"
                className="w-[90px] h-[90px] mb-4"
              />

              <p className="text-[var(--secondary-text)] text-[14px] leading-relaxed max-w-[420px]">
                You’ve just unlocked a smarter way to manage your projects,
                contracts and finances — all in one place.
              </p>

              <p className="mt-6 text-[var(--secondary-text)] text-[14px] font-semibold leading-relaxed max-w-[420px]">
                You're looking at a preview of your future dashboard full of insights,
                trends, and the freedom that comes from being in control.
              </p>

              <p className="mt-10 text-[18px] font-semibold text-[var(--primary-text)]">
                Ready to see your real story take shape?
              </p>

              <p className="text-[var(--primary-text)] text-[14px] mt-2 max-w-[420px] mb-16">
                Upload your first contract or log your first project — and watch
                Clario turn your work into measurable success.
              </p>
            </div>

            <div className="w-full bg-[var(--background-alternate)] p-6 rounded-bl-[40px]">
              <button
                className="w-full py-4 bg-[var(--primitive-colors-brand-primary-500-base)] text-white text-[16px] font-semibold rounded-xl shadow-lg hover:bg-blue-600 transition"
                onClick={() => setShowFirstTimeDrawer(false)}
              >
                Let’s Get Started!
              </button>
            </div>
          </div>
        </FormDrawer>
      </div>
    </>
  );
};

export default Dashboard;
