import ExplainHeader from "@/components/organisms/ExplainHeader"
import ExplainChatBox from "@/components/organisms/ExplainChatBox"
import ExplainInputBar from "@/components/organisms/ExplainInputBar"
import ExplainSuggestions from "@/components/organisms/ExplainSuggestions"
import ExplainFavorites from "@/components/organisms/ExplainFavorites"
import { ChatMessage, FavoriteItem } from "@/app/explain/page"

interface Props {
  question: string
  setQuestion: (value: string) => void
  chatHistory: ChatMessage[]
  streamingAnswer: string
  loading: boolean
  onExplain: () => void
  onClearHistory: () => void
  onSaveFavorite: (question: string, answer: string) => void
  onDeleteFavorite: (id: string) => void
  favorites: FavoriteItem[]
  showFavorites: boolean
  onToggleFavorites: () => void
  savingId: string | null
  suggestions: string[]
}

export default function ExplainTemplate({
  question, setQuestion, chatHistory, streamingAnswer, loading,
  onExplain, onClearHistory, onSaveFavorite, onDeleteFavorite,
  favorites, showFavorites, onToggleFavorites, savingId, suggestions,
}: Props) {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#62A2F3] to-[#41BBD9] flex flex-col items-center px-4 pt-28 pb-24 text-white overflow-hidden">

      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute top-1/4 right-8 w-6 h-6 rounded-full bg-white/20 animate-bounce" style={{ animationDuration: "3s" }} />
        <div className="absolute top-1/3 left-6 w-4 h-4 rounded-full bg-white/15 animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }} />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <ExplainHeader />

        {/* Favorites toggle button */}
        <div className="w-full max-w-2xl flex justify-end mb-2">
          <button
            onClick={onToggleFavorites}
            className={`cursor-pointer flex items-center gap-2 text-xs px-4 py-2 rounded-full border transition-all
              ${showFavorites
                ? "bg-yellow-400/30 border-yellow-300/50 text-yellow-200"
                : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20"
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill={showFavorites ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Favorites {favorites.length > 0 && `(${favorites.length})`}
          </button>
        </div>

        {/* Favorites panel */}
        {showFavorites && (
          <ExplainFavorites
            favorites={favorites}
            onDelete={onDeleteFavorite}
            onAskAgain={(q) => setQuestion(q)}
          />
        )}

        {/* Chat box */}
        {!showFavorites && (
          <ExplainChatBox
            chatHistory={chatHistory}
            streamingAnswer={streamingAnswer}
            loading={loading}
            onClearHistory={onClearHistory}
            onSaveFavorite={onSaveFavorite}
            savingId={savingId}
            favorites={favorites}
          />
        )}

        <ExplainInputBar
          question={question}
          setQuestion={setQuestion}
          onExplain={onExplain}
          loading={loading}
        />

        {chatHistory.length === 0 && !showFavorites && (
          <ExplainSuggestions suggestions={suggestions} setQuestion={setQuestion} />
        )}
      </div>
    </main>
  )
}