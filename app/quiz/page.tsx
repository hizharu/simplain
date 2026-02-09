'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const questions = [
  {
    id: 1,
    level: "Easy",
    question: "How do habits usually form?",
    options: [
      "By thinking about a goal one time",
      "By forcing yourself to change instantly",
      "By copying what other people do once",
      "By repeating the same action consistently over time",
    ],
    correctIndex: 3,
  },
  {
    id: 2,
    level: "Easy",
    question: "What helps habits stick long-term?",
    options: [
      "Motivation alone",
      "Consistency",
      "Luck",
      "Pressure from others",
    ],
    correctIndex: 1,
  },
]

export default function QuizPage() {
  const router = useRouter()

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  )

  const question = questions[current]
  const selected = answers[current]

  const progress = ((current + 1) / questions.length) * 100

  const selectAnswer = (index: number) => {
    const newAnswers = [...answers]
    newAnswers[current] = index
    setAnswers(newAnswers)
  }

  const next = () => {
    if (current === questions.length - 1) {
      router.push('/quiz/complete')
    } else {
      setCurrent((prev) => prev + 1)
    }
  }
 
  const back = () => {
    setCurrent((prev) => prev - 1)
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 animate-slowZoom"
        style={{ backgroundImage: `url('/images/quiz-bg.jpg')` }}
      />
      <div className="absolute inset-0 bg-blue-950/60 backdrop-blur-sm" />

      <div className="relative z-10 flex min-h-screen flex-col items-center px-4 py-6 text-white">
        {/* top */}
        <div className="flex w-full max-w-5xl items-center justify-between">
          <Link
            href="/#quiz-section"
            className="cursor-pointer rounded-full bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
          >
            ← Exit Quiz
          </Link>

          <span className="text-sm opacity-80">
            Question {current + 1} / {questions.length}
          </span>
        </div>

        {/* progress bar */}
        <div className="mt-4 w-full max-w-xl">
          <div className="h-2 rounded-full bg-white/20">
            <div
              className="h-2 rounded-full bg-white transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* quiz card */}
        <section
          key={current}
          className="mt-14 w-full max-w-xl animate-slideIn"
        >
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-xs">
            Level : {question.level}
          </span>

          <h1 className="mb-8 text-center text-2xl font-semibold md:text-3xl">
            {question.question}
          </h1>

          <div className="flex flex-col gap-4">
            {question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => selectAnswer(i)}
                className={`cursor-pointer rounded-xl px-5 py-4 text-left text-sm font-medium transition-all
                  ${
                    selected === i
                      ? 'bg-white text-blue-900 scale-[1.02]'
                      : 'bg-white/90 text-blue-900 hover:-translate-y-0.5'
                  }
                `}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* navigation */}
          <div className="mt-10 flex justify-between">
            <button
              disabled={current === 0}
              onClick={back}
              className="cursor-pointer rounded-full bg-white/20 px-6 py-2 text-sm disabled:opacity-40"
            >
              ← Back
            </button>

            <button
              disabled={selected === null}
              onClick={next}
              className="cursor-pointer rounded-full bg-white px-6 py-2 text-sm font-semibold text-blue-900 disabled:opacity-50"
            >
              {current === questions.length - 1 ? 'Done' : 'Next →'}
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
