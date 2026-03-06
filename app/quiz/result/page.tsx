"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { QuizResult } from "@/types/quiz";

export default function QuizResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const status = searchParams.get("status");
  const level  = searchParams.get("level");
  const isFailed = status === "failed";

  const [result, setResult]       = useState<QuizResult | null>(null)
  const [saving, setSaving]       = useState(false)
  const [saved, setSaved]         = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [showDetail, setShowDetail] = useState(false)

  // ── Load result from sessionStorage ─────────────────────────────────────────
  useEffect(() => {
    if (isFailed) return
    const raw = sessionStorage.getItem("quizResult")
    if (!raw) return
    const parsed: QuizResult = JSON.parse(raw)
    setResult(parsed)
    saveScore(parsed)
  }, [])

  // ── Save score to Supabase via API ───────────────────────────────────────────
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
        if (err.error === "Unauthorized") {
          router.push("/login")
          return
        }
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

  // ── Failed state ─────────────────────────────────────────────────────────────
  if (isFailed) {
    return (
      <div className="mt-5 min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#62A2F3] to-[#41BBD9] text-white px-4">
        <h1 className="text-2xl font-semibold mb-6">Quiz Failed</h1>
        <div className="mb-4">
          <Image src="/result-image/sad-face.png" alt="Failed" width={80} height={80} />
        </div>
        <p className="text-lg font-medium mb-8">Better luck next time!</p>
        <Link href="/#quiz-section">
          <button className="rounded-full bg-white px-6 py-2 text-sm font-medium text-blue-600 hover:scale-105 transition">
            Try Again
          </button>
        </Link>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#62A2F3] to-[#41BBD9] text-white">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const { scores, totalXP, answers } = result

  // ── Main result ───────────────────────────────────────────────────────────────
  return (
    <div className="mt-5 min-h-screen flex flex-col items-center bg-gradient-to-b from-[#62A2F3] to-[#41BBD9] text-white px-4 pb-12 pt-8">
      
      <h1 className="text-2xl font-semibold mb-2">Quiz Result</h1>

      {/* Save status */}
      {saving && <p className="text-xs text-white/70 mb-2">Saving your score...</p>}
      {saved   && <p className="text-xs text-green-300 mb-2">✓ Score saved to your account</p>}
      {saveError && <p className="text-xs text-red-300 mb-2">⚠ {saveError}</p>}

      <div className="mb-3">
        <Image src="/result-image/pini.png" alt="Result" width={80} height={80} />
      </div>

      {/* Total XP */}
      <p className="text-2xl font-bold mb-6">
        XP <span className="text-yellow-300">+{totalXP}</span>
      </p>

      {/* Concept scores */}
      <div className="w-full max-w-xs space-y-3 mb-6">
        {(["formal", "natural", "social"] as const).map((concept) => {
          const s = scores[concept]
          const icons: Record<string, string> = {
            formal:  "/result-image/formalscience.png",
            natural: "/result-image/naturalscience.png",
            social:  "/result-image/socialscience.png",
          }
          return (
            <div key={concept} className="flex items-center justify-between bg-white/20 rounded-xl px-4 py-2">
              <div className="flex items-center gap-3">
                <Image src={icons[concept]} alt={concept} width={32} height={32} />
                <div>
                  <p className="text-sm font-medium capitalize">{concept} Science</p>
                  <p className="text-xs text-white/70">{s.correct}/{s.total} correct</p>
                </div>
              </div>
              <span className="text-sm font-bold text-yellow-300">+{s.xp} XP</span>
            </div>
          )
        })}
      </div>

      {/* Toggle detail review */}
      <button
        onClick={() => setShowDetail(!showDetail)}
        className="mb-6 text-sm underline text-white/80 hover:text-white transition"
      >
        {showDetail ? "Hide answer review" : "Check answers ↓"}
      </button>

      {/* Answer detail */}
      {showDetail && (
        <div className="w-full max-w-lg space-y-3 mb-8">
          {answers.map((a, i) => (
            <div
              key={i}
              className={`rounded-xl p-4 text-sm ${
                a.isCorrect ? "bg-green-500/30 border border-green-400/50" : "bg-red-500/30 border border-red-400/50"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-white/60 capitalize">
                  #{i + 1} · {a.concept} science
                </span>
                <span className={`text-xs font-bold ${a.isCorrect ? "text-green-300" : "text-red-300"}`}>
                  {a.isCorrect ? `✓ +${a.xpEarned} XP` : `✗ +${a.xpEarned} XP`}
                </span>
              </div>

              <p className="font-medium mb-2">{a.question}</p>

              {/* Options list */}
              <div className="space-y-1">
                {a.options.map((opt, optIdx) => {
                  const isCorrectOpt = optIdx === a.correctIndex
                  const isSelectedOpt = optIdx === a.selectedIndex
                  let style = "text-white/60"
                  if (isCorrectOpt) style = "text-green-300 font-semibold"
                  else if (isSelectedOpt && !a.isCorrect) style = "text-red-300 line-through"
                  return (
                    <p key={optIdx} className={`text-xs ${style}`}>
                      {isCorrectOpt ? "✓ " : isSelectedOpt && !a.isCorrect ? "✗ " : "· "}
                      {opt}
                    </p>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <Link href="/#quiz-section">
        <button className="rounded-full bg-white px-8 py-2 text-sm font-semibold text-blue-600 hover:scale-105 transition active:scale-95">
          Okay
        </button>
      </Link>
    </div>
  )
}