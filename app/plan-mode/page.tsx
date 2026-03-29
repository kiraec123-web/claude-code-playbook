import { ContentLayout } from "@/components/content-layout";
import { Callout } from "@/components/callout";
import { Comparison } from "@/components/comparison";

const sections = [
  { id: "what-is-plan-mode", title: "What Plan Mode Is" },
  { id: "when-to-use", title: "When to Use It" },
  { id: "riper-workflow", title: "The RIPER Workflow" },
  { id: "spec-driven", title: "Spec-Driven Development" },
  { id: "writing-specs", title: "Writing a Good Spec" },
  { id: "plan-then-implement", title: "Plan → Implement → Review" },
];

export const metadata = {
  title: "Plan Mode & Spec-Driven Development — Claude Code Playbook",
};

export default function PlanMode() {
  return (
    <ContentLayout
      title="Plan Mode & Spec-Driven Development"
      description="The most common mistake when using Claude Code is jumping straight to implementation. Plan Mode and spec-driven workflows fix that — they front-load the thinking so execution is clean and deliberate."
      sections={sections}
      prev={{ href: "/hooks", label: "Hooks" }}
      next={{ href: "/settings-and-shortcuts", label: "Settings & Shortcuts" }}
    >
      <h2 id="what-is-plan-mode">What Plan Mode Is</h2>
      <p>
        Plan Mode is a mode where Claude reasons and outlines without taking any action. No files
        are written, no commands are run, no tools are called. Claude thinks out loud and presents
        a plan for your review.
      </p>
      <p>
        Toggle it with <kbd>Shift</kbd>+<kbd>Tab</kbd>. The input area changes to indicate you&apos;re
        in plan mode. Ask your question or describe your task — Claude will respond with analysis
        and a proposed approach, then wait.
      </p>

      <Callout variant="key" title="Why this matters">
        When Claude starts implementing immediately, a wrong assumption in step 1 becomes six files
        that need to be unwound. Plan Mode surfaces that assumption before a single line is written.
      </Callout>

      <hr />

      <h2 id="when-to-use">When to Use It</h2>
      <p>Plan Mode pays off whenever:</p>
      <ul>
        <li>The task touches multiple files or systems</li>
        <li>You&apos;re not fully sure what the right approach is</li>
        <li>The task is ambiguous enough that Claude might interpret it differently than you intend</li>
        <li>You want to catch architectural issues before they&apos;re baked into code</li>
        <li>You&apos;re about to run an autonomous session and want to validate the approach first</li>
      </ul>

      <p>
        For small, unambiguous tasks — &ldquo;fix this typo&rdquo;, &ldquo;rename this variable&rdquo; — Plan Mode adds
        overhead with no benefit. Use it for anything non-trivial.
      </p>

      <Comparison
        weak={{
          label: "Direct implementation",
          code: `"Add pagination to the users table."\n\n// Claude starts editing 4 files immediately.\n// Page 3 of the approach is wrong, but you\n// don't know until all 4 files are changed.`,
        }}
        strong={{
          label: "Plan Mode first",
          code: `[Shift+Tab]\n"Add pagination to the users table."\n\n// Claude outlines: cursor-based vs offset,\n// which files change, what the response\n// shape looks like. You catch the approach\n// mismatch before any code is written.`,
        }}
      />

      <hr />

      <h2 id="riper-workflow">The RIPER Workflow</h2>
      <p>
        RIPER is a structured workflow for complex tasks that maps naturally to how Claude Code
        works best. The five phases:
      </p>

      <table>
        <thead>
          <tr>
            <th>Phase</th>
            <th>What happens</th>
            <th>Claude&apos;s role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Research</strong></td>
            <td>Understand the codebase, requirements, constraints</td>
            <td>Read files, ask clarifying questions</td>
          </tr>
          <tr>
            <td><strong>Innovate</strong></td>
            <td>Explore possible approaches and their tradeoffs</td>
            <td>Outline 2–3 options with pros/cons</td>
          </tr>
          <tr>
            <td><strong>Plan</strong></td>
            <td>Commit to one approach, detail the implementation</td>
            <td>List files to change, sequence of steps</td>
          </tr>
          <tr>
            <td><strong>Execute</strong></td>
            <td>Implement the plan</td>
            <td>Write code, following the plan exactly</td>
          </tr>
          <tr>
            <td><strong>Review</strong></td>
            <td>Verify implementation against the plan</td>
            <td>Check for gaps, test coverage, correctness</td>
          </tr>
        </tbody>
      </table>

      <p>
        You don&apos;t have to be rigid about it — the value is the discipline of separating
        exploration from execution. When Claude goes directly from Research to Execute, it
        often skips the tradeoff analysis that would have caught the wrong approach.
      </p>

      <Callout variant="tip" title="Prompt for it explicitly">
        Claude doesn&apos;t follow RIPER automatically. Prompt it: &ldquo;Before writing any code, outline
        two or three approaches with tradeoffs. Then recommend one and explain why.&rdquo;
      </Callout>

      <hr />

      <h2 id="spec-driven">Spec-Driven Development</h2>
      <p>
        Spec-driven development means writing a specification before asking Claude to implement.
        The spec becomes the source of truth — what Claude implements, what tests validate, and
        what you review against.
      </p>
      <p>
        This is the natural extension of TDD to the full development workflow. You&apos;re not just
        writing tests before code — you&apos;re writing the spec before tests and code.
      </p>

      <h3>Why it works with Claude</h3>
      <p>
        Claude is very good at implementing against a clear spec, and prone to drift when there
        isn&apos;t one. When you give Claude a spec:
      </p>
      <ul>
        <li>Claude has a concrete definition of &ldquo;done&rdquo; — it stops when the spec is met, not when it runs out of ideas</li>
        <li>Edge cases are defined upfront — Claude doesn&apos;t have to guess what behavior you want at the boundaries</li>
        <li>Review is easier — you&apos;re checking implementation against spec, not trying to infer intent from code</li>
        <li>Disagreements surface early — when Claude&apos;s plan doesn&apos;t match the spec, you catch it before the code is written</li>
      </ul>

      <hr />

      <h2 id="writing-specs">Writing a Good Spec</h2>
      <p>A spec doesn&apos;t need to be a formal document. It needs to answer:</p>
      <ul>
        <li><strong>What are the inputs and outputs?</strong> Exact shapes, types, field names</li>
        <li><strong>What are the success cases?</strong> What does &ldquo;working correctly&rdquo; look like?</li>
        <li><strong>What are the failure cases?</strong> What errors are possible, what should happen?</li>
        <li><strong>What are the boundaries?</strong> Zero values, max values, empty states</li>
        <li><strong>What doesn&apos;t this do?</strong> Explicit out-of-scope prevents scope creep</li>
      </ul>

      <Comparison
        weak={{
          label: "No spec",
          code: `"Add a deposit endpoint to the accounts API."\n\n// Claude makes 12 decisions you didn't\n// know you needed to make: what to return\n// on success, error codes, whether to\n// validate the amount, what happens if the\n// account is closed...`,
        }}
        strong={{
          label: "With spec",
          code: `"Implement POST /account/deposit:\n- Input: { accountId: string, amount: number }\n- Returns 200 + { balance: number } on success\n- Returns 400 if amount <= 0\n- Returns 404 if account not found\n- Returns 409 if account is closed\n- Amount must be in cents (integer only)\n- Does NOT handle currency conversion"`,
        }}
      />

      <h3>Spec as CLAUDE.md section</h3>
      <p>
        For ongoing features, keep the spec in CLAUDE.md under a &ldquo;Current work&rdquo; section. This
        means Claude always has the spec in context, and you can update it as requirements evolve.
      </p>

      <pre><code>{`## Current work: Deposit endpoint
- POST /account/deposit
- Input: { accountId: string, amount: number (cents) }
- Success: 200 + { balance: number }
- Errors: 400 (invalid amount), 404 (not found), 409 (closed)
- Out of scope: currency conversion, daily limits (separate ticket)`}</code></pre>

      <hr />

      <h2 id="plan-then-implement">Plan → Implement → Review</h2>
      <p>
        The full workflow combines Plan Mode, specs, and review into a loop that scales from
        simple features to complex refactors:
      </p>

      <ol>
        <li>
          <strong>Write the spec.</strong> Define inputs, outputs, errors, boundaries. Put it
          in the prompt or CLAUDE.md.
        </li>
        <li>
          <strong>Use Plan Mode (<kbd>Shift</kbd>+<kbd>Tab</kbd>).</strong> Ask Claude to plan
          the implementation. Review the plan — does it cover all spec cases? Does the approach
          fit your architecture?
        </li>
        <li>
          <strong>Implement.</strong> With a validated plan and a clear spec, execution is fast
          and directed. Claude has a concrete target.
        </li>
        <li>
          <strong>Review against spec.</strong> Check that every spec case is covered. Ask Claude:
          &ldquo;Review this implementation against the spec. Are there any cases that aren&apos;t handled?&rdquo;
        </li>
        <li>
          <strong>Write tests from the spec.</strong> Every spec case should have a test. The spec
          is already the test list — you&apos;re just making it executable.
        </li>
      </ol>

      <Callout variant="key" title="The compounding benefit">
        Specs written now become documentation, test coverage rationale, and onboarding material
        later. The cost is small. The value compounds over time — especially when you (or Claude
        in a new session) need to understand why something was built the way it was.
      </Callout>
    </ContentLayout>
  );
}
