import Link from "next/link";
import { ReactNode } from "react";
import { CopyButtons } from "@/components/copy-buttons";

interface Section {
  id: string;
  title: string;
}

interface ContentLayoutProps {
  title: string;
  description: string;
  sections: Section[];
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
  children: ReactNode;
}

export function ContentLayout({
  title,
  description,
  sections,
  prev,
  next,
  children,
}: ContentLayoutProps) {
  return (
    <div className="flex-1">
      {/* Page header */}
      <div className="border-b border-[#1a1a1a] bg-[#0d0d0d] px-6 py-12 relative overflow-hidden">
        <div
          className="absolute right-0 top-0 h-full w-1/2 opacity-[0.03] pointer-events-none select-none flex items-center justify-end pr-8"
          aria-hidden="true"
        >
          <span
            className="text-[10rem] font-black tracking-tighter leading-none text-white"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            {title.split(" ")[0]}
          </span>
        </div>
        <div className="mx-auto max-w-7xl relative">
          <Link
            href="/"
            className="text-xs text-[#71717a] hover:text-[#a1a1aa] transition-colors mb-4 inline-flex items-center gap-1"
          >
            ← All topics
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-[#fafafa] mt-2">
            {title}
          </h1>
          <p className="mt-3 text-[#71717a] max-w-xl text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-6 py-10 flex gap-12">
        {/* Sidebar TOC */}
        <aside className="hidden lg:block w-52 shrink-0">
          <div className="sticky top-24">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3f3f46] mb-3">
              On this page
            </p>
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-xs text-[#52525b] hover:text-[#a1a1aa] transition-colors block py-0.5 leading-relaxed"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>

            {/* Prev/Next in sidebar */}
            {(prev || next) && (
              <div className="mt-10 pt-6 border-t border-[#1a1a1a] space-y-2">
                {prev && (
                  <Link
                    href={prev.href}
                    className="text-xs text-[#52525b] hover:text-[#a1a1aa] transition-colors flex items-center gap-1"
                  >
                    ← {prev.label}
                  </Link>
                )}
                {next && (
                  <Link
                    href={next.href}
                    className="text-xs text-[#52525b] hover:text-[#f5a623] transition-colors flex items-center gap-1"
                  >
                    {next.label} →
                  </Link>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 prose">
          {children}
          <CopyButtons />
        </main>
      </div>

      {/* Bottom prev/next */}
      {(prev || next) && (
        <div className="border-t border-[#1a1a1a] mx-auto max-w-7xl px-6 py-8 flex justify-between items-center">
          <div>
            {prev && (
              <Link
                href={prev.href}
                className="group inline-flex flex-col gap-1"
              >
                <span className="text-[10px] uppercase tracking-widest text-[#3f3f46]">
                  Previous
                </span>
                <span className="text-sm text-[#71717a] group-hover:text-[#fafafa] transition-colors">
                  ← {prev.label}
                </span>
              </Link>
            )}
          </div>
          <div className="text-right">
            {next && (
              <Link
                href={next.href}
                className="group inline-flex flex-col gap-1 items-end"
              >
                <span className="text-[10px] uppercase tracking-widest text-[#3f3f46]">
                  Next
                </span>
                <span className="text-sm text-[#71717a] group-hover:text-[#f5a623] transition-colors">
                  {next.label} →
                </span>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#111] px-6 py-6 mt-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link href="/" className="text-xs text-[#3f3f46] font-mono hover:text-[#71717a] transition-colors">
            ← Claude Code Playbook
          </Link>
          <span className="text-xs text-[#2a2a2a]">Not affiliated with Anthropic</span>
        </div>
      </footer>
    </div>
  );
}
