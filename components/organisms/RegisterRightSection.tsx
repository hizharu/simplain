import ValueCard from "@/components/ValueCard"

export default function RegisterRightSection() {
  return (
    <div className="flex gap-6 justify-center lg:justify-end flex-wrap">
      <ValueCard
        image="/images/value1.png"
        subtitle="Our Values"
        title="User Friendly"
        description="Simple explanation explain the complex things using simple analogy."
      />

      <ValueCard
        image="/images/value2.png"
        subtitle="Our Values"
        title="Interactive Learning"
        description="Super Quiz — Quiz that doesn’t feel like a test."
      />
    </div>
  )
}
