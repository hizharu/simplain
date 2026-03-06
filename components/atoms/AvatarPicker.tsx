"use client"
import { useRef } from "react"
import { Camera } from "lucide-react"

interface AvatarPickerProps {
  preview: string | null
  onChange: (file: File) => void
}

export default function AvatarPicker({ preview, onChange }: AvatarPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex flex-col items-start gap-1">
      <label className="text-sm opacity-90">Profile Photo <span className="opacity-60 text-xs">(optional)</span></label>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="relative w-16 h-16 rounded-full overflow-hidden bg-white/20 flex items-center justify-center border-2 border-white/40 hover:border-white transition group"
      >
        {preview ? (
          <img src={preview} alt="avatar preview" className="w-full h-full object-cover" />
        ) : (
          <Camera size={22} className="text-white/70 group-hover:text-white transition" />
        )}
        {/* overlay */}
        {preview && (
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <Camera size={18} className="text-white" />
          </div>
        )}
      </button>
      <p className="text-xs opacity-60">Auto compressed before upload</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onChange(file)
        }}
      />
    </div>
  )
}