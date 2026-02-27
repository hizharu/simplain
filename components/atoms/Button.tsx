import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, className = "", ...props } :ButtonProps) {
  return (
    <button
      className={`cursor-pointer flex items-center justify-center gap-2 px-4.5 py-2.25 rounded-full bg-white text-black text-[14px] font-medium mt-10 hover:bg-gray-100 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
