import { InputHTMLAttributes } from "react"

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export default function InputField({ label, ...props }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        {...props}
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition bg-white"
      />
    </div>
  )
}