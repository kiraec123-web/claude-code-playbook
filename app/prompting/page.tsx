import { ContentLayout } from "@/components/content-layout";
import { Callout } from "@/components/callout";
import { Comparison } from "@/components/comparison";

const sections = [
  { id: "constraints", title: "Be Specific About Constraints" },
  { id: "codebase-as-spec", title: "Use Your Codebase as a Spec" },
  { id: "negative", title: "Say What Not to Do" },
  { id: "reason-before-act", title: "Ask Claude to Reason Before Acting" },
  { id: "scope", title: "Scope Requests to Match Your Review Capacity" },
  { id: "role", title: "Give Claude the Right Role" },
  { id: "examples", title: "Provide Examples for Specific Formats" },
  { id: "edge-cases", title: "Prompt for Completeness on Edge Cases" },
  { id: "iterate", title: "Iterate, Don't Overspecify Upfront" },
];

export const metadata = {
  title: "Prompting Patterns — Claude Code Playbook",
};

export default function Prompting() {
  return (
    <ContentLayout
      title="Prompting Patterns"
      description="The quality of Claude Code's output is tightly coupled to the quality of what you ask for. These patterns consistently improve results across different types of tasks."
      sections={sections}
      prev={{ href: "/claude-md", label: "CLAUDE.md" }}
      next={{ href: "/memory-and-context", label: "Memory & Context" }}
    >
      <h2 id="constraints">Be Specific About Constraints, Not Just Goals</h2>
      <p>
        The most common prompting mistake is describing the desired outcome without describing the
        constraints.
      </p>

      <Comparison
        weak="Add pagination to the users list."
        strong="Add cursor-based pagination to the GET /users endpoint. Return next_cursor and prev_cursor in the response. Max page size is 50. Follow the pattern in GET /posts."
      />

      <p>
        The stronger version specifies what to build, how to build it, what the output looks like,
        and where to find precedent. Each of those details reduces guesswork and narrows the space
        of reasonable interpretations.
      </p>

      <hr />

      <h2 id="codebase-as-spec">Use Your Codebase as a Spec</h2>
      <p>
        One of the most reliable patterns: point Claude at an existing file that demonstrates what you
        want.
      </p>
      <blockquote>
        <p>Write a new route handler for <code>/invoices</code> following the same structure as{" "}
        <code>routes/subscriptions.ts</code>.</p>
      </blockquote>
      <blockquote>
        <p>Add a service method following the same pattern as <code>getAccountById</code> in{" "}
        <code>services/accounts.ts</code>.</p>
      </blockquote>
      <p>
        This leverages what&apos;s already in your codebase rather than requiring you to describe
        conventions abstractly. Claude reads the example and infers the pattern.
      </p>

      <hr />

      <h2 id="negative">Say What Not to Do</h2>
      <p>
        Negative constraints are underused and highly effective. Claude makes reasonable default
        choices that may not fit your project. Preempt them:
      </p>
      <blockquote><p>Do not add a new database migration. Work with the existing schema.</p></blockquote>
      <blockquote><p>Don&apos;t refactor any existing functions — only add new ones.</p></blockquote>
      <blockquote><p>Do not modify the test files. Only change the implementation.</p></blockquote>
      <blockquote><p>Don&apos;t install new packages. Use what&apos;s already in <code>package.json</code>.</p></blockquote>

      <Callout variant="key" title="Why negative constraints work">
        Claude will do the &ldquo;reasonable thing&rdquo; when not instructed otherwise. Negative constraints
        close off reasonable paths that aren&apos;t the right paths for your situation. They feel obvious
        when you write them — but without them, Claude often chooses differently.
      </Callout>

      <hr />

      <h2 id="reason-before-act">Ask Claude to Reason Before Acting</h2>
      <p>For complex or ambiguous tasks, ask Claude to think out loud before writing code:</p>
      <blockquote>
        <p>Before implementing, walk me through your approach. What files will you touch? What&apos;s the main risk?</p>
      </blockquote>
      <blockquote>
        <p>Outline two or three ways to implement this with tradeoffs. Then recommend one.</p>
      </blockquote>
      <p>
        This surfaces wrong assumptions early — before they&apos;re baked into code you have to unwind.
        Claude is more likely to notice edge cases when it&apos;s reasoning explicitly rather than coding
        directly.
      </p>

      <hr />

      <h2 id="scope">Scope Requests to Match Your Review Capacity</h2>
      <p>
        The more Claude does in a single pass, the harder it is to review. For significant changes,
        break work into reviewable increments:
      </p>
      <ol>
        <li>Outline the approach and list the files you&apos;ll touch.</li>
        <li>Implement the data layer only.</li>
        <li>Now add the API layer on top of that.</li>
        <li>Add tests.</li>
      </ol>
      <p>
        You catch problems earlier, Claude&apos;s output stays tighter, and you maintain a clear mental
        model of what changed and why.
      </p>

      <hr />

      <h2 id="role">Give Claude the Right Role</h2>
      <p>Priming Claude with a specific lens often improves output quality:</p>
      <blockquote>
        <p>Review this code as a senior engineer who cares about edge cases and failure modes.</p>
      </blockquote>
      <blockquote>
        <p>You&apos;re implementing this as if it will be maintained by someone who didn&apos;t write it.</p>
      </blockquote>
      <blockquote>
        <p>Approach this as a security-conscious reviewer — what would you flag?</p>
      </blockquote>
      <p>
        This isn&apos;t about roleplay — it&apos;s about activating a specific frame of evaluation that
        changes what Claude pays attention to.
      </p>

      <hr />

      <h2 id="examples">Provide Examples When You Want a Specific Format</h2>
      <p>
        If you have a specific output format in mind — a particular test structure, a specific error
        response shape, a certain code style — show it rather than describe it:
      </p>
      <blockquote>
        <p>Here&apos;s an example of the test structure I want: [example]. Write new tests in this format.</p>
      </blockquote>
      <blockquote>
        <p>Error responses should look like this:{" "}
        <code>{"{ error: { code: 'NOT_FOUND', message: '...' } }"}</code>. Follow this shape.</p>
      </blockquote>
      <p>A single concrete example is worth paragraphs of abstract description.</p>

      <hr />

      <h2 id="edge-cases">Prompt for Completeness on Edge Cases</h2>
      <p>Claude tends toward happy-path implementations unless you push explicitly:</p>
      <blockquote>
        <p>Make sure to handle the case where the account doesn&apos;t exist, the amount is zero or
        negative, and the request is missing required fields.</p>
      </blockquote>
      <blockquote>
        <p>What happens if this fails halfway through? Make sure the operation is safe to retry.</p>
      </blockquote>
      <blockquote>
        <p>Add input validation before any business logic runs.</p>
      </blockquote>

      <hr />

      <h2 id="iterate">Iterate, Don&apos;t Overspecify Upfront</h2>
      <p>
        There&apos;s a temptation to write the perfect prompt before Claude sees any code. In practice,
        iterating on an initial output is often faster than trying to specify everything upfront.
      </p>
      <p>A good pattern:</p>
      <ol>
        <li>Give Claude a clear but moderately scoped prompt</li>
        <li>Review the output</li>
        <li>Follow up with targeted corrections: &ldquo;The error handling here isn&apos;t quite right — it should return 404, not 500. Fix that.&rdquo;</li>
        <li>Repeat until the output is right</li>
      </ol>
      <p>
        This is faster than trying to anticipate every requirement before you&apos;ve seen what Claude
        does with the task.
      </p>
    </ContentLayout>
  );
}
