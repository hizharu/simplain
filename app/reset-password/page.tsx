"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"

export default function ResetPasswordPage() {
  const router = useRouter()
  const supabase = createClient()

  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [ready, setReady] = useState(false)
  const [authError, setAuthError] = useState("")

  useEffect(() => {
    const init = async () => {
      const params = new URLSearchParams(window.location.search)
      const hashParams = new URLSearchParams(window.location.hash.replace("#", ""))
      const code = params.get("code")
      const accessToken = hashParams.get("access_token")
      const refreshToken = hashParams.get("refresh_token")
      const type = hashParams.get("type")

      try {
        if (code) {
          // Try exchangeCodeForSession — may fail if verifier missing (cross-browser)
          // In that case, check if middleware already established a session
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          if (error) {
            // Verifier missing — check if session exists from middleware/cookies
            const { data: { session } } = await supabase.auth.getSession()
            if (session) {
              setReady(true)
            } else {
              setAuthError("This link has expired or was opened in a different browser. Please request a new reset link.")
            }
            return
          }
          setReady(true)

        } else if (accessToken && type === "recovery") {
          // Legacy implicit flow
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken ?? "",
          })
          if (error) throw error
          setReady(true)

        } else {
          // No token at all — check if session already exists (e.g. from middleware)
          const { data: { session } } = await supabase.auth.getSession()
          if (session) {
            setReady(true)
          } else {
            setAuthError("Invalid or expired reset link. Please request a new one.")
          }
        }
      } catch (err) {
        console.error("Auth init error:", err)
        setAuthError("Authentication failed. Please request a new reset link.")
      }
    }

    init()
  }, [])

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!password || !confirm) return setError("Please fill in all fields.")
    if (password.length < 6) return setError("Password must be at least 6 characters.")
    if (password !== confirm) return setError("Passwords do not match.")

    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setSuccess(true)
      setTimeout(() => router.push("/login"), 2500)
    } catch (err) {
      console.error(err)
      setError("Failed to reset password. Please request a new link.")
    } finally {
      setLoading(false)
    }
  }

  const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  )

  const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  )

  return (
    <main className="min-h-screen bg-[#62A2F3] flex items-center justify-center px-5">
      <div className="w-full max-w-md text-white">

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-white/20 border border-white/30 flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold mb-2">Password updated!</h1>
            <p className="text-white/70 text-sm">Redirecting you to login...</p>
          </div>

        ) : authError ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-red-400/20 border border-red-300/30 flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold mb-3">Link expired</h1>
            <p className="text-white/70 text-sm mb-8 leading-relaxed max-w-xs mx-auto">{authError}</p>
            <button
              onClick={() => router.push("/login")}
              className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:scale-[1.02] transition shadow-lg cursor-pointer"
            >
              Back to login
            </button>
          </div>

        ) : (
          <>
            <h1 className="text-3xl lg:text-4xl font-semibold mb-3">Reset Password</h1>
            <p className="text-sm text-white/70 mb-8 leading-relaxed">
              Enter a new password for your account.
            </p>

            {!ready && (
              <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-sm text-white/80 mb-6">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0" />
                Verifying your reset link...
              </div>
            )}

            <form className="space-y-5" onSubmit={handleReset}>
              <div>
                <label className="text-sm opacity-90">New Password</label>
                <div className="relative mt-1">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!ready}
                    className="w-full px-4 py-2 pr-10 rounded-md text-black outline-none bg-white disabled:opacity-50"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition cursor-pointer">
                    {showPass ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm opacity-90">Confirm Password</label>
                <div className="relative mt-1">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat your password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    disabled={!ready}
                    className="w-full px-4 py-2 pr-10 rounded-md text-black outline-none bg-white disabled:opacity-50"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition cursor-pointer">
                    {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-200 bg-red-500/20 border border-red-300/30 rounded-lg px-4 py-2.5">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !ready}
                className="mt-4 bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:scale-[1.02] transition w-full shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  )
}