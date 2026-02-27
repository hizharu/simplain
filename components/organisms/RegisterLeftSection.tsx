import Link from "next/link"

export default function RegisterLeftSection() {
  return (
    <div className="text-white">
      <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
        Welcome to <br /> Simplain !
      </h1>

      <p className="mt-4 text-white/80 max-w-md">
        Let’s join with us, track your progress and get some achievement
      </p>

      <div className="mt-8 flex flex-col gap-3 w-full max-w-xs">
        <Link
          href="/signup/"
          className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:scale-[1.02] transition text-center shadow-lg"
        >
          Sign Up
        </Link>

        <p className="text-sm text-white/90">
          Already have account ?
          <Link href="/login/">
            <span className="cursor-pointer underline ml-1">
              Click here !
            </span>
          </Link>
        </p>
      </div>

      <Link href="/">
        <button className="mt-10 text-sm bg-white/20 px-6 py-2 rounded-full hover:bg-white/30 transition">
          Back
        </button>
      </Link>
    </div>
  )
}
