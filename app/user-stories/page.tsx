import { ContentLayout } from "@/components/content-layout";
import { Callout } from "@/components/callout";
import { Comparison } from "@/components/comparison";

const sections = [
  { id: "the-problem", title: "The Problem with AI-Generated Tickets" },
  { id: "spec-first", title: "Spec First, Story Second" },
  { id: "anatomy", title: "Anatomy of a Good Story Prompt" },
  { id: "before-after", title: "Before & After Examples" },
  { id: "epic-breakdown", title: "Epic → Story Breakdown" },
  { id: "acceptance-criteria", title: "Acceptance Criteria & Edge Cases" },
  { id: "review-pass", title: "The Review Pass" },
  { id: "slash-command", title: "Turn It Into a Slash Command" },
];

export const metadata = {
  title: "Writing User Stories — Claude Code Playbook",
};

export default function UserStories() {
  return (
    <ContentLayout
      title="Writing User Stories & Tickets"
      description="Claude can go from a vague feature request to a well-structured Jira ticket with acceptance criteria, edge cases, and a definition of done — but only if you give it the right input. The spec-first principle applies here just as much as it does to code."
      sections={sections}
      prev={{ href: "/settings-and-shortcuts", label: "Settings & Shortcuts" }}
      next={{ href: "/security", label: "Security" }}
    >
      <h2 id="the-problem">The Problem with AI-Generated Tickets</h2>
      <p>
        Most teams try Claude for ticket writing once, get something generic, and go back to
        writing them manually. The problem isn&apos;t Claude — it&apos;s the input.
      </p>
      <p>
        A vague request produces a vague ticket. &ldquo;Add user authentication&rdquo; gives Claude almost
        nothing to work with: Which auth method? Which user types? What happens on failure? What&apos;s
        out of scope? Without answers to those questions, Claude fills in the blanks with reasonable
        guesses — and reasonable guesses aren&apos;t the same as your actual requirements.
      </p>

      <Callout variant="key" title="The rule">
        Claude writes tickets at the quality level of the brief you give it. Garbage in, garbage
        out — but a structured brief in, production-ready ticket out.
      </Callout>

      <hr />

      <h2 id="spec-first">Spec First, Story Second</h2>
      <p>
        Before asking Claude to write a story, write a brief that answers the five questions a
        good story always answers:
      </p>

      <ol>
        <li><strong>Who</strong> is this for? (user role, persona, or system actor)</li>
        <li><strong>What</strong> do they need to do? (the action, not the implementation)</li>
        <li><strong>Why</strong> does it matter? (the business value or user outcome)</li>
        <li><strong>What does done look like?</strong> (observable, testable outcomes)</li>
        <li><strong>What&apos;s out of scope?</strong> (explicitly named, not implied)</li>
      </ol>

      <p>
        This takes two minutes. It saves the sprint planning argument about what the ticket
        actually means, the mid-sprint &ldquo;wait, what about X?&rdquo; conversation, and the post-sprint
        &ldquo;we built the wrong thing&rdquo; retro.
      </p>

      <Callout variant="tip" title="The out-of-scope field is the most important">
        Teams almost always skip it. When Claude doesn&apos;t know what&apos;s out of scope, it writes
        acceptance criteria that silently include things you didn&apos;t intend to build. Naming
        what a ticket doesn&apos;t cover is what keeps scope creep out of the sprint.
      </Callout>

      <hr />

      <h2 id="anatomy">Anatomy of a Good Story Prompt</h2>
      <p>
        Here&apos;s the prompt template that produces consistently good output:
      </p>

      <pre><code>{`Write a user story for our Jira backlog.

Context:
- Product: [what your product is in one sentence]
- User role: [who this is for]
- Current state: [what exists today / what the problem is]

Story brief:
- Goal: [what the user needs to accomplish]
- Why it matters: [business value or user pain point]
- Key constraints: [technical, design, or business constraints]
- Out of scope: [explicitly what this ticket does NOT include]

Format:
- User story (As a / I want / So that)
- Acceptance criteria (Given / When / Then, numbered)
- Edge cases to handle
- Definition of done
- Story point estimate with reasoning`}</code></pre>

      <p>
        You don&apos;t need all fields every time — but the more you fill in, the less Claude has to
        guess. Story brief + out of scope + format instruction is the minimum that reliably produces
        a usable ticket.
      </p>

      <hr />

      <h2 id="before-after">Before & After Examples</h2>

      <h3>Authentication</h3>
      <Comparison
        weak={`Write a user story for adding login to our app.`}
        strong={`User story for: email/password login for existing customers. Out of scope: SSO, social login, new account creation (separate ticket). Done when: user can log in, sees dashboard, stays logged in across browser sessions, gets clear error on wrong credentials.`}
      />

      <h3>Search feature</h3>
      <Comparison
        weak={`User story for search functionality.`}
        strong={`User story for: keyword search across open tickets for support agents. Must work on title and description fields. Out of scope: full-text body search, saved searches, search analytics. Done when: results appear under 500ms, empty state handled, works on mobile.`}
      />

      <h3>Notification</h3>
      <Comparison
        weak={`Add email notifications when a ticket is updated.`}
        strong={`Story for: email notification to ticket assignee when status changes to "In Review". Only trigger on status change (not every edit). Out of scope: notification preferences, unsubscribe, other status changes. Done when: email sends within 60s of status change, includes ticket title, link, and who changed it.`}
      />

      <hr />

      <h2 id="epic-breakdown">Epic → Story Breakdown</h2>
      <p>
        One of Claude&apos;s highest-value moves in sprint planning: give it an epic and ask for a
        story breakdown. It&apos;s faster than a planning session and surfaces scope questions you
        hadn&apos;t thought of.
      </p>

      <pre><code>{`Break this epic into user stories for our sprint backlog.

Epic: [title and one-paragraph description]
Team context: [frontend/backend split, any technical constraints]
Sprint capacity: [approximate — e.g., "3 engineers, 2-week sprint"]

For each story:
- Keep it independently shippable if possible
- Flag dependencies between stories
- Note anything that needs a spike or clarification before sizing
- Rough size: S / M / L

Out of scope for this epic: [what's definitely not included]`}</code></pre>

      <Callout variant="tip" title="Use the output as a starting point, not a final answer">
        Claude&apos;s breakdown will miss things only your team knows — internal conventions, tech debt
        constraints, stakeholder quirks. Treat it as a first draft for the planning conversation,
        not a replacement for it. The value is that you&apos;re reacting to a concrete proposal
        instead of starting from a blank whiteboard.
      </Callout>

      <hr />

      <h2 id="acceptance-criteria">Acceptance Criteria & Edge Cases</h2>
      <p>
        After generating a story, run a second pass specifically for edge cases. Claude&apos;s first
        pass covers the happy path reliably. The second pass is where the real value is.
      </p>

      <pre><code>{`Review these acceptance criteria for the story above.

Check for:
- What happens when the user has no data / empty state
- Error states (network failure, invalid input, timeout)
- Permission edge cases (wrong role, expired session)
- Concurrent actions (two users editing the same record)
- Mobile / accessibility considerations

Add any missing Given/When/Then criteria.`}</code></pre>

      <p>
        This is the same &ldquo;ask Claude to review its own output&rdquo; pattern from the Testing guide —
        it catches things the initial pass missed because it approaches the problem from
        a different angle.
      </p>

      <Callout variant="warning" title="Empty states and error states are always missing">
        In every first-pass ticket, the acceptance criteria covers what happens when everything
        works. The second pass always adds: what does the user see when there&apos;s no data? What
        happens if the API call fails? These are the tickets that become bugs if you skip them.
      </Callout>

      <hr />

      <h2 id="review-pass">The Review Pass</h2>
      <p>
        Before a ticket goes into the sprint, run it through a INVEST check. Claude can do this
        for you:
      </p>

      <pre><code>{`Review this user story against INVEST criteria:
- Independent: can it be built and shipped without depending on another in-progress ticket?
- Negotiable: is the implementation flexible, or is it over-specified?
- Valuable: is the user value clear?
- Estimable: does the team have enough information to size it?
- Small: can it be completed in one sprint?
- Testable: can QA verify it's done?

Flag any criteria it fails and suggest how to fix it.`}</code></pre>

      <p>
        A story that fails INVEST usually needs to be split, scoped down, or sent back for
        clarification before it enters the sprint. Catching this before planning saves the
        mid-sprint unblocking conversation.
      </p>

      <hr />

      <h2 id="slash-command">Turn It Into a Slash Command</h2>
      <p>
        Once you have a story prompt template your team likes, commit it as a custom slash command.
        Anyone on the team can invoke <code>/story</code> and get consistent output without
        remembering the full prompt structure.
      </p>

      <pre><code>{`# .claude/commands/story.md

Write a user story for our Jira backlog using the format below.
Ask me for any missing information before generating.

Required inputs:
- User role
- What they need to do
- Why it matters
- What's out of scope

Output format:
- User story (As a / I want / So that)
- Acceptance criteria (Given / When / Then, numbered)
- Edge cases (empty state, error state, permission edge cases)
- Definition of done
- Story point estimate (Fibonacci) with one-sentence reasoning`}</code></pre>

      <Callout variant="key" title="The ask-first instruction matters">
        The line &ldquo;Ask me for any missing information before generating&rdquo; prevents Claude from
        filling in blanks with guesses. Without it, Claude will write a complete-looking story
        that contains assumptions you never made. With it, Claude surfaces the gaps before
        producing output.
      </Callout>
    </ContentLayout>
  );
}
