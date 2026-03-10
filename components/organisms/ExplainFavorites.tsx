"use client"
import { FavoriteItem } from "@/app/explain/page"

interface Props {
  favorites: FavoriteItem[]
  onDelete: (id: string) => void
  onAskAgain: (question: string) => void
}

export default function ExplainFavorites({ favorites, onDelete, onAskAgain }: Props) {
  if (favorites.length === 0) {
    return (
      <div className="w-full max-w-2xl mb-4 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-8 text-center">
        <p className="text-4xl mb-3">⭐</p>
        <p className="text-white/70 text-sm">No favorites yet.</p>
        <p className="text-white/40 text-xs mt-1">Tap the star on any answer to save it here.</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mb-4 space-y-3 max-h-[480px] overflow-y-auto">
      {favorites.map((fav) => (
        <div
          key={fav.id}
          className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-4"
        >
          {/* Question */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="text-sm font-semibold text-yellow-200 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              {fav.question}
            </p>

            {/* Delete button */}
            <button
              onClick={() => onDelete(fav.id)}
              className="text-white/30 hover:text-red-300 transition flex-shrink-0"
              title="Remove from favorites"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Answer preview */}
          <p className="text-xs text-white/70 leading-relaxed line-clamp-3 whitespace-pre-line mb-3">
            {fav.answer}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-white/30">
              {new Date(fav.saved_at).toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" })}
            </p>
            <button
              onClick={() => onAskAgain(fav.question)}
              className="cursor-pointer text-xs text-white/60 hover:text-white transition flex items-center gap-1 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full"
            >
              Ask again ↗
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}