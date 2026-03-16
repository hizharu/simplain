import { NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const subjectPrompts: Record<string, string> = {
  formal: "mathematics, logic, statistics, computer science, and formal reasoning",
  natural: "physics, chemistry, biology, earth science, and natural phenomena",
  social: "history, economics, psychology, sociology, and human society",
}

const subjectLabels: Record<string, string> = {
  formal: "Formal Science",
  natural: "Natural Science",
  social: "Social Science",
}

const difficultyGuides: Record<string, string> = {
  easy: "simple, foundational concepts suitable for beginners",
  medium: "intermediate concepts requiring some background knowledge",
  hard: "advanced concepts that challenge deep understanding",
}

export async function POST(req: NextRequest) {
  try {
    const { level, subject } = await req.json()

    if (!level || !subject) {
      return NextResponse.json({ error: "Missing level or subject" }, { status: 400 })
    }

    const subjectArea = subjectPrompts[subject as string] ?? subjectPrompts.formal
    const subjectLabel = subjectLabels[subject as string] ?? "Science"
    const difficultyGuide = difficultyGuides[level as string] ?? difficultyGuides.medium

    const prompt = `Generate exactly 15 multiple choice quiz questions about ${subjectArea} (${subjectLabel}).
Difficulty: ${level} — ${difficultyGuide}.

Rules:
- All 15 questions must be about ${subjectLabel} topics only
- Each question has exactly 4 options
- correctIndex is 0-3 (index of the correct answer)
- concept field: short topic label (e.g. "Algebra", "Photosynthesis", "Supply & Demand")
- Questions should be clear, educational, and varied across subtopics

Respond ONLY with valid JSON, no markdown, no extra text:
{
  "questions": [
    {
      "concept": "string",
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctIndex": number
    }
  ]
}`

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 4000,
      response_format: { type: "json_object" },
    })

    const raw = completion.choices[0]?.message?.content ?? "{}"
    const parsed = JSON.parse(raw)
    const questions = (parsed.questions ?? []).slice(0, 15)

    return NextResponse.json({ questions })
  } catch (err) {
    console.error("generate-quiz error:", err)
    return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 })
  }
}