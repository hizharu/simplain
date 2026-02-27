interface Props {
  question: string
  setQuestion: (value: string) => void
  onExplain: () => void
}

export default function ExplainInputBar({
  question,
  setQuestion,
  onExplain,
}: Props) {
  return (
    <div className="w-full max-w-3xl flex items-center bg-white rounded-full px-4 py-2 shadow-md mb-6">
      <input
        type="text"
        placeholder="Explain me..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="flex-1 outline-none text-gray-800 placeholder-gray-400 text-sm md:text-base"
      />
      <button
        onClick={onExplain}
        className="ml-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full px-4 py-2 text-sm transition"
      >
        ▶
      </button>
    </div>
  )
}
