import EditProfileCard from "@/components/organisms/EditProfileCard"

interface EditProfileTemplateProps {
  avatarSrc: string
  fullName: string
  email: string
  password: string
  onFullNameChange: (val: string) => void
  onEmailChange: (val: string) => void
  onPasswordChange: (val: string) => void
  onAvatarChange?: () => void
  onSave?: () => void
  onBack?: () => void
}

export default function EditProfileTemplate({
  avatarSrc,
  fullName,
  email,
  password,
  onFullNameChange,
  onEmailChange,
  onPasswordChange,
  onAvatarChange,
  onSave,
  onBack,
}: EditProfileTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-cyan-300 pt-20 pb-10 px-4">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-20 left-4 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page Title */}
      <h1 className="text-center text-2xl font-bold text-white mb-8">Edit Profile</h1>

      {/* Content */}
      <div className="max-w-sm mx-auto">
        <EditProfileCard
          avatarSrc={avatarSrc}
          fullName={fullName}
          email={email}
          password={password}
          onFullNameChange={onFullNameChange}
          onEmailChange={onEmailChange}
          onPasswordChange={onPasswordChange}
          onAvatarChange={onAvatarChange}
          onSave={onSave}
        />
      </div>
    </div>
  )
}