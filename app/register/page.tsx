import ValueCard from "@/components/ValueCard";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen w-full bg-linear-to-br from-[#5DA9FF] to-[#7CB7FF] flex items-center justify-center px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* LEFT SECTION */}
        <div className="text-white">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Welcome to <br /> Simplain !
          </h1>

          <p className="mt-4 text-white/80 max-w-md">
            Let’s join with us, track your progress and get some achievement
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 w-full max-w-xs">
            <Link 
            href="/signup/"
            className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:scale-[1.02] transition w-full max-w-xs text-center inline-block shadow-lg">
            Sign Up
            </Link>

           
            <button className="text-sm  text-white/90 hover:text-white ">
              Already have account ?
              <Link href="/login/"><span className="cursor-pointer underline"> Click here !</span></Link> 
            </button>
            
          </div>

          {/* Back */}
          <Link href="/">
          <button className="cursor-pointer mt-10 text-sm bg-white/20 px-6 py-2 rounded-full hover:bg-white/30 transition">
            Back
          </button>
          </Link>
        </div>

        {/* RIGHT SECTION */}
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
      </div>
    </main>
  );
}
