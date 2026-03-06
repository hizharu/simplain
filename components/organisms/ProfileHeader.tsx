import UserInfo from "@/components/molecules/UserInfo"

interface ProfileHeaderProps {
  name: string
  email: string
  avatarSrc: string
  onEditProfile?: () => void
}

export default function ProfileHeader({
  name,
  email,
  avatarSrc,
  onEditProfile,
}: ProfileHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <UserInfo name={name} email={email} avatarSrc={avatarSrc} />
      <button
        onClick={onEditProfile}
        className="text-xs font-medium text-gray-600 border border-gray-300 rounded-full px-4 py-1.5 hover:bg-gray-50 transition"
      >
        Edit Profile
      </button>
    </div>
  )
}