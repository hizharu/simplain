import { ReactNode } from "react"

interface StatBadgeProps {
  icon: ReactNode
  label: string
  value: string | number
}

export default function StatBadge({ icon, label, value }: StatBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-semibold text-gray-700">
        {label} : <span className="font-bold">{value}</span>
      </span>
    </div>
  )
}