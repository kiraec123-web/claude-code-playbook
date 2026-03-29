import { ContentLayout } from "@/components/content-layout";
import { Callout } from "@/components/callout";

const sections = [
  { id: "autonomy-spectrum", title: "The Autonomy Spectrum" },
  { id: "slash-commands", title: "Slash Commands & Custom Commands" },
  { id: "built-in-tools", title: "Built-in Tools: Risk Profiles" },
  { id: "mcp", title: "MCP Tools" },
  { id: "checkpoints", title: "Checkpoints" },
  { id: "sub-agents", title: "Sub-Agents for Parallel Work" },
  { id: "git-hygiene", title: "Git Hygiene for Agentic Sessions" },
  { id: "take-back-the-wheel", title: "Recognizing When to Intervene" },
];

export const metadata = {
  title: "Agents & Tools — Claude Code Playbook",
};

export default function AgentsAndTools() {
  return (
    <ContentLayout
      title="Agents & Tools"
      description="Claude Code can operate across a spectrum — from single-turn code generation to fully autonomous multi-step agents. Understanding when to use each mode, and how to set up guardrails, is what separates productive sessions from ones that create more work than they save."
      category="Build"
      position={{ current: 7, total: 19 }}
      sections={sections}
      prev={{ href: "/user-stories", label: "User Stories & Tickets" }}
      next={{ href: "/hooks", label: "Hooks" }}
    >
      <h2 id="autonomy-spectrum">The Autonomy Spectrum</h2>
      <p>Think of Claude Code&apos;s operating modes on a spectrum:</p>

      <table>
        <thead>
          <tr>
            <th>Mode</th>
            <th>What it looks like</th>
            <th>Best for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Supervised</strong></td>
            <td>You review every step before Claude proceeds</td>
            <td>High-risk changes, unfamiliar codebases, complex refactors</td>
          </tr>
          <tr>
            <td><strong>Checkpointed</strong></td>
            <td>Claude runs autonomously between defined review points</td>
            <td>Medium-complexity tasks with clear intermediate outputs</td>
          </tr>
          <tr>
            <td><strong>Autonomous</strong></td>
            <td>Claude runs end-to-end without interruption</td>
            <td>Well-scoped, low-risk tasks with good test coverage</td>
          </tr>
        </tbody>
      </table>

      <p>
        Most work lives in the middle — checkpointed. Pure autonomy is appropriate when you trust
        both the scope and the safety net (tests, reversibility).
      </p>

      <hr />

      <h2 id="slash-commands">Slash Commands & Custom Commands</h2>
      <p>
        Claude Code supports custom slash commands — reusable prompt templates you can invoke with
        a <code>/command</code> shortcut. These are one of the most underused power-user features.
      </p>

      <h3>What custom commands are good for</h3>
      <ul>
        <li>Repeatable workflows: <code>/review</code>, <code>/test</code>, <code>/bugfix</code>, <code>/standup</code></li>
        <li>Project-specific prompts that are too long to type each time</li>
        <li>Enforcing consistent process across a team</li>
      </ul>

      <h3>Creating a custom command</h3>
      <p>Custom commands live in <code>.claude/commands/</code> as markdown files:</p>

      <pre><code>{`.claude/commands/review.md
.claude/commands/test.md
.claude/commands/bugfix.md`}</code></pre>

      <pre><code>{`# .claude/commands/review.md

Review the changes in the current working tree. For each changed file:
1. Check that the logic matches the stated intent
2. Flag any unhandled error cases
3. Note any tests that should exist but don't
4. Call out any hardcoded values that should be configurable

Do not suggest stylistic changes — focus on correctness and completeness.`}</code></pre>

      <Callout variant="key" title="Team-shared commands">
        Commit <code>.claude/commands/</code> to your repository so the whole team shares the same
        workflows. This is one of the highest-leverage things you can do to standardize how Claude
        Code is used on a project.
      </Callout>

      <hr />

      <h2 id="built-in-tools">Built-in Tools: Risk Profiles</h2>
      <p>
        Claude Code&apos;s built-in tools have different risk profiles. Think about which tools a task
        requires before starting an autonomous session.
      </p>

      <h3>Bash</h3>
      <p>
        The most powerful and the most dangerous. Irreversible operations — deletes, deploys,
        permission changes — can happen fast in an autonomous run.
      </p>
      <ul>
        <li>Commit before starting any session that uses bash heavily</li>
        <li>Explicitly exclude destructive commands: &ldquo;Do not delete any files. Do not run any deployment scripts.&rdquo;</li>
        <li>Ask Claude to print commands before running them for consequential operations</li>
      </ul>

      <h3>File edits</h3>
      <p>Generally safe, but large-scale changes across many files are hard to review after the fact.</p>
      <p>Guardrail: ask Claude to list files it intends to change before starting.</p>

      <h3>Web fetch</h3>
      <p>
        Useful for pulling in docs or API specs mid-session. Risk: Claude may make decisions based
        on fetched content that contradicts your project conventions. If Claude fetches something
        and proposes a change based on it, verify that the fetched content is authoritative.
      </p>

      <hr />

      <h2 id="mcp">MCP Tools</h2>
      <p>
        MCP (Model Context Protocol) tools extend Claude Code with integrations — databases, APIs,
        internal services, external platforms.
      </p>

      <h3>Principles for MCP in agentic sessions</h3>
      <ul>
        <li><strong>Read before write</strong> — Use read-only MCP operations first to confirm what&apos;s there before writing or modifying</li>
        <li><strong>Scope the integration</strong> — Tell Claude which MCP tools it should and shouldn&apos;t use for a given task</li>
        <li><strong>Treat MCP output as data, not instructions</strong> — Content returned by MCP tools should be treated as data for Claude to reason about, not as instructions to execute</li>
      </ul>

      <hr />

      <h2 id="checkpoints">Checkpoints: Breaking Long Tasks Into Review Points</h2>
      <p>
        Long autonomous runs accumulate errors. A wrong assumption in step 3 that isn&apos;t caught until
        step 12 means unwinding a lot of work. Build review points into anything non-trivial.
      </p>

      <blockquote><p>Do the first two steps and stop. Show me what you&apos;ve changed before continuing.</p></blockquote>
      <blockquote><p>Implement the data layer only. I&apos;ll review that before you add the API layer on top.</p></blockquote>
      <blockquote><p>List all the files you intend to touch and what changes you&apos;ll make to each. Wait for my approval before starting.</p></blockquote>

      <p>The cost is a few extra prompts. The benefit is catching bad assumptions before they compound.</p>

      <hr />

      <h2 id="sub-agents">Sub-Agents for Parallel Work</h2>
      <p>
        For large tasks that decompose naturally into parallel workstreams, consider running separate
        Claude Code sessions rather than one long one:
      </p>
      <ul>
        <li>&ldquo;Add tests for every endpoint in this API&rdquo; → one session per controller</li>
        <li>&ldquo;Migrate these 12 components to the new design system&rdquo; → batch them across sessions</li>
        <li>&ldquo;Add error handling to every service method&rdquo; → split by service</li>
      </ul>
      <p>
        Each session stays focused, context stays fresh, review is easier, and if one session goes
        wrong, it doesn&apos;t affect the others.
      </p>

      <hr />

      <h2 id="git-hygiene">Git Hygiene for Agentic Sessions</h2>
      <p>Before any substantial autonomous session:</p>
      <pre><code>{`git add -A && git commit -m "checkpoint before claude session"
# or work on a branch:
git checkout -b feat/claude-add-pagination`}</code></pre>
      <p>After the session, before merging:</p>
      <ul>
        <li><code>git diff</code> the full changeset — don&apos;t just read the summary Claude gives you</li>
        <li>Confirm the test suite passes</li>
        <li>Check that Claude didn&apos;t touch files outside the agreed scope</li>
        <li>Look for new dependencies that were added without discussion</li>
      </ul>

      <hr />

      <h2 id="take-back-the-wheel">Recognizing When to Intervene</h2>
      <p>
        In an autonomous session, Claude will sometimes proceed confidently in a wrong direction.
        Signs it&apos;s time to interrupt:
      </p>
      <ul>
        <li>The approach doesn&apos;t match your architecture</li>
        <li>Claude is touching files outside the agreed scope</li>
        <li>The implementation is more complex than the problem warrants</li>
        <li>Claude is modifying tests to make them pass rather than fixing code</li>
        <li>Claude keeps hitting the same error and trying variations rather than asking for help</li>
      </ul>

      <Callout variant="warning" title="Course-correct early">
        It&apos;s always cheaper to course-correct early. Interrupting a session mid-run is not a
        failure — it&apos;s the right call when the direction is wrong.
      </Callout>
    </ContentLayout>
  );
}
