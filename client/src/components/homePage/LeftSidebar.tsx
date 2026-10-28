import Image from "next/image";
import Link from "next/link";
import {
  ProjectsIcon,
  BriefcaseIcon,
  BookmarkIcon,
  ActivitiesIcon,
  LeaderboardIcon,
  SettingsIcon,
  ChevronRightIcon,
} from "./icons";

const QUICK_LINKS = [
  { label: "My Projects", href: "/projects/mine", icon: ProjectsIcon },
  { label: "My Opportunities", href: "/opportunities/mine", icon: BriefcaseIcon },
  { label: "Saved posts", href: "/saved", icon: BookmarkIcon },
  { label: "My Activities", href: "/activities/mine", icon: ActivitiesIcon },
  { label: "Leaderboard", href: "/leaderboard", icon: LeaderboardIcon },
  { label: "Settings", href: "/settings", icon: SettingsIcon },
];

export default function LeftSidebar() {
  return (
    <aside className="flex flex-col gap-5" aria-label="Your profile">
      {/* Profile card */}
      <div className="rounded-card bg-white p-5 shadow-card">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <Image
              src="/images/avatar-kundan.jpg"
              alt=""
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover"
            />
            <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-display text-base font-semibold text-ink">Kundan Patil</p>
            <p className="text-sm text-ink-muted">@Kundan</p>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-sm font-semibold text-ink">Hospitality Student</p>
          <p className="text-sm text-ink-muted">Pune, India</p>
        </div>

        <dl className="mt-4 grid grid-cols-3 divide-x divide-line border-t border-line pt-4 text-center">
          <div>
            <dt className="sr-only">Posts</dt>
            <dd className="font-display text-lg font-bold text-ink">2</dd>
            <dd className="text-[11px] text-ink-muted">Posts</dd>
          </div>
          <div>
            <dt className="sr-only">Impact Points</dt>
            <dd className="font-display text-lg font-bold text-ink">20</dd>
            <dd className="text-[11px] text-ink-muted">Impact Points</dd>
          </div>
          <div>
            <dt className="sr-only">Community Rank</dt>
            <dd className="font-display text-lg font-bold text-ink">#18</dd>
            <dd className="text-[11px] text-ink-muted">Community Rank</dd>
          </div>
        </dl>

        <Link
          href="/profile"
          className="mt-4 block rounded-pill bg-brand-orange-soft py-2.5 text-center text-sm font-bold text-brand-orange-dark transition-colors hover:bg-brand-orange hover:text-white"
        >
          View Profile
        </Link>
      </div>

      {/* Quick links card */}
      {/* <nav aria-label="Quick links" className="rounded-card bg-white p-5 shadow-card">
        <h2 className="font-display text-base font-bold text-brand-orange-dark">Quick Links</h2>
        <ul className="mt-2 divide-y divide-line">
          {QUICK_LINKS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex items-center justify-between gap-2 py-3 text-sm text-ink-soft transition-colors hover:text-ink"
              >
                <span className="flex items-center gap-2.5">
                  <item.icon className="h-[18px] w-[18px] shrink-0 stroke-current" />
                  {item.label}
                </span>
                <ChevronRightIcon className="h-4 w-4 shrink-0 stroke-ink-muted" />
              </Link>
            </li>
          ))}
        </ul>
      </nav> */}

      {/* Promo card */}
      <div className="relative hidden overflow-hidden rounded-card md:block">
        <Image
          src="/images/promo-lobby.jpg"
          alt="A warmly lit hotel lobby lounge"
          width={640}
          height={900}
          className="h-52 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <p className="absolute bottom-4 left-4 right-4 font-display text-sm font-bold uppercase tracking-wide text-white">
          A Brighter Hospitality Tomorrow
        </p>
      </div>
    </aside>
  );
}
