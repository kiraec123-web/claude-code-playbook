import { ContentLayout } from "@/components/content-layout";
import { Callout } from "@/components/callout";
import { Comparison } from "@/components/comparison";

const sections = [
  { id: "reproducer", title: "Give Claude a Reproducible Bug Report" },
  { id: "isolate", title: "Isolate the Surface Before Handing Off" },
  { id: "fix-loop", title: "Structure the Fix Loop" },
  { id: "test-cheating", title: "Watch for Test-Cheating" },
  { id: "collateral-damage", title: "Handle Collateral Damage" },
  { id: "git-hygiene", title: "Git Hygiene for Bug Fix Sessions" },
  { id: "no-tests", title: "Debugging When There Are No Tests" },
];

export const metadata = {
  title: "Debugging — Claude Code Playbook",
};

export default function Debugging() {
  return (
    <ContentLayout
      title="Debugging"
      description="Handing a bug to Claude Code without preparation usually produces mediocre results. The more legible the bug is when Claude sees it, the better the fix — and the easier it is to verify."
      category="Quality"
      position={{ current: 16, total: 19 }}
      sections={sections}
      prev={{ href: "/testing", label: "Testing" }}
      next={{ href: "/code-review", label: "Code Review & QA" }}
    >
      <h2 id="reproducer">Give Claude a Reproducible Bug Report, Not a Description</h2>
      <p>
        The most common mistake in bug fix sessions is describing the symptom rather than providing
        a reproducer.
      </p>

      <Comparison
        weak="The deposit endpoint is sometimes returning the wrong balance."
        strong="When two deposit requests are made in quick succession for the same account, the final balance reflects only one of them. Steps to reproduce: [curl commands or test case]. Expected: balance reflects both deposits. Actual: balance reflects only the second one."
      />

      <p>
        The stronger version gives Claude a specific, reproducible scenario. It&apos;s also a test case
        in disguise — Claude can verify the fix by confirming that exact scenario now behaves correctly.
      </p>

      <p>If you can write a failing test before Claude starts, do it:</p>
      <blockquote>
        <p>This test should pass but doesn&apos;t: [test]. Fix the underlying code so this test passes.
        Do not modify the test.</p>
      </blockquote>

      <hr />

      <h2 id="isolate">Isolate the Surface Before Handing Off</h2>
      <p>If you have a sense of where the bug lives, say so:</p>
      <blockquote>
        <p>The bug is likely in the <code>withdraw</code> method in <code>AccountService</code>.
        I don&apos;t think it&apos;s a database issue — the data looks correct in the DB. Start there.</p>
      </blockquote>
      <p>
        This prevents Claude from making sweeping changes to code that isn&apos;t the problem. Unfocused
        bug investigations often produce fixes that break adjacent things. Scoping the surface area
        keeps the diff small and the review tractable.
      </p>

      <hr />

      <h2 id="fix-loop">Structure the Fix Loop</h2>
      <p>A reliable pattern for bug fix sessions:</p>
      <ol>
        <li><strong>Reproduce</strong> — Confirm Claude can reproduce the bug with a test or run</li>
        <li><strong>Hypothesize</strong> — Ask Claude to state what it thinks the cause is before touching code</li>
        <li><strong>Patch</strong> — Implement the fix</li>
        <li><strong>Verify</strong> — Confirm the reproducer now passes</li>
        <li><strong>Regression check</strong> — Run the full test suite; confirm nothing else broke</li>
      </ol>

      <h3>Why hypothesize before patching?</h3>
      <p>
        Asking Claude to explain its diagnosis before writing code surfaces wrong assumptions early
        — before they&apos;re baked into a fix. It also gives you a chance to say &ldquo;that&apos;s not right&rdquo;
        without having to review and undo code.
      </p>
      <blockquote>
        <p>Before making any changes, tell me what you think is causing this bug and where in the
        code it lives.</p>
      </blockquote>

      <hr />

      <h2 id="test-cheating">Watch for Test-Cheating in Fix Loops</h2>
      <p>
        In agentic fix workflows, Claude may modify a failing test to make it pass rather than fix
        the actual code. This is especially common when the correct fix is non-obvious and Claude
        is under pressure to show a green suite.
      </p>

      <Callout variant="warning" title="Add this constraint to every bug fix prompt">
        Do not modify existing tests to make them pass. If a test is failing, fix the underlying
        code, not the test.
      </Callout>

      <p>
        If you&apos;re running tests automatically in a loop, check what changed after each iteration
        — not just whether the suite is green.
      </p>

      <hr />

      <h2 id="collateral-damage">Handle &ldquo;Claude Broke Something While Fixing Something Else&rdquo;</h2>
      <p>
        This is one of the most common failure modes in bug fix sessions. Claude fixes the reported
        bug and inadvertently breaks adjacent behavior — by changing shared logic, removing a guard
        that was protecting something else, or misunderstanding a dependency.
      </p>
      <p>How to protect against it:</p>
      <ul>
        <li><strong>Run the full test suite after every fix</strong>, not just the test for the specific bug</li>
        <li><strong>Commit before Claude starts</strong> — a clean git state means you can diff exactly what changed</li>
        <li><strong>Ask Claude to explain any non-local changes</strong> — if Claude edits a shared utility, ask why before accepting it</li>
        <li><strong>Scope the fix explicitly</strong> — &ldquo;Only change code in <code>services/accounts.ts</code>. If you think a fix is needed elsewhere, tell me rather than making the change.&rdquo;</li>
      </ul>

      <hr />

      <h2 id="git-hygiene">Git Hygiene for Bug Fix Sessions</h2>
      <p>Before starting a Claude Code bug fix session:</p>
      <pre><code>{`git add -A && git commit -m "wip: before claude bugfix session"
# or use a branch:
git checkout -b bugfix/account-balance-race-condition`}</code></pre>
      <p>
        This gives you a clean rollback point. Review the full diff before merging or committing
        Claude&apos;s output. <code>git diff</code> is your friend. A passing test suite is necessary
        but not sufficient — you should understand what changed and why.
      </p>

      <hr />

      <h2 id="no-tests">Debugging When There Are No Tests</h2>
      <p>If the codebase has no tests and you&apos;re trying to debug a live issue:</p>
      <ol>
        <li>Ask Claude to write a test that reproduces the bug first</li>
        <li>Confirm the test fails</li>
        <li>Then ask Claude to fix the code until the test passes</li>
      </ol>
      <p>
        This creates a regression test as a side effect of the bug fix. You end up with both a fix
        and a test that proves it — which is valuable even if the rest of the codebase has no test
        coverage.
      </p>
    </ContentLayout>
  );
}
