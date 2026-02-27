interface Props {
  text: string
  isSelected: boolean
  onClick: () => void
}

export default function QuizOptionButton({
  text,
  isSelected,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl px-6 py-4 text-left transition-all duration-200
        ${
          isSelected
            ? "bg-white text-blue-900"
            : "bg-white/80 text-blue-900 hover:bg-white"
        }`}
    >
      {text}
    </button>
  )
}
