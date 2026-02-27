import RegisterLeftSection from "@/components/organisms/RegisterLeftSection"
import RegisterRightSection from "@/components/organisms/RegisterRightSection"

export default function RegisterTemplate() {
  return (
    <main className="min-h-screen w-full bg-linear-to-br from-[#5DA9FF] to-[#7CB7FF] flex items-center justify-center px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <RegisterLeftSection />
        <RegisterRightSection />
      </div>
    </main>
  )
}
