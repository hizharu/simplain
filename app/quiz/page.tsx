"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import QuizTemplate from "@/components/templates/QuizTemplate"

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
      router.push("/quiz/complete")
    } else {
      setCurrent((prev) => prev + 1)
    }
  }

  const back = () => setCurrent((prev) => prev - 1)

  return (
    <QuizTemplate
      current={current}
      total={questions.length}
      question={question}
      selected={selected}
      progress={progress}
      onSelect={selectAnswer}
      onNext={next}
      onBack={back}
    />
  )
}
