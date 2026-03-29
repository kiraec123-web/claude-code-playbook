import { ContentLayout } from "@/components/content-layout";
import { Callout } from "@/components/callout";
import { Comparison } from "@/components/comparison";

const sections = [
  { id: "why-worktrees", title: "Why Worktrees Change Everything" },
  { id: "setup", title: "Setup and Basic Workflow" },
  { id: "parallel-sessions", title: "Running Parallel Claude Sessions" },
  { id: "branch-strategy", title: "Branch Strategy for Worktrees" },
  { id: "worktrees-vs-clear", title: "Worktrees vs. /clear: When to Use Each" },
  { id: "claude-md-in-worktrees", title: "CLAUDE.md in Worktrees" },
  { id: "cleanup", title: "Cleanup and Merge Workflow" },
];

export const metadata = {
  title: "Git Worktrees — Claude Code Playbook",
};

export default function GitWorktrees() {
  return (
    <ContentLayout
      title="Git Worktrees"
      description="Git worktrees let you run multiple Claude Code sessions in parallel — each on its own branch, each with a clean context, each making progress simultaneously. It&apos;s one of the highest-leverage workflow patterns for shipping faster."
      category="Build"
      position={{ current: 11, total: 19 }}
      sections={sections}
      prev={{ href: "/settings-and-shortcuts", label: "Settings & Shortcuts" }}
      next={{ href: "/sprint-efficiency", label: "10x Your Sprint" }}
    >
      <h2 id="why-worktrees">Why Worktrees Change Everything</h2>
      <p>
        Without worktrees, you have one Claude session, one thread of work. When a new task comes
        in mid-session, you face a choice: abandon what you&apos;re doing, use <code>/clear</code> and
        lose context, or try to context-switch Claude mid-task and introduce contamination. None
        of these are good.
      </p>
      <p>
        With worktrees, you get multiple Claude sessions running in parallel — each isolated in its
        own directory, on its own branch, with its own context. No switching. No bleed. No waiting.
      </p>
      <p>
        The core insight: Claude&apos;s context is session-scoped. A new terminal in a new directory is
        a new session. Worktrees give you that separation without closing anything, without losing
        your current work, and without duplicating your entire repo.
      </p>
      <p>
        The multiplier effect is real: while Claude is autonomously building feature A in one
        terminal, you can be reviewing, testing, or steering feature B in another. You stop being
        blocked by Claude&apos;s execution time and start being the orchestrator across multiple
        parallel workstreams.
      </p>

      <Callout variant="key" title="What a worktree actually is">
        A worktree is a separate checkout of your repo in a different directory. Each Claude session
        in a worktree has its own context — no bleed between tasks. Your <code>.git</code> history
        is shared, but the working files are isolated.
      </Callout>

      <hr />

      <h2 id="setup">Setup and Basic Workflow</h2>
      <p>
        Git worktrees are built into git — no plugins, no extra tooling. The key command is
        <code>git worktree add</code>.
      </p>

      <h3>Creating a worktree</h3>
      <pre><code>{`# Create a worktree for a new feature branch
git worktree add ../my-project-feature-auth -b feat/auth

# Or attach to an existing branch
git worktree add ../my-project-fix-payment fix/payment-bug`}</code></pre>

      <p>
        This creates a new directory at the specified path with a fresh checkout on that branch.
        Your main repo stays untouched.
      </p>

      <h3>List active worktrees</h3>
      <pre><code>{`git worktree list`}</code></pre>

      <h3>Open Claude Code in the new worktree</h3>
      <pre><code>{`cd ../my-project-feature-auth && claude`}</code></pre>

      <p>
        That&apos;s it. Claude starts fresh in that directory with no memory of your other session.
        You now have two independent Claude sessions running on two independent branches.
      </p>

      <h3>Removing when done</h3>
      <pre><code>{`git worktree remove ../my-project-feature-auth`}</code></pre>

      <Callout variant="tip" title="Naming convention">
        Name your worktree directories consistently: <code>../[project]-[branch-slug]</code>. Makes
        it easy to see at a glance what&apos;s running in each terminal tab — no guessing which window
        is which branch.
      </Callout>

      <hr />

      <h2 id="parallel-sessions">Running Parallel Claude Sessions</h2>
      <p>
        The pattern is simple: 2–3 terminal windows, each in a different worktree, each running
        Claude independently.
      </p>

      <h3>Example scenario</h3>
      <ul>
        <li>
          <strong>Terminal 1</strong> — <code>main</code> branch: fixing a production bug.
          You&apos;re actively reviewing Claude&apos;s output.
        </li>
        <li>
          <strong>Terminal 2</strong> — <code>feat/dashboard</code>: building a new dashboard
          feature. Claude is mid-implementation.
        </li>
        <li>
          <strong>Terminal 3</strong> — <code>feat/api-v2</code>: API refactor running
          autonomously. Claude is working through a large task while you&apos;re elsewhere.
        </li>
      </ul>

      <p>
        Each session has its own CLAUDE.md context, its own file edits, and no interference with
        the others. You can jump between terminals to review progress, give steering instructions,
        unblock Claude when it hits a decision — then let it continue while you move to the next
        window.
      </p>
      <p>
        This is fundamentally different from sequential tasking. You&apos;re not waiting for one thing
        to finish before starting the next. You&apos;re running in parallel and spending your attention
        where it matters most.
      </p>

      <Callout variant="key" title="You become the orchestrator">
        This is the real unlock. You become the orchestrator, moving between sessions rather than
        waiting for one to finish. Your throughput is no longer limited by any single Claude
        session&apos;s execution speed.
      </Callout>

      <hr />

      <h2 id="branch-strategy">Branch Strategy for Worktrees</h2>
      <p>
        Each worktree should be on its own branch — never share a branch between two worktrees.
        Git will prevent it, but it&apos;s worth understanding why: shared branches mean shared working
        state, which defeats the isolation worktrees provide.
      </p>

      <h3>Naming pattern</h3>
      <p>
        Use standard prefixes: <code>feat/</code>, <code>fix/</code>, <code>chore/</code>,
        <code>refactor/</code>. Keep the slug short and descriptive. Examples:
        <code>feat/auth-flow</code>, <code>fix/payment-timeout</code>,
        <code>refactor/db-queries</code>.
      </p>

      <h3>Keep branches short-lived</h3>
      <p>
        Worktrees are optimized for focused, bounded work — not long-running feature branches.
        Each worktree should represent a task you can complete and ship within a few days at most.
        If a branch is growing large, that&apos;s a signal to break the work into smaller pieces, each
        with its own worktree and PR.
      </p>

      <h3>One PR per worktree</h3>
      <p>
        The mental model: each worktree becomes exactly one pull request — small, reviewable,
        focused on a single concern. This makes code review faster, rollback cleaner, and the git
        history easier to understand.
      </p>

      <Callout variant="tip" title="Branch lifespan as a signal">
        Keep worktree branches short-lived. If a branch lives longer than a week, it&apos;s probably
        too big. Break it into smaller pieces, each with its own focused worktree. Short branches
        merge faster, conflict less, and are easier to reason about.
      </Callout>

      <hr />

      <h2 id="worktrees-vs-clear">Worktrees vs. /clear: When to Use Each</h2>
      <p>
        These tools solve different problems. <code>/clear</code> resets context in the same
        directory — same branch, same working state, just a fresh conversation. Worktrees give you
        a separate checkout entirely: different directory, different branch, different session.
      </p>

      <Comparison
        weak="I want to start a new, completely unrelated task and don't need to keep the current work — /clear is fine here. It's fast and keeps you in the same directory."
        strong="I'm mid-task and a new task came in, or I want to run two things in parallel without losing context — use a worktree. You keep both sessions alive and can switch between them."
      />

      <h3>Decision tree</h3>
      <ul>
        <li>
          <strong>Different feature, want to keep current work</strong> → worktree. Don&apos;t lose
          your in-progress session.
        </li>
        <li>
          <strong>Current session is stale or confused, same task</strong> → <code>/clear</code>.
          Fresh context on the same problem.
        </li>
        <li>
          <strong>Want Claude to work autonomously while you do something else</strong> → worktree.
          Let it run in the background.
        </li>
        <li>
          <strong>Testing a risky refactor without losing working state</strong> → worktree. Your
          main branch stays clean and functional.
        </li>
      </ul>

      <hr />

      <h2 id="claude-md-in-worktrees">CLAUDE.md in Worktrees</h2>
      <p>
        CLAUDE.md lives in your repository — which means it&apos;s the same file across all worktrees
        automatically. Every Claude session in every worktree reads the same project conventions,
        the same architectural decisions, the same tooling preferences.
      </p>
      <p>
        This is mostly a feature. But there&apos;s one thing to watch: if your CLAUDE.md has a
        &ldquo;Current focus&rdquo; or &ldquo;Active task&rdquo; section, it will be wrong for your other worktrees.
        A session in <code>feat/auth</code> shouldn&apos;t be reading task context meant for
        <code>fix/payment-bug</code>.
      </p>

      <h3>The pattern that works</h3>
      <p>
        Keep project-wide conventions, architecture decisions, and tooling guidance in CLAUDE.md.
        Set task-specific context in the conversation itself — the first message in a new worktree
        session should tell Claude what this particular branch is trying to accomplish.
      </p>
      <p>
        Don&apos;t update CLAUDE.md from a worktree branch unless the change is a permanent,
        project-wide convention. Task-specific notes don&apos;t belong there — they&apos;ll confuse other
        sessions and clutter the file over time.
      </p>

      <hr />

      <h2 id="cleanup">Cleanup and Merge Workflow</h2>
      <p>
        When you&apos;re done with a worktree, the cleanup flow is straightforward. Do it in this order:
      </p>
      <ol>
        <li>Commit and push your branch from within the worktree directory.</li>
        <li>Open a PR on GitHub from that branch.</li>
        <li>
          Remove the worktree from your main repo:{" "}
          <code>git worktree remove ../my-project-feature-auth</code>
        </li>
        <li>
          After the PR merges, delete the local branch:{" "}
          <code>git branch -d feat/auth</code>
        </li>
      </ol>

      <h3>Pruning stale refs</h3>
      <p>
        If you have worktrees that were removed without the proper command, or references that
        have gone stale, clean them up with:
      </p>
      <pre><code>{`git worktree prune`}</code></pre>

      <h3>Check before removing</h3>
      <p>
        Always verify what&apos;s running before removing a worktree. A quick{" "}
        <code>git worktree list</code> shows all active worktrees and their branches so you don&apos;t
        accidentally remove one that&apos;s still in use.
      </p>

      <Callout variant="warning" title="Use git worktree remove, not rm -rf">
        Don&apos;t delete worktree directories with <code>rm -rf</code> — use{" "}
        <code>git worktree remove</code>. The wrong way leaves git in a confused state with stale
        lock files and dangling references. If you already did it, run{" "}
        <code>git worktree prune</code> to clean up the stale entries.
      </Callout>
    </ContentLayout>
  );
}
