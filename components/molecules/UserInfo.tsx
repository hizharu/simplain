import Image from "next/image"

interface UserInfoProps {
  name: string
  email: string
  avatarSrc: string
}

export default function UserInfo({ name, email, avatarSrc }: UserInfoProps) {
  return (
    <div className="flex items-center gap-3.5">
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-blue-100 shadow-md">
          <Image
            src={avatarSrc || "/default-avatar.png"}
            alt={name}
            width={56}
            height={56}
            className="object-cover w-full h-full"
          />
        </div>
        {/* Online dot */}
        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="font-bold text-gray-900 text-base leading-tight truncate">{name}</p>
        <p className="text-xs text-gray-400 truncate mt-0.5">{email}</p>
      </div>
    </div>
  )
}