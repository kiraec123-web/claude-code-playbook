interface ComparisonProps {
  weak: string;
  strong: string;
}

export function Comparison({ weak, strong }: ComparisonProps) {
  return (
    <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="rounded-md border border-[#2a1a1a] bg-[#ef444406] p-4">
        <p className="text-xs font-mono font-semibold text-[#f87171] uppercase tracking-widest mb-2">
          ✕ Weak
        </p>
        <p className="text-sm text-[#a1a1aa] leading-relaxed italic">&ldquo;{weak}&rdquo;</p>
      </div>
      <div className="rounded-md border border-[#1a2a1a] bg-[#22c55e06] p-4">
        <p className="text-xs font-mono font-semibold text-[#4ade80] uppercase tracking-widest mb-2">
          ✓ Strong
        </p>
        <p className="text-sm text-[#a1a1aa] leading-relaxed italic">&ldquo;{strong}&rdquo;</p>
      </div>
    </div>
  );
}
