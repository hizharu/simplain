interface Props {
  currentIndex: number
  total: number
  selectedIndex: number | null
  onBack: () => void
  onNext: () => void
  onFinish: () => void
}

export default function QuizNavigation({
  currentIndex,
  total,
  selectedIndex,
  onBack,
  onNext,
  onFinish,
}: Props) {
  const isLast = currentIndex === total - 1
  const canProceed = selectedIndex !== null

  return (
    <div className="flex items-center justify-between gap-3 mt-2">
      {/* Back */}
      <button
        onClick={onBack}
        disabled={currentIndex === 0}
        className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/15 border border-white/20 text-white text-sm font-medium
          disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/25 transition active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      {/* Next / Finish */}
      {isLast ? (
        <button
          onClick={onFinish}
          disabled={!canProceed}
          className="flex items-center gap-2 px-7 py-3 rounded-full bg-white text-blue-700 text-sm font-bold
            disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-50 transition shadow-lg active:scale-95"
        >
          Finish Quiz ✓
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="flex items-center gap-2 px-7 py-3 rounded-full bg-white text-blue-700 text-sm font-bold
            disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-50 transition shadow-lg active:scale-95"
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  )
}