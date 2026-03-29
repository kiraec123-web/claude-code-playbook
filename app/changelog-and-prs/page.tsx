import { ContentLayout } from "@/components/content-layout";
import { Callout } from "@/components/callout";
import { Comparison } from "@/components/comparison";

const sections = [
  { id: "why-it-matters", title: "Why This Gets Skipped" },
  { id: "conventional-commits", title: "Conventional Commits" },
  { id: "pr-descriptions", title: "PR Descriptions" },
  { id: "changelog", title: "Maintaining a CHANGELOG" },
  { id: "release-notes", title: "Release Notes" },
  { id: "slash-commands", title: "Slash Commands for All of It" },
];

export const metadata = {
  title: "Changelog & PR Documentation — Claude Code Playbook",
};

export default function ChangelogAndPRs() {
  return (
    <ContentLayout
      title="Changelog & PR Documentation"
      description="Good documentation isn't what you write after the sprint — it's what makes the sprint reviewable, the PR mergeable, and the release understandable. Claude makes all of this fast enough that there's no excuse to skip it."
      category="Quality"
      position={{ current: 18, total: 19 }}
      sections={sections}
      prev={{ href: "/code-review", label: "Code Review" }}
      next={{ href: "/security", label: "Security" }}
    >
      <h2 id="why-it-matters">Why This Gets Skipped</h2>
      <p>
        Changelog and PR documentation gets skipped because it feels like overhead at the end
        of work that&apos;s already done. The feature shipped. The tests pass. Writing about it
        feels like filing paperwork.
      </p>
      <p>
        The cost shows up later: a new engineer can&apos;t understand why a decision was made,
        a customer asks what changed in the last release, a PR sits in review because nobody
        can tell what it does without reading all the code.
      </p>
      <p>
        With Claude, none of this takes more than two minutes. The bottleneck is starting,
        not writing. Slash commands remove the starting cost.
      </p>

      <Callout variant="key" title="The foundation: commits">
        All of this gets easier when your commits are structured. A PR description written
        from good commits takes 30 seconds. A CHANGELOG entry from good commits takes
        60 seconds. Invest two seconds per commit writing a structured message and everything
        downstream becomes fast.
      </Callout>

      <hr />

      <h2 id="conventional-commits">Conventional Commits</h2>
      <p>
        Conventional commits are a lightweight commit message format that makes your git
        history machine-readable — and Claude-readable.
      </p>

      <pre><code>{`# Format
<type>(<scope>): <short description>

# Types
feat:     a new feature
fix:      a bug fix
docs:     documentation only
refactor: code restructure, no behavior change
test:     adding or updating tests
chore:    build, deps, config — no production code
perf:     performance improvement

# Examples
feat(auth): add JWT refresh token rotation
fix(notifications): prevent duplicate emails on status change
refactor(accounts): extract balance validation into service layer
test(deposits): add edge cases for negative amounts
chore(deps): upgrade eslint to v9`}</code></pre>

      <p>
        The scope (in parentheses) is optional but valuable — it tells Claude and your team
        which part of the system changed without reading the diff.
      </p>

      <Comparison
        weak={`"fixed stuff" / "updates" / "wip" / "more changes"`}
        strong={`fix(auth): redirect to login on 401 instead of blank screen — tells you what changed, where, and what the behavior was before`}
      />

      <h3>Ask Claude to write your commit message</h3>
      <pre><code>{`Write a conventional commit message for these changes:
[paste git diff --stat or describe what changed]

Use the format: type(scope): description
Keep the description under 72 characters.
If the change needs more context, add a body paragraph after a blank line.`}</code></pre>

      <hr />

      <h2 id="pr-descriptions">PR Descriptions</h2>
      <p>
        A good PR description answers three questions for the reviewer: what changed, why,
        and how to verify it. A bad one is either empty or a copy of the commit log.
      </p>

      <Comparison
        weak={`"Added notification feature" — reviewer has to read every file to understand scope, intent, and how to test`}
        strong={`What: email alert to assignee on ticket status → In Review. Why: users were missing status changes in high-volume queues. Test: change ticket status, verify email within 60s. Edge cases: no email on other status changes, no duplicate on rapid toggles.`}
      />

      <h3>Generate from commits</h3>
      <pre><code>{`Write a pull request description for this branch.

Commits:
[paste git log --oneline main..HEAD]

Changed files:
[paste git diff --stat main..HEAD]

Ticket: [Jira/Linear reference]

Include:
- What this PR does (2-3 sentences max)
- Why it was built (the problem it solves)
- How to test it (step-by-step, including edge cases to verify)
- Any known issues or follow-up tickets
- Breaking changes if any

Under 300 words. Written for someone who knows the codebase but
hasn't been following this work.`}</code></pre>

      <h3>Review an existing PR description</h3>
      <pre><code>{`Review this PR description and improve it.

[paste current description]

A good PR description tells the reviewer:
1. What changed (not obvious from the title)
2. Why it was built (the user problem or business reason)
3. How to verify it's correct
4. What to watch for or known gaps

Rewrite it with those four things clear.`}</code></pre>

      <hr />

      <h2 id="changelog">Maintaining a CHANGELOG</h2>
      <p>
        A CHANGELOG is a human-readable record of what changed between versions, written
        for the people who use your software — not the people who built it.
        <a href="https://keepachangelog.com" className="text-[#f5a623] hover:underline ml-1" target="_blank" rel="noopener">keepachangelog.com</a> has become the standard format.
      </p>

      <pre><code>{`# CHANGELOG

## [Unreleased]

## [1.4.0] — 2026-03-28
### Added
- Email notifications when ticket status changes to "In Review"
- CSV export for reports up to 50k rows with streaming download

### Fixed
- Dashboard filter no longer resets on page refresh
- Duplicate notification emails on rapid status changes

### Changed
- Deposit endpoint now returns balance in cents (integer) instead of float

## [1.3.2] — 2026-03-14
### Fixed
- Auth session not persisting across browser tabs`}</code></pre>

      <h3>Generate a CHANGELOG entry from a sprint</h3>
      <pre><code>{`Write a CHANGELOG entry for this sprint's work.

Merged PRs / commits:
[paste git log --oneline --merges since last release]

Format using keepachangelog.com:
- Added: new features
- Changed: changes to existing behavior
- Fixed: bug fixes
- Deprecated: features being phased out
- Removed: removed features
- Security: security fixes

Write for users, not engineers. No implementation details.
No jargon. If a change doesn't affect users, omit it.`}</code></pre>

      <Callout variant="tip" title="Write for the person asking 'what changed?'">
        The CHANGELOG reader is a developer evaluating whether to upgrade, a customer support
        rep explaining a fix, or a PM tracking what shipped. None of them care about your
        refactor or your dependency updates. Only include what changes behavior.
      </Callout>

      <hr />

      <h2 id="release-notes">Release Notes</h2>
      <p>
        Release notes are the user-facing version of the CHANGELOG — even less technical,
        focused on value not mechanics.
      </p>

      <Comparison
        weak={`v1.4.0: Fixed notification bug, added CSV export, updated auth logic`}
        strong={`v1.4.0: You'll now get an email when a ticket you're assigned to moves to review — no more missing status changes. Reports can be exported to CSV directly from the dashboard.`}
      />

      <h3>Generate from CHANGELOG</h3>
      <pre><code>{`Turn this CHANGELOG entry into user-facing release notes.

[paste CHANGELOG entry]

Write for a non-technical user. Focus on what they can now do
or what problem is now solved — not how it was implemented.
Keep it under 150 words. Use plain language.`}</code></pre>

      <hr />

      <h2 id="slash-commands">Slash Commands for All of It</h2>
      <p>
        Commit all of these to <code>.claude/commands/</code> so they&apos;re one slash command away.
      </p>

      <pre><code>{`.claude/commands/
├── commit-msg.md      → /commit-msg
├── pr-desc.md         → /pr-desc
├── changelog.md       → /changelog
└── release-notes.md   → /release-notes`}</code></pre>

      <h3>commit-msg.md</h3>
      <pre><code>{`Write a conventional commit message for the staged changes.
Format: type(scope): description (under 72 chars)
Types: feat / fix / docs / refactor / test / chore / perf
Add a body paragraph if the why isn't obvious from the description.`}</code></pre>

      <h3>pr-desc.md</h3>
      <pre><code>{`Write a PR description for the current branch vs. main.
Include: what changed, why, how to test, any known issues.
Under 300 words. Written for a reviewer who knows the codebase.`}</code></pre>

      <h3>changelog.md</h3>
      <pre><code>{`Generate a CHANGELOG entry for the changes since the last tag.
Use keepachangelog.com format: Added / Changed / Fixed / Security.
Write for users, not engineers. Omit internal refactors and chores.`}</code></pre>

      <h3>release-notes.md</h3>
      <pre><code>{`Turn the latest CHANGELOG entry into user-facing release notes.
Plain language. Focus on what users can do or what problem is solved.
Under 150 words.`}</code></pre>

      <Callout variant="key" title="The full pipeline">
        Good commits → PR description writes itself → CHANGELOG entry writes itself →
        release notes write themselves. Each step depends on the previous one. Two seconds
        per commit message compounds into hours saved at release time.
      </Callout>
    </ContentLayout>
  );
}
