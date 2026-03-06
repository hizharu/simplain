"use client"

import { useState, useRef, useEffect } from "react"
import ExplainTemplate from "@/components/templates/ExplainTemplate"

const suggestions = [
  "Explain me how internet works",
  "Explain how inflation can happen",
  "How are websites built",
  "How cultures shape behavior",
  "What is quantum physics",
  "Why do we dream",
]

export default function ExplainPage() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)

  const handleExplain = async () => {
    if (!question.trim() || loading) return

    setAnswer("")
    setLoading(true)

    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      })

      if (!res.ok) throw new Error("Failed to get explanation")

      // Stream the response
      const reader = res.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) throw new Error("No reader")

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        setAnswer((prev) => prev + chunk)
      }

    } catch (err) {
      console.error(err)
      setAnswer("Oops! Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ExplainTemplate
      question={question}
      setQuestion={setQuestion}
      answer={answer}
      loading={loading}
      onExplain={handleExplain}
      suggestions={suggestions}
    />
  )
}