import Image from "next/image"

export default function LoginImageSection() {
  return (
    <div className="relative hidden lg:flex justify-center">
      <div className="relative w-[420px] h-[420px]">
        <Image
          src="/images/login-hero.png"
          alt="Login Illustration"
          fill
          className="object-contain"
        />
      </div>
    </div>
  )
}
