import Link from "next/link";

const guideGroups = [
  {
    label: "Foundation",
    tag: "Foundation",
    guides: [
      { href: "/getting-started", label: "Getting Started", description: "CLAUDE.md, onboarding to codebases, navigating large repos." },
      { href: "/prompting", label: "Prompting Patterns", description: "Constraints over goals, negative instructions, iteration." },
      { href: "/memory-and-context", label: "Memory & Context", description: "How context works, session management, designing for amnesia." },
    ],
  },
  {
    label: "Build",
    tag: "Advanced",
    guides: [
      { href: "/agent-room", label: "The Agent Room", description: "Spin up a virtual product team: critic, user, designer, architect, PM." },
      { href: "/sprint-efficiency", label: "10x Your Sprint", description: "The 8 habits that compound: parallel work, clear discipline, rewind early." },
      { href: "/scheduled-reviews", label: "Scheduled Reviews", description: "Daily review, CEO & user agents, automated audits, slash command library." },
      { href: "/user-stories", label: "User Stories & Tickets", description: "Spec-first stories, epic breakdowns, acceptance criteria." },
      { href: "/agents-and-tools", label: "Agents & Tools", description: "Autonomy spectrum, slash commands, MCP tools, checkpoints." },
      { href: "/hooks", label: "Hooks", description: "Deterministic lifecycle controls: block ops, auto-format, inject context." },
      { href: "/plan-mode", label: "Plan Mode", description: "Shift+Tab planning, RIPER workflow, spec-driven development." },
    ],
  },
  {
    label: "Quality",
    tag: "Quality",
    guides: [
      { href: "/testing", label: "Testing", description: "TDD with Claude, failure modes, mutation testing, multi-pass review." },
      { href: "/debugging", label: "Debugging", description: "Reproducible reports, fix loops, preventing test-cheating." },
      { href: "/code-review", label: "Code Review & QA", description: "Claude as reviewer, diff discipline, structured QA pass." },
    ],
  },
  {
    label: "Config",
    tag: "Safety",
    guides: [
      { href: "/settings-and-shortcuts", label: "Settings & Shortcuts", description: "Settings hierarchy, Esc rewind, /clear discipline, worktrees." },
      { href: "/security", label: "Security", description: "Secrets hygiene, bash permissions, prompt injection, credentials." },
    ],
  },
];

const tagColors: Record<string, string> = {
  Foundation: "text-[#60a5fa]",
  Advanced: "text-[#f5a623]",
  Quality: "text-[#4ade80]",
  Safety: "text-[#f87171]",
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
            <span className="text-xs text-[#71717a] font-mono">For engineers, FDEs & PMs</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] text-[#fafafa] max-w-3xl">
            Ship products with{" "}
            <span className="text-[#f5a623]">Claude Code.</span>
          </h1>

          <p className="mt-6 text-lg text-[#71717a] max-w-xl leading-relaxed">
            The full methodology — from understanding a problem to shipping clean code. Structured thinking, prompt engineering, and the workflow patterns that actually work.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <Link
              href="/how-i-work"
              className="inline-flex items-center gap-2 bg-[#f5a623] text-[#0a0a0a] font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-[#e09520] transition-colors"
            >
              How I Work →
            </Link>
            <a href="#guides" className="text-sm text-[#71717a] hover:text-[#fafafa] transition-colors">
              Browse guides
            </a>
          </div>
        </div>
      </section>

      {/* How I Work feature card */}
      <section className="border-b border-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link
            href="/how-i-work"
            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-[#f5a62330] rounded-lg bg-[#0d0d0d] p-6 hover:border-[#f5a62360] hover:bg-[#111] transition-all duration-200"
          >
            <div className="flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#f5a623] mb-2">
                Start here
              </p>
              <h2 className="text-lg font-bold text-[#fafafa] mb-2">How I Work</h2>
              <p className="text-sm text-[#52525b] leading-relaxed max-w-2xl">
                The complete methodology: understand the problem, spec before you build, break into epics and stories, build in parallel with worktrees, implement with Claude, test and ship clean. Plus the prompt engineering layer that ties it all together.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2 text-sm font-medium text-[#f5a623] group-hover:gap-3 transition-all">
              Read →
            </div>
          </Link>
        </div>
      </section>

      {/* Guides grouped */}
      <section id="guides" className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#3f3f46]">Reference Guides</h2>
          <span className="text-xs text-[#3f3f46] font-mono">15 guides</span>
        </div>

        <div className="flex flex-col gap-10">
          {guideGroups.map((group) => (
            <div key={group.label}>
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-[10px] font-semibold uppercase tracking-widest ${tagColors[group.tag]}`}>
                  {group.label}
                </span>
                <div className="flex-1 h-px bg-[#1a1a1a]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {group.guides.map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="group flex flex-col justify-between border border-[#1a1a1a] rounded-lg bg-[#0d0d0d] p-4 hover:border-[#f5a62340] hover:bg-[#111] transition-all duration-200"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-[#fafafa] mb-2 leading-snug">{guide.label}</h3>
                      <p className="text-xs text-[#52525b] leading-relaxed">{guide.description}</p>
                    </div>
                    <div className="mt-4 text-xs text-[#3f3f46] group-hover:text-[#f5a623] transition-colors">
                      Read →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
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
