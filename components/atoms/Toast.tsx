"use client"
import { useEffect, useState } from "react"
import { CheckCircle, XCircle, X } from "lucide-react"

export type ToastType = "success" | "error"

interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
}

export default function Toast({ message, type, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // animate in
    const t1 = setTimeout(() => setVisible(true), 10)
    // auto dismiss after 3.5s
    const t2 = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, 3500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onClose])

  return (
    <div
      className={`fixed top-6 left-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-white text-sm font-medium
        transition-all duration-300
        ${visible ? "opacity-100 -translate-x-1/2 translate-y-0" : "opacity-0 -translate-x-1/2 -translate-y-4"}
        ${type === "success" ? "bg-green-500" : "bg-red-500"}
      `}
    >
      {type === "success"
        ? <CheckCircle size={18} className="flex-shrink-0" />
        : <XCircle size={18} className="flex-shrink-0" />
      }
      <span>{message}</span>
      <button onClick={() => { setVisible(false); setTimeout(onClose, 300) }} className="ml-1 hover:opacity-70 transition">
        <X size={15} />
      </button>
    </div>
  )
}