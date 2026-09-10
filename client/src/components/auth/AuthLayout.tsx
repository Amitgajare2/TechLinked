import { Braces } from "lucide-react";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: ReactNode;
  children: ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-[#0B2340] flex items-stretch font-sans">
      <div className="hidden lg:flex lg:w-[44%] relative flex-col justify-between px-16 py-14 border-r border-[#1E3A63]">
        <div className="flex items-center gap-2.5 text-[#EDEFF7]">
          <Braces size={22} strokeWidth={1.75} className="text-[#4C5FFF]" />
          <span className="font-display text-[19px] tracking-tight">TechLinked</span>
        </div>

        <div className="max-w-md">
          <p className="font-mono text-[13px] text-[#6D84A8] mb-6">
            git log --author=you --since=&quot;today&quot;
          </p>
          <h1 className="font-display text-[40px] leading-[1.15] text-[#EDEFF7] mb-6">
            Where builders find the room they belong in
            <span className="text-[#4C5FFF] animate-pulse">_</span>
          </h1>
          <p className="text-[15px] leading-relaxed text-[#9FB0CC] max-w-sm">
            The people reviewing your code, shipping your stack, and hiring
            for your next role are already here.
          </p>
        </div>

        <p className="font-mono text-[12px] text-[#6D84A8]">v2.4.0 — build passing</p>
      </div>

      {/* Right — form */}
      <div className="w-full lg:w-[56%] flex items-center justify-center px-6 py-14">
        <div className="w-full max-w-[420px]">
          <div className="flex lg:hidden items-center gap-2.5 text-[#EDEFF7] mb-10">
            <Braces size={22} strokeWidth={1.75} className="text-[#4C5FFF]" />
            <span className="font-display text-[19px] tracking-tight">TechLinked</span>
          </div>

          <h2 className="font-display text-[26px] text-[#EDEFF7] mb-2">{title}</h2>
          <p className="text-[14px] text-[#9FB0CC] mb-9">{subtitle}</p>

          {children}
        </div>
      </div>
    </div>
  );
}