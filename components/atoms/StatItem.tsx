interface Props {
  icon: string
  label: string
  value: string | number
}

export default function StatItem({ icon, label, value }: Props) {
  return (
    <div className="flex flex-col items-center text-sm">
      <img src={icon} className="w-6 mb-1" />
      <p className="font-semibold">{value}</p>
      <p className="text-gray-500">{label}</p>
    </div>
  )
}
