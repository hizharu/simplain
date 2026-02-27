import Image from "next/image"

export default function SignUpImageSection() {
  return (
    <div className="relative hidden lg:flex justify-center">
      <div className="relative w-[420px] h-[420px]">
        <Image
          src="/images/signupimage.png"
          alt="Signup Illustration"
          fill
          className="object-contain"
        />
      </div>
    </div>
  )
}
