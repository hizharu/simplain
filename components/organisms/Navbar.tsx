"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import type { User } from "@supabase/supabase-js"

const baseNavItems = [
  { name: "Home", href: "/#main-home" },
  { name: "Fundamental", href: "/#fundamental-section" },
  { name: "ExplainMe", href: "/#explain-section" },
  { name: "Quiz", href: "/#quiz-section" },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  // ─── Listen to auth state ─────────────────────────────────────────────────
  useEffect(() => {
    // Get current session on mount
    supabase.auth.getUser().then(({ data }) => setUser(data.user))

    // Listen for login / logout events
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  // ─── Account nav item: dynamic based on login state ──────────────────────
  const accountItem = user
    ? { name: "Account", href: "/account" }      // logged in → go to account page
    : { name: "Account", href: "/register" }      // not logged in → go to register

  const navItems = [...baseNavItems, accountItem]

  // ─── Logout handler ───────────────────────────────────────────────────────
  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/")
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <header>
      {/* Desktop */}
      <nav>
        <ul className="hidden md:flex bg-white/20 backdrop-blur-md fixed top-4 left-1/2 -translate-x-1/2 z-50 h-14 px-10 rounded-full gap-10 text-white text-center place-items-center">
          <li className="font-semibold">Logo</li>

          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <li
                  className={`cursor-pointer px-3 py-1 rounded-full transition
                    ${isActive
                      ? "bg-white text-black font-medium"
                      : "hover:bg-white/20"
                    }`}
                >
                  {item.name}
                </li>
              </Link>
            )
          })}

          {/* Logout button — only shown when logged in */}
          {user && (
            <li>
              <button
                onClick={handleLogout}
                className="cursor-pointer px-3 py-1 rounded-full transition hover:bg-white/20 text-white/80 hover:text-white text-sm"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Mobile */}
        <div className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%]">
          <div className="bg-white/20 backdrop-blur-md rounded-full flex items-center justify-between px-5 h-14 text-white">
            <span className="font-semibold">Logo</span>
            <button onClick={() => setOpen(!open)}>
              <div className="space-y-1">
                <span className="block w-6 h-0.5 bg-white"></span>
                <span className="block w-6 h-0.5 bg-white"></span>
                <span className="block w-6 h-0.5 bg-white"></span>
              </div>
            </button>
          </div>

          {open && (
            <div className="mt-3 bg-white/20 backdrop-blur-md rounded-2xl p-4 text-white space-y-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2 rounded-lg transition
                      ${isActive
                        ? "bg-white text-black font-medium"
                        : "hover:bg-white/20"
                      }`}
                  >
                    {item.name}
                  </Link>
                )
              })}

              {user && (
                <button
                  onClick={() => { handleLogout(); setOpen(false) }}
                  className="block w-full text-left px-3 py-2 rounded-lg hover:bg-white/20 transition text-white/80"
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}