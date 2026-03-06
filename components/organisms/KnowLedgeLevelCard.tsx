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

export default function KnowledgeLevelCard({ level, subjects }: KnowledgeLevelCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <p className="text-center text-sm font-semibold text-gray-600 mb-3">
        Knowladge level :{" "}
        <span className="font-bold text-gray-800">{level}</span>
      </p>
      <div className="flex flex-col">
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