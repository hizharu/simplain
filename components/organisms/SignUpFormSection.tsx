"use client"

import Link from "next/link"

// const supabase = createClient();

// const handleSignUp = async (e) => {
//   e.preventDefault();
  
//   const { data, error } = await supabase.auth.signUp({
//     email: email, // from your input state
//     password: password, // from your input state
//     options: {
//       data: {
//         username: username, // saving the extra field
//       }
//     }
//   });

//   if (error) {
//     console.error("Error signing up:", error.message);
//   } else {
//     console.log("Check your email for the confirmation link!");
//   }
// };

export default function SignUpFormSection() {
  return (
    <div className="mt-18 text-white max-w-md">
      <h1 className="text-3xl lg:text-4xl font-semibold mb-4">
        Create an account
      </h1>

      <form className="space-y-5">
        <div>
          <label className="text-sm opacity-90">Email</label>
          <input
            type="email"
            placeholder="email@gmail.com"
            className="w-full  px-4 py-2 rounded-md text-black outline-none bg-white"
          />
        </div>

        <div>
          <label className="text-sm opacity-90">Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            className="w-full px-4 py-2 rounded-md text-black outline-none bg-white"
          />
        </div>

        <div>
          <label className="text-sm opacity-90">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full px-4 py-2 rounded-md text-black outline-none bg-white"
          />
        </div>

        <div>
          <label className="text-sm opacity-90">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 rounded-md text-black outline-none bg-white"
          />
        </div>

        <button
          type="submit"
          className="mt-2 bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:scale-[1.02] transition w-full shadow-lg"
        >
          Create
        </button>
      </form>

      <p className="text-sm mt-2 opacity-90">
        Already have account ?
        <Link href="/login" className="underline ml-1">
          Click here !
        </Link>
      </p>

      <Link href="/register" className="inline-block mt-6">
        <button className="bg-white/20 px-6 py-2 rounded-full hover:bg-white/30 transition">
          Back
        </button>
      </Link>
    </div>
  )
}
