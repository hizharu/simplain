"use client";

import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full bg-[#6FAEFF] flex items-center justify-center px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT – FORM */}
        <div className="text-white max-w-md">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-8">
            Login Account
          </h1>

          <form className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm opacity-90">Email</label>
              <input
                type="email"
                className="w-full mt-1 px-4 py-2 rounded-md text-black outline-none bg-white"
              />
            </div>

            {/* Username */}
            <div>
              <label className="text-sm opacity-90">Username</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2 rounded-md text-black outline-none bg-white"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm opacity-90">Password</label>
              <input
                type="password"
                className="w-full mt-1 px-4 py-2 rounded-md text-black outline-none bg-white"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="mt-4 bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:scale-[1.02] transition w-full max-w-xs text-center inline-block shadow-lg">
              Login
            </button>
          </form>

          {/* Signup Redirect */}
          <p className="text-sm mt-4 opacity-90">
            Doesn't have account ?{" "}
            <Link href="/signup/" className="underline hover:text-white">
              Click here !
            </Link>
          </p>

          {/* Back */}
          <Link href="/register/" className="inline-block mt-8">
            <button className="bg-white/20 px-6 py-2 rounded-full hover:bg-white/30 transition">
              Back
            </button>
          </Link>
        </div>

        {/* RIGHT – IMAGE */}
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
      </div>
    </main>
  );
}
