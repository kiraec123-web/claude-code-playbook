import { ContentLayout } from "@/components/content-layout";
import { Callout } from "@/components/callout";

const sections = [
  { id: "three-layers", title: "The Three Layers of Context" },
  { id: "amnesia", title: "Designing for Amnesia" },
  { id: "session", title: "Session Management" },
  { id: "context-window", title: "Context Window Management" },
  { id: "decisions", title: "Documenting Decisions" },
];

export const metadata = {
  title: "Memory & Context — Claude Code Playbook",
};

export default function MemoryAndContext() {
  return (
    <ContentLayout
      title="Memory & Context"
      description="Claude Code has no persistent memory between sessions outside of what you explicitly provide. Understanding where context lives — and where it doesn't — is foundational to working effectively."
      category="Foundation"
      position={{ current: 4, total: 19 }}
      sections={sections}
      prev={{ href: "/prompting", label: "Prompting Patterns" }}
      next={{ href: "/agent-room", label: "The Agent Room" }}
    >
      <h2 id="three-layers">The Three Layers of Context</h2>

      <table>
        <thead>
          <tr>
            <th>Layer</th>
            <th>What it is</th>
            <th>How to manage it</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Project memory</strong></td>
            <td><code>CLAUDE.md</code> and referenced docs</td>
            <td>Keep updated; review periodically</td>
          </tr>
          <tr>
            <td><strong>Session context</strong></td>
            <td>Everything in the current conversation</td>
            <td>Re-prime when switching tasks; start fresh when stale</td>
          </tr>
          <tr>
            <td><strong>Tool memory</strong></td>
            <td>Results from bash runs, file reads, etc.</td>
            <td>Use explicitly; don&apos;t assume Claude retains them across turns</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h2 id="amnesia">Designing for Amnesia</h2>
      <p>
        The most important mental shift: Claude starts every session knowing nothing about your
        project except what&apos;s in <code>CLAUDE.md</code> and whatever you say in the conversation.
        Build your workflow with this assumption baked in.
      </p>

      <p>Practically, this means:</p>
      <ul>
        <li>
          <strong>Decisions that matter go in files</strong>, not just conversation. If Claude helps
          you make an architectural call, document it — in a comment, an ADR, or CLAUDE.md.
        </li>
        <li>
          <strong>Prefer self-documenting code</strong> so Claude can re-orient quickly by reading it.
        </li>
        <li>
          <strong>CLAUDE.md captures what isn&apos;t obvious from the code</strong> — the &ldquo;why&rdquo; behind
          unusual patterns, the things that look wrong but aren&apos;t.
        </li>
      </ul>

      <hr />

      <h2 id="session">Session Management</h2>

      <h3>Re-prime when switching tasks</h3>
      <p>
        When you shift from one task to another in a long session, briefly re-orient Claude:
      </p>
      <blockquote>
        <p>We&apos;ve been working on the auth flow. Now I want to switch to the billing module.
        Relevant files are in <code>/billing</code>. The pattern to follow is in{" "}
        <code>subscriptions.ts</code>.</p>
      </blockquote>
      <p>
        Without this, Claude may carry incorrect assumptions from the previous task into the new one.
      </p>

      <h3>Recognize when a session has gone stale</h3>
      <p>Long sessions degrade. Signs a session has gone stale:</p>
      <ul>
        <li>Claude starts contradicting decisions made earlier in the session</li>
        <li>Responses feel generic rather than project-specific</li>
        <li>Claude re-asks questions you already answered</li>
        <li>Code stops following the conventions it was following earlier</li>
      </ul>

      <Callout variant="warning" title="When sessions go stale">
        When you notice this, start a new session. Don&apos;t try to correct it by adding more context
        — you&apos;re fighting a losing battle. A focused session with the right context outperforms a
        stale session that has all the history.
      </Callout>

      <h3>When to start a new session</h3>
      <ul>
        <li>You&apos;re switching to a substantially different area of the codebase</li>
        <li>A session has run long and you notice quality degrading</li>
        <li>Something went wrong and you want a clean slate</li>
        <li>You&apos;re beginning a new, discrete task the next day</li>
      </ul>

      <hr />

      <h2 id="context-window">Context Window Management</h2>

      <h3>The cost of a long context</h3>
      <p>As a session grows, earlier content is compressed or dropped. The practical effects:</p>
      <ul>
        <li>Decisions made early in the session get forgotten</li>
        <li>Claude&apos;s responses become less precise</li>
        <li>Token costs increase without proportional quality gains</li>
      </ul>
      <p>For anything you&apos;ll need across sessions, the answer is always the same: put it in a file.</p>

      <h3>Batching vs. splitting tasks</h3>
      <p>
        <strong>Batch</strong> related changes into a single session when they&apos;re tightly coupled
        and you need Claude to hold both in mind simultaneously (e.g., adding a new service and its
        corresponding tests).
      </p>
      <p>
        <strong>Split</strong> into separate sessions when tasks are independent, when one task is
        complete and the next is substantially different, or when you want a fresh perspective on a
        new problem.
      </p>

      <h3>Managing context on large codebases</h3>
      <p>
        Don&apos;t paste entire large files into the conversation if Claude can read them directly.
        When referencing files, be specific about which sections matter:
      </p>
      <blockquote>
        <p>Look at the <code>withdraw</code> method in <code>services/accounts.ts</code> — specifically
        the balance check logic around line 45.</p>
      </blockquote>

      <hr />

      <h2 id="decisions">Documenting Decisions</h2>
      <p>
        The conversation where you and Claude worked through a decision doesn&apos;t persist. Make a
        habit of capturing the output:
      </p>
      <ul>
        <li><strong>In code comments</strong> — for decisions that are local to a function or file</li>
        <li><strong>In CLAUDE.md</strong> — for project-wide conventions or patterns that emerged</li>
        <li><strong>In an ADR</strong> — for significant architectural choices</li>
        <li><strong>In a commit message</strong> — for changes where the &ldquo;why&rdquo; matters for future readers</li>
      </ul>
      <p>
        This isn&apos;t just good practice for Claude — it&apos;s good practice period. But it matters more
        when your collaborator starts every session with no memory of the last one.
      </p>
    </ContentLayout>
  );
}
