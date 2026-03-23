import UserInfo from "@/components/molecules/UserInfo"

interface ProfileHeaderProps {
  name: string
  email: string
  avatarSrc: string
  onEditProfile?: () => void
}

export default function ProfileHeader({ name, email, avatarSrc, onEditProfile }: ProfileHeaderProps) {
  return (
    <div className="px-5 py-5">
      {/* Top gradient accent bar */}
      <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 mb-5" />

      <div className="flex items-center justify-between gap-3">
        <UserInfo name={name} email={email} avatarSrc={avatarSrc} />

        <button
          onClick={onEditProfile}
          className="cursor-pointer flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 active:bg-blue-200 border border-blue-100 rounded-full px-4 py-2 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Edit
        </button>
      </div>
    </div>
  )
}