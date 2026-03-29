const agents = [
  {
    name: "Critic",
    command: "/critic",
    question: "What goes wrong here?",
    color: "#f87171",
    bg: "#ef444408",
    border: "#ef444430",
  },
  {
    name: "User",
    command: "/user-test",
    question: "What's confusing or missing?",
    color: "#60a5fa",
    bg: "#3b82f608",
    border: "#3b82f630",
  },
  {
    name: "Designer",
    command: "/designer",
    question: "What does every state look like?",
    color: "#a78bfa",
    bg: "#8b5cf608",
    border: "#8b5cf630",
  },
  {
    name: "Architect",
    command: "/architect",
    question: "How does this fit what exists?",
    color: "#34d399",
    bg: "#10b98108",
    border: "#10b98130",
  },
  {
    name: "PM",
    command: "/pm",
    question: "What's the smallest version?",
    color: "#f5a623",
    bg: "#f5a62308",
    border: "#f5a62330",
  },
  {
    name: "Security",
    command: "/security",
    question: "How could this be exploited?",
    color: "#fb923c",
    bg: "#f9731608",
    border: "#f9731630",
  },
];

export function AgentRoomDiagram() {
  return (
    <div className="my-8 not-prose">
      {/* Input */}
      <div className="flex justify-center mb-4">
        <div className="border border-[#f5a62340] bg-[#f5a62308] rounded-lg px-6 py-3 text-center">
          <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#f5a623] mb-1">Input</p>
          <p className="text-sm font-bold text-[#fafafa]">Your Spec / Brief</p>
        </div>
      </div>

      {/* Connector down */}
      <div className="flex justify-center mb-1">
        <div className="w-px h-5 bg-gradient-to-b from-[#f5a623] to-[#333]" />
      </div>

      {/* Horizontal branch line */}
      <div className="relative mb-1 mx-8">
        <div className="absolute top-0 left-0 right-0 h-px bg-[#222]" />
        <div className="flex justify-around">
          {agents.map((a) => (
            <div key={a.name} className="w-px h-5 bg-[#222]" />
          ))}
        </div>
      </div>

      {/* Agent cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-1">
        {agents.map((agent) => (
          <div
            key={agent.name}
            className="rounded-md p-3"
            style={{
              background: agent.bg,
              border: `1px solid ${agent.border}`,
            }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs font-bold" style={{ color: agent.color }}>
                {agent.name}
              </p>
              <span
                className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                style={{ color: agent.color, background: agent.bg, border: `1px solid ${agent.border}` }}
              >
                {agent.command}
              </span>
            </div>
            <p className="text-[11px] text-[#71717a] leading-snug italic">
              &ldquo;{agent.question}&rdquo;
            </p>
          </div>
        ))}
      </div>

      {/* Horizontal converge line */}
      <div className="relative mt-1 mb-1 mx-8">
        <div className="flex justify-around">
          {agents.map((a) => (
            <div key={a.name} className="w-px h-5 bg-[#222]" />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#222]" />
      </div>

      {/* Connector down */}
      <div className="flex justify-center mt-1 mb-4">
        <div className="w-px h-5 bg-gradient-to-b from-[#333] to-[#f5a623]" />
      </div>

      {/* Synthesis */}
      <div className="flex justify-center mb-4">
        <div className="border border-[#f5a62340] bg-[#f5a62308] rounded-lg px-6 py-3 text-center">
          <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#f5a623] mb-1">Output</p>
          <p className="text-sm font-bold text-[#fafafa]">Synthesis → Sprint-Ready Spec</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6 pt-4 border-t border-[#1a1a1a]">
        <p className="text-[10px] text-[#3f3f46] font-mono uppercase tracking-widest w-full text-center mb-1">
          Each agent is a .claude/commands/ file — one slash command per role
        </p>
        {agents.map((agent) => (
          <span
            key={agent.name}
            className="text-[10px] font-mono px-2 py-1 rounded"
            style={{ color: agent.color, background: agent.bg, border: `1px solid ${agent.border}` }}
          >
            {agent.command}
          </span>
        ))}
      </div>
    </div>
  );
}
