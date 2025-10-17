import { Header } from "../header";
import { Sidebar } from "../sidebar";
import { DashboardContent } from "../dashboard-content";

// eslint-disable-next-line no-undef
export function DesktopLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Top Sidebar */}
      <Sidebar
        items={[
          { id: "dashboard", label: "Dashboard" },
          { id: "money-flow", label: "Money Flow" },
          { id: "my-work", label: "My Work" },
          { id: "settings", label: "Settings" },
        ]}
        activeItem="dashboard"
        onItemClick={() => {}}
        position="top"
      />

      {/* Bottom Sidebar */}
      <Sidebar
        items={[
          { id: "support", label: "Support & FAQ" },
          { id: "logout", label: "Log Out" },
        ]}
        activeItem="dashboard"
        onItemClick={() => {}}
        position="bottom"
      />

      {/* Main content area */}
      <main className="pt-5 md:pl-25 min-h-screen pb-24 md:pb-0">
        {children ? children : <DashboardContent />}
      </main>
    </>
  );
}
