import { ContentLayout } from "@/components/content-layout";
import { Callout } from "@/components/callout";

const sections = [
  { id: "the-idea", title: "The Idea" },
  { id: "daily-review", title: "The Daily Review" },
  { id: "morning-routine", title: "Morning Routine" },
  { id: "eod-review", title: "End of Day Review" },
  { id: "ceo-user-agents", title: "CEO & User Agents" },
  { id: "automating-with-hooks", title: "Automating with Hooks" },
  { id: "other-automations", title: "Other Automatable Reviews" },
  { id: "slash-commands", title: "Building Your Review Commands" },
];

export const metadata = {
  title: "Scheduled Reviews & Automation — Claude Code Playbook",
};

export default function ScheduledReviews() {
  return (
    <ContentLayout
      title="Scheduled Reviews & Automation"
      description="The most consistent engineering teams aren't just using Claude to write code — they've wired it into their daily rhythm. Morning standups, end-of-day summaries, security reviews, user feedback sessions, and CEO-level sense checks, all running automatically."
      category="Build"
      position={{ current: 13, total: 19 }}
      sections={sections}
      prev={{ href: "/sprint-efficiency", label: "10x Your Sprint" }}
      next={{ href: "/prompt-library", label: "Prompt Library" }}
    >
      <h2 id="the-idea">The Idea</h2>
      <p>
        A daily code review used to mean a calendar invite, a Zoom, and 45 minutes of
        catching up on what everyone did. With Claude, it&apos;s a slash command you run at the
        start of the day. It reviews yesterday&apos;s work, maps out today, checks for security
        issues, simulates a user trying to use what you built, and gives you a CEO-level
        read on whether any of it actually matters.
      </p>
      <p>
        That&apos;s not a stretch — it&apos;s a prompt template. And once you&apos;ve built it, it runs in
        minutes and costs nothing.
      </p>

      <Callout variant="key" title="What automated reviews replace">
        They don&apos;t replace human code review — they front-load the work so that human review
        is faster and catches real issues, not style nits. By the time a PR reaches a teammate,
        the security holes, the edge cases, and the scope drift have already been surfaced.
      </Callout>

      <hr />

      <h2 id="daily-review">The Daily Review</h2>
      <p>
        Here&apos;s the full daily review workflow — run it every morning. It takes 10 minutes of
        Claude time and gives you a complete picture of where things stand.
      </p>

      <pre><code>{`# .claude/commands/daily-review.md

You are running the daily engineering review. Work through each phase
in order. Be direct, specific, and flag anything that needs action.

## Phase 1: Yesterday's Work
Review the git diff from yesterday:
- What was shipped? Summarize in plain language, not commit messages
- What looks incomplete or was left mid-way?
- Any code that concerns you — logic errors, missing error handling,
  edge cases that weren't addressed?
- Are there tests missing for what was built?

## Phase 2: Today's Lookahead
Review open tickets and the current branch state:
- What are the 3 most important things to ship today?
- What's blocked and why?
- What decisions need to be made before work can proceed?
- Any dependencies or risks to call out?

## Phase 3: Security Review
Review yesterday's changes with a security lens:
- Any new user input that isn't validated?
- Any new API endpoints without auth?
- Any hardcoded values that should be environment variables?
- Any new dependencies added? Flag anything unfamiliar.

## Phase 4: User Review
Become a non-technical user experiencing the feature that was built:
- Walk through the happy path. What's working well?
- Where would a real user get confused or stuck?
- What's missing that would make this feel complete?
- What error states exist that the user hasn't been thought through?

## Phase 5: CEO Review
Step back and think like a CEO or product leader:
- Does what was built yesterday move the needle on what matters?
- Is there scope creep or gold-plating that's eating sprint capacity?
- What's the one thing that would make this 10x more valuable to users?
- Any strategic risk — competitive, technical, or operational?

## Output format
End with a prioritized list:
1. Blockers (must fix today)
2. Decisions (need input from someone)
3. Deferred (valid but not urgent)
4. Ideas (captured for later)`}</code></pre>

      <hr />

      <h2 id="morning-routine">Morning Routine</h2>
      <p>
        Run this at the start of every day. Give Claude the context it needs:
      </p>

      <pre><code>{`/daily-review

Context:
- Yesterday's commits: [paste git log --oneline from yesterday]
- Open tickets: [paste the 3-5 things you're working on]
- Branch: [current branch name and what it's for]
- Any blockers or decisions pending: [anything relevant]

Run all five phases.`}</code></pre>

      <p>
        You can also hook this into SessionStart so it runs automatically every time you open
        Claude Code in the morning:
      </p>

      <pre><code>{`# .claude/hooks/morning-review.sh
#!/bin/bash

# Only run once per day (check a timestamp file)
STAMP_FILE="/tmp/claude-daily-review-$(date +%Y%m%d)"
if [ -f "$STAMP_FILE" ]; then
  exit 0
fi
touch "$STAMP_FILE"

echo "=== Daily Context ==="
echo "Date: $(date '+%A, %B %d')"
echo "Branch: $(git branch --show-current)"
echo "Yesterday's commits:"
git log --oneline --since="1 day ago" 2>/dev/null | head -10
echo "Uncommitted changes: $(git status --short | wc -l | xargs) files"
echo ""
echo "Run /daily-review to start your morning review."`}</code></pre>

      <hr />

      <h2 id="eod-review">End of Day Review</h2>
      <p>
        Five minutes at the end of the day. This is where decisions get written down before
        they&apos;re forgotten, and tomorrow&apos;s work gets set up so the morning is fast.
      </p>

      <pre><code>{`# .claude/commands/eod.md

End of day review. Work through each section.

## What shipped today
Summarize today's commits in plain language. What's actually done vs.
what's in progress?

## Decisions made
List any architectural, design, or product decisions made today that
should be documented. Format each as:
- Decision: [what was decided]
- Reason: [why]
- Tradeoffs: [what was given up]
These should go into CLAUDE.md.

## Update CLAUDE.md
Draft additions to CLAUDE.md based on today's decisions and patterns.
Keep it under 10 lines. Only include what future sessions actually need.

## Tomorrow's top 3
What are the three most important things to do first tomorrow?
Be specific — not "work on auth" but "implement the JWT refresh flow
in services/auth.ts, starting from the refreshToken endpoint."

## Open questions
Anything unresolved that needs input, research, or a decision before
work can continue?`}</code></pre>

      <hr />

      <h2 id="ceo-user-agents">CEO & User Agents</h2>
      <p>
        The daily review includes CEO and user lenses, but you can run them independently
        any time you want a quick gut check on what you&apos;re building.
      </p>

      <h3>User agent — anytime</h3>
      <pre><code>{`# .claude/commands/user-check.md

You are a non-technical user of this product. You're trying to accomplish
[the user's goal]. Walk through the current feature or flow and tell me:

1. What works and feels intuitive
2. Where you get confused or hit a wall
3. What you'd expect to happen that doesn't
4. What would make you tell a friend about this feature

Be the user, not the engineer. Don't explain what the code is doing.
Tell me what the experience feels like.`}</code></pre>

      <h3>CEO agent — anytime</h3>
      <pre><code>{`# .claude/commands/ceo-check.md

You are a CEO or senior product leader reviewing this work.
You care about: customer value, strategic alignment, and not wasting
engineering capacity on things that don't matter.

Review what's been built and tell me:
1. Does this move the needle for users or revenue?
2. Is there scope creep eating capacity that should be elsewhere?
3. What's the one change that would make this 10x more valuable?
4. Any risk — competitive, technical, or operational — I should be thinking about?

Be direct. You're not here to be encouraging. You're here to make sure
we're building the right thing.`}</code></pre>

      <hr />

      <h2 id="automating-with-hooks">Automating with Hooks</h2>
      <p>
        Beyond the daily review, hooks let you wire reviews into the development cycle
        automatically — no manual trigger needed.
      </p>

      <pre><code>{`// .claude/settings.json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": ".*",
        "hooks": [{ "type": "command", "command": "bash .claude/hooks/morning-context.sh" }]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [{ "type": "command", "command": "bash .claude/hooks/lint-and-type-check.sh" }]
      }
    ],
    "Stop": [
      {
        "matcher": ".*",
        "hooks": [{ "type": "command", "command": "osascript -e 'display notification \"Review ready\" with title \"Claude Code\"'" }]
      }
    ]
  }
}`}</code></pre>

      <hr />

      <h2 id="other-automations">Other Automatable Reviews</h2>
      <p>
        Once you have the daily review pattern, the same approach applies to everything
        that&apos;s currently happening manually — or not happening at all.
      </p>

      <h3>Weekly retrospective</h3>
      <pre><code>{`# .claude/commands/weekly-retro.md
Review this week's commits and open items.
- What patterns in the code need attention? (tech debt, inconsistency)
- What slowed down the sprint that a process change could fix?
- What did Claude get wrong repeatedly? (add constraints to CLAUDE.md)
- What's the highest-leverage thing to improve next week?`}</code></pre>

      <h3>PR description generator</h3>
      <pre><code>{`# .claude/commands/pr-desc.md
Write a pull request description for the current branch.

Include:
- What this PR does (one sentence)
- Why it was built (user problem or ticket reference)
- How to test it (step-by-step)
- Any edge cases or known issues
- Screenshots or flow description if it's a UI change

Keep it under 300 words. Make it readable for someone who doesn't
know the context.`}</code></pre>

      <h3>Dependency audit</h3>
      <pre><code>{`# .claude/commands/dep-audit.md
Review package.json (or requirements.txt / pom.xml).

Flag:
- Packages not updated in 12+ months
- Known security vulnerabilities (check against common CVE patterns)
- Packages doing the same thing (consolidation candidates)
- Packages that were added but may no longer be used
- Any package added recently that the team didn't discuss

Output a prioritized list of action items.`}</code></pre>

      <h3>Sprint planning prep</h3>
      <pre><code>{`# .claude/commands/sprint-prep.md
Review the open backlog items and prepare for sprint planning.

For each item in scope:
- Is the spec complete enough to build from? Flag gaps.
- Are there hidden dependencies?
- What's the right size estimate?
- What needs a spike before it can be sized?

Output: ready-to-plan items vs. items that need more work before planning.`}</code></pre>

      <h3>Architecture drift check</h3>
      <pre><code>{`# .claude/commands/arch-check.md
Review recent changes against the architecture decisions in CLAUDE.md.

Flag anything that:
- Contradicts an established pattern
- Introduces a new pattern that should be documented
- Creates a dependency that wasn't planned for
- Is solving a problem we already have a solution for elsewhere

Be specific — name files and line numbers.`}</code></pre>

      <hr />

      <h2 id="slash-commands">Building Your Review Commands</h2>
      <p>
        All of these live in <code>.claude/commands/</code> and are invoked with a slash command.
        The structure is always the same:
      </p>

      <pre><code>{`.claude/commands/
├── daily-review.md    → /daily-review
├── eod.md             → /eod
├── user-check.md      → /user-check
├── ceo-check.md       → /ceo-check
├── weekly-retro.md    → /weekly-retro
├── pr-desc.md         → /pr-desc
├── dep-audit.md       → /dep-audit
├── sprint-prep.md     → /sprint-prep
└── arch-check.md      → /arch-check`}</code></pre>

      <Callout variant="tip" title="Commit these to the repo">
        These commands are most valuable when the whole team uses them consistently.
        A <code>/daily-review</code> that every engineer runs gives you a shared quality
        bar across the codebase — not just a personal habit.
      </Callout>

      <Callout variant="key" title="Start with one">
        Don&apos;t build nine commands on day one. Pick the one that would have the most impact
        on your current sprint — probably <code>/daily-review</code> — and run it for a week.
        Once it&apos;s a habit, add the next one. The goal is a routine that runs automatically,
        not a library of commands nobody remembers to use.
      </Callout>
    </ContentLayout>
  );
}
