import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface DashboardShellProps {
  children: React.ReactNode;
}

const DashboardShell: React.FC<DashboardShellProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gray-50">

      {/* === Main Content === */}
      <main className="sm:pl-[150px] sm:pt-[150px] pr-6 pb-6 bg-[#F5F9FF] min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default DashboardShell;
