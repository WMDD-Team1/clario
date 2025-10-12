import type { ReactNode } from "react"

interface StatCardProps {
  icon: ReactNode
  label: string
  value: string | number
  className?: string
}

export function StatCard({ icon, label, value, className = "" }: StatCardProps) {
  return (
    <div className={`bg-gray-100 rounded-2xl p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">{icon}</div>
        <span className="text-gray-600 text-sm font-mono">{label}</span>
      </div>
      <div className="text-3xl font-semibold font-mono">{value}</div>
    </div>
  )
}
