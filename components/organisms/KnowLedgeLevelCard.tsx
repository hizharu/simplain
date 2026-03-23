import SubjectXPRow from "@/components/molecules/SubjectXPRow"
import { ReactNode } from "react"

interface Subject {
  icon: ReactNode
  name: string
  xp: number
}

interface KnowledgeLevelCardProps {
  level: string
  subjects: Subject[]
}

const levelConfig: Record<string, { color: string; bg: string; bar: string; emoji: string }> = {
  Beginner:     { color: "text-gray-500",   bg: "bg-gray-100",   bar: "bg-gray-400",   emoji: "🌱" },
  Elementary:   { color: "text-blue-500",   bg: "bg-blue-50",    bar: "bg-blue-400",   emoji: "📘" },
  Intermediate: { color: "text-cyan-600",   bg: "bg-cyan-50",    bar: "bg-cyan-400",   emoji: "⚡" },
  Advanced:     { color: "text-violet-600", bg: "bg-violet-50",  bar: "bg-violet-400", emoji: "🚀" },
  Proficient:   { color: "text-amber-600",  bg: "bg-amber-50",   bar: "bg-amber-400",  emoji: "🏆" },
}

const levelOrder = ["Beginner", "Elementary", "Intermediate", "Advanced", "Proficient"]

export default function KnowledgeLevelCard({ level, subjects }: KnowledgeLevelCardProps) {
  const config = levelConfig[level] ?? levelConfig.Beginner
  const levelIndex = levelOrder.indexOf(level)
  const progress = ((levelIndex + 1) / levelOrder.length) * 100

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/10 p-5">
      {/* Section label */}
      <p className="text-[10px] font-bold tracking-widest text-gray-300 uppercase mb-4">Knowledge</p>

      {/* Level badge + progress */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-10 h-10 rounded-2xl ${config.bg} flex items-center justify-center text-lg`}>
            {config.emoji}
          </div>
          <div>
            <p className="text-[11px] text-gray-400 font-medium">Current Level</p>
            <p className={`text-base font-bold ${config.color}`}>{level}</p>
          </div>
        </div>

        {/* Level step indicators */}
        <div className="flex gap-1">
          {levelOrder.map((l, i) => (
            <div
              key={l}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i <= levelIndex
                  ? `${config.bar} ${i === levelIndex ? "w-4" : "w-1.5"}`
                  : "bg-gray-100 w-1.5"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-5">
        <div
          className={`h-full rounded-full ${config.bar} transition-all duration-700`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 mb-4" />

      {/* Subject rows */}
      <p className="text-[10px] font-bold tracking-widest text-gray-300 uppercase mb-3">By Subject</p>
      <div className="space-y-1">
        {subjects.map((subject, i) => (
          <SubjectXPRow
            key={i}
            icon={subject.icon}
            subject={subject.name}
            xp={subject.xp}
          />
        ))}
      </div>
    </div>
  )
}