import Link from "next/link";

const featuredPath = [
  {
    step: "01",
    href: "/how-i-work",
    label: "How I Work",
    description: "The full methodology: understand the problem, spec before you build, break into epics, build in parallel, ship clean.",
    cta: "Start here",
  },
  {
    step: "02",
    href: "/agent-room",
    label: "The Agent Room",
    description: "Spin up a virtual product team — critic, user, designer, architect, PM, security — and synthesize their feedback into a sprint-ready spec.",
    cta: "Build your team",
  },
  {
    step: "03",
    href: "/sprint-efficiency",
    label: "10x Your Sprint",
    description: "The 8 compounding habits: front-load clarity, parallel over sequential, hooks eliminate repetition, rewind early.",
    cta: "Compound the gains",
  },
  {
    step: "04",
    href: "/prompt-library",
    label: "Prompt Library",
    description: "25+ copy-paste prompts for every stage: agent room, daily reviews, story writing, debugging, testing, meta prompts.",
    cta: "Copy & use",
  },
];


export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#1a1a1a]">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] rounded-full bg-[#f5a623] opacity-[0.05] blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-28">
          <div className="inline-flex items-center gap-2 border border-[#222] rounded-full px-3 py-1 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" />
            <span className="text-xs text-[#71717a] font-mono">For engineers, FDEs & PMs</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] text-[#fafafa] max-w-3xl">
            Ship products with{" "}
            <span className="text-[#f5a623]">Claude Code.</span>
          </h1>

          <p className="mt-6 text-lg text-[#71717a] max-w-xl leading-relaxed">
            The full methodology — from understanding a problem to shipping clean code. Structured thinking, prompt engineering, and the workflow patterns that actually work.
          </p>

          <div className="mt-10">
            <Link
              href="/how-i-work"
              className="inline-flex items-center gap-2 bg-[#f5a623] text-[#0a0a0a] font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-[#e09520] transition-colors"
            >
              Start with How I Work →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured path */}
      <section className="border-b border-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex items-center gap-3 mb-8">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#f5a623]">
              The path
            </p>
            <div className="flex-1 h-px bg-[#1a1a1a]" />
            <p className="text-[10px] text-[#3f3f46] font-mono">recommended sequence</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredPath.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex flex-col border border-[#1a1a1a] rounded-lg bg-[#0d0d0d] p-5 hover:border-[#f5a62340] hover:bg-[#111] transition-all duration-200"
              >
                <span className="text-[10px] font-mono text-[#3f3f46] mb-3">{item.step}</span>
                <h3 className="text-sm font-bold text-[#fafafa] mb-2">{item.label}</h3>
                <p className="text-xs text-[#52525b] leading-relaxed flex-1">{item.description}</p>
                <div className="mt-4 text-xs text-[#3f3f46] group-hover:text-[#f5a623] transition-colors">
                  {item.cta} →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#111] px-6 py-6">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <span className="text-xs text-[#3f3f46] font-mono">Claude Code Playbook</span>
          <span className="text-xs text-[#2a2a2a]">Not affiliated with Anthropic</span>
        </div>
      </footer>
    </main>
  );
}
