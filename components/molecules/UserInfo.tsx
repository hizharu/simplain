import Avatar from "@/components/atoms/Avatar"

interface UserInfoProps {
  name: string
  email: string
  avatarSrc: string
}

export default function UserInfo({ name, email, avatarSrc }: UserInfoProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar src={avatarSrc} alt={name} size="md" />
      <div>
        <p className="font-bold text-gray-800 text-base leading-tight">{name}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>
  )
}