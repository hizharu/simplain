"use client"

import { useState } from "react"
import ExplainTemplate from "@/components/templates/ExplainTemplate"

const suggestions = [
  "Explain me how internet works",
  "Explain inflation can happen",
  "How websites are built",
  "How cultures shape behavior",
]

export default function ExplainPage() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  const handleExplain = () => {
    if (!question) return

    setAnswer(`Mock explanation for: ${question}`)
  }

  return (
    <ExplainTemplate
      question={question}
      setQuestion={setQuestion}
      answer={answer}
      onExplain={handleExplain}
      suggestions={suggestions}
    />
  )
}
  