import type { ReactNode } from "react"

interface StatCardProps {
  title: string
  value: ReactNode
}

export function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
      <p className="text-gray-500 text-sm">{title}</p>
      <div className="mt-2 text-2xl font-semibold text-gray-900">{value}</div>
    </div>
  )
}
