"use client";
import { use, useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import QuizCard from "@/components/organisms/QuizCard";
import { createClient } from "@/utils/supabase/client";
import { Question, QuizAnswer, XP_RULES } from "@/types/quiz";

interface PageProps {
  params: Promise<{ level: string }>
}

const TIME_LIMITS = { easy: 270, medium: 250, hard: 230 };

export default function QuizPage({ params }: PageProps) {
  const router = useRouter();
  const { level } = use(params);
  const supabase = createClient();

  // ── Auth guard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.replace("/login")
    })
  }, [])

  // ── State ────────────────────────────────────────────────────────────────────
  const [questions, setQuestions]   = useState<Question[]>([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected]     = useState<number | null>(null)
  const [answers, setAnswers]       = useState<QuizAnswer[]>([])
  const [timeLeft, setTimeLeft]     = useState(TIME_LIMITS[level as keyof typeof TIME_LIMITS] ?? 120)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [showTimeOutModal, setShowTimeOutModal] = useState(false)

  // ── Generate questions from AI ───────────────────────────────────────────────
  useEffect(() => {
    async function generate() {
      try {
        setLoading(true)
        const res = await fetch("/api/generate-quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ level }),
        })
        if (!res.ok) throw new Error("Failed to generate questions")
        const data = await res.json()
        setQuestions(data.questions)
        setIsTimerActive(true)
      } catch (e) {
        setError("Failed to load questions. Please try again.")
      } finally {
        setLoading(false)
      }
    }
    generate()
  }, [level])

  // ── Timer ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimerActive(false)
          setShowTimeOutModal(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [isTimerActive, timeLeft])

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const total    = questions.length
  const progress = total > 0 ? ((currentIndex + 1) / total) * 100 : 0

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`

  const getTimerColor = () => {
    if (timeLeft > 60) return "text-green-400"
    if (timeLeft > 30) return "text-yellow-400"
    return "text-red-400 animate-pulse"
  }

  // Calculate XP for one answer
  const calcXP = (isCorrect: boolean): number => {
    const rules = XP_RULES[level as keyof typeof XP_RULES]
    return isCorrect ? rules.correct : rules.wrong
  }

  // ── Navigation ───────────────────────────────────────────────────────────────
  const recordAnswer = (selIdx: number | null) => {
    const q = questions[currentIndex]
    const isCorrect = selIdx === q.correctIndex
    const xpEarned  = calcXP(isCorrect)
    const answer: QuizAnswer = {
      questionIndex: currentIndex,
      question:      q.question,
      options:       q.options,
      concept:       q.concept,
      selectedIndex: selIdx,
      correctIndex:  q.correctIndex,
      isCorrect,
      xpEarned,
    }
    setAnswers((prev) => {
      const updated = [...prev]
      updated[currentIndex] = answer
      return updated
    })
    return answer
  }

  const handleNext = () => {
    const answer = recordAnswer(selected)

    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1)
      // Restore previous answer if navigating back then forward
      const prev = answers[currentIndex + 1]
      setSelected(prev?.selectedIndex ?? null)
    } else {
      // Last question — compile results and redirect
      finishQuiz([...answers.slice(0, currentIndex), answer])
    }
  }

  const handleBack = () => {
    if (currentIndex > 0) {
      recordAnswer(selected)
      setCurrentIndex(currentIndex - 1)
      const prev = answers[currentIndex - 1]
      setSelected(prev?.selectedIndex ?? null)
    }
  }

  const finishQuiz = (finalAnswers: QuizAnswer[]) => {
    setIsTimerActive(false)

    // Build scores per concept
    const scoreMap = {
      formal:  { correct: 0, total: 0, xp: 0 },
      natural: { correct: 0, total: 0, xp: 0 },
      social:  { correct: 0, total: 0, xp: 0 },
    }
    finalAnswers.forEach((a) => {
      const concept = a.concept as keyof typeof scoreMap
      scoreMap[concept].total   += 1
      scoreMap[concept].xp      += a.xpEarned
      if (a.isCorrect) scoreMap[concept].correct += 1
    })

    const totalXP = Object.values(scoreMap).reduce((s, c) => s + c.xp, 0)

    const result = {
      level,
      answers: finalAnswers,
      scores:  scoreMap,
      totalXP,
      completedAt: new Date().toISOString(),
    }

    // Store result in sessionStorage to pass to result page
    sessionStorage.setItem("quizResult", JSON.stringify(result))
    router.push(`/quiz/result?status=completed&level=${level}`)
  }

  // ── Loading / Error states ────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-950 text-white gap-4">
        <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-lg font-medium">Generating your quiz questions...</p>
        <p className="text-sm text-white/60">Powered by AI — this may take a few seconds</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-950 text-white gap-4">
        <p className="text-red-400 text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-white text-blue-900 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition"
        >
          Try Again
        </button>
      </div>
    )
  }

  // ── Timeout modal ─────────────────────────────────────────────────────────────
  if (showTimeOutModal) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Time&apos;s Up!</h2>
          <p className="text-gray-600 mb-6">You ran out of time. Better luck next time!</p>
          <button
            onClick={() => router.push(`/quiz/result?status=failed&level=${level}`)}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            See Results
          </button>
        </div>
      </div>
    )
  }

  // ── Main render ───────────────────────────────────────────────────────────────
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center scale-105 animate-slowZoom"
        style={{ backgroundImage: `url('/images/quiz-bg.jpg')` }} />
      <div className="absolute inset-0 bg-blue-950/60 backdrop-blur-sm" />

      <div className="mt-14 relative z-10 flex min-h-screen flex-col items-center px-4 py-6 text-white">
        
        {/* Header: level badge + timer + progress */}
        <div className="w-full max-w-4xl mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="font-semibold capitalize">{level} Level</span>
            </div>
            <div className={`flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full ${getTimerColor()}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="w-full bg-white/20 rounded-full h-2.5">
            <div className="bg-blue-400 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between mt-1 text-xs text-white/70">
            <span>Question {currentIndex + 1} of {total}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        <QuizCard
          question={questions[currentIndex]}
          selected={selected}
          onSelect={setSelected}
          onNext={handleNext}
          onBack={handleBack}
          isFirst={currentIndex === 0}
          isLast={currentIndex === total - 1}
          progress={progress}
        />
      </div>
    </main>
  )
}