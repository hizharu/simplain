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
      className={`rounded-xl px-5 py-4 text-left text-sm font-medium transition-all
        ${
          isSelected
            ? "bg-white text-blue-900 scale-[1.02]"
            : "bg-white/90 text-blue-900 hover:-translate-y-0.5"
        }`}
    >
      {text}
    </button>
  )
}
