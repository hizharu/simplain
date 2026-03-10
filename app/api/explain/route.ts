import { NextRequest } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json()

    if (!question?.trim()) {
      return new Response("Question is required", { status: 400 })
    }

    const stream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1000,
      stream: true,
      messages: [
        {
          role: "system",
          content: `You are Simplain — a friendly teacher who explains complex topics 
as if talking to a curious 12-year-old. 
Use simple words, fun analogies, and short paragraphs.
Avoid jargon. Make it engaging and easy to understand.
Keep responses under 300 words. Use emojis sparingly to make it fun.`,
        },
        {
          role: "user",
          content: `Explain me: ${question}`,
        },
      ],
    })

    // back respon dari stream ke server
    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? "" //note buat ganti logic
          if (text) controller.enqueue(encoder.encode(text))
        }
        controller.close()
      },
    })

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    })
//error mess 1
  } catch (err) {
    console.error("Explain API error:", err)
    return new Response("Failed to generate explanation", { status: 500 })
  }
}