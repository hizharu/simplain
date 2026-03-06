"use client"
import InputField from "@/components/atoms/InputField"
import PasswordInput from "@/components/atoms/PasswordInput"

interface EditProfileFormProps {
  fullName: string
  email: string
  password: string
  onFullNameChange: (val: string) => void
  onEmailChange: (val: string) => void
  onPasswordChange: (val: string) => void
}

export default function EditProfileForm({
  fullName,
  email,
  password,
  onFullNameChange,
  onEmailChange,
  onPasswordChange,
}: EditProfileFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <InputField
        label="Full Name"
        type="text"
        value={fullName}
        onChange={(e) => onFullNameChange(e.target.value)}
        placeholder="Your full name"
      />
      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        placeholder="your@email.com"
      />
      <PasswordInput
        label="Password"
        value={password}
        onChange={onPasswordChange}
      />
    </div>
  )
}