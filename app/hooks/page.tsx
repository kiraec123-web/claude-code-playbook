import { ContentLayout } from "@/components/content-layout";
import { Callout } from "@/components/callout";

const sections = [
  { id: "what-are-hooks", title: "What Hooks Are" },
  { id: "lifecycle-events", title: "The Four Lifecycle Events" },
  { id: "configuration", title: "Configuration" },
  { id: "practical-patterns", title: "Practical Patterns" },
  { id: "hooks-vs-claude-md", title: "Hooks vs. CLAUDE.md" },
  { id: "security", title: "Security Considerations" },
];

export const metadata = {
  title: "Hooks — Claude Code Playbook",
};

export default function Hooks() {
  return (
    <ContentLayout
      title="Hooks"
      description="Hooks are shell commands that run automatically at specific points in Claude Code's lifecycle. They give you deterministic control — not suggestions, not guidelines, but guaranteed execution before or after Claude acts."
      category="Build"
      position={{ current: 8, total: 19 }}
      sections={sections}
      prev={{ href: "/agents-and-tools", label: "Agents & Tools" }}
      next={{ href: "/plan-mode", label: "Plan Mode" }}
    >
      <h2 id="what-are-hooks">What Hooks Are</h2>
      <p>
        CLAUDE.md tells Claude what you prefer. Hooks enforce it. When you add a hook, you&apos;re
        not asking Claude to remember a rule — you&apos;re wiring a shell command that runs
        regardless of what Claude does.
      </p>
      <p>
        Hooks run as the user who launched Claude Code, with full access to your shell environment.
        They can read files, run formatters, send notifications, block operations, or inject
        additional context into a session.
      </p>

      <Callout variant="key" title="The 100% vs. 80% distinction">
        CLAUDE.md instructions are followed roughly 80% of the time — Claude applies judgment,
        sometimes misses things, sometimes interprets differently. Hooks execute 100% of the time.
        Use hooks for anything where &ldquo;usually&rdquo; isn&apos;t good enough.
      </Callout>

      <hr />

      <h2 id="lifecycle-events">The Four Lifecycle Events</h2>

      <h3>PreToolUse</h3>
      <p>
        Runs before Claude executes any tool call. Your hook receives the tool name and input as
        JSON. If you exit with a non-zero code, Claude is blocked from running the tool — it sees
        your stdout as an error message and will explain to you why it was blocked.
      </p>
      <p>Good for: blocking dangerous bash commands, requiring confirmation before file writes, enforcing naming conventions.</p>

      <pre><code>{`# Block rm -rf in bash commands
# .claude/hooks/check-bash.sh
#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // ""')

if echo "$COMMAND" | grep -qE 'rm -rf|sudo rm'; then
  echo "Blocked: destructive delete detected. Use trash or a safer alternative."
  exit 1
fi
exit 0`}</code></pre>

      <h3>PostToolUse</h3>
      <p>
        Runs after Claude executes a tool call, receiving the tool name, input, and output. Exit
        code doesn&apos;t affect Claude&apos;s execution (the tool already ran), but you can use stdout to
        inject feedback that Claude will see.
      </p>
      <p>Good for: auto-formatting after edits, running linters, logging operations, sending notifications.</p>

      <pre><code>{`# Auto-format after file writes
# .claude/hooks/format-on-write.sh
#!/bin/bash
INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name')
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // ""')

if [ "$TOOL" = "Write" ] || [ "$TOOL" = "Edit" ]; then
  case "$FILE" in
    *.ts|*.tsx|*.js|*.jsx) npx prettier --write "$FILE" 2>/dev/null ;;
    *.py) black "$FILE" 2>/dev/null ;;
    *.go) gofmt -w "$FILE" 2>/dev/null ;;
  esac
fi
exit 0`}</code></pre>

      <h3>SessionStart</h3>
      <p>
        Runs once when a Claude Code session begins. Use it to inject dynamic context that CLAUDE.md
        can&apos;t capture — the current branch, recent git log, open issues, environment state.
      </p>

      <pre><code>{`# Inject git context at session start
# .claude/hooks/session-start.sh
#!/bin/bash
echo "=== Session Context ==="
echo "Branch: $(git branch --show-current 2>/dev/null || echo 'not a git repo')"
echo "Last 5 commits:"
git log --oneline -5 2>/dev/null || echo "(none)"
echo "Uncommitted changes: $(git status --short 2>/dev/null | wc -l | xargs) files"
exit 0`}</code></pre>

      <h3>Stop</h3>
      <p>
        Runs when Claude finishes a response (each turn). Useful for notifications, logging session
        activity, or triggering downstream processes when Claude completes a task.
      </p>

      <Callout variant="tip" title="Combining events">
        The most powerful setups chain events: SessionStart injects context, PreToolUse enforces
        safety rules, PostToolUse maintains code quality, and Stop handles notifications. Each hook
        handles one concern cleanly.
      </Callout>

      <hr />

      <h2 id="configuration">Configuration</h2>
      <p>
        Hooks are configured in <code>.claude/settings.json</code> (project-level) or
        <code>~/.claude/settings.json</code> (global). Each hook specifies the event, a matcher,
        and the command to run.
      </p>

      <pre><code>{`// .claude/settings.json
{
  "hooks": {
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
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/hooks/format-on-write.sh"
          }
        ]
      }
    ],
    "SessionStart": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/hooks/session-start.sh"
          }
        ]
      }
    ]
  }
}`}</code></pre>

      <p>
        The <code>matcher</code> is a regex matched against the tool name (for PreToolUse/PostToolUse)
        or the session event type (for SessionStart/Stop). Use <code>.*</code> to match everything.
      </p>

      <h3>Hook input format</h3>
      <p>
        Hooks receive JSON on stdin. For PreToolUse and PostToolUse, the shape is:
      </p>
      <pre><code>{`{
  "tool_name": "Bash",
  "tool_input": {
    "command": "npm test"
  },
  "tool_output": "..." // PostToolUse only
}`}</code></pre>

      <hr />

      <h2 id="practical-patterns">Practical Patterns</h2>

      <h3>Block dangerous operations</h3>
      <p>
        The most common use: prevent Claude from running commands that could cause irreversible harm
        in an autonomous session.
      </p>
      <pre><code>{`# Block git push, force push, and production deploys
if echo "$COMMAND" | grep -qE 'git push|git reset --hard|vercel --prod'; then
  echo "Blocked: production-affecting command requires manual confirmation."
  exit 1
fi`}</code></pre>

      <h3>Enforce code quality automatically</h3>
      <p>
        Instead of reminding Claude to run the linter, just run it after every file write.
        Claude will see the output and fix issues without being asked.
      </p>
      <pre><code>{`# PostToolUse: run ESLint after JS/TS writes
if [ "$TOOL" = "Write" ] || [ "$TOOL" = "Edit" ]; then
  LINT_OUTPUT=$(npx eslint "$FILE" --format=compact 2>&1)
  if [ -n "$LINT_OUTPUT" ]; then
    echo "ESLint found issues in $FILE:"
    echo "$LINT_OUTPUT"
  fi
fi`}</code></pre>

      <h3>Inject dynamic context</h3>
      <p>
        CLAUDE.md is static — it can&apos;t know what branch you&apos;re on or what&apos;s in the current diff.
        SessionStart hooks can inject that live.
      </p>
      <pre><code>{`# Inject open PR and current diff summary at session start
echo "Current PR: $(gh pr view --json title,number --jq '.number + ": " + .title' 2>/dev/null || echo 'none')"
echo "Files changed since main:"
git diff --name-only main 2>/dev/null`}</code></pre>

      <h3>Notify on task completion</h3>
      <pre><code>{`# Stop hook: macOS notification when Claude finishes
osascript -e 'display notification "Claude finished a task" with title "Claude Code"'`}</code></pre>

      <hr />

      <h2 id="hooks-vs-claude-md">Hooks vs. CLAUDE.md</h2>
      <p>
        These are complementary, not competing. Use both — but understand what each is for:
      </p>

      <table>
        <thead>
          <tr>
            <th>Concern</th>
            <th>CLAUDE.md</th>
            <th>Hooks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Code style preferences</td>
            <td>Yes — guides Claude&apos;s choices</td>
            <td>Optional — can enforce via linter</td>
          </tr>
          <tr>
            <td>Never delete production data</td>
            <td>Too important to leave to guidance</td>
            <td>Yes — block the operation</td>
          </tr>
          <tr>
            <td>Always run tests after edits</td>
            <td>Too easy to skip</td>
            <td>Yes — PostToolUse runs them automatically</td>
          </tr>
          <tr>
            <td>Current branch / recent git log</td>
            <td>Static, can&apos;t be dynamic</td>
            <td>Yes — inject at SessionStart</td>
          </tr>
          <tr>
            <td>Architectural decisions</td>
            <td>Yes — context Claude needs to reason about</td>
            <td>No — not enforceable mechanically</td>
          </tr>
          <tr>
            <td>Formatting / linting</td>
            <td>Can mention preferred tools</td>
            <td>Yes — run automatically on every write</td>
          </tr>
        </tbody>
      </table>

      <Callout variant="tip" title="Decision heuristic">
        Ask: &ldquo;If Claude ignores this, does it matter?&rdquo; If yes — make it a hook. If Claude forgetting
        the rule is recoverable — CLAUDE.md is fine.
      </Callout>

      <hr />

      <h2 id="security">Security Considerations</h2>
      <p>
        Hooks run with your user permissions. A poorly written hook can be exploited by prompt
        injection — malicious content in retrieved files or web pages that tricks Claude into
        triggering hooks in unintended ways.
      </p>
      <ul>
        <li><strong>Never use eval or dynamic execution</strong> on content Claude retrieved from external sources</li>
        <li><strong>Validate inputs</strong> before passing them to shell commands — especially file paths</li>
        <li><strong>Keep hooks minimal</strong> — do one thing, exit cleanly</li>
        <li><strong>Commit hooks to version control</strong> — project hooks in <code>.claude/</code> should be reviewed like any other code</li>
      </ul>

      <Callout variant="warning" title="Hooks run as you">
        If a malicious file contains instructions that influence Claude to call a tool in a
        specific way, and your hook executes based on that tool call&apos;s input without validation,
        that&apos;s a code execution vector. Treat hook inputs as untrusted.
      </Callout>
    </ContentLayout>
  );
}
