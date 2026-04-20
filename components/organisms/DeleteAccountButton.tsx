"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"

type Step = "idle" | "confirm" | "verify" | "deleting"

export default function DeleteAccountButton() {
  const router = useRouter()
  const supabase = createClient()

  const [step, setStep] = useState<Step>("idle")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState("")
  const [verifying, setVerifying] = useState(false)

  const handleOpen = () => {
    setStep("confirm")
    setError("")
    setPassword("")
  }

  const handleClose = () => {
    setStep("idle")
    setError("")
    setPassword("")
    setShowPass(false)
  }

  const handleProceedToVerify = () => {
    setStep("verify")
    setError("")
  }

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim()) return setError("Please enter your password.")

    setVerifying(true)
    setError("")

    try {
      // Re-authenticate with password first
      const { data: { user } } = await supabase.auth.getUser()
      if (!user?.email) throw new Error("No user found")

      const { error: authError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password,
      })

      if (authError) {
        setError("Incorrect password. Please try again.")
        setVerifying(false)
        return
      }

      // Password correct — proceed to delete
      setStep("deleting")

      const res = await fetch("/api/delete-account", { method: "DELETE" })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to delete account")
      }

      // Sign out and redirect
      await supabase.auth.signOut()
      router.push("/?deleted=1")

    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "Something went wrong.")
      setStep("verify")
    } finally {
      setVerifying(false)
    }
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={handleOpen}
        className="cursor-pointer flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 active:bg-red-100 px-4 py-2.5 rounded-2xl transition-all duration-200 w-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete Account
      </button>

      {/* Modal */}
      {step !== "idle" && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={step === "deleting" ? undefined : handleClose}
          />

          {/* Panel */}
          <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl z-10 overflow-hidden">

            {/* ── Step 1: Confirm ── */}
            {step === "confirm" && (
              <div className="p-6">
                <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>

                <h2 className="text-center text-gray-900 font-bold text-lg mb-2">
                  Delete your account?
                </h2>

                <p className="text-center text-gray-500 text-sm leading-relaxed mb-2">
                  This will permanently delete:
                </p>

                <ul className="text-sm text-gray-500 space-y-1.5 mb-5 bg-gray-50 rounded-2xl p-4">
                  {[
                    "Your profile and all personal data",
                    "All quiz attempts and XP history",
                    "All saved ExplainMe favorites",
                    "Your profile avatar",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-center text-xs text-gray-400 mb-5">
                  This action is <span className="font-bold text-red-500">irreversible</span>. There is no going back.
                </p>

                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={handleProceedToVerify}
                    className="cursor-pointer w-full py-3 rounded-2xl bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-sm font-bold transition-all"
                  >
                    I understand, continue
                  </button>
                  <button
                    onClick={handleClose}
                    className="cursor-pointer w-full py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 2: Password verify ── */}
            {step === "verify" && (
              <div className="p-6">
                <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>

                <h2 className="text-center text-gray-900 font-bold text-lg mb-1">
                  Confirm your identity
                </h2>
                <p className="text-center text-gray-500 text-sm mb-5">
                  Enter your password to permanently delete your account.
                </p>

                <form onSubmit={handleDelete} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Password</label>
                    <div className="relative mt-1.5">
                      <input
                        type={showPass ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError("") }}
                        autoFocus
                        className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition cursor-pointer"
                      >
                        {showPass ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {error && (
                      <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                        <span>⚠</span> {error}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2.5 pt-1">
                    <button
                      type="submit"
                      disabled={verifying || !password}
                      className="cursor-pointer w-full py-3 rounded-2xl bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold transition-all flex items-center justify-center gap-2"
                    >
                      {verifying ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Delete my account"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      disabled={verifying}
                      className="cursor-pointer w-full py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold transition-all disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ── Step 3: Deleting (loading) ── */}
            {step === "deleting" && (
              <div className="p-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-5">
                  <div className="w-7 h-7 border-3 border-red-200 border-t-red-500 rounded-full animate-spin" />
                </div>
                <h2 className="text-gray-900 font-bold text-lg mb-2">Deleting account...</h2>
                <p className="text-gray-500 text-sm">Please wait, do not close this page.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}