import { ContentLayout } from "@/components/content-layout";
import { Callout } from "@/components/callout";

const sections = [
  { id: "claude-as-reviewer", title: "Claude as Reviewer, Not Just Writer" },
  { id: "tradeoffs", title: "Ask for Tradeoffs, Not Just Solutions" },
  { id: "your-own-work", title: "Use Claude to Check Your Own Work" },
  { id: "human-review", title: "The Human Review Obligation" },
  { id: "scope-creep", title: "Catching Scope Creep" },
  { id: "explain", title: "Asking Claude to Explain Its Own Code" },
  { id: "qa", title: "QA in Agentic Workflows" },
];

export const metadata = {
  title: "Code Review & QA — Claude Code Playbook",
};

export default function CodeReview() {
  return (
    <ContentLayout
      title="Code Review & QA"
      description="Claude Code is typically used to write code — but it's equally useful as a reviewer. Used well, it can surface edge cases, security issues, and architectural problems before they reach production."
      sections={sections}
      prev={{ href: "/debugging", label: "Debugging" }}
      next={{ href: "/security", label: "Security" }}
    >
      <h2 id="claude-as-reviewer">Claude as Reviewer, Not Just Writer</h2>
      <p>Ask Claude to critique code rather than produce it. This is a different mode and produces different output.</p>
      <blockquote>
        <p>Review this implementation. What edge cases might I have missed? Are there any performance
        or security concerns? What would you do differently?</p>
      </blockquote>
      <blockquote>
        <p>Read this PR diff. Flag anything that looks risky, incomplete, or inconsistent with the
        rest of the codebase.</p>
      </blockquote>
      <blockquote>
        <p>This code is going to handle payment data. Review it specifically for security issues.</p>
      </blockquote>

      <Callout variant="key" title="The framing matters">
        &ldquo;Review this&rdquo; produces critique. &ldquo;Improve this&rdquo; produces a rewrite. Ask for what you
        actually want.
      </Callout>

      <hr />

      <h2 id="tradeoffs">Ask for Tradeoffs, Not Just Solutions</h2>
      <p>When Claude proposes an implementation, push it to surface what it didn&apos;t mention:</p>
      <blockquote>
        <p>What are the tradeoffs of this approach? What would you do differently if performance were
        the primary concern? What about if simplicity were the primary concern?</p>
      </blockquote>
      <blockquote>
        <p>Are there any reasons not to do it this way? What&apos;s the main risk?</p>
      </blockquote>
      <p>
        Claude often considers multiple approaches before committing to one. Asking for tradeoffs
        surfaces that reasoning rather than just the conclusion.
      </p>

      <hr />

      <h2 id="your-own-work">Use Claude to Check Your Own Work</h2>
      <p>You don&apos;t have to use Claude only on code it wrote. Use it to review code you wrote:</p>
      <blockquote>
        <p>I wrote this. Can you find the bug? Don&apos;t fix it — just tell me where it is.</p>
      </blockquote>
      <blockquote>
        <p>Review this function for correctness. Assume the caller can pass anything — what breaks?</p>
      </blockquote>
      <blockquote>
        <p>I&apos;m about to merge this. What would a thorough code reviewer flag?</p>
      </blockquote>
      <p>
        This is especially useful for code you&apos;ve been staring at too long — Claude brings fresh
        attention.
      </p>

      <hr />

      <h2 id="human-review">The Human Review Obligation</h2>
      <p>
        The most important quality gate is one Claude can&apos;t do for you: actually reading the code
        before it ships.
      </p>
      <p>
        The temptation to skim and accept is real, especially when tests are passing and the
        implementation looks plausible. Resist it.
      </p>

      <h3>A practical review checklist</h3>
      <p>For every Claude-generated change before you accept it:</p>
      <ul>
        <li><strong>Does the logic match what you asked for</strong>, or does it superficially resemble it?</li>
        <li><strong>Are error cases handled</strong>, or silently swallowed?</li>
        <li><strong>Are there side effects</strong> in functions that shouldn&apos;t have them?</li>
        <li><strong>Is anything hardcoded</strong> that should be configurable?</li>
        <li><strong>Did Claude touch files outside the agreed scope?</strong> Check the full diff, not just the summary</li>
        <li><strong>Were any new dependencies added?</strong> Evaluate them explicitly</li>
        <li><strong>Do the tests actually test the right things</strong>, or are they testing Claude&apos;s implementation rather than your intent?</li>
      </ul>

      <h3>The diff discipline</h3>
      <p>
        Always review with <code>git diff</code> or your diff tool — not by reading individual files
        in isolation. Context matters. A change that looks fine in one file may be wrong given what
        changed in another.
      </p>

      <hr />

      <h2 id="scope-creep">Catching Scope Creep</h2>
      <p>
        Claude sometimes makes &ldquo;helpful&rdquo; changes beyond what you asked for — renaming variables,
        restructuring logic, refactoring adjacent functions. These can be good or bad, but they
        always need review.
      </p>
      <p>Two ways to handle this:</p>
      <ol>
        <li>
          <strong>Prevent it upfront</strong> — &ldquo;Only change what&apos;s necessary to implement this feature.
          Do not refactor anything I didn&apos;t ask you to change.&rdquo;
        </li>
        <li>
          <strong>Catch it in review</strong> — Check the full diff for changes outside the intended scope.
          If Claude changed something you didn&apos;t ask it to change, evaluate that change explicitly
          rather than assuming it&apos;s fine.
        </li>
      </ol>

      <hr />

      <h2 id="explain">Asking Claude to Explain Its Own Code</h2>
      <p>If Claude produces code you don&apos;t fully understand, ask it to explain before you accept it:</p>
      <blockquote>
        <p>Walk me through what this function does step by step.</p>
      </blockquote>
      <blockquote>
        <p>What does this regex match? Give me three examples of inputs that would match and three
        that wouldn&apos;t.</p>
      </blockquote>
      <blockquote>
        <p>Why did you choose this approach over [alternative]?</p>
      </blockquote>

      <Callout variant="warning" title="If you can't explain it, don't ship it">
        Code you can&apos;t explain is code you can&apos;t maintain, debug, or take responsibility for.
        Either ask Claude to simplify it or understand it fully before accepting.
      </Callout>

      <hr />

      <h2 id="qa">QA in Agentic Workflows</h2>
      <p>After a long autonomous session, do a structured QA pass before treating the work as done:</p>
      <ol>
        <li><strong>Run the full test suite</strong> — not just the tests for the feature</li>
        <li><strong>Smoke test manually</strong> — especially any user-facing flows that changed</li>
        <li><strong>Review the full diff</strong> — <code>git diff main</code> if you&apos;re on a branch</li>
        <li><strong>Check for new files</strong> — unexpected new files sometimes appear without being in the summary</li>
        <li><strong>Check for removed code</strong> — Claude occasionally removes something it decided wasn&apos;t needed</li>
        <li><strong>Confirm new dependencies</strong> — any additions to <code>package.json</code>, <code>requirements.txt</code>, etc. should be intentional</li>
      </ol>
    </ContentLayout>
  );
}
