import { ContentLayout } from "@/components/content-layout";
import { Callout } from "@/components/callout";
import { AgentRoomDiagram } from "@/components/agent-room-diagram";

const sections = [
  { id: "the-concept", title: "The Concept" },
  { id: "the-agents", title: "The Agents" },
  { id: "slash-commands", title: "Setting Up with Slash Commands" },
  { id: "critical-agent", title: "The Critical Agent" },
  { id: "user-agent", title: "The User Agent" },
  { id: "designer-agent", title: "The Designer Agent" },
  { id: "architect-agent", title: "The Architect Agent" },
  { id: "pm-agent", title: "The PM Agent" },
  { id: "synthesis", title: "The Synthesis Pass" },
  { id: "walkthrough", title: "Example Walkthrough" },
];

export const metadata = {
  title: "The Agent Room — Claude Code Playbook",
};

export default function AgentRoom() {
  return (
    <ContentLayout
      title="The Agent Room"
      description="Before you build anything, bring a room full of specialists into the conversation. A critical agent that finds holes. A user agent that simulates confusion. A designer, an architect, a PM. Each one a Claude session with a specific role, asking the question their discipline demands."
      sections={sections}
      prev={{ href: "/memory-and-context", label: "Memory & Context" }}
      next={{ href: "/user-stories", label: "User Stories" }}
    >
      <h2 id="the-concept">The Concept</h2>
      <p>
        Most people use Claude as one thing: a smart assistant that does what you ask. The
        agent room flips that. Instead of one Claude doing everything, you spin up multiple
        Claude sessions — each with a specific role, a specific lens, and a specific mandate
        to challenge your thinking.
      </p>
      <p>
        A room might have: a critical agent who finds holes, a user agent who simulates how
        a non-technical person would experience the feature, a designer who thinks UX-first,
        an architect who starts with data not UI, and a PM who asks whether the feature
        needs to exist at all.
      </p>
      <p>
        You run them before you build. Their job is to surface everything that would have
        become a problem mid-sprint, a bug at launch, or a post-mortem conversation.
      </p>

      <AgentRoomDiagram />

      <Callout variant="key" title="Why this works">
        A single Claude session tries to be helpful — it leans toward yes, toward completion,
        toward agreement. Specialized agents with explicit mandates to challenge, question,
        and find failure modes don&apos;t have that bias. They&apos;re scoped to be useful in a
        different way.
      </Callout>

      <hr />

      <h2 id="the-agents">The Agents</h2>
      <p>
        You don&apos;t need all of these for every feature. Pick the ones whose questions you&apos;d
        otherwise skip.
      </p>

      <table>
        <thead>
          <tr>
            <th>Agent</th>
            <th>Mandate</th>
            <th>Key question</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Critic</strong></td>
            <td>Find every hole, assumption, and failure mode</td>
            <td>&ldquo;What goes wrong here?&rdquo;</td>
          </tr>
          <tr>
            <td><strong>User</strong></td>
            <td>Simulate a real, non-technical user experiencing this</td>
            <td>&ldquo;What&apos;s confusing, frustrating, or missing?&rdquo;</td>
          </tr>
          <tr>
            <td><strong>Designer</strong></td>
            <td>UX-first thinking: flows, edge states, component decisions</td>
            <td>&ldquo;What does every state of this UI look like?&rdquo;</td>
          </tr>
          <tr>
            <td><strong>Architect</strong></td>
            <td>System design, data model, scalability, tech debt</td>
            <td>&ldquo;How does this fit into what already exists?&rdquo;</td>
          </tr>
          <tr>
            <td><strong>PM</strong></td>
            <td>Scope discipline, prioritization, MVP thinking</td>
            <td>&ldquo;What&apos;s the smallest version that proves this works?&rdquo;</td>
          </tr>
          <tr>
            <td><strong>DB</strong></td>
            <td>Data model, schema design, migrations, query patterns</td>
            <td>&ldquo;What does the data look like and how does it change?&rdquo;</td>
          </tr>
          <tr>
            <td><strong>Security</strong></td>
            <td>Attack surface, auth edge cases, data exposure</td>
            <td>&ldquo;How could this be exploited?&rdquo;</td>
          </tr>
          <tr>
            <td><strong>Docs</strong></td>
            <td>Records decisions, rationale, architecture choices in real time</td>
            <td>&ldquo;What do future engineers need to know about this?&rdquo;</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h2 id="slash-commands">Setting Up with Slash Commands</h2>
      <p>
        Each agent is a <code>.claude/commands/</code> file. The filename becomes the
        slash command. Invoke it at the start of a session to prime Claude into that role.
      </p>

      <pre><code>{`.claude/commands/
├── critic.md
├── user-test.md
├── designer.md
├── architect.md
├── pm.md
├── db.md
└── security.md`}</code></pre>

      <p>
        You can run multiple agents in the same session (invoke them sequentially) or spin
        up separate Claude Code sessions in separate git worktrees for full isolation.
      </p>

      <Callout variant="tip" title="Worktrees for parallel agents">
        For a major feature, create a worktree per agent:
        <code>git worktree add ../project-critic review/critic</code>.
        Each agent works from the same codebase but in its own branch — outputs don&apos;t
        collide and you can review each agent&apos;s findings independently.
      </Callout>

      <hr />

      <h2 id="critical-agent">The Critical Agent</h2>
      <p>
        The most important agent in the room. Its only job is to find what&apos;s wrong — with the
        spec, the approach, the assumptions, the edge cases. It doesn&apos;t build anything. It
        finds holes.
      </p>
      <p>
        Always run this one. If you only run one agent, run the critic.
      </p>

      <pre><code>{`# .claude/commands/critic.md

You are a senior engineer and product thinker. Your job is to find problems
— not to be helpful in the traditional sense. You are constructively critical.

When I describe a feature, spec, or plan:
1. Identify the top 3 assumptions being made that could be wrong
2. List every failure mode you can think of (technical, UX, business)
3. Find the edge cases that aren't handled
4. Challenge the scope: what's over-engineered? What's under-specified?
5. Ask the question the team hasn't thought to ask yet

Be direct. Don't soften feedback. A problem you miss here becomes a bug in production.`}</code></pre>

      <h3>How to use it</h3>
      <pre><code>{`/critic

Here's what I'm building:
[paste your spec]

What's wrong with this?`}</code></pre>

      <Callout variant="warning" title="Don't skip this because it's uncomfortable">
        The critic will find real problems. Some of them will mean the spec needs to change,
        the scope needs to shrink, or the approach needs to change entirely. That&apos;s the point.
        Finding this before a sprint starts is free. Finding it after costs a sprint.
      </Callout>

      <hr />

      <h2 id="user-agent">The User Agent</h2>
      <p>
        The user agent simulates how a real person — not you, not your team — would experience
        the feature. It thinks about confusion, friction, missing affordances, and what happens
        when someone does something you didn&apos;t expect.
      </p>

      <pre><code>{`# .claude/commands/user-test.md

You are a non-technical user of this product. You're reasonably smart but
you don't read docs, you don't know our internal terminology, and you have
no patience for unclear UI.

When I describe a feature or show you a flow:
1. Walk through it as a first-time user — what do you click first?
2. Where do you get confused or stuck?
3. What do you expect to happen that doesn't?
4. What error states would frustrate you?
5. What's missing that would make this feel complete?

Think out loud as you go. Be the user, not the engineer.`}</code></pre>

      <h3>Walk the happy path, then break it</h3>
      <pre><code>{`/user-test

Here's the feature flow I'm designing:
[describe the UI/UX flow in plain language]

Walk through this as a first-time user. Then tell me where it breaks.`}</code></pre>

      <hr />

      <h2 id="designer-agent">The Designer Agent</h2>
      <p>
        The designer agent thinks in components, states, and flows — before any code is written.
        It asks about every state the UI can be in, not just the happy path. Empty states,
        loading states, error states, edge cases in the layout.
      </p>

      <pre><code>{`# .claude/commands/designer.md

You are an expert product designer with strong engineering intuition.
You think UX-first but you understand what's hard to build.

When I describe a feature:
1. Map every state this UI needs to handle:
   - Loading / skeleton
   - Empty state (no data)
   - Populated state
   - Error state
   - Edge cases (long strings, many items, missing data)
2. Identify the primary action and make sure it's obvious
3. Note anything that will cause layout or responsive issues
4. Flag any component decisions that will create tech debt
5. Suggest the simplest UI that still solves the problem

Wireframe in words if helpful. Be specific about component choices.`}</code></pre>

      <hr />

      <h2 id="architect-agent">The Architect Agent</h2>
      <p>
        The architect starts with data, not UI. Before any component is built, it asks:
        what does the data look like? How does it move? Where does this fit in what already exists?
        What will this decision cost in 6 months?
      </p>

      <pre><code>{`# .claude/commands/architect.md

You are a senior software architect. You think in systems, not features.

When I describe a feature or show you existing code:
1. Start with the data model — what does it look like and how does it change?
2. Map the system boundaries — what talks to what?
3. Identify the decision with the highest long-term cost
4. Flag anything that doesn't fit the existing architecture
5. Propose the simplest design that scales to 10x the current load
6. Note what you'd do differently if building from scratch vs. fitting into what exists

Don't write code. Sketch the architecture in plain language and diagrams
(ASCII is fine). Ask clarifying questions if the boundaries aren't clear.`}</code></pre>

      <hr />

      <h2 id="pm-agent">The PM Agent</h2>
      <p>
        The PM agent is the scope enforcer. Its job is to ask whether each piece of the feature
        needs to exist, what the smallest version looks like, and what can wait for a later sprint.
      </p>

      <pre><code>{`# .claude/commands/pm.md

You are a product manager who cares deeply about scope discipline and
shipping things that actually matter to users.

When I describe a feature or backlog:
1. Identify the MVP — what's the absolute minimum that proves this idea works?
2. Separate must-have from nice-to-have from should-never-build
3. Challenge every requirement: what happens if we skip this?
4. Flag scope creep: things that have grown beyond the original intent
5. Ask: who specifically asked for this, and what did they actually say?
6. Propose a phased rollout if the full feature is too large for one sprint

Be opinionated. Your job is to protect the sprint from the team's good intentions.`}</code></pre>

      <hr />

      <h2 id="synthesis">The Synthesis Pass</h2>
      <p>
        After the agents have run, you&apos;ll have a collection of feedback — some of it conflicting.
        The critic found problems the designer thinks are acceptable tradeoffs. The architect wants
        to refactor; the PM says there&apos;s no time. The synthesis pass is where you reconcile this.
      </p>

      <pre><code>{`Here's the feedback from the agent room on [feature]:

CRITIC: [paste critic output]
USER: [paste user agent output]
DESIGNER: [paste designer output]
ARCHITECT: [paste architect output]
PM: [paste pm output]

Synthesize this into:
1. Blockers — things that must change before building starts
2. Decisions — open questions that need an answer
3. Deferred — valid concerns that can be addressed in a follow-up sprint
4. Dismissed — feedback that doesn't apply given our constraints

Output as a revised spec I can paste into Jira.`}</code></pre>

      <Callout variant="key" title="The synthesis is where you make decisions">
        The agents surface options and tradeoffs. You make the calls. The synthesis pass isn&apos;t
        Claude deciding what to build — it&apos;s Claude organizing the feedback so you can decide
        faster and with more information than you&apos;d have had otherwise.
      </Callout>

      <hr />

      <h2 id="walkthrough">Example Walkthrough</h2>
      <p>
        Feature request: &ldquo;Add a CSV export to the reports page.&rdquo;
      </p>

      <h3>Step 1 — Spec it (2 min)</h3>
      <pre><code>{`Feature: CSV export for reports
Who: Admin users reviewing monthly metrics
What: Download current report view as CSV
Done when: file downloads in browser, includes all visible columns,
           reflects current filters, works for reports up to 50k rows
Out of scope: scheduled exports, email delivery, custom column selection`}</code></pre>

      <h3>Step 2 — Run the critic</h3>
      <pre><code>{`/critic
[paste spec]`}</code></pre>
      <p>
        Critic finds: no handling for reports over 50k rows (what error?), no loading state
        for large exports, no filename convention specified, what happens if filters produce
        zero results?
      </p>

      <h3>Step 3 — Run the user agent</h3>
      <pre><code>{`/user-test
I click "Export CSV" on the reports page. Walk through what I expect.`}</code></pre>
      <p>
        User agent: expects immediate feedback that download started, confused if nothing
        happens for 3+ seconds, doesn&apos;t know what &ldquo;processing&rdquo; means, expects filename to
        reflect the report name and date.
      </p>

      <h3>Step 4 — Run the architect</h3>
      <pre><code>{`/architect
CSV export hitting our reports table. Up to 50k rows. What's the right approach?`}</code></pre>
      <p>
        Architect: streaming response, not blocking, generate on the server, don&apos;t load all
        rows into memory at once. Flag: current ORM doesn&apos;t support streaming cursors —
        needs raw query.
      </p>

      <h3>Step 5 — Synthesize</h3>
      <p>
        Blockers: streaming architecture (architect), loading state (user + critic).
        Decisions: filename convention, zero-result behavior.
        Deferred: scheduled exports (already out of scope), custom columns (PM agrees).
      </p>

      <p>
        Result: revised spec, one architectural decision made, two acceptance criteria added,
        zero surprises in the sprint. The whole room took 20 minutes.
      </p>

      <Callout variant="tip" title="The room replaces the planning meeting">
        Most of what a planning meeting does — finding edge cases, challenging scope, aligning
        on approach — the agent room does faster and with more depth. Use the planning meeting
        to make decisions, not to discover problems.
      </Callout>
    </ContentLayout>
  );
}
