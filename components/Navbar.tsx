"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const navItems = [
  { name: "Home", href: "/#main-home", scroll:true },
  { name: "Fundamental", href: "/#fundamental-section", scroll:true },
  { name: "ExplainMe", href: "/#explain-section", scroll:true },
  { name: "Quiz", href: "/#quiz-section", scroll:true },
  { name: "Account", href: "/account" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header>
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
        </ul>

        {/*mobile optimation*/}
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
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
