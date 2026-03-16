"use client"
import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { QuizResult, ConceptScore } from "@/types/quiz"

export default function QuizResultPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const status = searchParams.get("status")
  const isFailed = status === "failed"

  const [result, setResult] = useState<QuizResult | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [showDetail, setShowDetail] = useState(false)

  useEffect(() => {
    if (isFailed) return
    const raw = sessionStorage.getItem("quizResult")
    if (!raw) return
    const parsed: QuizResult = JSON.parse(raw)
    setResult(parsed)
    saveScore(parsed)
  }, [])

  const saveScore = async (data: QuizResult) => {
    try {
      setSaving(true)
      const res = await fetch("/api/save-quiz-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json()
        if (err.error === "Unauthorized") { router.push("/login"); return }
        throw new Error(err.error)
      }
      setSaved(true)
      sessionStorage.removeItem("quizResult")
    } catch (e: unknown) {
      setSaveError(e instanceof Error ? e.message : "Failed to save score")
    } finally {
      setSaving(false)
    }
  }

  // ── Failed state ──────────────────────────────────────────────────────────
  if (isFailed) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-[#2563eb] via-[#1d8fe8] to-[#0ea5c2] text-white px-5">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-red-400/20 border border-red-300/30 flex items-center justify-center mx-auto mb-5">
            <span className="text-4xl">😔</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Time&apos;s Up!</h1>
          <p className="text-white/60 text-sm mb-8">Don&apos;t give up Let&apos;s try again!</p>
          <Link href="/#quiz-section">
            <button className="rounded-full bg-white px-8 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50 transition shadow-lg active:scale-95">
              Try Again
            </button>
          </Link>
        </div>
      </main>
    )
  }

  if (!result) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-linear-to-b from-[#2563eb] to-[#0ea5c2] text-white">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </main>
    )
  }

  const { scores, totalXP, answers, level, subject } = result

  // Aggregate scores per concept (from answers)
  const conceptEntries = Object.entries(scores) as [string, ConceptScore][]

  // Summary stats
  const totalCorrect = answers.filter((a) => a.isCorrect).length
  const totalQuestions = answers.length
  const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0

  const subjectLabel: Record<string, string> = {
    formal: "Formal Science",
    natural: "Natural Science",
    social: "Social Science",
  }

  const levelColor: Record<string, string> = {
    easy: "text-emerald-300",
    medium: "text-yellow-300",
    hard: "text-red-300",
  }

  // Main result 
  return (
    <main className="min-h-screen bg-[#62A2F3] text-white px-4 pb-16 pt-24">
      <div className="max-w-lg mx-auto flex flex-col items-center">

        {/* Save status */}
        <div className="w-full mb-4 text-center">
          {saving && <p className="text-xs text-white/60">Saving your score...</p>}
          {saved   && <p className="text-xs text-emerald-300">✓ Score saved to your account</p>}
          {saveError && <p className="text-xs text-red-300">⚠ {saveError}</p>}
        </div>

        {/* Hero result card */}
        <div className="w-full bg-white/15 backdrop-blur-sm border border-white/20 rounded-3xl p-6 text-center mb-5 shadow-xl">
          
          {/* Badge row */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/15 ${levelColor[level] ?? "text-white"}`}>
              {level}
            </span>
            <span className="text-xs text-white/50">·</span>
            <span className="text-xs text-white/70 font-medium">
              {subjectLabel[subject] ?? subject}
            </span>
          </div>
          <div className="flex justify-center mb-4">
            <div className="relative w-20 h-20">
              <Image
                src="/result-image/pini.png"
                alt="Result trophy"
                fill
                className="object-contain drop-shadow-lg"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-1">Quiz Complete!</h1>
          <p className="text-white/50 text-sm mb-5">Here&apos;s how you did</p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-white/10 rounded-2xl py-3 px-2">
              <p className="text-2xl font-bold text-yellow-300">+{totalXP}</p>
              <p className="text-[11px] text-white/50 mt-0.5">XP Earned</p>
            </div>
            <div className="bg-white/10 rounded-2xl py-3 px-2">
              <p className="text-2xl font-bold">{totalCorrect}/{totalQuestions}</p>
              <p className="text-[11px] text-white/50 mt-0.5">Correct</p>
            </div>
            <div className="bg-white/10 rounded-2xl py-3 px-2">
              <p className={`text-2xl font-bold ${accuracy >= 70 ? "text-emerald-300" : accuracy >= 40 ? "text-yellow-300" : "text-red-300"}`}>
                {accuracy}%
              </p>
              <p className="text-[11px] text-white/50 mt-0.5">Accuracy</p>
            </div>
          </div>

          {/* Accuracy bar */}
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                accuracy >= 70 ? "bg-emerald-400" : accuracy >= 40 ? "bg-yellow-400" : "bg-red-400"
              }`}
              style={{ width: `${accuracy}%` }}
            />
          </div>
        </div>

        {/* Concept breakdown */}
        {conceptEntries.length > 0 && (
          <div className="w-full mb-5">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3 px-1">By Topic</p>
            <div className="space-y-2">
              {conceptEntries.map(([concept, s]) => {
                const conceptAccuracy = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0
                return (
                  <div key={concept} className="flex items-center justify-between bg-white/10 border border-white/15 rounded-2xl px-4 py-3">
                    <div className="flex-1 min-w-0 mr-3">
                      <p className="text-sm font-semibold truncate">{concept}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${conceptAccuracy >= 70 ? "bg-emerald-400" : conceptAccuracy >= 40 ? "bg-yellow-400" : "bg-red-400"}`}
                            style={{ width: `${conceptAccuracy}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-white/50 flex-shrink-0">{s.correct}/{s.total}</span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-yellow-300 flex-shrink-0">+{s.xp} XP</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Answer review toggle */}
        <button
          onClick={() => setShowDetail(!showDetail)}
          className="w-full mb-4 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/10 border border-white/20 text-sm font-medium text-white/70 hover:bg-white/20 hover:text-white transition"
        >
          {showDetail ? "Hide answers ↑" : "Review answers ↓"}
        </button>

        {/* Answer detail */}
        {showDetail && (
          <div className="w-full space-y-3 mb-6">
            {answers.map((a, i) => (
              <div
                key={i}
                className={`rounded-2xl p-4 text-sm border ${
                  a.isCorrect
                    ? "bg-emerald-500/15 border-emerald-400/30"
                    : "bg-red-500/15 border-red-400/30"
                }`}
              >
                {/* Question header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] text-white/40">#{i + 1}</span>
                    <span className="text-[11px] text-white/50 bg-white/10 px-2 py-0.5 rounded-full">{a.concept}</span>
                  </div>
                  <span className={`text-xs font-bold flex-shrink-0 ${a.isCorrect ? "text-emerald-300" : "text-red-300"}`}>
                    {a.isCorrect ? `✓ +${a.xpEarned} XP` : `✗ +${a.xpEarned} XP`}
                  </span>
                </div>

                <p className="font-medium mb-3 text-white leading-snug">{a.question}</p>

                {/* Options */}
                <div className="space-y-1.5">
                  {a.options.map((opt, optIdx) => {
                    const isCorrectOpt = optIdx === a.correctIndex
                    const isSelectedWrong = optIdx === a.selectedIndex && !a.isCorrect
                    return (
                      <div
                        key={optIdx}
                        className={`flex items-start gap-2 text-xs px-3 py-2 rounded-xl
                          ${isCorrectOpt ? "bg-emerald-500/25 text-emerald-200 font-semibold"
                            : isSelectedWrong ? "bg-red-500/25 text-red-200 line-through"
                            : "text-white/40"
                          }`}
                      >
                        <span className="flex-shrink-0 mt-0.5">
                          {isCorrectOpt ? "✓" : isSelectedWrong ? "✗" : "·"}
                        </span>
                        <span>{opt}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 w-full">
          <Link href="/#quiz-section" className="flex-1">
            <button className="w-full rounded-full bg-white/15 border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white/25 transition active:scale-95">
              Back to Quiz
            </button>
          </Link>
          <Link href={`/quiz/levelstart/${level}`} className="flex-1">
            <button className="w-full rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50 transition shadow-lg active:scale-95">
              Play Again
            </button>
          </Link>
        </div>

      </div>
    </main>
  )
}