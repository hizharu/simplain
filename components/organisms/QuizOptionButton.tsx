"use client"

interface Props {
  label: string
  index: number
  selected: boolean
  onSelect: () => void
}

const LETTERS = ["A", "B", "C", "D"]

export default function QuizOptionButton({ label, index, selected, onSelect }: Props) {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border text-left transition-all duration-200 active:scale-[0.98] cursor-pointer
        ${selected
          ? "bg-white text-blue-700 border-white shadow-lg shadow-blue-900/20 font-semibold"
          : "bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40"
        }`}
    >
      {/* Letter badge */}
      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all
        ${selected
          ? "bg-blue-600 text-white"
          : "bg-white/15 text-white/70"
        }`}
      >
        {LETTERS[index]}
      </span>

      <span className="text-sm sm:text-base leading-snug">{label}</span>

      {/* Check icon when selected */}
      {selected && (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-auto text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  )
}