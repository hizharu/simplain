export default function ExplainHeader() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-4">
        <span className="text-sm">🧠</span>
        <span className="text-xs font-medium text-white/90">AI-Powered by llama-3.3-70b-versatile</span>
      </div>

      <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">
        Explain Me
      </h1>

      <p className="text-xs text-white/40 mt-3 italic">
        &ldquo;The important thing is to never stop asking questions&rdquo; — Einstein
      </p>
    </div>
  )
}