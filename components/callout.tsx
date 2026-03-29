import { ReactNode } from "react";

type CalloutVariant = "tip" | "warning" | "key";

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
}

const config: Record<CalloutVariant, { icon: string; borderColor: string; bgColor: string; titleColor: string }> = {
  key: {
    icon: "▸",
    borderColor: "border-l-[#f5a623]",
    bgColor: "bg-[#f5a62308]",
    titleColor: "text-[#f5a623]",
  },
  tip: {
    icon: "✦",
    borderColor: "border-l-[#3b82f6]",
    bgColor: "bg-[#3b82f608]",
    titleColor: "text-[#60a5fa]",
  },
  warning: {
    icon: "⚠",
    borderColor: "border-l-[#ef4444]",
    bgColor: "bg-[#ef444408]",
    titleColor: "text-[#f87171]",
  },
};

export function Callout({ variant = "key", title, children }: CalloutProps) {
  const { icon, borderColor, bgColor, titleColor } = config[variant];

  return (
    <div className={`my-6 border-l-2 ${borderColor} ${bgColor} rounded-r-md px-4 py-3.5`}>
      {title && (
        <p className={`text-xs font-mono font-semibold uppercase tracking-widest mb-2 ${titleColor}`}>
          {icon} {title}
        </p>
      )}
      <div className="text-sm text-[#a1a1aa] leading-relaxed [&_code]:bg-[#1a1a1a] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[#f5a623] [&_code]:font-mono [&_code]:text-xs">
        {children}
      </div>
    </div>
  );
}
