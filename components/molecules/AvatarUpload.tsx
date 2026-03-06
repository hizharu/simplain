"use client"

interface AvatarUploadProps {
  src: string
  alt?: string
  onChange?: () => void
}

export default function AvatarUpload({ src, alt = "avatar", onChange }: AvatarUploadProps) {
  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={onChange}
        className="relative group"
      >
        <img
          src={src}
          alt={alt}
          className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-lg"
        />
        {/* overlay on hover */}
        <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 019 16H7v-2a2 2 0 01.586-1.414z" />
          </svg>
        </div>
      </button>
    </div>
  )
}