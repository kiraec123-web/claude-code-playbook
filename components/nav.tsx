"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const guideGroups = [
  {
    label: "Reference",
    color: "#f5a623",
    links: [
      { href: "/prompt-library", label: "Prompt Library", desc: "Copy-paste prompts for every stage of a sprint." },
    ],
  },
  {
    label: "Foundation",
    color: "#60a5fa",
    links: [
      { href: "/getting-started", label: "Getting Started", desc: "CLAUDE.md, onboarding codebases, navigating large repos." },
      { href: "/prompting", label: "Prompting Patterns", desc: "Constraints over goals, negative instructions, iteration." },
      { href: "/memory-and-context", label: "Memory & Context", desc: "Session management, designing for amnesia." },
    ],
  },
  {
    label: "Build",
    color: "#f5a623",
    links: [
      { href: "/agent-room", label: "The Agent Room", desc: "Critic, user, designer, architect, PM — virtual product team." },
      { href: "/sprint-efficiency", label: "10x Your Sprint", desc: "8 compounding habits: parallel work, clear discipline, rewind early." },
      { href: "/scheduled-reviews", label: "Scheduled Reviews", desc: "Daily review, CEO & user agents, automated audit library." },
      { href: "/user-stories", label: "User Stories & Tickets", desc: "Spec-first stories, epic breakdowns, acceptance criteria." },
      { href: "/agents-and-tools", label: "Agents & Tools", desc: "Autonomy spectrum, slash commands, MCP tools, checkpoints." },
      { href: "/hooks", label: "Hooks", desc: "Deterministic lifecycle controls: block ops, inject context." },
      { href: "/plan-mode", label: "Plan Mode", desc: "Shift+Tab planning, RIPER workflow, spec-driven development." },
    ],
  },
  {
    label: "Quality",
    color: "#4ade80",
    links: [
      { href: "/testing", label: "Testing", desc: "TDD with Claude, mutation testing, multi-pass review." },
      { href: "/debugging", label: "Debugging", desc: "Reproducible reports, fix loops, preventing test-cheating." },
      { href: "/code-review", label: "Code Review & QA", desc: "Claude as reviewer, diff discipline, structured QA pass." },
      { href: "/changelog-and-prs", label: "Changelog & PRs", desc: "Conventional commits, PR descriptions, CHANGELOG maintenance." },
    ],
  },
  {
    label: "Config",
    color: "#f87171",
    links: [
      { href: "/settings-and-shortcuts", label: "Settings & Shortcuts", desc: "Settings hierarchy, Esc rewind, /clear discipline, worktrees." },
      { href: "/security", label: "Security", desc: "Secrets hygiene, bash permissions, prompt injection." },
    ],
  },
];

const allGuideLinks = guideGroups.flatMap((g) => g.links);

// Split into two columns for the dropdown
const col1Groups = guideGroups.filter((g) => ["Reference", "Foundation", "Config"].includes(g.label));
const col2Groups = guideGroups.filter((g) => ["Build", "Quality"].includes(g.label));

