"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/getting-started", label: "Getting Started" },
  { href: "/prompting", label: "Prompting" },
  { href: "/memory-and-context", label: "Memory" },
  { href: "/agents-and-tools", label: "Agents" },
  { href: "/hooks", label: "Hooks" },
  { href: "/plan-mode", label: "Plan Mode" },
  { href: "/settings-and-shortcuts", label: "Settings" },
  { href: "/testing", label: "Testing" },
  { href: "/debugging", label: "Debugging" },
  { href: "/code-review", label: "Code Review" },
  { href: "/security", label: "Security" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#1a1a1a] bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-14">
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0"
            onClick={() => setOpen(false)}
          >
            <div className="w-6 h-6 rounded bg-[#f5a623] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 9L6 3L10 9"
                  stroke="#0a0a0a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-tight text-[#fafafa]">
              Claude Code Playbook
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                    active
                      ? "bg-[#1a1a1a] text-[#fafafa]"
                      : "text-[#71717a] hover:text-[#fafafa] hover:bg-[#111]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-px bg-[#71717a] transition-all duration-200 origin-center ${open ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block w-5 h-px bg-[#71717a] transition-all duration-200 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-px bg-[#71717a] transition-all duration-200 origin-center ${open ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 top-14 bg-[#0a0a0a] border-t border-[#1a1a1a]">
          <nav className="px-6 py-4 flex flex-col gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-3 rounded text-sm font-medium transition-colors ${
                    active
                      ? "bg-[#1a1a1a] text-[#fafafa]"
                      : "text-[#71717a] hover:text-[#fafafa] hover:bg-[#111]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
