import { ContentLayout } from "@/components/content-layout";
import { Callout } from "@/components/callout";

const sections = [
  { id: "claude-md", title: "CLAUDE.md: Your Project Briefing" },
  { id: "onboarding", title: "Onboarding to an Existing Codebase" },
  { id: "large-codebases", title: "Navigating Large Codebases" },
];

export const metadata = {
  title: "Getting Started — Claude Code Playbook",
};

export default function GettingStarted() {
  return (
    <ContentLayout
      title="Getting Started"
      description="How to onboard Claude Code to a project — whether it's a fresh repo or a large existing codebase — and set up the foundation for every session that follows."
      sections={sections}
      next={{ href: "/claude-md", label: "CLAUDE.md" }}
    >
      <h2 id="claude-md">CLAUDE.md: Your Project Briefing</h2>
      <p>
        <code>CLAUDE.md</code> is the single most leveraged file in your Claude Code workflow.
        It&apos;s not documentation for humans — it&apos;s the briefing Claude reads before every session.
        Treat it that way.
      </p>

      <Callout variant="key" title="What belongs in CLAUDE.md">
        <ul className="space-y-1 mt-1">
          <li><strong className="text-[#fafafa]">Project purpose</strong> — one or two sentences on what the codebase does and who uses it</li>
          <li><strong className="text-[#fafafa]">Stack and conventions</strong> — languages, frameworks, test runners, linters, any non-obvious toolchain choices</li>
          <li><strong className="text-[#fafafa]">File structure</strong> — where things live and why, especially if your layout is non-standard</li>
          <li><strong className="text-[#fafafa]">Patterns to follow</strong> — e.g. &ldquo;new API routes go in <code>/routes</code>, follow the pattern in <code>users.ts</code>&rdquo;</li>
          <li><strong className="text-[#fafafa]">Patterns to avoid</strong> — explicit &ldquo;don&apos;t do this&rdquo; entries are often more valuable than positive guidance</li>
          <li><strong className="text-[#fafafa]">Running and testing</strong> — exact commands to build, run, and test the project locally</li>
          <li><strong className="text-[#fafafa]">Known gotchas</strong> — things that will cause confusion if Claude doesn&apos;t know them upfront</li>
        </ul>
      </Callout>

      <p>
        CLAUDE.md should be high-signal, not a dump. Avoid exhaustive API documentation Claude can look
        up, history and rationale that doesn&apos;t affect current behavior, and style preferences already
        enforced by your linter.
      </p>

      <h3>An annotated example</h3>

      <pre><code>{`# CLAUDE.md

## Project
Multi-tenant billing API for a SaaS product.
Handles subscriptions, invoices, and payment processing via Stripe.

## Stack
- Node.js 20, TypeScript, Express
- PostgreSQL via Prisma ORM
- Jest for tests, Supertest for integration tests
- ESLint + Prettier (configured, enforced on CI)

## File structure
- /routes — Express route handlers, one file per resource
- /services — Business logic, called by route handlers
- /prisma — Schema and migrations
- /tests — Mirror of /routes and /services structure

## Conventions
- New routes follow the pattern in routes/subscriptions.ts
- All database access goes through service layer
- Errors thrown as AppError instances (see lib/errors.ts)

## Do not
- Run migrations automatically — always flag when a migration is needed
- Modify prisma/schema.prisma without asking first
- Add new npm packages without flagging them

## Commands
- npm run dev — start dev server
- npm test — run full test suite
- npm run lint — lint check

## Gotchas
- The billing module has a legacy fee calculation in
  services/legacy-fees.ts that intentionally differs
  from the main path — do not refactor it`}</code></pre>

      <h3>Keeping it current</h3>
      <p>
        CLAUDE.md drifts. When you add a new pattern, rename a directory, or change a convention,
        update the file in the same commit. A stale CLAUDE.md is worse than a sparse one — it
        actively misleads.
      </p>

      <hr />

      <h2 id="onboarding">Onboarding to an Existing Codebase</h2>
      <p>
        The first session on a new or unfamiliar codebase is its own workflow. Don&apos;t jump straight
        to making changes.
      </p>

      <h3>Step 1: Let Claude read before it acts</h3>
      <p>Start by asking Claude to orient itself:</p>
      <blockquote>
        <p>Read the codebase and give me a summary of what it does, how it&apos;s structured, and any
        patterns or conventions you notice. Flag anything that looks unusual or potentially
        problematic.</p>
      </blockquote>
      <p>
        Review the output. Claude will often surface things you know about, but it will also sometimes
        notice inconsistencies or dead code worth knowing about.
      </p>

      <h3>Step 2: Generate a first-draft CLAUDE.md</h3>
      <blockquote>
        <p>Based on what you&apos;ve read, write a CLAUDE.md covering the project purpose, stack, file
        structure, conventions, how to run and test the project, and any gotchas you noticed.</p>
      </blockquote>
      <p>
        Then edit it manually. Claude may miss implicit conventions that a human would recognize —
        fill those in. This step usually takes 10–15 minutes and pays dividends across every
        subsequent session.
      </p>

      <h3>Step 3: Scope your first real task narrowly</h3>
      <p>
        Don&apos;t start with a large, sprawling change on your first session with a new codebase.
        Pick something small and well-defined. This lets you verify Claude&apos;s understanding of the
        conventions before trusting it with more.
      </p>

      <hr />

      <h2 id="large-codebases">Navigating Large Codebases</h2>
      <p>
        In large repos, how you direct Claude&apos;s attention matters as much as what you ask it to do.
      </p>

      <h3>Give Claude specific files, not the whole repo</h3>
      <p>
        Claude works better when you scope it to relevant files rather than asking it to explore a
        large codebase freely. Be explicit:
      </p>
      <blockquote>
        <p>The relevant files for this change are <code>services/accounts.ts</code>,
        <code>routes/accounts.ts</code>, and <code>tests/accounts.test.ts</code>. Focus there.</p>
      </blockquote>

      <h3>Use the codebase as your spec</h3>
      <p>
        One of the most reliable patterns is pointing Claude at an existing file that demonstrates
        the pattern you want:
      </p>
      <blockquote>
        <p>Write a new route handler for <code>/invoices</code> following the same structure as{" "}
        <code>routes/subscriptions.ts</code>.</p>
      </blockquote>
      <p>
        This enforces consistency without enumerating every convention, and it&apos;s more reliable than
        describing the pattern abstractly.
      </p>

      <h3>Ask for a plan before a large multi-file change</h3>
      <blockquote>
        <p>Before making any changes, tell me which files you&apos;ll need to edit and why.</p>
      </blockquote>
      <p>
        This surfaces scope creep and incorrect assumptions before they&apos;re baked into a diff.
      </p>

      <h3>Set explicit boundaries</h3>
      <p>Negative constraints are underused and highly effective:</p>
      <blockquote>
        <p>Do not modify anything in <code>/legacy</code>. Do not add new database migrations.
        Do not change any existing function signatures.</p>
      </blockquote>

      <Callout variant="tip" title="The highest-leverage thing you can do">
        Commit <code>.claude/commands/</code> to your repository so the whole team shares the same
        workflows. Combined with a well-maintained CLAUDE.md, this standardizes how Claude Code is
        used across an entire project.
      </Callout>
    </ContentLayout>
  );
}
