import Link from "next/link";

const topics = [
  {
    href: "/getting-started",
    label: "Getting Started",
    number: "01",
    description: "CLAUDE.md, onboarding to existing codebases, navigating large repos.",
    tag: "Foundation",
  },
  {
    href: "/prompting",
    label: "Prompting Patterns",
    number: "02",
    description: "Constraints over goals, negative instructions, iterating with Claude.",
    tag: "Core skill",
  },
  {
    href: "/memory-and-context",
    label: "Memory & Context",
    number: "03",
    description: "How context works, session management, designing for amnesia.",
    tag: "Core skill",
  },
  {
    href: "/agents-and-tools",
    label: "Agents & Tools",
    number: "04",
    description: "Autonomy spectrum, slash commands, MCP tools, checkpoints.",
    tag: "Advanced",
  },
  {
    href: "/testing",
    label: "Testing",
    number: "05",
    description: "TDD with Claude, failure modes, mutation testing, multi-pass review.",
    tag: "Quality",
  },
  {
    href: "/debugging",
    label: "Debugging",
    number: "06",
    description: "Reproducible reports, fix loops, preventing test-cheating.",
    tag: "Quality",
  },
  {
    href: "/code-review",
    label: "Code Review & QA",
    number: "07",
    description: "Claude as reviewer, diff discipline, structured QA pass.",
    tag: "Quality",
  },
  {
    href: "/security",
    label: "Security",
    number: "08",
    description: "Secrets hygiene, bash permissions, prompt injection, credentials.",
    tag: "Safety",
  },
];

const tagColors: Record<string, string> = {
  Foundation: "text-[#60a5fa] bg-[#3b82f610] border-[#3b82f622]",
  "Core skill": "text-[#a78bfa] bg-[#8b5cf610] border-[#8b5cf622]",
  Advanced: "text-[#f5a623] bg-[#f5a62310] border-[#f5a62322]",
  Quality: "text-[#4ade80] bg-[#22c55e10] border-[#22c55e22]",
  Safety: "text-[#f87171] bg-[#ef444410] border-[#ef444422]",
};

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
            <span className="text-xs text-[#71717a] font-mono">Claude Code Best Practices</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] text-[#fafafa] max-w-3xl">
            Work with Claude Code{" "}
            <span className="text-[#f5a623]">without the guesswork.</span>
          </h1>

          <p className="mt-6 text-lg text-[#71717a] max-w-xl leading-relaxed">
            Eight focused guides on prompting, agents, testing, debugging, security, and more — so every session produces work you can ship.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <Link
              href="/getting-started"
              className="inline-flex items-center gap-2 bg-[#f5a623] text-[#0a0a0a] font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-[#e09520] transition-colors"
            >
              Start reading →
            </Link>
            <a href="#topics" className="text-sm text-[#71717a] hover:text-[#fafafa] transition-colors">
              Browse all topics
            </a>
          </div>
        </div>
      </section>

      {/* Topic grid */}
      <section id="topics" className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#3f3f46]">All Topics</h2>
          <span className="text-xs text-[#3f3f46] font-mono">8 guides</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {topics.map((topic) => (
            <Link
              key={topic.href}
              href={topic.href}
              className="group relative flex flex-col justify-between border border-[#1a1a1a] rounded-lg bg-[#0d0d0d] p-5 hover:border-[#f5a62340] hover:bg-[#111] transition-all duration-200"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-xs text-[#2a2a2a] group-hover:text-[#3a3a3a] transition-colors">
                    {topic.number}
                  </span>
                  <span className={`text-[10px] font-semibold border rounded-full px-2 py-0.5 ${tagColors[topic.tag]}`}>
                    {topic.tag}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[#fafafa] mb-2 leading-snug">{topic.label}</h3>
                <p className="text-xs text-[#52525b] leading-relaxed">{topic.description}</p>
              </div>
              <div className="mt-6 text-xs text-[#3f3f46] group-hover:text-[#f5a623] transition-colors">
                Read guide →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom strip */}
      <section className="border-t border-[#111] bg-[#0d0d0d]">
        <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              label: "Start here",
              text: "New to Claude Code? Begin with Getting Started — CLAUDE.md alone will transform your sessions.",
              href: "/getting-started",
            },
            {
              label: "Most impactful",
              text: "Prompting Patterns is the highest-leverage guide. Better prompts, better output, every time.",
              href: "/prompting",
            },
            {
              label: "Often overlooked",
              text: "Security covers the risks most users don't think about until something goes wrong.",
              href: "/security",
            },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="group">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#f5a623] mb-2">{item.label}</p>
              <p className="text-sm text-[#52525b] leading-relaxed group-hover:text-[#71717a] transition-colors">{item.text}</p>
            </Link>
          ))}
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
