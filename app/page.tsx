import Image from "next/image";

export default function Home() {
  return ( <main>
    <header>
      <nav className="bg-dark">
        <ul className="bg-white/20 container mx-auto h-[60px] w-[700px] rounded-full flex items-center justify-center gap-12 text-white fixed inset-0">
            <li>Logo</li>
            <li>Home</li>
            <li>Fundamental</li>
            <li>Explain Me</li>
            <li>Quiz</li>
            <li>Account</li>
        </ul>
      </nav>
    </header>

    <section className="container mx-auto pt-[80px]">
      <h1 className="text-white text-[48px] font-medium">Let’s explain it simply</h1>
      <p className="text-[18px] font-medium">Guide you with simple explanations, real-life examples, <br />
        and insights that actually stick <br />
        Because this world is full of the complex things</p>
        <button className="btn">Get Started</button>
    </section>
  </main>
  );
}