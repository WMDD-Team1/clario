import React from "react"
import classNames from "classnames"

export type TabKey = "insights" | "dashboard" | "reminders"

interface Props {
  value: TabKey
  onChange: (v: TabKey) => void
}

const LABELS: Record<TabKey, string> = {
  insights: "Insights",
  dashboard: "Dashboard",
  reminders: "Reminders",
}

export function MobileToggle({ value, onChange }: Props) {
  const keys: TabKey[] = ["insights", "dashboard", "reminders"]

  return (
    <div className="md:hidden w-full mt-3 px-4">
      <div
        className="bg-[#2a2a2a] rounded-2xl p-1 inline-flex w-full justify-between"
        role="tablist"
        aria-label="Mobile section switcher"
      >
        {keys.map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={value === k}
            className={classNames(
              "flex-1 px-4 py-2 rounded-xl text-sm font-medium transition",
              value === k
                ? "bg-white text-gray-900"
                : "text-white/80 hover:text-white"
            )}
            onClick={() => onChange(k)}
          >
            {LABELS[k]}
          </button>
        ))}
      </div>
    </div>
  )
}
