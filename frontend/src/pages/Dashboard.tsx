import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout as logoutSliceAction } from "@/store/userSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { useMediaQuery } from "react-responsive";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { MobileHeader } from "@/components/dashboard/mobile-header";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { MobileToggle, TabKey } from "@/components/dashboard/mobile-toggle";
import { IncomeExpenseChart } from "@/components/financial/IncomeExpenseChart";
import { AIInsights } from "@/components/dashboard/ai-insights";
import { Reminders } from "@/components/dashboard/reminders";
import type { RootState } from "@/store";

export const Dashboard = () => {
  const { user, logout } = useAuth0();
  const dispatch = useAppDispatch();
  const { data: appUser, loading, error } = useAppSelector(
    (state: RootState) => state.user
  );

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isDevMode = window.location.pathname === "/dev-dashboard";

  // Handle loading and auth
  if (!isDevMode) {
    if (loading) return <p>Loading Dashboard...</p>;
    if (error) return <p>Error getting your user: {error}</p>;
    if (!appUser) return <p>No user found</p>;
  }

  const handleLogout = () => {
    dispatch(logoutSliceAction());
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  if (isMobile) {
    const [activeTab, setActiveTab] = useState<TabKey>("dashboard");

    return (
      <div className="flex flex-col min-h-screen bg-gray-50 pb-28">
        {/* Sticky header + segmented toggle */}
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <MobileHeader title="Dashboard" />
          <div className="px-4 pb-3">
            <MobileToggle value={activeTab} onChange={setActiveTab} />
          </div>
        </div>

        {/* Tab content */}
        <main className="flex-1 px-4 py-4 space-y-6">
          {activeTab === "insights" && <AIInsights />}

          {activeTab === "dashboard" && (
            <>
              {/* Cards row (Income, Expense, Clients, Active Projects, Completed) */}

              {/* “This Month Balance” / “Money Flow” */}
              <section aria-label="This Month Balance">

              </section>
            </>
          )}

          {activeTab === "reminders" && <Reminders />}
        </main>

        {/* Bottom nav */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
          <MobileNav />
        </div>
      </div>
    );
  }
  return <DashboardLayout />;
};
