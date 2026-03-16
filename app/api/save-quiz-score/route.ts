import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import type { QuizResult } from "@/types/quiz"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const result: QuizResult = await req.json()

    // Fetch current profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("total_xp, formal_xp, natural_xp, social_xp, streak_days, last_quiz_date")
      .eq("id", user.id)
      .single()

    if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 })

    // Streak logic
    const today = new Date().toISOString().split("T")[0]
    const lastDate = profile.last_quiz_date
    const isConsecutive = lastDate
      ? new Date(today).getTime() - new Date(lastDate).getTime() === 86400000
      : false
    const newStreak = isConsecutive ? (profile.streak_days ?? 0) + 1 : 1

    // XP update based on subject
    const xp = result.totalXP
    const subjectXPField: Record<string, string> = {
      formal: "formal_xp",
      natural: "natural_xp",
      social: "social_xp",
    }
    const xpField = subjectXPField[result.subject] ?? "formal_xp"

    const newTotalXP = (profile.total_xp ?? 0) + xp
    const newSubjectXP = (profile[xpField as keyof typeof profile] as number ?? 0) + xp

    // Update profile
    await supabase
      .from("profiles")
      .update({
        total_xp: newTotalXP,
        [xpField]: newSubjectXP,
        streak_days: newStreak,
        last_quiz_date: today,
      })
      .eq("id", user.id)

    // Insert quiz attempt
    await supabase.from("quiz_attempts").insert({
      user_id: user.id,
      level: result.level,
      subject: result.subject,
      total_xp: xp,
      completed_at: result.completedAt,
    })

    return NextResponse.json({ success: true, xpEarned: xp })
  } catch (err) {
    console.error("save-quiz-score error:", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}