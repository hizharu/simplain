import QuizTopBar from "@/components/organisms/QuizTopBar"
import QuizProgressBar from "@/components/organisms/QuizProgressBar"
import QuizCard from "@/components/organisms/QuizCard"

interface Question {
  id: number
  level: string
  question: string
  options: string[]
}

interface Props {
  current: number
  total: number
  question: Question
  selected: number | null
  progress: number
  onSelect: (index: number) => void
  onNext: () => void
  onBack: () => void
}

export default function QuizTemplate({
  current,
  total,
  question,
  selected,
  progress,
  onSelect,
  onNext,
  onBack,
}: Props) {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 animate-slowZoom"
        style={{ backgroundImage: `url('/images/quiz-bg.jpg')` }}
      />
      <div className="absolute inset-0 bg-blue-950/60 backdrop-blur-sm" />

      <div className="relative z-10 flex min-h-screen flex-col items-center px-4 py-6 text-white">
        <QuizTopBar current={current} total={total} />
        <QuizProgressBar progress={progress} />

        <QuizCard
          question={question}
          selected={selected}
          onSelect={onSelect}
          onNext={onNext}
          onBack={onBack}
          isFirst={current === 0}
          isLast={current === total - 1}
        />
      </div>
    </main>
  )
}
