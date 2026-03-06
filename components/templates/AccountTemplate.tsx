import ProfileHeader from "@/components/organisms/ProfileHeader"
import StatsCard from "@/components/organisms/StatsCard"
import KnowledgeLevelCard from "@/components/organisms/KnowLedgeLevelCard"
import { ReactNode } from "react"

interface Subject {
  icon: ReactNode
  name: string
  xp: number
}

interface AccountTemplateProps {
  name: string
  email: string
  avatarSrc: string
  totalXP: number
  streakDays: number
  totalAchievements: number
  knowledgeLevel: string
  subjects: Subject[]
  onEditProfile?: () => void
  onBack?: () => void
}

export default function AccountTemplate({
  name,
  email,
  avatarSrc,
  totalXP,
  streakDays,
  totalAchievements,
  knowledgeLevel,
  subjects,
  onEditProfile,
  onBack,
}: AccountTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-cyan-300 pt-20 pb-10 px-4">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-20 left-4 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page Title */}
      <h1 className="text-center text-2xl font-bold text-white mb-6">Account</h1>

      {/* Content Card */}
      <div className="max-w-lg mx-auto space-y-4">
        {/* Profile Header */}
        <div className="bg-white/95 rounded-2xl shadow-sm px-5 py-4">
          <ProfileHeader
            name={name}
            email={email}
            avatarSrc={avatarSrc}
            onEditProfile={onEditProfile}
          />
        </div>

        {/* Stats */}
        <StatsCard
          totalXP={totalXP}
          streakDays={streakDays}
          totalAchievements={totalAchievements}
        />

        {/* Knowledge Level */}
        <KnowledgeLevelCard level={knowledgeLevel} subjects={subjects} />
      </div>
    </div>
  )
}