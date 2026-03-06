"use client"
import { useEffect, useRef } from "react"

interface Props {
  answer: string
  loading: boolean
}

export default function ExplainAnswerBox({ answer, loading }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll as answer streams in
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [answer])

  return (
    <div className="w-full max-w-2xl bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 text-gray-800 shadow-xl mb-6 min-h-[220px] max-h-[420px] overflow-y-auto transition-all duration-300">
      {loading && !answer && (
        <div className="flex flex-col items-center justify-center h-32 gap-3">
          {/* Thinking dots */}
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-blue-400 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <p className="text-sm text-gray-400">Thinking...</p>
        </div>
      )}

      {!loading && !answer && (
        <div className="flex flex-col items-center justify-center h-32 gap-2 text-gray-400">
          <p className="text-sm text-center">Your explanation will appear here</p>
        </div>
      )}

      {answer && (
        <div>
          {/* AI label */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
              S
            </div>
            <span className="text-xs font-semibold text-blue-500">Simplain</span>
            {loading && (
              <span className="w-1.5 h-4 bg-blue-400 rounded-full animate-pulse ml-1" />
            )}
          </div>
          <p className="whitespace-pre-line text-sm md:text-base leading-relaxed text-gray-700">
            {answer}
          </p>
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  )
}