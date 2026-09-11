import { Braces } from "lucide-react";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: ReactNode;
  children: ReactNode;
}

const AVATARS = [
  { initials: "AK", color: "#4C5FFF" },
  { initials: "RS", color: "#2A9D8F" },
  { initials: "MP", color: "#E76F51" },
  { initials: "NJ", color: "#9B5DE5" },
];

function NetworkGraphic() {
  return (
    <svg
      viewBox="0 0 600 800"
      className="absolute inset-0 w-full h-full opacity-[0.14] pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g stroke="#4C5FFF" strokeWidth="1">
        <line x1="80" y1="120" x2="220" y2="200" />
        <line x1="220" y1="200" x2="180" y2="340" />
        <line x1="220" y1="200" x2="380" y2="160" />
        <line x1="380" y1="160" x2="480" y2="280" />
        <line x1="180" y1="340" x2="320" y2="420" />
        <line x1="320" y1="420" x2="480" y2="280" />
        <line x1="320" y1="420" x2="260" y2="560" />
        <line x1="260" y1="560" x2="420" y2="620" />
        <line x1="480" y1="280" x2="540" y2="480" />
        <line x1="540" y1="480" x2="420" y2="620" />
      </g>
      <g fill="#4C5FFF">
        <circle cx="80" cy="120" r="4" />
        <circle cx="220" cy="200" r="5" />
        <circle cx="380" cy="160" r="4" />
        <circle cx="480" cy="280" r="5" />
        <circle cx="180" cy="340" r="4" />
        <circle cx="320" cy="420" r="6" />
        <circle cx="260" cy="560" r="4" />
        <circle cx="420" cy="620" r="5" />
        <circle cx="540" cy="480" r="4" />
      </g>
    </svg>
  );
}

function AvatarStack({ size }: { size: "sm" | "md" }) {
  const dims = size === "sm" ? "w-7 h-7 text-[10px]" : "w-9 h-9 text-[12px]";
  const list = size === "sm" ? AVATARS.slice(0, 3) : AVATARS;
  return (
    <div className="flex -space-x-2">
      {list.map((a) => (
        <div
          key={a.initials}
          style={{ backgroundColor: a.color }}
          className={`${dims} rounded-full flex items-center justify-center font-medium text-white ring-2 ring-[#0B2340] shadow-sm`}
        >
          {a.initials}
        </div>
      ))}
    </div>
  );
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[#0B2340]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(76,95,255,0.14),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(76,95,255,0.10),transparent_50%)]" />

      <div className="relative flex items-stretch min-h-screen">
        {/* Left — editorial brand panel, desktop only */}
        <div className="hidden lg:flex lg:w-[46%] relative flex-col justify-between px-16 py-14 border-r border-[#1E3A63] overflow-hidden">
          <NetworkGraphic />

          <div className="relative flex items-center gap-2.5 text-[#EDEFF7]">
            <Braces size={22} strokeWidth={1.75} className="text-[#4C5FFF]" />
            <span className="font-display text-[19px] tracking-tight">TechLinked</span>
          </div>

          <div className="relative max-w-md">
            <p className="font-mono text-[13px] text-[#6D84A8] mb-6">
              git log --author=you --since=&quot;today&quot;
            </p>
            <h1 className="font-display text-[42px] leading-[1.15] text-[#EDEFF7] mb-6">
              Where builders find the room they belong in
              <span className="text-[#4C5FFF] animate-pulse">_</span>
            </h1>
            <p className="text-[15px] leading-relaxed text-[#9FB0CC] max-w-sm mb-8">
              The people reviewing your code, shipping your stack, and hiring
              for your next role are already here.
            </p>

            <div className="inline-flex items-center gap-3 bg-[#0F2A4D]/70 backdrop-blur-sm border border-[#1E3A63] rounded-full pl-1.5 pr-4 py-1.5 mb-10">
              <AvatarStack size="md" />
              <p className="text-[13px] text-[#9FB0CC]">
                <span className="text-[#EDEFF7] font-medium">12,400+</span> developers already here
              </p>
            </div>

            <blockquote className="border-l-2 border-[#4C5FFF] pl-4">
              <p className="text-[14px] text-[#C7D2E8] italic leading-relaxed">
                &quot;Found my current role here, and three people I still pair
                with weekly.&quot;
              </p>
              <p className="font-mono text-[11px] text-[#6D84A8] mt-2">
                Senior Backend Engineer
              </p>
            </blockquote>
          </div>

          <p className="relative font-mono text-[12px] text-[#6D84A8]">
            v2.4.0 — build passing
          </p>
        </div>

        {/* Right — form */}
        <div className="w-full lg:w-[54%] flex items-center justify-center px-5 py-10 sm:px-6 sm:py-14">
          <div className="w-full max-w-[420px]">
            {/* Mobile-only header: logo + community proof, so the screen isn't just fields */}
            <div className="flex lg:hidden items-center justify-between mb-8">
              <div className="flex items-center gap-2.5 text-[#EDEFF7]">
                <Braces size={22} strokeWidth={1.75} className="text-[#4C5FFF]" />
                <span className="font-display text-[19px] tracking-tight">TechLinked</span>
              </div>
              <div className="flex items-center gap-2 bg-[#0F2A4D]/70 border border-[#1E3A63] rounded-full pl-1 pr-3 py-1">
                <AvatarStack size="sm" />
                <span className="text-[11px] text-[#9FB0CC]">12.4k+</span>
              </div>
            </div>

            {/* Card on mobile so the form reads as one contained thing, not loose fields on a background */}
            <div className="relative bg-[#122C52]/50 lg:bg-transparent border border-[#1E3A63] lg:border-0 rounded-2xl lg:rounded-none p-6 sm:p-7 lg:p-0 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] lg:shadow-none overflow-hidden">
              <div className="hidden sm:block lg:hidden absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#4C5FFF] via-[#6E7CFF] to-transparent" />

              <h2 className="font-display text-[24px] sm:text-[26px] text-[#EDEFF7] mb-2">{title}</h2>
              <p className="text-[14px] text-[#9FB0CC] mb-8">{subtitle}</p>

              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}