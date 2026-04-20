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
  name, email, avatarSrc,
  totalXP, streakDays, totalAchievements,
  knowledgeLevel, subjects,
  onEditProfile, onBack,
}: AccountTemplateProps) {
  return (
    <div className="min-h-screen bg-[#62A2F3] relative overflow-hidden mt-4">

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-40 -left-20 w-48 h-48 rounded-full bg-cyan-300/15 blur-3xl" />
      </div>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-16 pb-6">
        <button
          onClick={onBack}
          className="cursor-pointer w-9 h-9 bg-white/20 hover:bg-white/30 active:bg-white/40 border border-white/20 rounded-full flex items-center justify-center transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h1 className="text-lg font-bold text-white tracking-wide">My Account</h1>

        {/* Spacer to center title */}
        <div className="w-9" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 pb-12 max-w-lg mx-auto space-y-3">

        {/* Profile card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/10 overflow-hidden">
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

        {/* Knowledge level */}
        <KnowledgeLevelCard level={knowledgeLevel} subjects={subjects} />
      </div>
    </div>
  )
}