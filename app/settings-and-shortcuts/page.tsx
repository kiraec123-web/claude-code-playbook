import { ContentLayout } from "@/components/content-layout";
import { Callout } from "@/components/callout";

const sections = [
  { id: "settings-hierarchy", title: "Settings Hierarchy" },
  { id: "keyboard-shortcuts", title: "Keyboard Shortcuts" },
  { id: "clear-discipline", title: "/clear Discipline" },
  { id: "effort-keyword", title: "The effort Keyword" },
  { id: "bash-shorthand", title: "! Bash Shorthand" },
  { id: "git-worktrees", title: "Git Worktrees for Parallel Sessions" },
  { id: "power-user-config", title: "Power User Configuration" },
];

export const metadata = {
  title: "Settings, Shortcuts & Power User Config — Claude Code Playbook",
};

export default function SettingsAndShortcuts() {
  return (
    <ContentLayout
      title="Settings, Shortcuts & Power User Config"
      description="Claude Code has a settings system, a keyboard shortcut layer, and a set of power-user patterns that most users never discover. This guide covers all of them."
      sections={sections}
      prev={{ href: "/plan-mode", label: "Plan Mode" }}
      next={{ href: "/security", label: "Security" }}
    >
      <h2 id="settings-hierarchy">Settings Hierarchy</h2>
      <p>
        Claude Code uses three settings files with a clear precedence order. Understanding this
        lets you configure different behaviors for different contexts — global defaults, project
        conventions, and personal overrides.
      </p>

      <table>
        <thead>
          <tr>
            <th>File</th>
            <th>Scope</th>
            <th>Use for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>~/.claude/settings.json</code></td>
            <td>Global (all projects)</td>
            <td>Personal defaults, global hooks, tools you always trust</td>
          </tr>
          <tr>
            <td><code>.claude/settings.json</code></td>
            <td>Project (shared)</td>
            <td>Team conventions, project-specific hooks, shared allowlists — commit this</td>
          </tr>
          <tr>
            <td><code>.claude/settings.local.json</code></td>
            <td>Project (personal)</td>
            <td>Personal project overrides — add to .gitignore, never commit</td>
          </tr>
        </tbody>
      </table>

      <p>
        Project settings override global. Local settings override both. This means you can set
        a global default and let projects or individuals override it without conflict.
      </p>

      <Callout variant="tip" title="Gitignore settings.local.json">
        Add <code>.claude/settings.local.json</code> to your project&apos;s <code>.gitignore</code>.
        This file is for per-developer preferences — notification settings, personal tool
        allowlists — that shouldn&apos;t affect teammates.
      </Callout>

      <h3>Key settings fields</h3>
      <pre><code>{`// .claude/settings.json
{
  // Hooks (see the Hooks guide for details)
  "hooks": {
    "PreToolUse": [...],
    "PostToolUse": [...],
    "SessionStart": [...]
  },

  // Tools Claude can use without asking for approval
  "allowedTools": ["Bash", "Read", "Write", "Edit"],

  // Tools Claude is never allowed to use
  "disallowedTools": [],

  // Model override
  "model": "claude-opus-4-5",

  // Custom slash commands directory (default: .claude/commands/)
  "commandsDir": ".claude/commands"
}`}</code></pre>

      <hr />

      <h2 id="keyboard-shortcuts">Keyboard Shortcuts</h2>
      <p>
        Most users interact with Claude Code as if it&apos;s a chat interface. It&apos;s more than that —
        there&apos;s a keyboard shortcut layer that gives you fine-grained control over the session.
      </p>

      <table>
        <thead>
          <tr>
            <th>Shortcut</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><kbd>Esc</kbd></td>
            <td>Interrupt Claude mid-response. Claude stops and awaits your next message.</td>
          </tr>
          <tr>
            <td><kbd>Esc</kbd> <kbd>Esc</kbd> (double-press)</td>
            <td>Rewind — reverts the last message exchange and pops it from context. Claude&apos;s last response and any tool calls it made are undone from the conversation history.</td>
          </tr>
          <tr>
            <td><kbd>Shift</kbd>+<kbd>Tab</kbd></td>
            <td>Toggle Plan Mode — Claude reasons without taking action.</td>
          </tr>
          <tr>
            <td><kbd>Ctrl</kbd>+<kbd>C</kbd></td>
            <td>Cancel the current input (before sending). Does not interrupt a running response.</td>
          </tr>
          <tr>
            <td><kbd>↑</kbd> arrow</td>
            <td>Cycle through previous messages in the input box.</td>
          </tr>
        </tbody>
      </table>

      <Callout variant="key" title="Double-Esc is underused">
        Esc+Esc (rewind) is one of the most powerful features in Claude Code and almost no one
        uses it. When Claude heads in the wrong direction, you don&apos;t need to tell it to undo
        what it just did — you just rewind and re-prompt. The bad response never happened.
      </Callout>

      <h3>When to use Esc vs. Esc+Esc</h3>
      <ul>
        <li>
          <strong>Esc (interrupt):</strong> Claude is doing something that will complete fine but
          you want to redirect before it does more. The work it&apos;s done stays in context.
        </li>
        <li>
          <strong>Esc+Esc (rewind):</strong> Claude&apos;s last response was wrong — wrong approach,
          wrong assumptions, wrong files touched. You want to try again as if that response
          never happened.
        </li>
      </ul>

      <hr />

      <h2 id="clear-discipline">/clear Discipline</h2>
      <p>
        <code>/clear</code> wipes the current session context. Claude forgets everything discussed,
        all tool results, the full conversation history. It&apos;s a hard reset to a fresh session with
        only CLAUDE.md and whatever you type next.
      </p>

      <p>Use <code>/clear</code> when:</p>
      <ul>
        <li>You&apos;re switching to a substantially different task and don&apos;t want old context to bleed in</li>
        <li>The session has accumulated enough back-and-forth that Claude is losing track of earlier decisions</li>
        <li>Something went wrong and you want a clean slate — no residual state from a bad exchange</li>
        <li>You&apos;ve finished one task and are starting another the next day</li>
      </ul>

      <Callout variant="tip" title="Don't fight a stale session">
        Adding more context to a stale session is usually worse than starting fresh. A new session
        with a focused, well-scoped prompt outperforms a long session that theoretically has all
        the history. When you notice quality degrading, <code>/clear</code> and re-orient.
      </Callout>

      <p>
        Signs a session needs clearing: Claude re-asks questions you already answered, contradicts
        earlier decisions, or produces responses that feel generic rather than project-specific.
      </p>

      <hr />

      <h2 id="effort-keyword">The effort Keyword</h2>
      <p>
        Claude Code responds to the word <strong>effort</strong> (or similar phrasings like
        &ldquo;take your time&rdquo;, &ldquo;be thorough&rdquo;) as a signal to apply more reasoning and think through
        edge cases more carefully.
      </p>

      <p>Use it for tasks where quality matters more than speed:</p>
      <pre><code>{`"High effort: Review this authentication flow for security issues.
Don't just scan — trace every path user input can take."

"Take your time with this refactor. I want you to understand
the existing code fully before suggesting any changes."

"Thorough review: every function, every edge case, every assumption."
`}</code></pre>

      <p>
        For routine tasks — typo fixes, simple renames, adding a missing import — this adds overhead
        with no benefit. Reserve it for security reviews, architectural decisions, and anywhere
        where &ldquo;good enough&rdquo; is a meaningful risk.
      </p>

      <Callout variant="tip" title="Closed-loop feedback">
        Pair effort prompts with explicit verification: &ldquo;After reviewing, tell me what you checked
        and what you didn&apos;t. If there&apos;s anything you&apos;re uncertain about, flag it.&rdquo; This turns
        the effort keyword into a feedback loop, not just a signal.
      </Callout>

      <hr />

      <h2 id="bash-shorthand">! Bash Shorthand</h2>
      <p>
        Prefix any message with <code>!</code> to run it directly as a bash command, bypassing
        Claude entirely. Claude doesn&apos;t see the command or its output — it&apos;s a direct shell
        passthrough.
      </p>

      <pre><code>{`! git status
! npm test
! cat package.json | jq '.dependencies'`}</code></pre>

      <p>
        This is useful when you need to check something quickly mid-session without interrupting
        Claude&apos;s context. The output is shown in your terminal but not added to the conversation.
      </p>

      <Callout variant="tip" title="Use ! for verification, not implementation">
        Use <code>!</code> to verify assumptions (&ldquo;is this file what I think it is?&rdquo;), check
        state (&ldquo;what branch am I on?&rdquo;), or run quick diagnostics. For anything you want
        Claude to know about or act on, ask Claude to run it instead.
      </Callout>

      <hr />

      <h2 id="git-worktrees">Git Worktrees for Parallel Sessions</h2>
      <p>
        Git worktrees let you check out multiple branches from the same repository simultaneously
        into separate directories. Combined with Claude Code, this unlocks true parallel work —
        separate Claude sessions on separate branches without the constant branch-switching overhead.
      </p>

      <pre><code>{`# Create a worktree for a new feature branch
git worktree add ../my-project-feature-auth feature/auth

# Start Claude Code in the new worktree
cd ../my-project-feature-auth
claude

# Your main worktree is untouched, on its own branch
# Both Claude sessions are completely independent`}</code></pre>

      <h3>When to use worktrees</h3>
      <ul>
        <li>Running Claude on a long refactor while keeping the main branch clean for hotfixes</li>
        <li>Experimenting with a risky approach without touching your main working branch</li>
        <li>Running multiple Claude sessions in parallel on independent workstreams</li>
        <li>Reviewing a PR branch while Claude continues work on the current branch</li>
      </ul>

      <Callout variant="key" title="The isolation benefit">
        Each worktree has its own working directory state. If a Claude session in one worktree
        goes sideways — wrong approach, broken state — it doesn&apos;t affect your other worktrees.
        You can delete the worktree and the branch, and nothing is lost in the main working tree.
      </Callout>

      <pre><code>{`# Clean up a worktree when done
git worktree remove ../my-project-feature-auth

# Or list all active worktrees
git worktree list`}</code></pre>

      <hr />

      <h2 id="power-user-config">Power User Configuration</h2>
      <p>
        A minimal but useful <code>~/.claude/settings.json</code> for personal defaults:
      </p>

      <pre><code>{`// ~/.claude/settings.json — global defaults
{
  "hooks": {
    "Stop": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude finished\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}`}</code></pre>

      <p>
        And a project-level configuration for a TypeScript project with automatic formatting:
      </p>

      <pre><code>{`// .claude/settings.json — project-level
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/hooks/format.sh"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/hooks/check-bash.sh"
          }
        ]
      }
    ]
  },
  "allowedTools": ["Read", "Glob", "Grep"]
}`}</code></pre>

      <Callout variant="tip" title="Start minimal">
        Don&apos;t build an elaborate hooks setup before you know what problems you&apos;re solving. Start
        with one or two hooks that address a real pain point — auto-formatting or a simple
        dangerous-command block — and add more as you encounter the need.
      </Callout>
    </ContentLayout>
  );
}
