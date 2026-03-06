import XPChip from "@/components/atoms/XPChip"
import { ReactNode } from "react"

interface SubjectXPRowProps {
  icon: ReactNode
  subject: string
  xp: number
}

export default function SubjectXPRow({ icon, subject, xp }: SubjectXPRowProps) {
  return (
    <div className="flex items-center gap-3 py-3 px-1 border-b border-gray-100 last:border-0">
      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <span className="flex-1 text-sm font-medium text-gray-700">{subject}</span>
      <XPChip value={xp} />
    </div>
  )
}