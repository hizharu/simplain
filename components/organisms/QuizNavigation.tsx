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
    <div className="mt-10 flex justify-between">
      <button
        disabled={isFirst}
        onClick={onBack}
        className="rounded-full bg-white/20 px-6 py-2 text-sm disabled:opacity-40"
      >
        ← Back
      </button>

      <button
        disabled={isDisabled}
        onClick={onNext}
        className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-blue-900 disabled:opacity-50"
      >
        {isLast ? "Done" : "Next"}
      </button>
    </div>
  )
}
