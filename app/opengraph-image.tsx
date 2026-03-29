import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Claude Code Playbook";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Orange glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "400px",
            width: "600px",
            height: "400px",
            borderRadius: "50%",
            background: "#f5a623",
            opacity: 0.06,
            filter: "blur(80px)",
          }}
        />

        {/* Top: logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              background: "#f5a623",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 9L6 3L10 9"
                stroke="#0a0a0a"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            style={{
              color: "#71717a",
              fontSize: "18px",
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            Claude Code Playbook
          </span>
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#f5a623",
              }}
            />
            <span
              style={{
                color: "#52525b",
                fontSize: "14px",
                fontFamily: "monospace",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Best Practices
            </span>
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
              color: "#fafafa",
            }}
          >
            Work with Claude Code
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
              color: "#f5a623",
            }}
          >
            without the guesswork.
          </div>
        </div>

        {/* Bottom: 8 topics */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {[
            "Getting Started",
            "Prompting",
            "Memory & Context",
            "Agents & Tools",
            "Testing",
            "Debugging",
            "Code Review",
            "Security",
          ].map((topic) => (
            <div
              key={topic}
              style={{
                border: "1px solid #222",
                borderRadius: "6px",
                padding: "6px 14px",
                color: "#52525b",
                fontSize: "14px",
                fontWeight: 500,
                background: "#111",
              }}
            >
              {topic}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
