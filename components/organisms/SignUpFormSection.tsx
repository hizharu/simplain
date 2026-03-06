"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import Toast, { ToastType } from "@/components/atoms/Toast"
import AvatarPicker from "@/components/atoms/AvatarPicker"

interface ToastState {
  message: string
  type: ToastType
}

export default function SignUpFormSection() {
  const router = useRouter()
  const supabase = createClient()

  // Form state
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Avatar state
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  // UI state
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<ToastState | null>(null)

const handleAvatarChange = async (file: File) => {
  setAvatarFile(file)  // langsung pakai tanpa compress
  setAvatarPreview(URL.createObjectURL(file))
}

  // ─── Toast helper ──────────────────────────────────────────────────────────
  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type })
  }

  const dismissToast = useCallback(() => setToast(null), [])

  // ─── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Client-side validation
    if (!email || !username || !password || !confirmPassword) {
      return showToast("Please fill in all fields.", "error")
    }
    if (password.length < 6) {
      return showToast("Password must be at least 6 characters.", "error")
    }
    if (password !== confirmPassword) {
      return showToast("Passwords do not match.", "error")
    }

    setLoading(true)

    try {
      // 1. Sign up with Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
        },
      })

      if (signUpError) {
        return showToast(signUpError.message, "error")
      }

      const userId = data.user?.id

      // 2. Upload avatar to Supabase Storage (if provided)
      let avatarUrl: string | null = null

      if (avatarFile && userId) {
        const ext = "jpg" // always jpeg after compression
        const filePath = `avatars/${userId}.${ext}`

        const { error: uploadError } = await supabase.storage
          .from("avatars") // make sure this bucket exists in your Supabase project
          .upload(filePath, avatarFile, { upsert: true })

        if (uploadError) {
          console.warn("Avatar upload failed:", uploadError.message)
          // non-fatal — continue without avatar
        } else {
          const { data: urlData } = supabase.storage
            .from("avatars")
            .getPublicUrl(filePath)
          avatarUrl = urlData.publicUrl
        }
      }

      // 3. Insert into profiles table
      if (userId) {
        await supabase.from("profiles").upsert({
          id: userId,
          username,
          email,
          avatar_url: avatarUrl,
        })
      }

      // 4. Success!
      showToast("Account created! Check your email to confirm.", "success")
      setTimeout(() => router.push("/login"), 2500)

    } catch (err) {
      console.error(err)
      showToast("Something went wrong. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="mt-18 text-white max-w-md">
      {/* Toast notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={dismissToast} />
      )}

      <h1 className="text-3xl lg:text-4xl font-semibold mb-4">
        Create an account
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>

        {/* Avatar Picker */}
        <AvatarPicker preview={avatarPreview} onChange={handleAvatarChange} />

        {/* Email */}
        <div>
          <label className="text-sm opacity-90">Email</label>
          <input
            type="email"
            placeholder="email@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md text-black outline-none bg-white mt-1"
          />
        </div>

        {/* Username */}
        <div>
          <label className="text-sm opacity-90">Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-md text-black outline-none bg-white mt-1"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm opacity-90">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md text-black outline-none bg-white mt-1"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-sm opacity-90">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md text-black outline-none bg-white mt-1"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:scale-[1.02] transition w-full shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
        >
          {loading ? "Creating account..." : "Create"}
        </button>
      </form>

      <p className="text-sm mt-3 opacity-90">
        Already have account?
        <Link href="/login" className="underline ml-1">
          Click here!
        </Link>
      </p>

      <Link href="/register" className="inline-block mt-6">
        <button className="bg-white/20 px-6 py-2 rounded-full hover:bg-white/30 transition">
          Back
        </button>
      </Link>
    </div>
  )
}