import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface DashboardShellProps {
  children: React.ReactNode;
}

const DashboardShell: React.FC<DashboardShellProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* === Header === */}
      <div className="hidden sm:block fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* === Sidebar === */}
      <div className="hidden sm:block fixed top-[150px] left-0 h-[calc(100vh-80px)] z-40">
        <Sidebar />
      </div>

      {/* === Main Content === */}
      <main className="sm:pl-[150px] sm:pt-[150px] pr-6 pb-6 bg-[#F5F9FF] min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default DashboardShell;
