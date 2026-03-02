import QuizOptionButton from "@/components/molecules/QuizOptionButton"
import QuizNavigation from "@/components/organisms/QuizNavigation"

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
    <section className=" w-full max-w-xl animate-slideIn">

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