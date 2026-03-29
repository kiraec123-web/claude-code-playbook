import { ContentLayout } from "@/components/content-layout";
import { Callout } from "@/components/callout";
import { Comparison } from "@/components/comparison";

const sections = [
  { id: "the-mindset", title: "The Mindset" },
  { id: "understand-first", title: "1. Understand the Problem First" },
  { id: "spec-it", title: "2. Spec It Before You Build" },
  { id: "break-it-down", title: "3. Break It Down" },
  { id: "build-in-parallel", title: "4. Build in Parallel" },
  { id: "implement", title: "5. Implement with Claude" },
  { id: "test-and-qa", title: "6. Test & QA" },
  { id: "prompt-engineering", title: "The Prompt Engineering Layer" },
];

export const metadata = {
  title: "How I Work — Claude Code Playbook",
};

export default function HowIWork() {
  return (
    <ContentLayout
      title="How I Work"
      description="Going from idea to shipped product with Claude Code — the full methodology. Not just coding patterns, but the complete workflow: understanding the problem, writing specs, breaking down epics, building in parallel, and shipping clean."
      sections={sections}
      next={{ href: "/getting-started", label: "Getting Started" }}
    >
      <h2 id="the-mindset">The Mindset</h2>
      <p>
        The engineers who get the most out of Claude Code aren&apos;t the ones who prompt the hardest.
        They&apos;re the ones who think clearly before they open the terminal.
      </p>
      <p>
        Claude is extremely good at executing. It&apos;s your job to make sure it&apos;s executing on the
        right thing. That means understanding the problem deeply before writing a spec, writing
        the spec before writing a prompt, and writing the prompt before writing a line of code.
      </p>
      <p>
        This is the Forward Deployed Engineer mindset: go deep on the problem first. The code
        is easy once you know exactly what needs to exist and why. The hard part — the part most
        people skip — is figuring that out.
      </p>

      <Callout variant="key" title="The rule">
        The quality of your output is a function of the quality of your thinking, not the quality
        of your prompts. Claude amplifies whatever you bring to it. Bring clarity, get clarity back.
        Bring vagueness, get vagueness back.
      </Callout>

      <hr />

      <h2 id="understand-first">1. Understand the Problem First</h2>
      <p>
        Before you write a spec, before you open Claude, before you think about implementation —
        understand what you&apos;re actually solving.
      </p>

      <h3>Ask root cause questions</h3>
      <p>
        Most feature requests are solutions to unstated problems. The stated request is &ldquo;add a
        dashboard filter.&rdquo; The actual problem is &ldquo;users can&apos;t find their own data in a sea of
        shared data.&rdquo; Build the wrong abstraction and the filter helps nobody.
      </p>
      <ul>
        <li>What is the user actually trying to accomplish? (Not: what did they ask for?)</li>
        <li>What happens today when they try to do this? Where does it break down?</li>
        <li>How do we know this is the right solution and not just the most obvious one?</li>
        <li>What does success look like — observable, measurable?</li>
      </ul>

      <h3>Use Claude as a thinking partner</h3>
      <p>
        Before you build anything, use Claude to pressure-test your understanding:
      </p>
      <pre><code>{`I'm about to build [feature]. Here's my understanding of the problem:
[your current understanding]

Play devil's advocate. What am I missing? What assumptions am I making
that could be wrong? What's the simplest version of this that still
solves the core problem?`}</code></pre>

      <p>
        This is not about getting Claude to design the feature. It&apos;s about using it as a sounding
        board to find holes in your thinking before you commit to a direction.
      </p>

      <Callout variant="tip" title="Talk to users before you spec">
        If you have access to the people who will use what you build, talk to them before writing
        the spec. Even one 15-minute conversation surfaces requirements no amount of second-guessing
        will find. Claude can help you synthesize feedback into requirements — but the feedback has
        to come from real users first.
      </Callout>

      <hr />

      <h2 id="spec-it">2. Spec It Before You Build</h2>
      <p>
        A spec is not a design document. It&apos;s a short, precise answer to: what does this thing
        do, for whom, and how do we know it&apos;s done?
      </p>

      <h3>The minimum viable spec</h3>
      <pre><code>{`Feature: [name]
Who: [user role or system actor]
What: [what they can do — behavior, not implementation]
Why: [the problem this solves]
Done when: [observable, testable outcomes — 3-5 bullet points]
Out of scope: [what this explicitly does NOT include]`}</code></pre>

      <p>
        Out of scope is the most important field. Without it, Claude writes acceptance criteria
        that silently include things you didn&apos;t plan to build. A two-point ticket becomes a
        ten-point ticket that misses the sprint.
      </p>

      <Comparison
        weak={`Build a notification system for our app.`}
        strong={`Notifications: email alert to assignee when ticket status → "In Review". Trigger: status change only (not every edit). Out of scope: notification prefs, unsubscribe, other status changes. Done when: email sends within 60s, includes ticket title + link + who changed it.`}
      />

      <h3>Spec in CLAUDE.md for ongoing work</h3>
      <p>
        For features that span multiple sessions, keep the spec in <code>CLAUDE.md</code> under
        a &ldquo;Current work&rdquo; section. Claude always reads this at session start — it means you never
        have to re-explain the context.
      </p>

      <pre><code>{`## Current sprint
Feature: User notification on status change
Spec: [paste spec here]
Status: API done, frontend in progress
Next: wire up the email template`}</code></pre>

      <hr />

      <h2 id="break-it-down">3. Break It Down: Epic → Stories → Tickets</h2>
      <p>
        Once you have a spec, break it into independently shippable pieces. This is where the
        velocity comes from — not from coding faster, but from having work that&apos;s sized right
        and unambiguous when it enters the sprint.
      </p>

      <h3>Epic breakdown prompt</h3>
      <pre><code>{`Break this epic into user stories for our sprint backlog.

Epic: [title + one-paragraph description]
Team: [who's working on it, rough capacity]
Out of scope for this epic: [what's not included]

For each story:
- Keep it independently shippable
- Flag dependencies between stories
- Note anything that needs a spike before sizing
- Rough size: S / M / L`}</code></pre>

      <h3>Story to ticket</h3>
      <p>
        Once you have stories, generate the full ticket for each one:
      </p>
      <pre><code>{`Write a Jira ticket for this story:
[story one-liner]

Context: [relevant technical or product context]
Out of scope: [what this story doesn't include]

Format:
- User story (As a / I want / So that)
- Acceptance criteria (Given/When/Then, numbered)
- Edge cases: empty state, error state, permission edge cases
- Definition of done
- Story point estimate with reasoning`}</code></pre>

      <Callout variant="tip" title="Ask Claude to flag gaps before generating">
        Add &ldquo;Ask me for any missing information before generating&rdquo; to your story prompt. This
        prevents Claude from silently filling in blanks. When Claude asks a clarifying question,
        that question is exactly the ambiguity that would have become a mid-sprint conversation.
      </Callout>

      <hr />

      <h2 id="build-in-parallel">4. Build in Parallel with Worktrees</h2>
      <p>
        Once the work is broken down, don&apos;t build it sequentially. Git worktrees let you run
        multiple Claude sessions on separate branches simultaneously — no context switching,
        no stale state, no waiting.
      </p>

      <pre><code>{`# One worktree per workstream
git worktree add ../project-auth feature/auth
git worktree add ../project-notifications feature/notifications
git worktree add ../project-dashboard feature/dashboard

# Start a Claude session in each
cd ../project-auth && claude
# (new terminal) cd ../project-notifications && claude`}</code></pre>

      <p>
        Each Claude session has full context on one branch and one feature. Sessions don&apos;t
        interfere with each other. If one goes sideways, you delete the worktree — the others
        are untouched.
      </p>

      <h3>What to parallelize</h3>
      <ul>
        <li>Independent features that don&apos;t share files</li>
        <li>Frontend and backend work on the same feature (if the API contract is clear)</li>
        <li>Test writing while implementation continues on another branch</li>
        <li>A risky refactor while keeping the stable branch clean for hotfixes</li>
      </ul>

      <Callout variant="warning" title="Checkpoint before you parallelize">
        Before spinning up multiple sessions, commit a clean checkpoint on main:
        <code>git add -A &amp;&amp; git commit -m "checkpoint before parallel sessions"</code>.
        If anything goes wrong, you have a clean rollback point for every branch.
      </Callout>

      <hr />

      <h2 id="implement">5. Implement with Claude</h2>
      <p>
        With a spec and a clean branch, implementation is fast. The work here is directing
        Claude well, not writing code yourself.
      </p>

      <h3>Always plan before implementing</h3>
      <p>
        Use <kbd>Shift</kbd>+<kbd>Tab</kbd> (Plan Mode) before any non-trivial implementation.
        Claude outlines the approach, lists the files it will touch, and surfaces assumptions —
        before a line is written. A wrong assumption caught here costs nothing. Caught at review
        costs a full rewrite.
      </p>

      <h3>Give Claude the spec, not the solution</h3>
      <Comparison
        weak={`Add a POST /notifications endpoint that saves to the notifications table and sends an email via SendGrid.`}
        strong={`Implement the notification feature from the spec in CLAUDE.md. Don't add migrations — work with the existing schema. Don't install new packages — use what's in package.json. Show me the plan before writing any code.`}
      />

      <h3>Use hooks for automatic quality</h3>
      <p>
        Set up PostToolUse hooks to run your linter and formatter after every file write.
        Claude sees the output and fixes issues immediately — without being asked.
        The code that goes to review is already clean.
      </p>

      <hr />

      <h2 id="test-and-qa">6. Test & QA</h2>
      <p>
        Testing with Claude works best when you treat it as a two-pass process: generate coverage,
        then pressure-test it.
      </p>

      <h3>First pass: generate from the spec</h3>
      <pre><code>{`Write tests for the notification feature. Cover every acceptance
criteria from the spec. Use [Jest / your test framework].

Assert both the happy path and every error case:
- Status change triggers email
- Non-status changes do NOT trigger email
- Email contains correct fields
- API returns correct status codes
- What happens if the email service is down`}</code></pre>

      <h3>Second pass: find the gaps</h3>
      <pre><code>{`Review these tests. What's not covered?
- Empty states
- Boundary conditions
- Concurrent requests
- Permission edge cases

Add tests for any missing cases.`}</code></pre>

      <h3>QA pass before merging</h3>
      <pre><code>{`You're a QA engineer reviewing this PR. The feature is: [spec].

Check:
1. Does the implementation match the spec?
2. Are there error paths that aren't handled?
3. Are there edge cases the tests don't cover?
4. Anything that could break in production that wouldn't break in tests?`}</code></pre>

      <Callout variant="warning" title="Claude sometimes cheats on tests">
        In an autonomous fix loop, Claude may modify a failing test to make it pass rather than
        fix the underlying code. Prevent this explicitly: &ldquo;Fix the code so this test passes.
        Do not modify the test.&rdquo; If Claude keeps failing, interrupt and re-approach rather than
        letting it try variations.
      </Callout>

      <hr />

      <h2 id="prompt-engineering">The Prompt Engineering Layer</h2>
      <p>
        Prompt engineering isn&apos;t a phase — it&apos;s the skill that makes every phase work better.
        It&apos;s not about magic words. It&apos;s about structured thinking.
      </p>

      <h3>Constraints beat goals</h3>
      <p>
        Describe the constraints, not just the outcome. Claude fills in unspecified space with
        reasonable defaults — which are often wrong for your situation.
      </p>
      <Comparison
        weak={`Add pagination to the users list.`}
        strong={`Add cursor-based pagination to GET /users. Return next_cursor and prev_cursor. Max page size 50. Follow the pattern in GET /posts. Don't modify the database schema.`}
      />

      <h3>Say what not to do</h3>
      <p>
        Negative constraints are underused and extremely effective:
      </p>
      <ul>
        <li>&ldquo;Don&apos;t install new packages — use what&apos;s in package.json&rdquo;</li>
        <li>&ldquo;Don&apos;t refactor existing functions — only add new ones&rdquo;</li>
        <li>&ldquo;Don&apos;t modify the test files — only change the implementation&rdquo;</li>
        <li>&ldquo;Don&apos;t add a database migration — work with the existing schema&rdquo;</li>
      </ul>

      <h3>Iterate, don&apos;t overspecify upfront</h3>
      <p>
        You don&apos;t need the perfect prompt before Claude sees the problem. A good prompt gets
        you 80% there. A targeted follow-up gets you the rest. This is faster than trying to
        anticipate everything before you see what Claude produces.
      </p>

      <h3>Know when to rewind</h3>
      <p>
        Double-press <kbd>Esc</kbd> to rewind the last exchange — Claude&apos;s response and any
        tool calls are popped from context. When Claude heads in the wrong direction, don&apos;t try
        to correct forward. Rewind and re-prompt with better constraints.
      </p>

      <h3>Use /clear aggressively</h3>
      <p>
        A focused session with the right context outperforms a long session with all the history.
        When you switch tasks, when quality starts degrading, when something went wrong —
        <code>/clear</code> and start fresh. The cost is re-stating context. The benefit is
        Claude that&apos;s actually paying attention.
      </p>

      <Callout variant="key" title="The meta-skill">
        Good prompt engineers don&apos;t just know how to phrase things — they know what to ask for,
        when to ask for it, and when to stop and think before asking at all. The workflow above
        is really just structured thinking made executable. Claude handles the execution.
        Your job is the thinking.
      </Callout>
    </ContentLayout>
  );
}
