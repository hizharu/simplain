interface Props {
  suggestions: string[]
  setQuestion: (value: string) => void
}

export default function ExplainSuggestions({
  suggestions,
  setQuestion,
}: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-3 max-w-3xl">
      {suggestions.map((item, index) => (
        <button
          key={index}
          onClick={() => setQuestion(item)}
          className="bg-white text-gray-800 px-4 py-2 rounded-full text-xs md:text-sm hover:bg-gray-100 transition"
        >
          {item}
        </button>
      ))}
    </div>
  )
}
