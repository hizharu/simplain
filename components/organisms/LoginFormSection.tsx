"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import Toast, { ToastType } from "@/components/atoms/Toast"

interface ToastState {
  message: string
  type: ToastType
}

export default function LoginFormSection() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<ToastState | null>(null)

  const showToast = (message: string, type: ToastType) => setToast({ message, type })
  const dismissToast = useCallback(() => setToast(null), [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      return showToast("Please fill in all fields.", "error")
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        if (error.message.toLowerCase().includes("email not confirmed")) {
          return showToast("Please confirm your email first.", "error")
        }
        return showToast("Invalid email or password.", "error")
      }

      showToast("Login successful! Redirecting...", "success")
      setTimeout(() => router.push("/"), 1500)

    } catch (err) {
      console.error(err)
      showToast("Something went wrong. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="text-white max-w-md ">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={dismissToast} />
      )}

      <h1 className="text-3xl lg:text-4xl font-semibold mb-8">
        Login Account
      </h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm opacity-90">Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-4 py-2 rounded-md text-black outline-none bg-white"
          />
        </div>

        {/* Username tidak dipakai untuk login — Supabase auth pakai email + password */}

        <div>
          <label className="text-sm opacity-90">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-4 py-2 rounded-md text-black outline-none bg-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:scale-[1.02] transition w-full shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-sm mt-4 opacity-90">
        Doesn&apos;t have account?
        <Link href="/signup" className="underline ml-1">
          Click here!
        </Link>
      </p>

      <Link href="/register" className="inline-block mt-8">
        <button className="bg-white/20 px-6 py-2 rounded-full hover:bg-white/30 transition">
          Back
        </button>
      </Link>
    </div>
  )
}