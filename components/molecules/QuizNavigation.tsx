"use client";

interface Props {
  isFirst: boolean
  isLast: boolean
  isDisabled: boolean
  onBack: () => void
  onNext: () => void
}

export default function QuizNavigation({
  isFirst,
  isLast,
  isDisabled,
  onBack,
  onNext,
}: Props) {
  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      {!isFirst && (
        <button
          onClick={onBack}
          className="rounded-full border border-white/30 px-6 py-2 text-sm text-white transition hover:bg-white/10"
        >
          ← Back
        </button>
      )}

      <button
        onClick={onNext}
        disabled={isDisabled}
        className={`cursor-pointer rounded-full px-8 py-2 text-sm font-medium transition-all duration-200
          ${
            isDisabled
              ? "cursor-not-allowed bg-white/20 text-white/40"
              : "cursor-pointer bg-white text-blue-900 hover:bg-blue-100"
          }
        `}
      >
        {isLast ? "Finish" : "Next →"}
      </button>
    </div>
  )
}