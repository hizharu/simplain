"use client"
import AvatarUpload from "@/components/molecules/AvatarUpload"
import EditProfileForm from "@/components/molecules/EditProfileForm"
import SaveButton from "@/components/atoms/SaveButton"

interface EditProfileCardProps {
  avatarSrc: string
  fullName: string
  email: string
  password: string
  onFullNameChange: (val: string) => void
  onEmailChange: (val: string) => void
  onPasswordChange: (val: string) => void
  onAvatarChange?: () => void
  onSave?: () => void
}

export default function EditProfileCard({
  avatarSrc,
  fullName,
  email,
  password,
  onFullNameChange,
  onEmailChange,
  onPasswordChange,
  onAvatarChange,
  onSave,
}: EditProfileCardProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Avatar */}
      <AvatarUpload src={avatarSrc} onChange={onAvatarChange} />

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm px-5 py-6">
        <EditProfileForm
          fullName={fullName}
          email={email}
          password={password}
          onFullNameChange={onFullNameChange}
          onEmailChange={onEmailChange}
          onPasswordChange={onPasswordChange}
        />
      </div>

      {/* Save Button */}
      <SaveButton onClick={onSave} />
    </div>
  )
}