import React from "react";
import DashboardHeader from "./DashboardHeader";

interface MobileHeaderProps {
  title?: string;
}

export function MobileHeader({ title }: MobileHeaderProps) {
  return (
    <header className="md:hidden flex flex-col items-start px-4 pt-4">
      {/* Top bar */}
      <div className="w-full flex justify-between items-center bg-gray-200 rounded-2xl px-5 py-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-white" />
        <span className="text-lg font-semibold">{title ?? "Dashboard"}</span>
        <div className="w-10 h-10 rounded-full bg-black" />
      </div>

      {/* Greeting */}
      <DashboardHeader name="Arlette" />
    </header>
  );
}
