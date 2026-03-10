"use client"

import { useState, useEffect } from "react"
import ExplainTemplate from "@/components/templates/ExplainTemplate"
import { createClient } from "@/utils/supabase/client"

const suggestions = [
  "Explain me how internet works",
  "Explain how inflation can happen",
  "How are websites built",
  "How cultures shape behavior",
  "What is quantum physics",
  "Why do we dream",
]

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export interface FavoriteItem {
  id: string
  question: string
  answer: string
  saved_at: string
}

export default function ExplainPage() {
  const supabase = createClient()

  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [streamingAnswer, setStreamingAnswer] = useState("")
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [savingId, setSavingId] = useState<string | null>(null)

  useEffect(() => { fetchFavorites() }, [])

  const fetchFavorites = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase
      .from("explain_favorites")
      .select("*")
      .eq("user_id", user.id)
      .order("saved_at", { ascending: false })
    if (data) setFavorites(data)
  }

  const handleSaveFavorite = async (q: string, answer: string) => {
    setSavingId(q)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { alert("Please login to save favorites."); return }
      const { data, error } = await supabase
        .from("explain_favorites")
        .insert({ user_id: user.id, question: q, answer, saved_at: new Date().toISOString() })
        .select().single()
      if (error) throw error
      if (data) setFavorites((prev) => [data, ...prev])
    } catch (err) {
      console.error(err)
    } finally {
      setSavingId(null)
    }
  }

  const handleDeleteFavorite = async (id: string) => {
    await supabase.from("explain_favorites").delete().eq("id", id)
    setFavorites((prev) => prev.filter((f) => f.id !== id))
  }

  const handleExplain = async () => {
    if (!question.trim() || loading) return
    const userMessage: ChatMessage = { role: "user", content: question, timestamp: new Date() }
    setChatHistory((prev) => [...prev, userMessage])
    setQuestion("")
    setStreamingAnswer("")
    setLoading(true)
    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage.content }),
      })
      if (!res.ok) throw new Error("Failed")
      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      if (!reader) throw new Error("No reader")
      let fullAnswer = ""
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        fullAnswer += decoder.decode(value)
        setStreamingAnswer(fullAnswer)
      }
      setChatHistory((prev) => [...prev, { role: "assistant", content: fullAnswer, timestamp: new Date() }])
      setStreamingAnswer("")
    } catch (err) {
      console.error(err)
      setChatHistory((prev) => [...prev, { role: "assistant", content: "Oops! Something went wrong.", timestamp: new Date() }])
      setStreamingAnswer("")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ExplainTemplate
      question={question}
      setQuestion={setQuestion}
      chatHistory={chatHistory}
      streamingAnswer={streamingAnswer}
      loading={loading}
      onExplain={handleExplain}
      onClearHistory={() => { setChatHistory([]); setStreamingAnswer("") }}
      onSaveFavorite={handleSaveFavorite}
      onDeleteFavorite={handleDeleteFavorite}
      favorites={favorites}
      showFavorites={showFavorites}
      onToggleFavorites={() => setShowFavorites(!showFavorites)}
      savingId={savingId}
      suggestions={suggestions}
    />
  )
}