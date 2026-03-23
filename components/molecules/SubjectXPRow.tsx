import { ReactNode } from "react"

interface SubjectXPRowProps {
  icon: ReactNode
  subject: string
  xp: number
}

const MAX_XP = 500

export default function SubjectXPRow({ icon, subject, xp }: SubjectXPRowProps) {
  const pct = Math.min((xp / MAX_XP) * 100, 100)

  const barColor =
    subject.toLowerCase().includes("formal")  ? "bg-blue-400"
    : subject.toLowerCase().includes("natural") ? "bg-emerald-400"
    : "bg-orange-400"

  return (
    <div className="flex items-center gap-3 py-2.5">
      {/* Icon */}
      <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 text-base">
        {icon}
      </div>

      {/* Bar + label */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-xs font-semibold text-gray-700 truncate">{subject}</p>
          <p className="text-xs font-bold text-gray-500 ml-2 flex-shrink-0">{xp} XP</p>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${barColor} transition-all duration-700`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}