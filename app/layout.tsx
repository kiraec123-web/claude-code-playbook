import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Claude Code Playbook",
    template: "%s — Claude Code Playbook",
  },
  description:
    "Best practices for working with Claude Code — from first session to production agentic workflows.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  openGraph: {
    title: "Claude Code Playbook",
    description:
      "Best practices for working with Claude Code — from first session to production agentic workflows.",
    siteName: "Claude Code Playbook",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Code Playbook",
    description:
      "Best practices for working with Claude Code — from first session to production agentic workflows.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#fafafa]">
        <Nav />
        {children}
      </body>
    </html>
  );
}
