"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const guideGroups = [
  {
    label: "Reference",
    links: [
      { href: "/prompt-library", label: "Prompt Library" },
    ],
  },
  {
    label: "Foundation",
    links: [
      { href: "/getting-started", label: "Getting Started" },
      { href: "/prompting", label: "Prompting" },
      { href: "/memory-and-context", label: "Memory & Context" },
    ],
  },
  {
    label: "Build",
    links: [
      { href: "/agent-room", label: "The Agent Room" },
      { href: "/sprint-efficiency", label: "10x Your Sprint" },
      { href: "/scheduled-reviews", label: "Scheduled Reviews" },
      { href: "/user-stories", label: "User Stories" },
      { href: "/agents-and-tools", label: "Agents & Tools" },
      { href: "/hooks", label: "Hooks" },
      { href: "/plan-mode", label: "Plan Mode" },
    ],
  },
  {
    label: "Quality",
    links: [
      { href: "/testing", label: "Testing" },
      { href: "/debugging", label: "Debugging" },
      { href: "/code-review", label: "Code Review" },
    ],
  },
  {
    label: "Config",
    links: [
      { href: "/settings-and-shortcuts", label: "Settings & Shortcuts" },
      { href: "/security", label: "Security" },
    ],
  },
];

const allGuideLinks = guideGroups.flatMap((g) => g.links);

export function Nav() {
  const pathname = usePathname();
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGuidesOpen, setMobileGuidesOpen] = useState(false);

  const isGuide = allGuideLinks.some((l) => l.href === pathname);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#1a1a1a] bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-14">
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0"
            onClick={() => { setMobileOpen(false); setGuidesOpen(false); }}
          >
            <div className="w-6 h-6 rounded bg-[#f5a623] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 9L6 3L10 9" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
            <div className="relative" onMouseLeave={() => setGuidesOpen(false)}>
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
                <div className="absolute right-0 top-full mt-1 w-[480px] border border-[#1a1a1a] rounded-lg bg-[#0d0d0d] shadow-2xl p-4 grid grid-cols-2 gap-4">
                  {guideGroups.map((group) => (
                    <div key={group.label}>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3f3f46] mb-2">
                        {group.label}
                      </p>
                      <div className="flex flex-col gap-0.5">
                        {group.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setGuidesOpen(false)}
                            className={`px-2 py-1.5 rounded text-xs transition-colors ${
                              pathname === link.href
                                ? "text-[#f5a623] bg-[#f5a62310]"
                                : "text-[#71717a] hover:text-[#fafafa] hover:bg-[#111]"
                            }`}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-[#71717a] transition-all duration-200 origin-center ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-5 h-px bg-[#71717a] transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-px bg-[#71717a] transition-all duration-200 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 top-14 bg-[#0a0a0a] border-t border-[#1a1a1a] overflow-y-auto">
          <nav className="px-6 py-4 flex flex-col gap-1">
            <Link
              href="/how-i-work"
              onClick={() => setMobileOpen(false)}
              className={`px-3 py-3 rounded text-sm font-medium transition-colors ${
                pathname === "/how-i-work"
                  ? "bg-[#f5a62318] text-[#f5a623]"
                  : "text-[#71717a] hover:text-[#fafafa] hover:bg-[#111]"
              }`}
            >
              How I Work
            </Link>

            <button
              onClick={() => setMobileGuidesOpen((o) => !o)}
              className="flex items-center justify-between px-3 py-3 rounded text-sm font-medium text-[#71717a] hover:text-[#fafafa] hover:bg-[#111] transition-colors"
            >
              <span>Guides</span>
              <svg
                width="12" height="12" viewBox="0 0 10 10" fill="none"
                className={`transition-transform duration-150 ${mobileGuidesOpen ? "rotate-180" : ""}`}
              >
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {mobileGuidesOpen && (
              <div className="pl-3 flex flex-col gap-3 py-2">
                {guideGroups.map((group) => (
                  <div key={group.label}>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3f3f46] px-3 mb-1">
                      {group.label}
                    </p>
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-3 py-2 rounded text-sm transition-colors ${
                          pathname === link.href
                            ? "text-[#f5a623] bg-[#f5a62310]"
                            : "text-[#71717a] hover:text-[#fafafa] hover:bg-[#111]"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
