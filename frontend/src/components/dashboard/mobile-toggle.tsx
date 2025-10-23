import React from "react"
import classNames from "classnames"

export type TabKey = "insights" | "dashboard" | "reminders"

interface Props {
  value: TabKey
  onChange: (v: TabKey) => void
}

// Order: Insights, Dashboard, Reminders (matches the design)
const LABELS: Record<TabKey, string> = {
  insights: "Insights",
  dashboard: "Dashboard",
  reminders: "Reminders",
};

export function MobileToggle({ value, onChange }: Props) {
  return (
    <div className="w-full">
      <div className="bg-gray-800 text-white rounded-2xl p-1 flex gap-1">
        {(["insights", "dashboard", "reminders"] as TabKey[]).map((k) => (
          <button
            key={k}
            className={classNames(
              "flex-1 px-4 py-2 rounded-xl text-sm font-medium transition",
              value === k ? "bg-white text-gray-900" : "text-white/80 hover:text-white"
            )}
            onClick={() => onChange(k)}
            type="button"
          >
            {LABELS[k]}
          </button>
        ))}
      </div>
    </div>
  );
}
