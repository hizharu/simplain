interface Props {
  suggestions: string[]
  setQuestion: (value: string) => void
}

export default function ExplainSuggestions({ suggestions, setQuestion }: Props) {
  return (
    <div className="w-full max-w-2xl">
      <p className="text-xs text-white/60 text-center mb-3">Try asking about...</p>
      {/* Horizontal scroll on mobile, wrap on desktop */}
      <div className="flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:justify-center scrollbar-hide">
        {suggestions.map((item, index) => (
          <button
            key={index}
            onClick={() => setQuestion(item)}
            className="flex-shrink-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/20 px-4 py-2 rounded-full text-xs md:text-sm transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}