"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import EditProfileTemplate from "@/components/templates/EditProfileTemplate"
import { createClient } from "@/utils/supabase/client"
//biang masalah
import { compressImage } from "@/utils/compressimage"

export default function EditProfilePage() {
  const router = useRouter()
  const supabase = createClient()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [avatarSrc, setAvatarSrc] = useState("")
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // ── Fetch current profile ──────────────────────────────────────────────────
  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.replace("/login"); return }

      const { data } = await supabase
        .from("profiles")
        .select("username, email, avatar_url")
        .eq("id", user.id)
        .single()

      if (data) {
        setFullName(data.username ?? "")
        setEmail(data.email ?? user.email ?? "")
        setAvatarSrc(data.avatar_url ?? "")
      }
      setLoading(false)
    }
    fetchProfile()
  }, [])

  // ── Handle avatar pick + compress ─────────────────────────────────────────
  const handleAvatarChange = async () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      try {
        const compressed = await compressImage(file, 256, 0.75)
        setAvatarFile(compressed)
        setAvatarSrc(URL.createObjectURL(compressed))
      } catch {
        alert("Failed to process image.")
      }
    }
    input.click()
  }

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.replace("/login"); return }

      // 1. Upload avatar if changed
      let newAvatarUrl = avatarSrc
      if (avatarFile) {
        const filePath = `avatars/${user.id}.jpg`
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatarFile, { upsert: true })

        if (!uploadError) {
          const { data: urlData } = supabase.storage
            .from("avatars")
            .getPublicUrl(filePath)
          newAvatarUrl = urlData.publicUrl
        }
      }

      // 2. Update username + avatar in profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          username: fullName,
          avatar_url: newAvatarUrl,
        })
        .eq("id", user.id)

      if (profileError) throw profileError

      // 3. Update email if changed
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (email !== currentUser?.email) {
        const { error: emailError } = await supabase.auth.updateUser({ email })
        if (emailError) throw emailError
      }

      // 4. Update password if filled in
      if (password && password.length >= 6) {
        const { error: passError } = await supabase.auth.updateUser({ password })
        if (passError) throw passError
      }

      alert("Profile updated successfully!")
      router.push("/account")

    } catch (err: unknown) {
      console.error(err)
      alert(err instanceof Error ? err.message : "Failed to save profile.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-400 to-cyan-300">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <EditProfileTemplate
      avatarSrc={avatarSrc || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
      fullName={fullName}
      email={email}
      password={password}
      onFullNameChange={setFullName}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onAvatarChange={handleAvatarChange}
      onSave={handleSave}
      onBack={() => router.push("/account")}
    />
  )
}