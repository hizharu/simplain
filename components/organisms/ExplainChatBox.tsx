"use client"
import { useEffect, useRef } from "react"
import { ChatMessage, FavoriteItem } from "@/app/explain/page"

interface Props {
  chatHistory: ChatMessage[]
  streamingAnswer: string
  loading: boolean
  onClearHistory: () => void
  onSaveFavorite: (question: string, answer: string) => void
  savingId: string | null
  favorites: FavoriteItem[]
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export default function ExplainChatBox({
  chatHistory, streamingAnswer, loading,
  onClearHistory, onSaveFavorite, savingId, favorites,
}: Props) { 
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatHistory, streamingAnswer])

  const isEmpty = chatHistory.length === 0 && !loading && !streamingAnswer

  // Check if an answer is already saved
  const isSaved = (answer: string) => favorites.some((f) => f.answer === answer)

  // Find the question paired with an assistant message
  const getPairedQuestion = (index: number): string => {
    for (let i = index - 1; i >= 0; i--) {
      if (chatHistory[i].role === "user") return chatHistory[i].content
    }
    return ""
  }

  return (
    <div className="w-full max-w-2xl mb-4">
      {!isEmpty && (
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs text-white/60">
            {chatHistory.length} message{chatHistory.length !== 1 ? "s" : ""}
          </span>
          <button
            onClick={onClearHistory}
            className="text-xs text-white/50 hover:text-white/80 transition flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear chat
          </button>
        </div>
      )}

      <div className={`w-full bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 transition-all duration-300 overflow-hidden
        ${isEmpty ? "min-h-[180px]" : "min-h-[280px] max-h-[480px] overflow-y-auto"}`}
      >
        {isEmpty && (
          <div className="flex flex-col items-center justify-center h-44 gap-2 text-white/50">
            <span className="text-4xl">✨</span>
            <p className="text-sm">Ask me anything — I&apos;ll explain it simply!</p>
          </div>
        )}

        <div className="p-4 space-y-4">
          {chatHistory.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-1
                ${msg.role === "user" ? "bg-white text-blue-600" : "bg-gradient-to-br from-blue-400 to-cyan-400 text-white"}`}
              >
                {msg.role === "user" ? "U" : "S"}
              </div>

              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed
                ${msg.role === "user" ? "bg-white text-gray-800 rounded-tr-sm" : "bg-white/20 text-white rounded-tl-sm"}`}
              >
                <p className="whitespace-pre-line">{msg.content}</p>

                <div className={`flex items-center mt-1.5 gap-2 ${msg.role === "user" ? "justify-end" : "justify-between"}`}>
                  <p className={`text-xs ${msg.role === "user" ? "text-gray-400" : "text-white/40"}`}>
                    {formatTime(msg.timestamp)}
                  </p>

                  {/* Save to favorites button — only on assistant messages */}
                  {msg.role === "assistant" && (
                    <button
                      onClick={() => {
                        if (!isSaved(msg.content)) {
                          onSaveFavorite(getPairedQuestion(i), msg.content)
                        }
                      }}
                      disabled={isSaved(msg.content) || savingId !== null}
                      className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full transition-all
                        ${isSaved(msg.content)
                          ? "text-yellow-300 cursor-default"
                          : "text-white/50 hover:text-yellow-300 hover:bg-white/10"
                        }`}
                      title={isSaved(msg.content) ? "Already saved" : "Save to favorites"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill={isSaved(msg.content) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      {isSaved(msg.content) ? "Saved" : "Save"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Streaming bubble */}
          {streamingAnswer && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold bg-gradient-to-br from-blue-400 to-cyan-400 text-white mt-1">S</div>
              <div className="max-w-[80%] bg-white/20 text-white rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed">
                <p className="whitespace-pre-line">{streamingAnswer}</p>
                <span className="inline-block w-1.5 h-4 bg-white/70 rounded-full animate-pulse ml-0.5 align-middle" />
              </div>
            </div>
          )}

          {/* Thinking dots */}
          {loading && !streamingAnswer && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold bg-gradient-to-br from-blue-400 to-cyan-400 text-white">S</div>
              <div className="bg-white/20 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  )
}