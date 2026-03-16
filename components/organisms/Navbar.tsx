"use client"

import Link from "next/link"
import Image from "next/image"
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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const accountItem = user
    ? { name: "Account", href: "/account" }
    : { name: "Sign Up", href: "/register" }

  const navItems = [...baseNavItems, accountItem]

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/")
  }

  return (
    <header>
      {/* DESKTOP */}
      <nav className={`hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 h-14 px-3 rounded-full items-center gap-1 transition-all duration-300
        ${scrolled
          ? "bg-white/25 backdrop-blur-2xl shadow-xl shadow-blue-900/20 border border-white/35"
          : "bg-white/15 backdrop-blur-xl border border-white/20"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="mr-2 cursor-pointer">
          <div className="bg-white hover:bg-white/90 active:bg-white/80 transition-all duration-200 rounded-xl p-1.5 shadow-sm">
            <Image
              src="/images/logofix1.png"
              alt="Simplain"
              width={36}
              height={36}
              className="object-contain"
              priority
            />
          </div>
        </Link>

        <div className="w-px h-5 bg-white/20 mr-1" />

        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <span className={`cursor-pointer flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 select-none
                ${isActive
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-white hover:bg-white/20 active:bg-white/30"
                }`}
              >
                {item.name}
              </span>
            </Link>
          )
        })}

        {user && (
          <>
            <div className="w-px h-5 bg-white/25 mx-1" />
            <button
              onClick={handleLogout}
              className="cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white/75 hover:text-white hover:bg-white/15 active:bg-white/25 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </>
        )}
      </nav>

      {/* MOBILE */}
      <div className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm">
        <div className={`flex items-center justify-between px-4 h-14 rounded-2xl transition-all duration-300
          ${scrolled
            ? "bg-blue-700/95 backdrop-blur-2xl shadow-xl shadow-blue-900/40 border border-blue-500/30"
            : "bg-blue-600/90 backdrop-blur-xl border border-blue-400/25"
          }`}
        >
          {/* Logo — white background */}
          <Link href="/" className="cursor-pointer">
            <div className="bg-white hover:bg-white/90 active:bg-white/80 transition-all duration-200 rounded-xl p-1.5 shadow-sm">
              <Image
                src="/images/logofix1.png"
                alt="Simplain"
                width={34}
                height={34}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="cursor-pointer w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-xl bg-white/20 hover:bg-white/30 active:bg-white/40 transition-all duration-200"
          >
            <span className={`block w-[18px] h-[2px] bg-white rounded-full transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-[18px] h-[2px] bg-white rounded-full transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-[18px] h-[2px] bg-white rounded-full transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>

        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[400px] opacity-100 mt-2" : "max-h-0 opacity-0 pointer-events-none"}`}>
          <div className="bg-blue-700/98 backdrop-blur-2xl rounded-2xl p-2 border border-blue-500/30 shadow-2xl shadow-blue-900/50">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center px-4 py-3.5 rounded-xl text-[15px] font-semibold mb-1 last:mb-0 transition-all duration-200 cursor-pointer
                    ${isActive
                      ? "bg-white text-blue-700 shadow-sm"
                      : "text-white hover:bg-white/15 active:bg-white/25"
                    }`}
                >
                  {item.name}
                </Link>
              )
            })}

            {user && (
              <button
                onClick={() => { handleLogout(); setOpen(false) }}
                className="cursor-pointer w-full text-left flex items-center gap-2 px-4 py-3.5 rounded-xl text-[15px] font-semibold text-blue-200 hover:bg-white/15 active:bg-white/25 transition-all duration-200 mt-1 border-t border-blue-500/30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}