interface Props {
  answer: string
}

export default function ExplainAnswerBox({ answer }: Props) {
  return (
    <div className="w-full max-w-3xl bg-white rounded-2xl p-6 md:p-8 text-gray-800 shadow-lg mb-6 min-h-[200px]">
      {answer ? (
        <p className="whitespace-pre-line text-sm md:text-base">
          {answer}
        </p>
      ) : (
        <p className="text-gray-400 text-center">
          Your explanation will appear here ✨
        </p>
      )}
    </div>
  )
}
