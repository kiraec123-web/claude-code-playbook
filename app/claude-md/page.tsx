import { ContentLayout } from "@/components/content-layout";
import { Callout } from "@/components/callout";
import { Comparison } from "@/components/comparison";

const sections = [
  { id: "what-it-is", title: "What CLAUDE.md Actually Is" },
  { id: "anatomy", title: "Anatomy of a Great CLAUDE.md" },
  { id: "what-belongs", title: "What Belongs In vs. Out" },
  { id: "living-document", title: "Treating It as a Living Document" },
  { id: "team-usage", title: "Team Usage: CLAUDE.md as Shared Memory" },
  { id: "referencing-files", title: "Referencing Other Files with @" },
  { id: "common-mistakes", title: "Common Mistakes" },
];

export const metadata = {
  title: "CLAUDE.md — Claude Code Playbook",
};

export default function ClaudeMd() {
  return (
    <ContentLayout
      title="CLAUDE.md"
      description="The project briefing file Claude reads before every session. How to write it, maintain it, and get maximum leverage from it."
      category="Foundation"
      position={{ current: 2, total: 19 }}
      sections={sections}
      prev={{ href: "/getting-started", label: "Getting Started" }}
      next={{ href: "/prompting", label: "Prompting Patterns" }}
    >
      <h2 id="what-it-is">What CLAUDE.md Actually Is</h2>
      <p>
        <code>CLAUDE.md</code> is not a README. It&apos;s not documentation for humans. It&apos;s the
        briefing Claude reads at the start of every session — automatically, before you type a single
        message. It sits at the root of your repo (or in a subdirectory for monorepos), and Claude
        loads it without being asked.
      </p>
      <p>
        The distinction matters: a README explains what a project does to a developer encountering it
        for the first time. <code>CLAUDE.md</code> tells Claude how to work inside it — the
        conventions, the constraints, the current state, the things that aren&apos;t obvious from
        reading the code.
      </p>

      <Callout variant="key" title="What CLAUDE.md is for">
        CLAUDE.md is a conversation starter, not a specification. It answers: &ldquo;What do I need
        to know before I touch this codebase?&rdquo;
      </Callout>

      <hr />

      <h2 id="anatomy">Anatomy of a Great CLAUDE.md</h2>
      <p>
        A well-structured <code>CLAUDE.md</code> covers a consistent set of topics — not exhaustively,
        but with enough signal to orient Claude quickly. Here&apos;s a template:
      </p>

      <pre><code>{`## Project overview
## Tech stack
## File structure
## Development commands
## Conventions
## What to avoid
## Current focus / active work`}</code></pre>

      <p>What each section should contain:</p>

      <h3>Project overview</h3>
      <p>
        Two to three sentences maximum. What it does, who uses it, what problem it solves. Not the
        history — just enough to frame everything else.
      </p>

      <h3>Tech stack</h3>
      <p>
        Specific versions matter. &ldquo;Next.js 16&rdquo; gives Claude more signal than
        &ldquo;Next.js.&rdquo; List the frameworks, runtimes, ORMs, test runners — anything Claude
        will be writing code against.
      </p>

      <h3>File structure</h3>
      <p>
        Only what&apos;s non-obvious. Don&apos;t list every directory — Claude can read the repo.
        Call out the things that would confuse someone who just cloned it.
      </p>

      <h3>Development commands</h3>
      <p>
        The exact commands: <code>npm run dev</code>, the test command, the build command, the lint
        command. Copy-pasteable, not approximate.
      </p>

      <h3>Conventions</h3>
      <p>
        The things that aren&apos;t obvious from reading the code. &ldquo;We use X pattern, not
        Y.&rdquo; &ldquo;All API calls go through <code>/lib/api-client.ts</code>.&rdquo; This is
        where you encode the decisions the team has already made.
      </p>

      <h3>What to avoid</h3>
      <p>
        The most valuable section. Explicit &ldquo;don&apos;t do this&rdquo; entries prevent the
        most common mistakes. Be specific about files, commands, and patterns Claude should leave
        alone.
      </p>

      <h3>Current focus / active work</h3>
      <p>
        Optional but powerful. Telling Claude what you&apos;re working on right now lets it
        calibrate — it won&apos;t suggest refactors in unrelated areas, and it understands which
        parts of the codebase are in flux.
      </p>

      <Callout variant="tip" title="The most valuable section">
        The &ldquo;What to avoid&rdquo; section prevents the most common mistakes. Be specific:
        &ldquo;Don&apos;t add new dependencies without asking&rdquo; beats &ldquo;be careful with
        dependencies.&rdquo;
      </Callout>

      <hr />

      <h2 id="what-belongs">What Belongs In vs. Out</h2>
      <p>
        The goal is high signal density. Every line in <code>CLAUDE.md</code> should tell Claude
        something it couldn&apos;t infer from reading your code.
      </p>

      <Comparison
        weak="Explains how authentication works in detail"
        strong="Auth: we use Clerk. JWT tokens stored in httpOnly cookies. See /lib/auth.ts for patterns."
      />

      <Comparison
        weak="Lists every file and its purpose"
        strong="Non-obvious structure: /lib/api-client.ts wraps all external API calls. Always go through it."
      />

      <Comparison
        weak="Generic best practices that apply to any project"
        strong="Project-specific conventions that Claude couldn't infer"
      />

      <h3>What never goes in CLAUDE.md</h3>
      <p>
        API keys, secrets, passwords, tokens — none of it. <code>CLAUDE.md</code> is committed to
        your repository. Treat it as a public file.
      </p>

      <Callout variant="warning" title="CLAUDE.md is committed to your repo">
        Anything you write here is potentially public. Never include secrets, credentials, or
        environment-specific values.
      </Callout>

      <hr />

      <h2 id="living-document">Treating It as a Living Document</h2>
      <p>
        <code>CLAUDE.md</code> degrades fast if you don&apos;t maintain it. A file written once and
        never touched becomes misleading within weeks as the codebase evolves around it.
      </p>
      <p>
        After any session where Claude learned something surprising about the codebase — a hidden
        constraint, an undocumented pattern, a gotcha that tripped it up — capture that in
        <code>CLAUDE.md</code>. The easiest way to build this habit is to end sessions explicitly:
      </p>
      <blockquote>
        <p>Update CLAUDE.md with anything you learned that wasn&apos;t there.</p>
      </blockquote>
      <p>
        When you add a new pattern to the codebase, add it to <code>CLAUDE.md</code> in the same
        commit. Keep the two in sync as a matter of discipline, not afterthought.
      </p>

      <Callout variant="tip" title="A useful end-of-session habit">
        Ask Claude at the end of a session: &ldquo;What did you learn about this codebase that
        isn&apos;t in CLAUDE.md?&rdquo; The answer is usually worth adding.
      </Callout>

      <hr />

      <h2 id="team-usage">Team Usage: CLAUDE.md as Shared Memory</h2>
      <p>
        Because <code>CLAUDE.md</code> is committed to the repo, it gives every team member — and
        every Claude session — the same baseline context. That&apos;s a feature, not an accident.
      </p>
      <ul className="space-y-2 mt-2">
        <li>
          <strong className="text-[#fafafa]">Review it in code review</strong> — when patterns
          change, <code>CLAUDE.md</code> should change with them. Make it part of the PR checklist.
        </li>
        <li>
          <strong className="text-[#fafafa]">Don&apos;t let it go stale</strong> — a stale
          <code>CLAUDE.md</code> is worse than none. It actively misleads Claude about how the
          project works.
        </li>
        <li>
          <strong className="text-[#fafafa]">Encode decisions, not just conventions</strong> —
          &ldquo;We chose X over Y because Z&rdquo; saves re-litigating decisions in every session.
          Claude will respect the reasoning, not just the rule.
        </li>
        <li>
          <strong className="text-[#fafafa]">Onboarding</strong> — new engineers should read
          <code>CLAUDE.md</code> before their first session. It&apos;s often a better orientation
          than the README.
        </li>
      </ul>

      <hr />

      <h2 id="referencing-files">Referencing Other Files with @</h2>
      <p>
        Claude supports an <code>@filename</code> syntax that imports another file&apos;s content
        into context. Use it to avoid duplication — keep <code>CLAUDE.md</code> itself short and
        point to detailed docs when they exist.
      </p>

      <pre><code>{`# CLAUDE.md

## Project overview
Internal tooling platform for a 50-person engineering team.

## Architecture
@docs/architecture.md

## API conventions
@docs/api-conventions.md

## Development commands
npm run dev
npm test
npm run lint`}</code></pre>

      <p>
        This keeps the main <code>CLAUDE.md</code> under 200 lines — enough to orient Claude quickly
        — while giving it access to detailed documentation when it needs to go deeper. The
        <code>@</code> references are resolved automatically; you don&apos;t need to paste the
        contents in.
      </p>

      <hr />

      <h2 id="common-mistakes">Common Mistakes</h2>
      <ul className="space-y-3 mt-2">
        <li>
          <strong className="text-[#fafafa]">Too long.</strong> Claude treats everything in
          <code>CLAUDE.md</code> with roughly equal weight. A 500-line file buries the important
          parts. Keep it under 200 lines; use <code>@</code> references for the rest.
        </li>
        <li>
          <strong className="text-[#fafafa]">Too generic.</strong> Conventions that apply to any
          project give Claude no signal. &ldquo;Write clean, readable code&rdquo; is not a
          convention — it&apos;s noise.
        </li>
        <li>
          <strong className="text-[#fafafa]">Set-and-forget.</strong> Writing it once then never
          updating it. The file drifts out of sync with the codebase and starts misleading Claude
          instead of helping it.
        </li>
        <li>
          <strong className="text-[#fafafa]">Missing the &ldquo;why.&rdquo;</strong> &ldquo;We use
          X&rdquo; is less useful than &ldquo;We use X because Y — don&apos;t switch to Z.&rdquo;
          The reasoning tells Claude when the rule applies and when it doesn&apos;t.
        </li>
        <li>
          <strong className="text-[#fafafa]">Not encoding recent decisions.</strong> Big
          architectural decisions — the kind your team debated for a week — should live in
          <code>CLAUDE.md</code>. Otherwise Claude will relitigate them from first principles.
        </li>
      </ul>

      <Callout variant="warning" title="Stale CLAUDE.md is worse than none">
        A CLAUDE.md that hasn&apos;t been updated in 3 months is probably misleading Claude about
        your current state. Review it whenever you make a significant architectural change.
      </Callout>
    </ContentLayout>
  );
}
