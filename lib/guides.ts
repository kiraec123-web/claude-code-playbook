export type Category = "Reference" | "Foundation" | "Build" | "Quality" | "Config";

export const categoryColors: Record<Category, string> = {
  Reference: "#a78bfa",  // purple — distinct from Build
  Foundation: "#60a5fa", // blue
  Build: "#f5a623",      // orange
  Quality: "#4ade80",    // green
  Config: "#f87171",     // red
};

export const categoryBg: Record<Category, string> = {
  Reference: "#a78bfa18",
  Foundation: "#60a5fa18",
  Build: "#f5a62318",
  Quality: "#4ade8018",
  Config: "#f8717118",
};

export const guides = [
  { href: "/getting-started",      label: "Getting Started",          category: "Foundation" as Category },
  { href: "/claude-md",            label: "CLAUDE.md",                category: "Foundation" as Category },
  { href: "/prompting",            label: "Prompting Patterns",       category: "Foundation" as Category },
  { href: "/memory-and-context",   label: "Memory & Context",         category: "Foundation" as Category },
  { href: "/agent-room",           label: "The Agent Room",           category: "Build"      as Category },
  { href: "/user-stories",         label: "User Stories & Tickets",   category: "Build"      as Category },
  { href: "/agents-and-tools",     label: "Agents & Tools",           category: "Build"      as Category },
  { href: "/hooks",                label: "Hooks",                    category: "Build"      as Category },
  { href: "/plan-mode",            label: "Plan Mode",                category: "Build"      as Category },
  { href: "/settings-and-shortcuts", label: "Settings & Shortcuts",  category: "Config"     as Category },
  { href: "/git-worktrees",        label: "Git Worktrees",            category: "Build"      as Category },
  { href: "/sprint-efficiency",    label: "10x Your Sprint",          category: "Build"      as Category },
  { href: "/scheduled-reviews",    label: "Scheduled Reviews",        category: "Build"      as Category },
  { href: "/prompt-library",       label: "Prompt Library",           category: "Reference"  as Category },
  { href: "/testing",              label: "Testing",                  category: "Quality"    as Category },
  { href: "/debugging",            label: "Debugging",                category: "Quality"    as Category },
  { href: "/code-review",          label: "Code Review & QA",         category: "Quality"    as Category },
  { href: "/changelog-and-prs",    label: "Changelog & PRs",          category: "Quality"    as Category },
  { href: "/security",             label: "Security",                 category: "Config"     as Category },
];

export function getGuideByHref(href: string) {
  return guides.find((g) => g.href === href);
}

export function getGuidePosition(href: string): { current: number; total: number } | null {
  const idx = guides.findIndex((g) => g.href === href);
  if (idx === -1) return null;
  return { current: idx + 1, total: guides.length };
}
