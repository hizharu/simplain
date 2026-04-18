"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import type { User } from "@supabase/supabase-js"
import React from "react"

const baseNavItems = [
  { name: "Home", href: "/#main-home" },
  { name: "Fundamental", href: "/#fundamental-section" },
  { name: "ExplainMe", href: "/#explain-section" },
  { name: "Quiz", href: "/#quiz-section" },
]

const navIcons: Record<string, React.JSX.Element> = {
  "Home": (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  "Fundamental": (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  "ExplainMe": (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  "Quiz": (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg> 
  ),
  "Account": (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  "Sign Up": (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  ),
}

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

  // Lock body scroll when panel open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  const accountItem = user
    ? { name: "Account", href: "/account" }
    : { name: "Sign Up", href: "/register" }

  const navItems = [...baseNavItems, accountItem]

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setOpen(false)
    router.push("/")
  }

  return (
    <>
      {/* Spacer mobile (kasih space sementara) delete ASAP*/}
      <div className="md:hidden w-full h-9 pointer-events-none" aria-hidden="true" />

      <header>
        {/* ══════════════════ DESKTOP ══════════════════ */}
        <nav className={`hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 h-14 px-3 rounded-full items-center gap-1 transition-all duration-300
          ${scrolled
            ? "bg-white/25 backdrop-blur-2xl shadow-xl shadow-blue-900/20 border border-white/35"
            : "bg-white/15 backdrop-blur-xl border border-white/20"
          }`}
        >
          <Link href="/" className="mr-2 cursor-pointer">
            <div className="bg-white hover:bg-white/90 active:bg-white/80 transition-all duration-200 rounded-xl p-1.5 shadow-sm">
              <Image src="/images/logofix1.png" alt="Simplain" width={36} height={36} className="object-contain" priority />
            </div>
          </Link>

          <div className="w-px h-5 bg-white/20 mr-1" />

          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <span className={`cursor-pointer flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 select-none
                  ${isActive ? "bg-white text-blue-700 shadow-sm" : "text-white hover:bg-white/20 active:bg-white/30"}`}
                >
                  {item.name}
                </span>
              </Link>
            )
          })}

          {user && (
            <>
              <div className="w-px h-5 bg-white/25 mx-1" />
              <button onClick={handleLogout} className="cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white/75 hover:text-white hover:bg-white/15 active:bg-white/25 transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </>
          )}
        </nav>

        {/* ══════════════════ MOBILE TOP BAR ══════════════════ */}
<div className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm">
  <div
    className={`flex items-center justify-between px-4 h-14 rounded-2xl transition-all duration-300
      ${scrolled
        ? "bg-white/70 backdrop-blur-md shadow-sm"
        : "bg-white/70 backdrop-blur-md shadow-sm"
      }`}
  >
    {/* Logo + Text */}
    <Link
      href="/"
      className="cursor-pointer flex items-center gap-2.5"
      onClick={() => setOpen(false)}
    >
      <div className="bg-white hover:bg-white/90 transition-all duration-200 rounded-xl p-1.5 shadow-sm">
        <Image
          src="/images/logofix1.png"
          alt="Simplain"
          width={34}
          height={34}
          className="object-contain"
          priority
        />
      </div>

      {/* text brand */}
      <span className="font-bold text-[16px] text-[#62A2F3] tracking-tight text-center">
        Simplain
      </span>
    </Link>

    {/* Burger Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        className="cursor-pointer w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-xl 
        bg-blue-50 hover:bg-blue-100 active:bg-blue-200 
        transition-all duration-200"
      >
        {/* Line burger */}
        <span
          className={`block w-[18px] h-[2px] bg-[#62A2F3] rounded-full transition-all duration-300
          ${open ? "rotate-45 translate-y-[7px]" : ""}`}
        />
        <span
          className={`block w-[18px] h-[2px] bg-[#62A2F3] rounded-full transition-all duration-300
          ${open ? "opacity-0 scale-x-0" : ""}`}
        />
        <span
          className={`block w-[18px] h-[2px] bg-[#62A2F3] rounded-full transition-all duration-300
          ${open ? "-rotate-45 -translate-y-[7px]" : ""}`}
        />
      </button>
    </div>
  </div>

      </header>

      {/* MOBILE PANEL (slide up) */}
      {/* Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(15,30,60,0.55)", backdropFilter: "blur(4px)" }}
        onClick={() => setOpen(false)}
      />

      {/* Panel */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${open ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="bg-white rounded-t-3xl shadow-2xl overflow-hidden">

          {/* Handle bar */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-gray-200" />
          </div>

          {/* Header — logo + app name + close */}
          <div className="flex items-center justify-between px-6 pt-3 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center overflow-hidden">
                <Image src="/images/logofix1.png" alt="Simplain" width={28} height={28} className="object-contain" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base leading-tight">Simplain</p>
                <p className="text-xs text-gray-400">AI-Powered Learning</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="cursor-pointer w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 flex items-center justify-center transition-all duration-150"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 mx-6" />

          {/* Nav section label */}
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-6 pt-5 pb-2">
            Navigation
          </p>

          {/* Nav items */}
          <div className="px-4 space-y-1">
            {navItems.map((item, i) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3.5 px-3 py-3.5 rounded-2xl transition-all duration-200 cursor-pointer
                    ${isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-400/30"
                      : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                    }`}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <span className={`flex-shrink-0 ${isActive ? "text-white" : "text-gray-400"}`}>
                    {navIcons[item.name]}
                  </span>
                  <span className="font-semibold text-[15px]">{item.name}</span>

                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 mx-6 mt-4" />

          {/* Logout or login CTA */}
          <div className="px-4 pt-3 pb-6">
            {user ? (
              <button
                onClick={handleLogout}
                className="cursor-pointer w-full flex items-center gap-3.5 px-3 py-3.5 rounded-2xl text-red-500 hover:bg-red-50 active:bg-red-100 transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="font-semibold text-[15px]">Sign Out</span>
              </button>
            ) : (
              <div className="flex gap-2.5">
                <Link href="/login" onClick={() => setOpen(false)} className="flex-1">
                  <button className="cursor-pointer w-full py-3 rounded-2xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-all duration-200">
                    Log In
                  </button>
                </Link>
                <Link href="/register" onClick={() => setOpen(false)} className="flex-1">
                  <button className="cursor-pointer w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold shadow-md shadow-blue-400/30 transition-all duration-200">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Safe area spacer for iPhone */}
          <div className="pb-safe h-4" />
        </div>
      </div>
    </>
  )
}