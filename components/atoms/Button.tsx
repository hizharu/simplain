interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export default function Button({ children, onClick, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mt-8 rounded-full bg-white px-8 py-3 font-medium text-blue-900 transition hover:scale-105 disabled:opacity-50"
    >
      {children}
    </button>
  )
}
