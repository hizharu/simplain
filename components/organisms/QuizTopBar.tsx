import Link from "next/link"

interface Props {
  current: number
  total: number
}

export default function QuizTopBar({ current, total }: Props) {
  return (
    <div className="flex w-full max-w-5xl items-center justify-between">
      <Link
        href="/#quiz-section"
        className="rounded-full bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
      >
        ← Exit Quiz
      </Link>

      <span className="text-sm opacity-80">
        Question {current + 1} / {total}
      </span>
    </div>
  )
}
