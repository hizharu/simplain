interface Props {
  question: string
  progress?: number
}

export default function QuizCard({ question }: Props) {
  return (
    <div className="w-full bg-white/15 backdrop-blur-sm border border-white/20 rounded-3xl px-6 py-7 shadow-lg">
      <p className="text-white text-base sm:text-lg font-medium leading-relaxed">
        {question}
      </p>
    </div>
  )
}