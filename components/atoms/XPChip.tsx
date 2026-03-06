interface XPChipProps {
  value: number
}

export default function XPChip({ value }: XPChipProps) {
  return (
    <span className="text-sm font-bold text-blue-600">
      + {value}
    </span>
  )
}