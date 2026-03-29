import { ContentLayout } from "@/components/content-layout";
import { Callout } from "@/components/callout";

const sections = [
  { id: "agent-room", title: "Agent Room" },
  { id: "daily-reviews", title: "Daily Reviews" },
  { id: "story-writing", title: "Story Writing" },
  { id: "planning", title: "Planning & Specs" },
  { id: "code-review", title: "Code Review & QA" },
  { id: "debugging", title: "Debugging" },
  { id: "testing", title: "Testing" },
  { id: "meta", title: "Meta Prompts" },
];

export const metadata = {
  title: "Prompt Library — Claude Code Playbook",
};

export default function PromptLibrary() {
  return (
    <ContentLayout
      title="Prompt Library"
      description="Copy-paste prompts for every stage of a sprint. These are the ones that reliably produce good output — refined through use, not written as examples. Start here, add your own, commit them to .claude/commands/."
      sections={sections}
      prev={{ href: "/scheduled-reviews", label: "Scheduled Reviews" }}
      next={{ href: "/getting-started", label: "Getting Started" }}
    >
      <Callout variant="tip" title="Make these yours">
        Every prompt here is a starting point. The best version will have your product context,
        your tech stack, and your team&apos;s conventions baked in. Once you&apos;ve refined one,
        save it as a <code>.claude/commands/</code> file — so it&apos;s one slash command away,
        not buried in a doc.
      </Callout>

      <hr />

      <h2 id="agent-room">Agent Room</h2>

      <h3>Critic — find every hole</h3>
      <pre><code>{`You are a senior engineer and product thinker. Your job is to find problems.

I'm about to build this:
[paste spec or feature description]

Find:
1. The top 3 assumptions being made that could be wrong
2. Every failure mode you can think of — technical, UX, and business
3. Edge cases that aren't handled
4. What's over-engineered or under-specified
5. The question the team hasn't thought to ask yet

Be direct. Don't soften feedback.`}</code></pre>

      <h3>User agent — simulate real confusion</h3>
      <pre><code>{`You are a non-technical user trying to accomplish [goal].
You're reasonably smart but you don't read docs and have no patience
for unclear UI.

Walk through this feature/flow:
[describe the flow in plain language]

Tell me:
1. What you click first and what you expect to happen
2. Where you get confused or stuck
3. What you expect that doesn't happen
4. What error states would frustrate you
5. What's missing that would make this feel complete

Think out loud as you go. Be the user, not the engineer.`}</code></pre>

      <h3>Architect — start with data, not UI</h3>
      <pre><code>{`You are a senior software architect. Think in systems, not features.

Feature I'm building:
[description]

Tell me:
1. What does the data model look like and how does it change?
2. What are the system boundaries — what talks to what?
3. What's the single decision with the highest long-term cost?
4. What doesn't fit the existing architecture?
5. What's the simplest design that scales to 10x current load?

Don't write code. Sketch in plain language. Ask clarifying questions
if the boundaries aren't clear.`}</code></pre>

      <h3>PM — challenge scope</h3>
      <pre><code>{`You are a PM who cares deeply about scope discipline.

Feature in question:
[description]

Challenge me:
1. What's the absolute MVP that proves this idea works?
2. What's must-have vs. nice-to-have vs. should-never-build?
3. What happens if we skip each requirement?
4. Who specifically asked for this and what did they actually say?
5. What's the phased version if the full feature is too large?

Be opinionated. Protect the sprint from good intentions.`}</code></pre>

      <h3>Designer — every state of the UI</h3>
      <pre><code>{`You are a product designer with strong engineering intuition.

Feature:
[description]

Map every state this UI needs to handle:
- Loading / skeleton state
- Empty state (no data yet)
- Populated / success state
- Error state
- Edge cases: long strings, many items, missing optional data

Then:
- Identify the primary action and confirm it's obvious
- Flag anything causing layout or responsive issues
- Suggest the simplest UI that still solves the problem`}</code></pre>

      <h3>Security agent — find the exploits</h3>
      <pre><code>{`You are a security engineer reviewing this feature before it ships.

Code / feature:
[paste code or describe feature]

Check for:
- User input that reaches a DB query, shell command, or external service without validation
- New API endpoints without proper authentication
- Hardcoded values that should be environment variables
- Data exposed in error messages or API responses
- Auth edge cases: expired sessions, wrong roles, concurrent access
- New dependencies — flag anything unfamiliar

Be specific. Name files and line numbers where relevant.`}</code></pre>

      <h3>Synthesis — after the room</h3>
      <pre><code>{`Here's the feedback from the agent room on [feature]:

CRITIC: [paste output]
USER: [paste output]
ARCHITECT: [paste output]
PM: [paste output]
DESIGNER: [paste output]

Synthesize into:
1. Blockers — must change before building starts
2. Open decisions — need an answer before work can proceed
3. Deferred — valid concerns for a follow-up sprint
4. Dismissed — doesn't apply given our constraints

Output as a revised spec ready for Jira.`}</code></pre>

      <hr />

      <h2 id="daily-reviews">Daily Reviews</h2>

      <h3>Morning review — full 5-phase</h3>
      <pre><code>{`Run my daily engineering review. Work through each phase in order.

Context:
- Yesterday's commits: [paste git log --oneline]
- Open tickets: [list what you're working on]
- Branch: [name and purpose]
- Pending decisions or blockers: [anything relevant]

Phase 1 — Yesterday's work
What shipped? What looks incomplete? Any code concerns — missing error
handling, untested edge cases, logic issues?

Phase 2 — Today's lookahead
Top 3 things to ship today. What's blocked and why. What decisions
are needed before work can proceed.

Phase 3 — Security scan
Review yesterday's changes: unvalidated input, missing auth, hardcoded
values, unfamiliar new dependencies.

Phase 4 — User lens
Walk through what was built as a non-technical user. Where does it
break down? What's confusing or missing?

Phase 5 — CEO lens
Does yesterday's work move the needle? Scope creep? What's the one
change that makes this 10x more valuable?

End with: Blockers / Decisions / Deferred / Ideas`}</code></pre>

      <h3>CEO check — strategic gut check</h3>
      <pre><code>{`You are a CEO reviewing this sprint's output.
You care about customer value, strategic alignment, and not wasting
engineering capacity.

What was built:
[summary or git log]

Tell me:
1. Does this move the needle for users or revenue?
2. Is there scope creep eating capacity that should be elsewhere?
3. What's the one change that would make this 10x more valuable?
4. Any competitive, technical, or operational risk I should know about?

Be direct. You're not here to encourage. You're here to make sure
we're building the right thing.`}</code></pre>

      <h3>EOD — decisions + tomorrow setup</h3>
      <pre><code>{`End of day review.

Today's commits: [paste git log --oneline]

1. What actually shipped today vs. what's still in progress?

2. Decisions made today that should be documented:
   Format each as: Decision / Reason / Tradeoffs

3. Draft additions to CLAUDE.md based on today's decisions.
   Keep under 10 lines. Only what future sessions need.

4. Tomorrow's top 3 — be specific, not vague:
   Not "work on auth" but "implement JWT refresh in services/auth.ts"

5. Open questions that need input before work can continue.`}</code></pre>

      <hr />

      <h2 id="story-writing">Story Writing</h2>

      <h3>Single story from brief</h3>
      <pre><code>{`Write a user story for our Jira backlog.

Product: [one sentence description]
User role: [who this is for]
Current state: [what exists today / what the problem is]
Goal: [what the user needs to accomplish]
Why it matters: [business value or user pain]
Key constraints: [technical, design, or business constraints]
Out of scope: [explicitly what this does NOT include]

Output:
- User story (As a / I want / So that)
- Acceptance criteria (Given/When/Then, numbered)
- Edge cases: empty state, error state, permission edge cases
- Definition of done
- Story point estimate (Fibonacci) with one-sentence reasoning

Ask me for any missing information before generating.`}</code></pre>

      <h3>Epic breakdown</h3>
      <pre><code>{`Break this epic into user stories for our sprint backlog.

Epic: [title + one-paragraph description]
Team: [who's working on it, rough capacity]
Out of scope for this epic: [what's not included]

For each story:
- Keep it independently shippable where possible
- Flag dependencies between stories
- Note anything needing a spike before sizing
- Rough size: S / M / L

Flag anything that looks like scope creep vs. the original epic intent.`}</code></pre>

      <h3>INVEST check</h3>
      <pre><code>{`Review this user story against INVEST criteria:

[paste story]

- Independent: can it ship without depending on another in-progress ticket?
- Negotiable: is the implementation flexible or over-specified?
- Valuable: is the user value clear?
- Estimable: does the team have enough info to size it?
- Small: can it be completed in one sprint?
- Testable: can QA verify it's done?

Flag each criterion it fails and suggest how to fix it.`}</code></pre>

      <h3>Edge case second pass</h3>
      <pre><code>{`Review these acceptance criteria for missing edge cases:

[paste ACs]

Add Given/When/Then criteria for:
- Empty state (user has no data)
- Error states (network failure, invalid input, timeout)
- Permission edge cases (wrong role, expired session)
- Concurrent actions (two users touching the same record)
- Mobile and accessibility considerations

Only add what's genuinely missing. Don't repeat what's already covered.`}</code></pre>

      <hr />

      <h2 id="planning">Planning & Specs</h2>

      <h3>Plan before implementing</h3>
      <pre><code>{`Before writing any code, walk me through your approach.

Task: [description]

Tell me:
1. Which files will you touch and why?
2. What's the main risk or assumption?
3. Are there 2-3 viable approaches? What are the tradeoffs?
4. What would you do differently if starting from scratch vs. fitting
   into the existing codebase?

Recommend one approach and explain why. Wait for my approval
before writing any code.`}</code></pre>

      <h3>Root cause before fix</h3>
      <pre><code>{`Before fixing anything, help me understand what's actually wrong.

Bug: [description]
Symptoms: [what the user sees]
When it happens: [steps to reproduce or conditions]

Tell me:
1. What do you think the root cause is?
2. Which files are most likely involved?
3. What assumptions are you making that could be wrong?
4. What would you need to confirm the diagnosis?

Ask clarifying questions before proposing a fix.`}</code></pre>

      <h3>Spec from vague request</h3>
      <pre><code>{`Turn this vague feature request into a precise spec.

Request: [paste the original ask]

Output a spec that answers:
- Who is this for? (user role)
- What do they need to do? (behavior, not implementation)
- Why does it matter? (user outcome or business value)
- What does done look like? (3-5 observable, testable outcomes)
- What's explicitly out of scope?

Then flag: what information is missing that would change the spec?`}</code></pre>

      <hr />

      <h2 id="code-review">Code Review & QA</h2>

      <h3>Full code review</h3>
      <pre><code>{`Review the changes in the current working tree.

For each changed file:
1. Does the logic match the stated intent?
2. Are there unhandled error cases?
3. What tests should exist that don't?
4. Are there hardcoded values that should be configurable?
5. Does this fit the patterns in the rest of the codebase?

Focus on correctness and completeness. Don't suggest stylistic changes.`}</code></pre>

      <h3>Security-focused review</h3>
      <pre><code>{`Review this code for security issues.
It handles: [payment data / user credentials / PII / auth tokens]

Flag anything that could:
- Leak data (logs, error messages, API responses)
- Be exploited (injection, auth bypass, IDOR)
- Create a supply chain risk (new dependencies)
- Expose internal state to users

Be specific. Name lines. Explain the risk, not just that it exists.`}</code></pre>

      <h3>PR description</h3>
      <pre><code>{`Write a pull request description for these changes.

Changes: [paste git diff --stat or describe what changed]
Ticket: [Jira/Linear reference]

Include:
- What this PR does (one sentence)
- Why it was built (user problem solved)
- How to test it (step-by-step, including edge cases)
- Any known issues or follow-up work

Under 300 words. Make it readable for someone without context.`}</code></pre>

      <hr />

      <h2 id="debugging">Debugging</h2>

      <h3>Fix with a locked test</h3>
      <pre><code>{`This test should pass but doesn't:

[paste failing test]

Fix the underlying code so this test passes.
Do NOT modify the test under any circumstances.

Before making changes, tell me what you think the cause is.`}</code></pre>

      <h3>Reproduce before fix</h3>
      <pre><code>{`I have a bug I need you to fix.

Bug description: [what's wrong]
Steps to reproduce: [how to trigger it]
Expected behavior: [what should happen]
Actual behavior: [what actually happens]

Before writing any fix:
1. Write a test that reproduces the bug
2. Confirm the test fails
3. Then fix the code so the test passes

Do not modify the test once written.`}</code></pre>

      <h3>Stuck loop escape</h3>
      <pre><code>{`We've been trying to fix [problem] and it's not working.

Attempts so far:
[list what's been tried]

Stop trying variations of the same approach. Instead:
1. Question the assumption we've been making
2. Propose a completely different angle
3. Tell me what information would definitively diagnose this
4. What would you do if you were starting fresh with no context?`}</code></pre>

      <hr />

      <h2 id="testing">Testing</h2>

      <h3>TDD — tests before implementation</h3>
      <pre><code>{`Write tests for this feature before implementing it.

Feature spec:
[paste spec]

Use [Jest / Pytest / JUnit — your framework].

Cover:
- Every acceptance criteria from the spec
- The happy path
- Every error case and edge case in the spec
- Empty states, boundary values

Do NOT write the implementation yet. The tests become the spec.`}</code></pre>

      <h3>Mutation test gap finder</h3>
      <pre><code>{`Review this test suite and find the gaps.

[paste tests or describe coverage]

Tell me:
1. What change to the production code would NOT cause any test to fail?
2. Which error paths, boundaries, or edge cases aren't covered?
3. Are there any tests that are trivial — they couldn't fail even if
   the code were broken?
4. What would you add to make this suite meaningfully stronger?`}</code></pre>

      <h3>Ask Claude to audit its own tests</h3>
      <pre><code>{`You just generated this test suite. Now review it critically.

[paste the tests]

For each test, ask:
- What would have to be broken in the code for this test to fail?
- If you can't answer clearly, flag the test as potentially trivial.

Then:
- Are there paths in the code that aren't covered?
- Are any tests redundant with others?
- What would you add or remove?`}</code></pre>

      <hr />

      <h2 id="meta">Meta Prompts</h2>

      <h3>Ask before generating</h3>
      <pre><code>{`Before generating anything, ask me for any information that's missing.

I want to [goal].

What do you need to know to do this well? Ask your questions first.
Generate output only after I've answered.`}</code></pre>

      <h3>Devil's advocate on your plan</h3>
      <pre><code>{`I'm about to [describe plan or decision].

Play devil's advocate. What am I missing? What assumptions am I making
that could be wrong? What's the simplest version of this that still
solves the core problem?

Don't validate my approach. Find the holes.`}</code></pre>

      <h3>Explain before you build</h3>
      <pre><code>{`Before implementing, explain what you're going to do in plain language.

Task: [description]

Explain it to me as if I'm a smart person who doesn't know this codebase.
Cover: what changes, why, and what could go wrong.

If your explanation doesn't make sense to me, we won't start coding yet.`}</code></pre>

      <h3>Session handoff</h3>
      <pre><code>{`I'm ending this session. Before we close:

1. Summarize the decisions we made today — format as:
   Decision / Reason / Tradeoffs

2. What's in progress and where exactly it was left

3. What the next session needs to know to pick this up cleanly

4. Draft any additions to CLAUDE.md that came out of today's work

I'll paste this into the next session to reload context.`}</code></pre>

      <h3>When you're going in circles</h3>
      <pre><code>{`Stop. We've been going in circles on [problem] for too long.

Don't try another variation. Instead:
1. What assumption have we both been making that might be wrong?
2. What's the simplest possible version of this that works?
3. What would a fresh pair of eyes notice that we're missing?
4. Do we actually need this, or is there a simpler way to solve
   the underlying problem?`}</code></pre>
    </ContentLayout>
  );
}
