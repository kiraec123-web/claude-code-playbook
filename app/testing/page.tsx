import { ContentLayout } from "@/components/content-layout";
import { Callout } from "@/components/callout";

const sections = [
  { id: "tdd", title: "Start with TDD" },
  { id: "retrofitting", title: "When Retrofitting Tests" },
  { id: "failure-modes", title: "Common Failure Modes" },
  { id: "coverage", title: "Coverage Metrics Are a Floor" },
  { id: "multi-pass", title: "Multi-Pass Review Workflow" },
  { id: "self-review", title: "Ask Claude to Review Its Own Tests" },
  { id: "domain-expertise", title: "You Need Domain Expertise" },
  { id: "feedback-loop", title: "Failing Tests as a Bug Fix Feedback Loop" },
];

export const metadata = {
  title: "Testing — Claude Code Playbook",
};

export default function Testing() {
  return (
    <ContentLayout
      title="Testing"
      description="Tests are where the 'looks good to me' failure mode is most costly. A passing test suite is not the same as a useful test suite — and Claude won't always know the difference unless you set the right conditions."
      category="Quality"
      position={{ current: 15, total: 19 }}
      sections={sections}
      prev={{ href: "/prompt-library", label: "Prompt Library" }}
      next={{ href: "/debugging", label: "Debugging" }}
    >
      <h2 id="tdd">Start with TDD: Write Tests Before Implementation</h2>
      <p>
        The most reliable pattern for getting genuinely useful tests is to write them before the
        implementation exists. This forces tests to reflect your intent rather than mirror whatever
        Claude happened to produce.
      </p>
      <blockquote>
        <p>Write tests for a <code>POST /account/deposit</code> endpoint. It should return 200 with
        an updated balance on success, 400 if the amount is zero or negative, and 404 if the account
        doesn&apos;t exist. Don&apos;t implement the endpoint yet.</p>
      </blockquote>
      <p>
        With this approach, the tests become your spec. Implementation follows. Failing tests are
        feedback, not failures. Claude is also far less likely to write circular tests when the
        implementation doesn&apos;t exist yet.
      </p>

      <hr />

      <h2 id="retrofitting">When Retrofitting Tests, Be Explicit About What to Cover</h2>
      <p>If you&apos;re adding tests to existing code, a vague prompt produces vague tests. A well-scoped prompt looks like this:</p>
      <blockquote>
        <p>Add acceptance tests for the endpoints in <code>AccountController</code>. Cover all the
        logic in <code>AccountService</code>. Use REST Assured and JUnit 5. Assert both status codes
        and relevant response body fields. Extract shared request properties into a{" "}
        <code>RequestSpecification</code>.</p>
      </blockquote>
      <p>Notice what&apos;s included: scope, tools, assertion expectations, and structural requirements. Each detail narrows the space of interpretations.</p>

      <hr />

      <h2 id="failure-modes">Know the Common Failure Modes</h2>
      <p>Claude-generated tests have predictable weak spots. Look for these on every review:</p>

      <h3>Error and exception paths</h3>
      <p>
        Happy paths get covered. HTTP 500 handlers, empty-state responses, and exception branches
        often don&apos;t. After Claude generates a suite, explicitly ask: &ldquo;Are all error paths covered?&rdquo;
      </p>

      <h3>Boundary conditions</h3>
      <p>
        Claude tends to test interior values more reliably than exact boundary values. If your
        business logic has a threshold, check that the exact boundary is tested, not just values
        clearly above or below it.
      </p>

      <h3>Dead weight tests</h3>
      <p>
        Claude sometimes generates tests that exercise code paths already covered elsewhere. They
        pass, add nothing, and slow down your suite. In one real-world example, 4 of 23 generated
        tests killed zero mutants — pure redundancy.
      </p>

      <h3>Tests that cheat</h3>
      <p>
        In agentic fix-loops, Claude may modify a failing test to make it pass rather than fix the
        underlying code. Add an explicit constraint: &ldquo;Do not modify existing tests to make them pass.&rdquo;
      </p>

      <h3>Trivial assertions</h3>
      <p>
        Watch for tests that assert something so obvious it could never fail. These inflate your
        test count without adding signal.
      </p>

      <hr />

      <h2 id="coverage">Coverage Metrics Are a Floor, Not a Ceiling</h2>
      <p>
        Line coverage tells you which lines ran. It says nothing about whether your tests can
        actually catch bugs. 95% line coverage can coexist with fundamental gaps.
      </p>

      <h3>Mutation testing</h3>
      <p>
        Mutation testing tools introduce small, targeted changes to your code — flipping a{" "}
        <code>&gt;</code> to <code>&gt;=</code>, removing a return value — and check whether your
        tests fail. Tests that don&apos;t catch mutations are tests that can&apos;t catch bugs.
      </p>

      <table>
        <thead>
          <tr><th>Language</th><th>Tool</th></tr>
        </thead>
        <tbody>
          <tr><td>Java</td><td>PITest</td></tr>
          <tr><td>JavaScript / TypeScript</td><td>Stryker</td></tr>
          <tr><td>Python</td><td>mutmut</td></tr>
          <tr><td>C#</td><td>Stryker.NET</td></tr>
        </tbody>
      </table>

      <Callout variant="key" title="Real-world benchmark">
        In a Spring Boot banking API, Claude generated tests with 95% line coverage and 91% mutation
        coverage in a few minutes. But the surviving mutants revealed three real gaps — an uncovered
        HTTP 500 path, a missing empty-state test, and weak boundary condition coverage. Good numbers,
        real gaps.
      </Callout>

      <hr />

      <h2 id="multi-pass">Use a Multi-Pass Review Workflow</h2>
      <ol>
        <li><strong>Generate</strong> — Use a specific, scoped prompt</li>
        <li><strong>Check for fakes</strong> — Look for trivial assertions, circular tests, tests that couldn&apos;t fail</li>
        <li><strong>Check coverage</strong> — Are error paths, edge cases, and boundary conditions covered?</li>
        <li><strong>Run mutation testing</strong> — Which mutants survived? What does that tell you?</li>
        <li><strong>Feed gaps back to Claude</strong> — &ldquo;These paths aren&apos;t covered: [X, Y, Z]. Add tests for them.&rdquo;</li>
        <li><strong>Check for dead weight</strong> — After additions, are any tests now redundant?</li>
        <li><strong>Ask Claude to audit its own output</strong> — &ldquo;Review these tests. Are there paths in the code that aren&apos;t covered?&rdquo;</li>
      </ol>

      <hr />

      <h2 id="self-review">Ask Claude to Review Its Own Tests</h2>
      <p>After generating a suite, hand it back:</p>
      <blockquote>
        <p>Review these tests. Are there any paths in the code that aren&apos;t covered? Are there any
        tests that seem trivial or redundant? What would you add?</p>
      </blockquote>
      <p>
        This produces a different quality of output than the initial generation pass. Claude approaches
        the review differently than the creation, and it often finds things it missed the first time.
      </p>

      <hr />

      <h2 id="domain-expertise">You Need Domain Expertise to Evaluate Claude&apos;s Tests</h2>
      <p>
        This is the part that doesn&apos;t get said enough: Claude can generate a test suite that looks
        complete and isn&apos;t. Your ability to catch that depends on your own knowledge of the code.
      </p>
      <p>
        Don&apos;t use Claude to generate tests for code you don&apos;t understand yet. Get familiar with the
        code first. Know what the key paths are, where the business logic lives, and what a meaningful
        failure looks like. Then use Claude to accelerate the writing.
      </p>

      <hr />

      <h2 id="feedback-loop">Use Failing Tests as a Bug Fix Feedback Loop</h2>
      <p>When you have a bug, write a test that reproduces it before asking Claude to fix it:</p>
      <blockquote>
        <p>This test should pass but doesn&apos;t: [test]. Fix the underlying code so this test passes.
        Do not modify the test.</p>
      </blockquote>
      <p>
        This gives Claude a concrete definition of done and gives you confidence that the fix actually
        addresses the bug — not just that the suite is green again.
      </p>
    </ContentLayout>
  );
}
