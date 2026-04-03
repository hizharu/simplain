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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

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

  // Failed state
  if (isFailed) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#62A2F3] text-white px-5">
        <style>{`
          @keyframes slide-up {
            from { transform: translateY(24px); opacity: 0; }
            to   { transform: translateY(0);    opacity: 1; }
          }
          .slide-up { animation: slide-up 0.6s ease forwards; }
        `}</style>
        <div className="text-center slide-up">
          <div className="w-20 h-20 rounded-full bg-red-400/20 border border-red-300/30 flex items-center justify-center mx-auto mb-5 animate-bounce">
            <span className="text-4xl">😔</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Time&apos;s Up!</h1>
          <p className="text-white/60 text-sm mb-8">Don&apos;t give up — let&apos;s try again!</p>
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
      <main className="min-h-screen flex items-center justify-center bg-[#62A2F3] text-white">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </main>
    )
  }

  const { scores, totalXP, answers, level, subject } = result
  const conceptEntries = Object.entries(scores) as [string, ConceptScore][]
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

  const getMessage = () => {
    if (accuracy >= 80) return { emoji: "🏆", text: "Outstanding!", sub: "You absolutely nailed it!" }
    if (accuracy >= 60) return { emoji: "🎉", text: "Well done!", sub: "Great performance!" }
    if (accuracy >= 40) return { emoji: "💪", text: "Good effort!", sub: "Practice makes perfect." }
    return { emoji: "🌱", text: "Keep going!", sub: "Every attempt counts." }
  }

  const msg = getMessage()

  return (
    <>
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(24px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes pop-in {
          0%   { transform: scale(0.4); opacity: 0; }
          70%  { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 0.9; }
          100% { transform: translateY(105vh)  rotate(360deg); opacity: 0; }
        }
        .anim-slide-up { animation: slide-up 0.55s ease forwards; opacity: 0; }
        .anim-pop-in   { animation: pop-in  0.55s cubic-bezier(0.34,1.56,0.64,1) forwards; opacity: 0; }
        .confetti      { animation: fall linear infinite; position: absolute; border-radius: 2px; }
      `}</style>

      {/* Confetti but only if score more than (>=) 60% */}
      {accuracy >= 60 && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {[
            { color: "#fde68a", left: "8%",  dur: "2.8s", delay: "0s",    size: 8 },
            { color: "#6ee7b7", left: "22%", dur: "3.2s", delay: "0.4s",  size: 6 },
            { color: "#93c5fd", left: "38%", dur: "2.5s", delay: "0.8s",  size: 10 },
            { color: "#f9a8d4", left: "55%", dur: "3.5s", delay: "0.2s",  size: 7 },
            { color: "#fca5a5", left: "70%", dur: "2.9s", delay: "0.6s",  size: 9 },
            { color: "#c4b5fd", left: "85%", dur: "3.1s", delay: "1s",    size: 6 },
            { color: "#fde68a", left: "15%", dur: "3.3s", delay: "1.2s",  size: 5 },
            { color: "#6ee7b7", left: "48%", dur: "2.7s", delay: "0.9s",  size: 8 },
          ].map((p, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                background: p.color,
                left: p.left,
                top: "-12px",
                width: p.size,
                height: p.size,
                animationDuration: p.dur,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>
      )}

      <main className="relative min-h-screen bg-[#62A2F3] text-white px-4 pb-16 pt-24 z-10">
        <div className="max-w-lg mx-auto flex flex-col items-center">

          {/* Save status */}
          <div className="w-full mb-3 text-center min-h-[20px]">
            {saving    && <p className="text-xs text-white/60">Saving your score...</p>}
            {saved     && <p className="text-xs text-emerald-300">✓ Score saved to your account</p>}
            {saveError && <p className="text-xs text-red-300">⚠ {saveError}</p>}
          </div>

          {/* Congrats banner */}
          <div className="anim-slide-up mb-4 text-center" style={{ animationDelay: "0.05s" }}>
            <p className="text-3xl font-bold">{msg.emoji} {msg.text}</p>
            <p className="text-white/60 text-sm mt-1">{msg.sub}</p>
          </div>

          {/* Hero card */}
          <div className="anim-slide-up w-full bg-white/15 backdrop-blur-sm border border-white/20 rounded-3xl p-6 text-center mb-5 shadow-xl" style={{ animationDelay: "0.15s" }}>

            {/* Badges */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/15 ${levelColor[level] ?? "text-white"}`}>
                {level}
              </span>
              <span className="text-xs text-white/50">·</span>
              <span className="text-xs text-white/70 font-medium">{subjectLabel[subject] ?? subject}</span>
            </div>

            {/* Trophy */}
            <div className="anim-pop-in flex justify-center mb-4" style={{ animationDelay: "0.35s" }}>
              <div className="relative w-20 h-20">
                <Image src="/result-image/pini.png" alt="Result" fill className="object-contain drop-shadow-lg" />
              </div>
            </div>

            <h1 className="text-xl font-bold mb-1">Quiz Complete!</h1>
            <p className="text-white/50 text-sm mb-5">Here&apos;s how you did</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { value: `+${totalXP}`, label: "XP Earned", color: "text-yellow-300", delay: "0.4s" },
                { value: `${totalCorrect}/${totalQuestions}`, label: "Correct", color: "text-white", delay: "0.5s" },
                {
                  value: `${accuracy}%`, label: "Accuracy", delay: "0.6s",
                  color: accuracy >= 70 ? "text-emerald-300" : accuracy >= 40 ? "text-yellow-300" : "text-red-300",
                },
              ].map((stat) => (
                <div key={stat.label} className="anim-slide-up bg-white/10 rounded-2xl py-3 px-2" style={{ animationDelay: stat.delay }}>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-[11px] text-white/50 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Accuracy bar, this animates will show when mounted */}
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 delay-700 ${
                  accuracy >= 70 ? "bg-emerald-400" : accuracy >= 40 ? "bg-yellow-400" : "bg-red-400"
                }`}
                style={{ width: mounted ? `${accuracy}%` : "0%" }}
              />
            </div>
          </div>

          {/* Concept breakdown */}
          {conceptEntries.length > 0 && (
            <div className="anim-slide-up w-full mb-5" style={{ animationDelay: "0.65s" }}>
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3 px-1">By Topic</p>
              <div className="space-y-2">
                {conceptEntries.map(([concept, s]) => {
                  const ca = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0
                  return (
                    <div key={concept} className="flex items-center justify-between bg-white/10 border border-white/15 rounded-2xl px-4 py-3">
                      <div className="flex-1 min-w-0 mr-3">
                        <p className="text-sm font-semibold truncate">{concept}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${ca >= 70 ? "bg-emerald-400" : ca >= 40 ? "bg-yellow-400" : "bg-red-400"}`}
                              style={{ width: mounted ? `${ca}%` : "0%" }}
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
                <div key={i} className={`rounded-2xl p-4 text-sm border ${a.isCorrect ? "bg-emerald-500/15 border-emerald-400/30" : "bg-red-500/15 border-red-400/30"}`}>
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
                  <div className="space-y-1.5">
                    {a.options.map((opt, optIdx) => {
                      const isCorrectOpt = optIdx === a.correctIndex
                      const isSelectedWrong = optIdx === a.selectedIndex && !a.isCorrect
                      return (
                        <div key={optIdx} className={`flex items-start gap-2 text-xs px-3 py-2 rounded-xl ${isCorrectOpt ? "bg-emerald-500/25 text-emerald-200 font-semibold" : isSelectedWrong ? "bg-red-500/25 text-red-200 line-through" : "text-white/40"}`}>
                          <span className="flex-shrink-0 mt-0.5">{isCorrectOpt ? "✓" : isSelectedWrong ? "✗" : "·"}</span>
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
          <div className="anim-slide-up flex gap-3 w-full" style={{ animationDelay: "0.75s" }}>
            <Link href={`/quiz/levelstart/${level}`} className="flex-1">
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
    </>
  )
}