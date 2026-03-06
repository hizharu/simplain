import StatBadge from "@/components/atoms/StatBadge"

interface StatsCardProps {
  totalXP: number
  streakDays: number
  totalAchievements: number
}

export default function StatsCard({ totalXP, streakDays, totalAchievements }: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-around">
      <StatBadge icon="🏆" label="Total XP" value={totalXP} />
      <div className="w-px h-10 bg-gray-100" />
      <StatBadge icon="🔥" label="Streak" value={`${streakDays} days`} />
      <div className="w-px h-10 bg-gray-100" />
      <StatBadge icon="⭐" label="Total Achivement" value={totalAchievements} />
    </div>
  )
}