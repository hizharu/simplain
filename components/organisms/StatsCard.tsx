import Image from "next/image"

interface StatsCardProps {
  totalXP: number
  streakDays: number
  totalAchievements: number
}

interface StatItemProps {
  icon: string
  label: string
  value: string | number
  accent: string
}

function StatItem({ icon, label, value, accent }: StatItemProps) {
  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      <div className={`w-11 h-11 rounded-2xl ${accent} flex items-center justify-center shadow-sm`}>
        <Image src={icon} alt={label} width={24} height={24} className="object-contain" />
      </div>
      <p className="text-base sm:text-lg font-bold text-gray-800 leading-none">{value}</p>
      <p className="text-[11px] text-gray-400 font-medium text-center leading-tight">{label}</p>
    </div>
  )
}

export default function StatsCard({ totalXP, streakDays, totalAchievements }: StatsCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/10 p-5">
      {/* Section label */}
      <p className="text-[10px] font-bold tracking-widest text-gray-300 uppercase mb-4">Your Stats</p>

      <div className="flex items-start justify-around">
        <StatItem
          icon="/icons/xp.png"
          label="Total XP"
          value={totalXP.toLocaleString()}
          accent="bg-yellow-50"
        />

        <div className="w-px self-stretch bg-gray-100 mx-2" />

        <StatItem
          icon="/icons/streak.png"
          label="Day Streak"
          value={`${streakDays}d`}
          accent="bg-orange-50"
        />

        <div className="w-px self-stretch bg-gray-100 mx-2" />

        <StatItem
          icon="/icons/achievement.png"
          label="Achievements"
          value={totalAchievements}
          accent="bg-blue-50"
        />
      </div>
    </div>
  )
}