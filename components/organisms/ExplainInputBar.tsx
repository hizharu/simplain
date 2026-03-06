"use client"

interface Props {
  question: string
  setQuestion: (value: string) => void
  onExplain: () => void
  loading: boolean
}

export default function ExplainInputBar({ question, setQuestion, onExplain, loading }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onExplain()
  }

  return (
    <div className="w-full max-w-2xl flex items-center bg-white/95 backdrop-blur-sm rounded-full px-5 py-3 shadow-lg mb-5 gap-3 border border-white/50">
      <input
        type="text"
        placeholder="Ask me anything to explain..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        className="flex-1 outline-none text-gray-800 placeholder-gray-400 text-sm md:text-base bg-transparent disabled:opacity-50"
      />
      <button
        onClick={onExplain}
        disabled={loading || !question.trim()}
        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-full w-9 h-9 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        )}
      </button>
    </div>
  )
}