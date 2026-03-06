"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AccountTemplate from "@/components/templates/AccountTemplate"
import { createClient } from "@/utils/supabase/client"
import { getKnowledgeLevel } from "@/types/quiz"

const subjectIcons = {
  formal: (
    <img src="https://cdn-icons-png.flaticon.com/512/2103/2103633.png" alt="Formal Science" className="w-9 h-9 object-contain" />
  ),
  natural: (
    <img src="https://cdn-icons-png.flaticon.com/512/3043/3043935.png" alt="Natural Science" className="w-9 h-9 object-contain" />
  ),
  social: (
    <img src="https://cdn-icons-png.flaticon.com/512/4698/4698901.png" alt="Social Science" className="w-9 h-9 object-contain" />
  ),
}

interface Profile {
  username: string
  email: string
  avatar_url: string | null
  total_xp: number
  formal_xp: number
  natural_xp: number
  social_xp: number
  streak_days: number
  total_achievements: number
  knowledge_level: string
}

export default function AccountPage() {
  const router = useRouter()
  const supabase = createClient()

  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfile() {
      // 1. Cek auth
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.replace("/login")
        return
      }

      // 2. Ambil data profile
      const { data, error } = await supabase
        .from("profiles")
        .select("username, email, avatar_url, total_xp, formal_xp, natural_xp, social_xp, streak_days, total_achievements, knowledge_level")
        .eq("id", user.id)
        .single()

      if (error || !data) {
        console.error("Failed to fetch profile:", error)
        setLoading(false)
        return
      }

      setProfile(data)
      setLoading(false)
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-400 to-cyan-300">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-400 to-cyan-300 text-white">
        <p>Failed to load profile.</p>
      </div>
    )
  }

  console.log("avatar_url:", profile.avatar_url)

  const subjects = [
    { icon: subjectIcons.formal,  name: "Formal Science",  xp: profile.formal_xp  ?? 0 },
    { icon: subjectIcons.natural, name: "Natural Science", xp: profile.natural_xp ?? 0 },
    { icon: subjectIcons.social,  name: "Social Science",  xp: profile.social_xp  ?? 0 },
  ]

  const knowledgeLevel = profile.knowledge_level ?? getKnowledgeLevel(profile.total_xp ?? 0)

  return (
    <AccountTemplate
      name={profile.username ?? "User"}
      email={profile.email ?? ""}
      avatarSrc={profile.avatar_url ?? "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
      totalXP={profile.total_xp ?? 0}
      streakDays={profile.streak_days ?? 0}
      totalAchievements={profile.total_achievements ?? 0}
      knowledgeLevel={knowledgeLevel}
      subjects={subjects}
      onBack={() => router.push("/")}
      onEditProfile={() => router.push("/account/edit")}
    />
  )
}