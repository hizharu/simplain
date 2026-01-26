"use client"

import { useState } from "react"

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

    // 🔥 MOCK AI RESPONSE (replace with real API later)
    setAnswer(
      `Okay, let’s explain this like you’re 12 👶📘

${question}

Imagine the internet like a giant delivery system.
When you open a website, your computer asks another computer somewhere in the world,
“Hey, do you have this page?”
That computer sends it back super fast using cables and signals.

No magic. Just computers talking really fast 😄`
    )
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-[#62A2F3] to-[#41BBD9] flex flex-col items-center px-4 pt-32 pb-24 text-white">
      <h1 className="text-3xl md:text-4xl font-semibold mb-2">
        Explain Me
      </h1>
      <p className="text-sm md:text-base opacity-80 text-center mb-10">
        “The important thing is to never stop asking questions” <br />
        <span className="italic">— Albert Einstein</span>
      </p>
      <div className="w-full max-w-3xl bg-white rounded-2xl p-6 md:p-8 text-gray-800 shadow-lg mb-6 min-h-[200px]">
        {answer ? (
          <p className="whitespace-pre-line text-sm md:text-base">
            {answer}
          </p>
        ) : (
          <p className="text-gray-400 text-center">
            Your explanation will appear here ✨
          </p>
        )}
      </div>
      //
      <div className="w-full max-w-3xl flex items-center bg-white rounded-full px-4 py-2 shadow-md mb-6">
        <input
          type="text"
          placeholder="Explain me..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 outline-none text-gray-800 placeholder-gray-400 text-sm md:text-base"
        />
        <button
          onClick={handleExplain}
          className="ml-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full px-4 py-2 text-sm transition"
        >
          ▶
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-3 max-w-3xl">
        {suggestions.map((item, index) => (
          <button
            key={index}
            onClick={() => setQuestion(item)}
            className="bg-white text-gray-800 px-4 py-2 rounded-full text-xs md:text-sm hover:bg-gray-100 transition"
          >
            {item}
          </button>
        ))}
      </div>
    </main>
  )
}
