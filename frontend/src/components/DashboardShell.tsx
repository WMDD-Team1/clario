import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface DashboardShellProps {
  children: React.ReactNode;
}

const DashboardShell: React.FC<DashboardShellProps> = ({ children }) => {
return (
  <div className="relative min-h-screen bg-gray-50">
    {/* Header fixed at top, full width */}
    <div className="fixed top-0 left-0 right-0 z-50">
      <Header />
    </div>
    {/* Sidebar fixed below the header */}
    <div className="fixed top-[150px] left-0 h-[calc(100vh-80px)] z-40">
      <Sidebar />
    </div>

    {/* Main content area */}
    <main className="pl-[150px] pt-[150px] pr-6 pb-6 bg-gray-50 min-h-screen">
      {children}
    </main>
  </div>
);

};

export default DashboardShell;
