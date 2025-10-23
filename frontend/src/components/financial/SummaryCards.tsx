import React from "react";
import { StatCard } from "../dashboard/stat-card";

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Income" value="$12,000" />
      <StatCard title="Total Expense" value="$6,000" />
      <StatCard title="Net Balance" value="$6,000" />
      <StatCard title="Recurring" value="5 Active" />
    </div>
  );
}
