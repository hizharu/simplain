import Image from "next/image";

export default function Home() {
  return ( <main>
    <header>
      <nav className="bg-dark">
        <ul className="bg-white/20 container mx-auto h-[60px] w-[700px] rounded-full flex items-center justify-center gap-12 text-white fixed inset-0">
            <li className="cursor-pointer">Logo</li>
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Fundamental</li>
            <li className="cursor-pointer">Explain Me</li>
            <li className="cursor-pointer">Quiz</li>
            <li className="cursor-pointer">Account</li>
        </ul>
      </nav>
    </header>

    <section className="mt-40 container pt-[80px] ml-[80px] justify-between">
      <div className="max-w-2xl">
      <h1 className="text-white text-[48px] font-medium leading-tight">
        Let’s explain it <span className="text-black">simply</span>
      </h1>
      <p className="text-[18px] font-medium leading-relaxed">Guide you with simple explanations, real-life examples, <br />
        and insights that actually stick <br />
        Because this world is full of the <span className="text-white">complex things</span>
      </p>
      <button className="flex items-center justify-center gap-2 px-[18px] py-[9px] rounded-full bg-white text-black-[14px] font-medium mt-10">
        Get Started
      </button>
      </div>
    </section>
  </main>
  );
}