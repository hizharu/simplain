import StatItem from "../atoms/StatItem"

export default function StatsSection() {
  return (
    <div className="flex justify-around border rounded-xl p-4 bg-gray-50">

      <StatItem
        icon="https://cdn-icons-png.flaticon.com/512/2583/2583344.png"
        value="5982"
        label="Total XP"
      />

      <StatItem
        icon="https://cdn-icons-png.flaticon.com/512/833/833472.png"
        value="7 days"
        label="Streak"
      />

      <StatItem
        icon="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
        value="60"
        label="Achievement"
      />

    </div>
  )
}
