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

type View = "login" | "forgot"

export default function LoginFormSection() {
  const router = useRouter()
  const supabase = createClient()

  const [view, setView] = useState<View>("login")

  // Login fields
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  // Forgot password fields
  const [resetEmail, setResetEmail] = useState("")
  const [resetLoading, setResetLoading] = useState(false)
  const [resetSent, setResetSent] = useState(false)

  const [toast, setToast] = useState<ToastState | null>(null)
  const showToast = (message: string, type: ToastType) => setToast({ message, type })
  const dismissToast = useCallback(() => setToast(null), [])

  // ── Login ──────────────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return showToast("Please fill in all fields.", "error")

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

  // ── Forgot password ────────────────────────────────────────────────────────
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!resetEmail.trim()) return showToast("Please enter your email.", "error")

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(resetEmail)) return showToast("Please enter a valid email.", "error")

    setResetLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) throw error
      setResetSent(true)
    } catch (err) {
      console.error(err)
      showToast("Failed to send reset email. Please try again.", "error")
    } finally {
      setResetLoading(false)
    }
  }

  const handleBackToLogin = () => {
    setView("login")
    setResetEmail("")
    setResetSent(false)
    setToast(null)
  }

  // Render 
  return (
    <div className="text-white max-w-md w-full">
      {toast && <Toast message={toast.message} type={toast.type} onClose={dismissToast} />}

      {/* ── LOGIN VIEW ── */}
      {view === "login" && (
        <>
          <h1 className="text-3xl lg:text-4xl font-semibold mb-8">Login Account</h1>

          <form className="space-y-5" onSubmit={handleLogin}>
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

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm opacity-90">Password</label>
                <button
                  type="button"
                  onClick={() => setView("forgot")}
                  className="text-xs text-white/70 hover:text-white underline underline-offset-2 transition cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md text-black outline-none bg-white"
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
            <Link href="/signup" className="underline ml-1">Click here!</Link>
          </p>

          <Link href="/register" className="inline-block mt-8">
            <button className="bg-white/20 px-6 py-2 rounded-full hover:bg-white/30 transition cursor-pointer">
              Back
            </button>
          </Link>
        </>
      )}

      {/* ── FORGOT PASSWORD VIEW ── */}
      {view === "forgot" && (
        <>
          {/* Back button */}
          <button
            type="button"
            onClick={handleBackToLogin}
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition mb-8 cursor-pointer group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to login
          </button>

          {!resetSent ? (
            <>
              <h1 className="text-3xl lg:text-4xl font-semibold mb-3">Forgot Password</h1>
              <p className="text-sm text-white/70 mb-8 leading-relaxed">
                Enter your email and we&apos;ll send you a link to reset your password.
              </p>

              <form className="space-y-5" onSubmit={handleForgotPassword}>
                <div>
                  <label className="text-sm opacity-90">Email</label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full mt-1 px-4 py-2 rounded-md text-black outline-none bg-white"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={resetLoading}
                  className="mt-4 bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:scale-[1.02] transition w-full shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {resetLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            </>
          ) : (
            /* ── SUCCESS STATE ── */
            <div className="flex flex-col items-center text-center py-6">
              <div className="w-16 h-16 rounded-full bg-white/20 border border-white/30 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <h2 className="text-2xl font-semibold mb-3">Check your email</h2>
              <p className="text-sm text-white/70 leading-relaxed mb-2">
                We sent a reset link to
              </p>
              <p className="text-sm font-semibold mb-6 break-all">{resetEmail}</p>
              <p className="text-xs text-white/50 mb-8">
                Didn&apos;t get it? Check your spam folder or try again.
              </p>

              <button
                type="button"
                onClick={() => setResetSent(false)}
                className="bg-white/20 hover:bg-white/30 transition px-6 py-2 rounded-full text-sm font-medium cursor-pointer"
              >
                Resend email
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}