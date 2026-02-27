import LoginFormSection from "@/components/organisms/LoginFormSection"
import LoginImageSection from "@/components/organisms/LoginImageSection"

export default function LoginTemplate() {
  return (
    <main className="min-h-screen w-full bg-[#6FAEFF] flex items-center justify-center px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <LoginFormSection />
        <LoginImageSection />
      </div>
    </main>
  )
}
