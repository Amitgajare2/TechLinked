"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: HomeIcon, active: true },
  { href: "/projects", label: "Projects", icon: ProjectsIcon },
  { href: "/opportunities", label: "Opportunities", icon: OpportunitiesIcon },
  { href: "/activities", label: "Activities", icon: ActivitiesIcon },
  { href: "/leaderboard", label: "Leaderboard", icon: LeaderboardIcon },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 flex-col leading-none">
          <span className="font-display text-xl font-bold tracking-tight text-ink">
            Stay<span className="text-brand-orange">Connect</span>
          </span>
          <span className="hidden text-[9px] font-semibold tracking-[0.18em] text-ink-muted sm:block">
            PEOPLE . SKILLS . OPPORTUNITIES
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-7">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={`group flex flex-col items-center gap-1 text-xs font-medium ${
                item.active ? "text-brand-orange" : "text-ink-soft hover:text-ink"
              }`}
            >
              <item.icon
                className={`h-5 w-5 ${item.active ? "stroke-brand-orange" : "stroke-ink-soft group-hover:stroke-ink"}`}
              />
              {item.label}
              <span
                className={`h-[2px] w-full rounded-full ${item.active ? "bg-brand-orange" : "bg-transparent"}`}
              />
            </Link>
          ))}
        </nav>

        {/* Search - desktop/tablet */}
        <div className="hidden flex-1 max-w-xs md:block lg:max-w-sm">
          <label className="relative block">
            <span className="sr-only">Search people and opportunities</span>
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 stroke-ink-muted" />
            <input
              type="search"
              placeholder="Search people, opportunities..."
              className="w-full rounded-pill border border-transparent bg-page py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-muted focus:border-brand-orange focus:bg-white focus:outline-none"
            />
          </label>
        </div>

        {/* Right cluster */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <button
            type="button"
            aria-label="Notifications (3 unread)"
            className="relative hidden h-9 w-9 items-center justify-center rounded-full text-ink-soft hover:bg-page sm:flex"
          >
            <BellIcon className="h-5 w-5 stroke-current" />
            <span className="absolute right-1.5 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-orange text-[8px] font-bold text-white">
              3
            </span>
          </button>

          <button
            type="button"
            className="hidden items-center gap-1.5 rounded-full py-1 pl-1 pr-2 hover:bg-page sm:flex"
            aria-label="Open account menu"
          >
            <Image
              src="/images/avatar-kundan.jpg"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
            />
            <ChevronDownIcon className="h-4 w-4 stroke-ink-soft" />
          </button>

          <Link
            href="/create"
            className="flex items-center gap-1.5 rounded-pill bg-brand-orange px-3.5 py-2 text-sm font-semibold text-white shadow-card transition-colors hover:bg-brand-orange-dark sm:px-4"
          >
            <PlusIcon className="h-4 w-4 stroke-current" />
            <span className="hidden sm:inline">Create</span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-page lg:hidden"
          >
            {menuOpen ? (
              <CloseIcon className="h-5 w-5 stroke-current" />
            ) : (
              <MenuIcon className="h-5 w-5 stroke-current" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div id="mobile-menu" className="border-t border-line bg-white px-4 pb-4 lg:hidden">
          <label className="relative mt-3 block md:hidden">
            <span className="sr-only">Search people and opportunities</span>
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 stroke-ink-muted" />
            <input
              type="search"
              placeholder="Search people, opportunities..."
              className="w-full rounded-pill border border-transparent bg-page py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-muted focus:border-brand-orange focus:bg-white focus:outline-none"
            />
          </label>
          <nav aria-label="Primary" className="mt-3 grid grid-cols-2 gap-1">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  item.active ? "bg-brand-orange-soft text-brand-orange" : "text-ink-soft hover:bg-page"
                }`}
              >
                <item.icon
                  className={`h-[18px] w-[18px] ${item.active ? "stroke-brand-orange" : "stroke-ink-soft"}`}
                />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

/* --- inline icons (no external icon-font request) --- */
function iconProps(className?: string) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };
}
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1H9.5v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h3a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}
function ProjectsIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M6 3h9l3 3v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M9 12h6M9 16h6" />
    </svg>
  );
}
function OpportunitiesIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  );
}
function ActivitiesIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <rect x="3.5" y="4.5" width="17" height="16" rx="2" />
      <path d="M3.5 9.5h17M8 3v3M16 3v3" />
    </svg>
  );
}
function LeaderboardIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M4 20V11M12 20V4M20 20v-7" />
    </svg>
  );
}
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
function BellIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 13 6 9Z" />
      <path d="M10 18a2 2 0 0 0 4 0" />
    </svg>
  );
}
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
function PlusIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
function MenuIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
function CloseIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