export function Nav() {
  const pathname = usePathname();
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isGuide = allGuideLinks.some((l) => l.href === pathname);

  // Close dropdown on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setGuidesOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setGuidesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#1a1a1a] bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0"
            onClick={() => { setMobileOpen(false); setGuidesOpen(false); }}
          >
            <div className="w-6 h-6 rounded bg-[#f5a623] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 9L6 3L10 9" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.5 7h5" stroke="#0a0a0a" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-tight text-[#fafafa]">
              Claude Code Playbook
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/how-i-work"
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                pathname === "/how-i-work"
                  ? "bg-[#f5a62318] text-[#f5a623]"
                  : "text-[#71717a] hover:text-[#fafafa] hover:bg-[#111]"
              }`}
            >
              How I Work
            </Link>

            {/* Guides dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onMouseEnter={() => setGuidesOpen(true)}
                onClick={() => setGuidesOpen((o) => !o)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  isGuide
                    ? "bg-[#1a1a1a] text-[#fafafa]"
                    : "text-[#71717a] hover:text-[#fafafa] hover:bg-[#111]"
                }`}
              >
                Guides
                <svg
                  width="10" height="10" viewBox="0 0 10 10" fill="none"
                  className={`transition-transform duration-150 ${guidesOpen ? "rotate-180" : ""}`}
                >
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {guidesOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-[620px] border border-[#222] rounded-xl bg-[#0d0d0d] shadow-2xl shadow-black/60 overflow-hidden"
                  onMouseLeave={() => setGuidesOpen(false)}
                >
                  {/* Dropdown header */}
                  <div className="px-4 pt-3 pb-2 border-b border-[#1a1a1a] flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#3f3f46]">All Guides</span>
                    <span className="text-[10px] font-mono text-[#2a2a2a]">ESC to close</span>
                  </div>

                  {/* Two-column layout */}
                  <div className="grid grid-cols-2 gap-0 p-2">
                    {/* Column 1: Reference, Foundation, Config */}
                    <div className="border-r border-[#161616] pr-1">
                      {col1Groups.map((group) => (
                        <div key={group.label} className="mb-1 last:mb-0">
                          <div className="flex items-center gap-1.5 px-3 py-2">
                            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: group.color }} />
                            <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: group.color }}>
                              {group.label}
                            </span>
                          </div>
                          {group.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setGuidesOpen(false)}
                              className={`flex flex-col px-3 py-2 rounded-lg transition-all duration-150 group ${
                                pathname === link.href
                                  ? "bg-[#f5a62310] text-[#f5a623]"
                                  : "hover:bg-[#111]"
                              }`}
                            >
                              <span className={`text-xs font-medium leading-snug ${pathname === link.href ? "text-[#f5a623]" : "text-[#d4d4d8] group-hover:text-[#fafafa]"}`}>
                                {link.label}
                              </span>
                              <span className="text-[11px] text-[#3f3f46] leading-snug mt-0.5 group-hover:text-[#52525b]">
                                {link.desc}
                              </span>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>

                    {/* Column 2: Build, Quality */}
                    <div className="pl-1">
                      {col2Groups.map((group) => (
                        <div key={group.label} className="mb-1 last:mb-0">
                          <div className="flex items-center gap-1.5 px-3 py-2">
                            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: group.color }} />
                            <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: group.color }}>
                              {group.label}
                            </span>
                          </div>
                          {group.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setGuidesOpen(false)}
                              className={`flex flex-col px-3 py-2 rounded-lg transition-all duration-150 group ${
                                pathname === link.href
                                  ? "bg-[#f5a62310] text-[#f5a623]"
                                  : "hover:bg-[#111]"
                              }`}
                            >
                              <span className={`text-xs font-medium leading-snug ${pathname === link.href ? "text-[#f5a623]" : "text-[#d4d4d8] group-hover:text-[#fafafa]"}`}>
                                {link.label}
                              </span>
                              <span className="text-[11px] text-[#3f3f46] leading-snug mt-0.5 group-hover:text-[#52525b]">
                                {link.desc}
                              </span>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span className={`block w-5 h-[1.5px] bg-[#71717a] transition-all duration-200 origin-center ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-[#71717a] transition-all duration-200 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-[#71717a] transition-all duration-200 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu — full-screen overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 top-14 bg-[#0a0a0a] transition-opacity duration-200 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full overflow-y-auto pb-safe">
          {/* How I Work — featured */}
          <div className="px-4 pt-4 pb-2">
            <Link
              href="/how-i-work"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-colors ${
                pathname === "/how-i-work"
                  ? "border-[#f5a62340] bg-[#f5a62310] text-[#f5a623]"
                  : "border-[#1a1a1a] text-[#fafafa] hover:border-[#f5a62330] hover:bg-[#111]"
              }`}
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#f5a623] mb-0.5">Start here</p>
                <p className="text-sm font-semibold">How I Work</p>
              </div>
              <span className="text-[#f5a623] text-sm">→</span>
            </Link>
          </div>

          {/* Guide groups */}
          <div className="px-4 pt-2 pb-8">
            {guideGroups.map((group) => (
              <div key={group.label} className="mb-5">
                <div className="flex items-center gap-2 mb-2 px-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: group.color }} />
                  <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: group.color }}>
                    {group.label}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex flex-col px-4 py-3 rounded-lg transition-colors ${
                        pathname === link.href
                          ? "bg-[#f5a62310] text-[#f5a623]"
                          : "hover:bg-[#111]"
                      }`}
                    >
                      <span className={`text-sm font-medium ${pathname === link.href ? "text-[#f5a623]" : "text-[#d4d4d8]"}`}>
                        {link.label}
                      </span>
                      <span className="text-xs text-[#52525b] mt-0.5 leading-snug">{link.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
