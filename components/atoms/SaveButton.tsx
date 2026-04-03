interface SaveButtonProps {
  onClick?: () => void
  disabled?: boolean
  label?: string
}

export default function SaveButton({ onClick, disabled, label = "Save Changes" }: SaveButtonProps) {
  return (
    <button
      onClick={onClick} // when clicking
      disabled={disabled}
      className="w-full rounded-full bg-white py-3 text-sm font-semibold text-gray-800 shadow-md hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {label}
    </button>
  )
}