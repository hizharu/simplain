import QuizOptionButton from "@/components/molecules/QuizOptionButton"
import QuizNavigation from "@/components/organisms/QuizNavigation"
import QuizProgressBar from "./QuizProgressBar"

interface Question {
  level: string
  question: string
  options: string[]
}

interface Props {
  question: Question
  selected: number | null
  onSelect: (index: number) => void
  onNext: () => void
  onBack: () => void
  isFirst: boolean
  isLast: boolean
  progress: number
}

export default function QuizCard({
  question,
  selected,
  onSelect,
  onNext,
  onBack,
  isFirst,
  isLast,
  progress,
}: Props) {
  return (
    <section className="mt-14 w-full max-w-xl animate-slideIn">
      <QuizProgressBar progress={progress}/>
      <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-xs text-white">
        Level : {question.level}
      </span>

      <h1 className="mb-8 text-center text-2xl font-semibold text-white md:text-3xl">
        {question.question}
      </h1>

      <div className="flex flex-col gap-4">
        {question.options.map((opt, i) => (
          <QuizOptionButton
            key={i}
            text={opt}
            isSelected={selected === i}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>

      <QuizNavigation
        isFirst={isFirst}
        isLast={isLast}
        isDisabled={selected === null}
        onBack={onBack}
        onNext={onNext}
      />
    </section>
  )
}