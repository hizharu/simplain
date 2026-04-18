import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { QuizResult, getKnowledgeLevel } from "@/types/quiz"

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )

    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const result: QuizResult = await req.json()

    // Get current profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("total_xp, formal_xp, natural_xp, social_xp, streak_days, last_quiz_date, total_achievements")
      .eq("id", user.id)
      .single()

    const now = new Date()
    const today = now.toISOString().split("T")[0]
    const lastQuizDate = profile?.last_quiz_date ?? null

    // Calculate streak
    let streakDays = profile?.streak_days ?? 0
    if (lastQuizDate === null) {
      streakDays = 1
    } else {
      const yesterday = new Date(now)
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split("T")[0]
      if (lastQuizDate === yesterdayStr) {
        streakDays += 1 // continued streak
      } else if (lastQuizDate === today) {
        // already played today, keep streak
      } else {
        streakDays = 1 // streak reset
      }
    }

    // Accumulate XP
    const newFormalXP  = (profile?.formal_xp  ?? 0) + result.scores.formal.xp
    const newNaturalXP = (profile?.natural_xp ?? 0) + result.scores.natural.xp
    const newSocialXP  = (profile?.social_xp  ?? 0) + result.scores.social.xp
    const newTotalXP   = (profile?.total_xp   ?? 0) + result.totalXP

    // Achievements: 1 per completed quiz (note must be adding another one)
    const newAchievements = (profile?.total_achievements ?? 0) + 1

    const knowledgeLevel = getKnowledgeLevel(newTotalXP)

    // Update profile
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        total_xp:           newTotalXP,
        formal_xp:          newFormalXP,
        natural_xp:         newNaturalXP,
        social_xp:          newSocialXP,
        streak_days:        streakDays,
        last_quiz_date:     today,
        total_achievements: newAchievements,
        knowledge_level:    knowledgeLevel,
      })
      .eq("id", user.id)

    if (updateError) throw updateError

    // Save quiz attempt history
    await supabase.from("quiz_attempts").insert({
      user_id:   user.id,
      level:     result.level,
      total_xp:  result.totalXP,
      formal_xp: result.scores.formal.xp,
      natural_xp:result.scores.natural.xp,
      social_xp: result.scores.social.xp,
      completed_at: result.completedAt,
    })

    return NextResponse.json({ success: true, newTotalXP, knowledgeLevel, streakDays })
  } catch (err) {
    console.error("Save score error:", err)
    return NextResponse.json({ error: "Failed to save score" }, { status: 500 })
  }
}