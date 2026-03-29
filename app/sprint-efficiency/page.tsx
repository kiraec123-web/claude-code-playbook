import { ContentLayout } from "@/components/content-layout";
import { Callout } from "@/components/callout";
import { Comparison } from "@/components/comparison";

const sections = [
  { id: "front-load", title: "1. Front-Load Clarity" },
  { id: "behavior-not-implementation", title: "2. Ask for Behavior, Not Implementation" },
  { id: "parallel", title: "3. Parallel Over Sequential" },
  { id: "claude-md-memory", title: "4. CLAUDE.md Is Team Memory" },
  { id: "hooks-eliminate", title: "5. Hooks Eliminate Repetition" },
  { id: "clear-is-power", title: "6. /clear Is Power, Not Defeat" },
  { id: "rewind-early", title: "7. Rewind Early" },
  { id: "spec-is-ticket", title: "8. The Spec Is the Ticket" },
  { id: "when-not-to", title: "9. When NOT to Use Claude" },
  { id: "the-multiplier", title: "The Multiplier Effect" },
];

export const metadata = {
  title: "10x Your Sprint — Claude Code Playbook",
};

export default function SprintEfficiency() {
  return (
    <ContentLayout
      title="10x Your Sprint"
      description="The engineers who ship dramatically more with Claude Code aren't better at prompting. They think differently about where time gets lost, what Claude is actually good at, and how to structure a sprint so there's nothing to unblock."
      sections={sections}
      prev={{ href: "/agent-room", label: "The Agent Room" }}
      next={{ href: "/scheduled-reviews", label: "Scheduled Reviews" }}
    >
      <p>
        Most efficiency gains from Claude Code don&apos;t come from better prompts. They come from
        removing the things that make a sprint slow before Claude touches a single file.
        Ambiguous specs. Sequential work. Repeated manual steps. Sessions that have gone
        stale and nobody called it.
      </p>
      <p>
        These are the eight habits that actually compound.
      </p>

      <hr />

      <h2 id="front-load">1. Front-Load Clarity</h2>
      <p>
        The single highest-leverage thing you can do in a sprint is spend 30 minutes on clarity
        before writing a line of code. Understand the problem, spec the solution, run the agent
        room. This is not planning overhead — it&apos;s the work that makes the rest of the work fast.
      </p>
      <p>
        The math: 30 minutes of spec work reliably saves 3–8 hours of mid-sprint rework. The
        conversation about what a ticket actually means doesn&apos;t happen at standup. The &ldquo;wait,
        what about X?&rdquo; doesn&apos;t surface on day 3. The &ldquo;we built the wrong thing&rdquo; doesn&apos;t happen
        at review.
      </p>

      <Callout variant="key" title="The real bottleneck">
        The bottleneck in most sprints isn&apos;t writing code — it&apos;s discovering requirements mid-sprint.
        Claude can write code faster than any engineer. It cannot fix a spec that was never written.
      </Callout>

      <hr />

      <h2 id="behavior-not-implementation">2. Ask for Behavior, Not Implementation</h2>
      <p>
        When you describe how to implement something, you constrain Claude to your approach —
        which may not be the best one. When you describe the behavior you want, Claude picks
        the right implementation for your codebase.
      </p>

      <Comparison
        weak={`Add a debounce function to the search input so it waits 300ms before firing.`}
        strong={`The search input fires an API call on every keystroke. Users on slow connections see request collisions. Fix this — the search should wait until the user stops typing before making the request.`}
      />

      <p>
        The second prompt gets the same result — but Claude will also notice if your existing
        codebase already has a debounce utility, use the right hook pattern for your framework,
        and handle the cleanup correctly. You described the problem, not the solution.
      </p>

      <hr />

      <h2 id="parallel">3. Parallel Over Sequential</h2>
      <p>
        Most engineering sprints are sequential by default: finish A before starting B.
        With Claude Code and git worktrees, that constraint disappears.
      </p>
      <pre><code>{`# Three features, three sessions, running simultaneously
git worktree add ../project-auth     feature/auth
git worktree add ../project-notifs   feature/notifications
git worktree add ../project-export   feature/csv-export

# Open three terminal tabs, one Claude session each
# All three progress in parallel — no waiting`}</code></pre>

      <p>
        The constraint that usually prevents this — context switching costs — doesn&apos;t apply when
        Claude holds the context per session. You check in on each session, review output,
        give direction, and move on. You&apos;re the orchestrator, not the implementer.
      </p>

      <Callout variant="tip" title="One session per workstream, not one session for everything">
        A single Claude session trying to hold three features in context gets worse as it gets
        longer. Three focused sessions stay sharp throughout. The total output is 3x, not 1x
        with more complexity.
      </Callout>

      <hr />

      <h2 id="claude-md-memory">4. CLAUDE.md Is Team Memory</h2>
      <p>
        Every decision your team makes about how to build — tech stack choices, naming conventions,
        architectural patterns, things that look wrong but aren&apos;t — should live in CLAUDE.md.
        Not in Notion. Not in someone&apos;s head. In the file Claude reads at the start of every session.
      </p>
      <p>
        A good CLAUDE.md means:
      </p>
      <ul>
        <li>New engineers onboard to your codebase without asking why things are the way they are</li>
        <li>Claude doesn&apos;t re-introduce patterns you already decided against</li>
        <li>Every session starts aligned, not confused</li>
        <li>Decisions made in one session compound into future sessions</li>
      </ul>

      <Callout variant="tip" title="Update CLAUDE.md during the sprint, not after">
        When Claude helps you make an architectural decision mid-sprint, add it to CLAUDE.md
        before the session ends. The insight is fresh, the decision is recent, and the next
        session that touches that area will have it in context.
      </Callout>

      <hr />

      <h2 id="hooks-eliminate">5. Hooks Eliminate Repetition</h2>
      <p>
        Any instruction you&apos;ve given Claude more than three times should be a hook.
        Any check you run manually after every Claude edit should be a PostToolUse hook.
        Any context you re-explain at the start of every session should be a SessionStart hook.
      </p>

      <table>
        <thead>
          <tr>
            <th>If you keep typing...</th>
            <th>Make it a...</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>&ldquo;Run the linter after this&rdquo;</td>
            <td>PostToolUse hook on Write/Edit</td>
          </tr>
          <tr>
            <td>&ldquo;Don&apos;t push to production&rdquo;</td>
            <td>PreToolUse hook blocking <code>git push --force</code></td>
          </tr>
          <tr>
            <td>&ldquo;We&apos;re on the auth branch, feature X is in progress&rdquo;</td>
            <td>SessionStart hook injecting git state</td>
          </tr>
          <tr>
            <td>&ldquo;Format with Prettier after writing&rdquo;</td>
            <td>PostToolUse hook on Write/Edit</td>
          </tr>
          <tr>
            <td>&ldquo;Remember to check types&rdquo;</td>
            <td>PostToolUse hook running <code>tsc --noEmit</code></td>
          </tr>
        </tbody>
      </table>

      <p>
        The first time you set up a hook, it costs 5 minutes. Over a sprint, it saves an hour
        of repeated instructions and caught-too-late errors.
      </p>

      <hr />

      <h2 id="clear-is-power">6. /clear Is Power, Not Defeat</h2>
      <p>
        The instinct is to keep a session going because &ldquo;all the context is in there.&rdquo; In reality,
        a long session with degraded context is worse than a short session with focused context.
        The best engineers in the room clear the most.
      </p>
      <p>Clear when:</p>
      <ul>
        <li>You&apos;re switching to a different feature or area of the codebase</li>
        <li>Claude starts contradicting decisions it made earlier in the session</li>
        <li>Responses feel generic rather than project-specific</li>
        <li>Something went wrong and you want a clean slate</li>
        <li>It&apos;s a new day — fresh session, fresh context</li>
      </ul>

      <Callout variant="tip" title="CLAUDE.md makes /clear free">
        The reason people hesitate to /clear is fear of losing context. If your conventions,
        decisions, and current work are in CLAUDE.md, clearing costs nothing. The next session
        starts with everything it needs.
      </Callout>

      <hr />

      <h2 id="rewind-early">7. Rewind Early</h2>
      <p>
        Double-press <kbd>Esc</kbd> to rewind — Claude&apos;s last response and any file changes it
        made are popped from the conversation. When Claude heads in the wrong direction, you
        don&apos;t correct forward. You rewind and re-prompt with better constraints.
      </p>
      <p>
        The compounding problem: a wrong assumption in step 1 becomes wrong code in step 3
        becomes a broken test in step 5. Catching it at step 1 is a 2-second rewind.
        Catching it at step 5 is an hour of unwinding.
      </p>

      <Comparison
        weak={`Claude implemented pagination wrong. You say "that's not right" and spend 20 minutes explaining what to change. The wrong code is still in context affecting future responses.`}
        strong={`Claude implements pagination wrong. Esc+Esc. The wrong response never happened. Re-prompt with the constraint you missed: "cursor-based, not offset, follow the pattern in GET /posts." Claude gets it right first try.`}
      />

      <hr />

      <h2 id="spec-is-ticket">8. The Spec Is the Ticket</h2>
      <p>
        When your spec is precise enough to give Claude a clear definition of done, it&apos;s also
        precise enough to be the Jira ticket. You&apos;re not writing the spec and then rewriting
        it as a ticket — the spec IS the ticket.
      </p>
      <p>
        A spec that answers: who, what, why, done-when, out-of-scope — is a ticket with
        acceptance criteria already written. Run it through Claude for formatting and you&apos;re done.
      </p>
      <pre><code>{`Take this spec and format it as a Jira ticket:
[paste spec]

Output:
- Title (under 60 characters)
- User story (As a / I want / So that)
- Acceptance criteria (Given/When/Then, numbered)
- Definition of done
- Story points (Fibonacci) with reasoning`}</code></pre>

      <hr />

      <h2 id="when-not-to">9. When NOT to Use Claude</h2>
      <p>
        Claude makes fast work slower in some situations. Knowing when to step back is part
        of the efficiency equation.
      </p>
      <ul>
        <li>
          <strong>When you don&apos;t understand the code yet</strong> — Claude will produce something plausible
          that you can&apos;t evaluate. Read the code first. Understand it. Then use Claude to work faster on it.
        </li>
        <li>
          <strong>When the spec is still fuzzy</strong> — &ldquo;build me something for X&rdquo; gives Claude
          too much room. Write the spec first. Then build.
        </li>
        <li>
          <strong>When you&apos;ve been going in circles for 20 minutes</strong> — Stop. Diagnose. The
          problem is usually a wrong assumption or a missing constraint, not the prompt wording.
          Fix the thinking, then re-prompt.
        </li>
        <li>
          <strong>When the decision requires judgment about your business</strong> — Claude doesn&apos;t
          know your users, your stakeholders, or your strategy. Use it to execute decisions,
          not to make them.
        </li>
      </ul>

      <hr />

      <h2 id="the-multiplier">The Multiplier Effect</h2>
      <p>
        None of these habits is a 10x on its own. The multiplier comes from stacking them:
      </p>
      <ul>
        <li>A clear spec means Claude gets it right in one pass instead of three</li>
        <li>Parallel worktrees mean three features move at once</li>
        <li>Hooks mean zero repeated instructions across all three sessions</li>
        <li>A current CLAUDE.md means every session starts aligned</li>
        <li>Rewinding early means mistakes cost seconds, not hours</li>
      </ul>
      <p>
        Stack all of these in a sprint and you&apos;re not shipping 10% more. You&apos;re shipping work
        that used to take two engineers in two weeks, in three days, alone.
      </p>

      <Callout variant="key" title="The real unlock">
        The 10x doesn&apos;t come from Claude being smart. It comes from you removing every obstacle
        that stands between Claude&apos;s capability and shipped code. Clear specs. Focused sessions.
        Eliminated repetition. No ambiguity. When those are in place, Claude&apos;s speed compounds.
      </Callout>
    </ContentLayout>
  );
}
