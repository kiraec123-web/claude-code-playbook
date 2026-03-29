# Claude Code Playbook

A best-practices resource for working with Claude Code — from first session to production agentic workflows.

---

## What's inside

Eight focused guides covering the full Claude Code workflow:

| # | Guide | Topics |
|---|-------|--------|
| 01 | **Getting Started** | CLAUDE.md, onboarding, large codebases |
| 02 | **Prompting Patterns** | Constraints, negative instructions, iteration |
| 03 | **Memory & Context** | Context layers, session management, amnesia design |
| 04 | **Agents & Tools** | Autonomy spectrum, slash commands, MCP, checkpoints |
| 05 | **Testing** | TDD, failure modes, mutation testing |
| 06 | **Debugging** | Reproducible reports, fix loops, test-cheating |
| 07 | **Code Review & QA** | Review patterns, diff discipline, QA pass |
| 08 | **Security** | Secrets hygiene, bash permissions, prompt injection |

---

## Stack

- [Next.js 16](https://nextjs.org) — App Router, static generation
- [shadcn/ui](https://ui.shadcn.com) — component primitives
- [Tailwind CSS](https://tailwindcss.com) — styling
- [Geist](https://vercel.com/font) — Sans + Mono fonts
- Deployed on [Vercel](https://vercel.com)

---

## Running locally

```bash
git clone https://github.com/kiraec123-web/claude-code-playbook.git
cd claude-code-playbook
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Contributing

Content lives in `app/<section>/page.tsx`. Each page is a React component using shared layout and components.

**To add or edit content:**

1. Fork the repo (or ask to be added as a collaborator)
2. Create a branch: `git checkout -b your-branch-name`
3. Edit the relevant page in `app/`
4. Run `npm run dev` to preview locally
5. Open a Pull Request

**Shared components:**

| Component | File | Use for |
|-----------|------|---------|
| `ContentLayout` | `components/content-layout.tsx` | Page wrapper with TOC sidebar |
| `Callout` | `components/callout.tsx` | Key points, tips, warnings |
| `Comparison` | `components/comparison.tsx` | Weak vs strong prompt pairs |

**Callout variants:**
```tsx
<Callout variant="key" title="Key point">...</Callout>
<Callout variant="tip" title="Tip">...</Callout>
<Callout variant="warning" title="Warning">...</Callout>
```

**Adding a new section:**
1. Create `app/your-section/page.tsx`
2. Add it to the topics array in `app/page.tsx`
3. Add a nav link in `components/nav.tsx`

---

## Project structure

```
app/
├── page.tsx                 # Home page
├── getting-started/page.tsx
├── prompting/page.tsx
├── memory-and-context/page.tsx
├── agents-and-tools/page.tsx
├── testing/page.tsx
├── debugging/page.tsx
├── code-review/page.tsx
└── security/page.tsx

components/
├── nav.tsx                  # Top navigation
├── content-layout.tsx       # Shared page layout with sidebar
├── callout.tsx              # Callout boxes
├── comparison.tsx           # Weak/strong prompt pairs
└── copy-buttons.tsx         # Copy buttons on code/blockquote blocks
```

---

Not affiliated with Anthropic.
