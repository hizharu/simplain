import { NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { level } = await req.json()

    if (!["easy", "medium", "hard"].includes(level)) {
      return NextResponse.json({ error: "Invalid level" }, { status: 400 })
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // place model
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are a quiz generator. Always respond with valid JSON only. 
No explanation, no markdown, no backticks.
Always return a JSON object with a "questions" array.`,
        },
        {
          role: "user",
          content: `Generate exactly 30 multiple choice questions for a science quiz.
Cover these 3 concepts evenly (exactly 10 questions each):
- formal science (math, logic, computer science)
- natural science (physics, chemistry, biology, earth science)
- social science (history, economics, psychology, sociology)

Difficulty level: ${level}
- easy: basic knowledge, straightforward answers
- medium: requires understanding of concepts
- hard: requires deep knowledge and critical thinking

Rules:
- Each question has exactly 4 options
- Exactly 1 correct answer per question
- correctIndex is 0-based (0, 1, 2, or 3)
- Shuffle order randomly (do not group by concept)

Return a JSON object like this:
{
  "questions": [
    {
      "concept": "formal",
      "question": "What is 2 + 2?",
      "options": ["3", "4", "5", "6"],
      "correctIndex": 1
    }
  ]
}`,
        },
      ],
    })

    const raw = completion.choices[0]?.message?.content ?? ""
    const parsed = JSON.parse(raw)
    const questions = parsed.questions ?? parsed

    // Inject level
    const withLevel = questions.map((q: object) => ({ ...q, level }))

    return NextResponse.json({ questions: withLevel })

  } catch (err) {
    console.error("Quiz generation error:", err)
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 })
  }
}