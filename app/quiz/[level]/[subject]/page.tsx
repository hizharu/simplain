"use client"

import { use, useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import QuizCard from "@/components/organisms/QuizCard"
import QuizOptionButton from "@/components/organisms/QuizOptionButton"
import QuizNavigation from "@/components/organisms/QuizNavigation"
import QuizProgressBar from "@/components/organisms/QuizProgressBar"
import type { Question, QuizAnswer, QuizResult, ConceptScore } from "@/types/quiz"

interface Props {
  params: Promise<{ level: string; subject: string }>
}

const TIMER: Record<string, number> = { easy: 1200, medium: 1080, hard: 960 }

const XP_RULES: Record<string, { correct: number; wrong: number }> = {
  easy:   { correct: 1, wrong: 0 },
  medium: { correct: 2, wrong: 1 },
  hard:   { correct: 4, wrong: 1 },
}

export default function QuizPage({ params }: Props) {
  const { level, subject } = use(params)
  const router = useRouter()
  const supabase = createClient()

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(TIMER[level] ?? 1200)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showExitModal, setShowExitModal] = useState(false)

  // Auth guard
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push("/login")
    })
  }, [])

  // Intercept browser back button
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault()
      window.history.pushState(null, "", window.location.href)
      setShowExitModal(true)
    }
    window.history.pushState(null, "", window.location.href)
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("/api/generate-quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ level, subject }),
        })
        if (!res.ok) throw new Error("Failed")
        const data = await res.json()
        setQuestions(data.questions ?? [])
      } catch {
        setError("Failed to load questions. Please try again.")
      } finally {
        setLoading(false)
      }
    }
    fetchQuestions()
  }, [level, subject])

  // Finish quiz
  const finishQuiz = useCallback((finalAnswers: QuizAnswer[], timedOut = false) => {
    const scores: Record<string, ConceptScore> = {}
    finalAnswers.forEach((a) => {
      if (!scores[a.concept]) scores[a.concept] = { correct: 0, total: 0, xp: 0 }
      scores[a.concept].total++
      if (a.isCorrect) {
        scores[a.concept].correct++
        scores[a.concept].xp += XP_RULES[level]?.correct ?? 1
      } else {
        scores[a.concept].xp += XP_RULES[level]?.wrong ?? 0
      }
    })

    const result: QuizResult = {
      level, subject,
      answers: finalAnswers,
      scores: scores as QuizResult["scores"],
      totalXP: Object.values(scores).reduce((s, c) => s + c.xp, 0),
      completedAt: new Date().toISOString(),
    }

    sessionStorage.setItem("quizResult", JSON.stringify(result))
    router.push(timedOut ? "/quiz/result?status=failed" : "/quiz/result")
  }, [level, subject, router])

  // Timer
  useEffect(() => {
    if (loading || questions.length === 0) return
    if (timeLeft <= 0) { finishQuiz(answers, true); return }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, loading, questions.length, answers, finishQuiz])

  // Handlers
  const handleSelect = (idx: number) => setSelectedIndex(idx)

  const handleNext = () => {
    if (selectedIndex === null) return
    const q = questions[currentIndex]
    const xpRules = XP_RULES[level] ?? { correct: 1, wrong: 0 }
    const isCorrect = selectedIndex === q.correctIndex
    const answer: QuizAnswer = {
      questionIndex: currentIndex,
      question: q.question,
      options: q.options,
      concept: q.concept,
      selectedIndex,
      correctIndex: q.correctIndex,
      isCorrect,
      xpEarned: isCorrect ? xpRules.correct : xpRules.wrong,
    }
    const newAnswers = [...answers, answer]
    if (currentIndex + 1 >= questions.length) {
      finishQuiz(newAnswers)
    } else {
      setAnswers(newAnswers)
      setCurrentIndex((p) => p + 1)
      setSelectedIndex(null)
    }
  }

  const handleBack = () => {
    if (currentIndex === 0) return
    setCurrentIndex((p) => p - 1)
    setSelectedIndex(answers[currentIndex - 1]?.selectedIndex ?? null)
    setAnswers((prev) => prev.slice(0, -1))
  }

  const handleFinish = () => {
    if (selectedIndex === null) return
    const q = questions[currentIndex]
    const xpRules = XP_RULES[level] ?? { correct: 1, wrong: 0 }
    const isCorrect = selectedIndex === q.correctIndex
    const answer: QuizAnswer = {
      questionIndex: currentIndex,
      question: q.question,
      options: q.options,
      concept: q.concept,
      selectedIndex,
      correctIndex: q.correctIndex,
      isCorrect,
      xpEarned: isCorrect ? xpRules.correct : xpRules.wrong,
    }
    finishQuiz([...answers, answer])
  }

  const handleExitConfirm = () => {
    router.push(`/quiz/levelstart/${level}`)
  }

  const subjectLabel: Record<string, string> = {
    formal: "Formal Science",
    natural: "Natural Science",
    social: "Social Science",
  }

  if (loading) return (
    <main className="min-h-screen bg-[#62A2F3] flex flex-col items-center justify-center text-white gap-4">
      <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
      <p className="text-white/70">Loading {subjectLabel[subject]} questions...</p>
    </main>
  )

  if (error) return (
    <main className="min-h-screen bg-[#62A2F3] flex flex-col items-center justify-center text-white gap-4 px-5">
      <p className="text-red-300">{error}</p>
      <button onClick={() => router.back()} className="px-6 py-2 bg-white text-blue-700 rounded-full text-sm font-semibold">Go Back</button>
    </main>
  )

  if (questions.length === 0) return null

  const q = questions[currentIndex]
  const progress = (currentIndex / questions.length) * 100
  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60

  return (
    <>
      <main className="min-h-screen bg-[#62A2F3] flex flex-col items-center px-4 pt-24 pb-10">
        <div className="w-full max-w-2xl">

          {/* Header */}
          <div className="flex items-center justify-between mb-4">

            {/* Left side: Exit + badges */}
            <div className="flex items-center gap-2">
              {/* Exit button */}
              <button
                onClick={() => setShowExitModal(true)}
                className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 transition text-white"
                title="Exit quiz"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">{level}</span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold hidden sm:inline">{subjectLabel[subject]}</span>
            </div>

            {/* Timer */}
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold
              ${timeLeft <= 60 ? "bg-red-500/30 text-red-200 animate-pulse" : "bg-white/20 text-white"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {mins}:{secs.toString().padStart(2, "0")}
            </div>
          </div>

          {/* Subject label mobile */}
          <p className="text-white/60 text-xs mb-3 sm:hidden">{subjectLabel[subject]}</p>

          {/* Progress bar */}
          <QuizProgressBar progress={progress} />
          <p className="text-white/50 text-xs text-right mt-1 mb-4">
            {currentIndex + 1} / {questions.length}
          </p>

          {/* Question */}
          <QuizCard question={q.question} progress={progress} />

          {/* Options */}
          <div className="space-y-3 mt-5">
            {q.options.map((opt, i) => (
              <QuizOptionButton
                key={i}
                label={opt}
                index={i}
                selected={selectedIndex === i}
                onSelect={() => handleSelect(i)}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-6">
            <QuizNavigation
              currentIndex={currentIndex}
              total={questions.length}
              selectedIndex={selectedIndex}
              onBack={handleBack}
              onNext={handleNext}
              onFinish={handleFinish}
            />
          </div>
        </div>
      </main>

      {/* ── Exit confirmation modal ── */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowExitModal(false)}
          />

          {/* Modal card */}
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl z-10">
            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <h2 className="text-center text-gray-900 font-bold text-lg mb-2">
              Leave the quiz?
            </h2>
            <p className="text-center text-gray-500 text-sm leading-relaxed mb-6">
              Your progress will be lost and cannot be continued. Are you sure you want to exit?
            </p>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={handleExitConfirm}
                className="cursor-pointer w-full py-3 rounded-2xl bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-sm font-bold transition"
              >
                Yes, exit quiz
              </button>
              <button
                onClick={() => setShowExitModal(false)}
                className="cursor-pointer w-full py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 text-sm font-semibold transition"
              >
                Continue playing
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}