import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  PinIcon,
  ClockIcon,
  RankIcon,
  PointsIcon,
  TrendUpIcon,
  ScreenIcon,
  UsersIcon,
} from "./icons";

type Opportunity = {
  id: string;
  type: "Internship" | "Full-time";
  title: string;
  org: string;
  location: string;
  duration: string;
  image: string;
};

const OPPORTUNITIES: Opportunity[] = [
  {
    id: "1",
    type: "Internship",
    title: "Front Office Trainee",
    org: "Regal Grand Pune",
    location: "Pune",
    duration: "3 months",
    image: "/images/opp-frontoffice.jpg",
  },
  {
    id: "2",
    type: "Full-time",
    title: "F&B Associate",
    org: "Sahara Business Hotel",
    location: "Mumbai",
    duration: "Permanent",
    image: "/images/opp-fnb.jpg",
  },
];

export default function RightSidebar() {
  return (
    <aside className="flex flex-col gap-5" aria-label="Opportunities and activity">
      {/* Opportunities */}
      <section className="rounded-card bg-white p-5 shadow-card">
        <SectionHeader title="Opportunities" sub="Because of your profile" href="/opportunities" />
        <ul className="mt-3 flex flex-col gap-3">
          {OPPORTUNITIES.map((opp) => (
            <li key={opp.id}>
              <Link
                href={`/opportunities/${opp.id}`}
                className={`flex items-center gap-3 rounded-xl border p-2.5 transition-colors hover:border-brand-orange/40 ${
                  opp.type === "Internship" ? "border-teal-soft" : "border-brand-orange-pale"
                }`}
              >
                <Image
                  src={opp.image}
                  alt=""
                  width={480}
                  height={360}
                  className="h-16 w-[72px] shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <span
                    className={`inline-block rounded-pill px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      opp.type === "Internship"
                        ? "bg-teal-soft text-teal-dark"
                        : "bg-brand-orange-pale text-brand-orange-dark"
                    }`}
                  >
                    {opp.type}
                  </span>
                  <p className="mt-1 truncate font-bold text-sm text-ink">{opp.title}</p>
                  <p className="truncate text-xs text-ink-muted">{opp.org}</p>
                  <div className="mt-1 flex items-center gap-3 text-[11px] text-ink-muted">
                    <span className="flex items-center gap-1">
                      <PinIcon className="h-3 w-3 stroke-current" />
                      {opp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <ClockIcon className="h-3 w-3 stroke-current" />
                      {opp.duration}
                    </span>
                  </div>
                </div>
                <ChevronRightIcon className="h-4 w-4 shrink-0 stroke-ink-muted" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Your Progress */}
      <section className="rounded-card bg-white p-5 shadow-card">
        <SectionHeader title="Your Progress" sub="Because of your profile" href="/leaderboard" linkLabel="Leaderboard" />
        <div className="mt-4 grid grid-cols-2 divide-x divide-line border-t border-line pt-4">
          <div>
            <p className="text-xs text-ink-muted">Current Rank</p>
            <p className="mt-1 font-display text-2xl font-bold text-ink">#18</p>
            <RankIcon className="mt-1 h-4 w-4 stroke-fuchsia-500" />
          </div>
          <div className="pl-4">
            <p className="text-xs text-ink-muted">Impact Points</p>
            <p className="mt-1 font-display text-2xl font-bold text-ink">482</p>
            <PointsIcon className="mt-1 h-4 w-4 text-sky-500" />
          </div>
        </div>
        <div className="mt-4">
          <div className="h-2 w-full overflow-hidden rounded-pill bg-page">
            <div className="h-full w-[68%] rounded-pill bg-teal" />
          </div>
          <p className="mt-2 flex items-center gap-1 text-xs text-ink-muted">
            <TrendUpIcon className="h-3.5 w-3.5 stroke-emerald-600" />
            4 this week
          </p>
        </div>
      </section>

      {/* Upcoming Activity */}
      <section className="rounded-card bg-white p-5 shadow-card">
        <SectionHeader title="Upcoming Activity" sub="Because of your profile" href="/activities" />
        <div className="mt-3 flex gap-3">
          <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-page text-center">
            <span className="text-[10px] font-bold uppercase text-ink-muted">Oct</span>
            <span className="-mt-0.5 text-sm font-bold text-ink">05</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-sm text-ink">Hospitality Careers Webinar</p>
            <p className="text-xs text-ink-muted">Learn from industry professionals</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-muted">
              <span className="flex items-center gap-1">
                <ScreenIcon className="h-3.5 w-3.5 stroke-current" />
                Online
              </span>
              <span className="flex items-center gap-1">
                <ClockIcon className="h-3.5 w-3.5 stroke-current" />
                5:00 PM &ndash; 6:00 PM
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="flex items-center gap-1 text-[11px] text-ink-muted">
                <UsersIcon className="h-3.5 w-3.5 stroke-current" />
                120 going
              </span>
              <button
                type="button"
                className="rounded-pill bg-brand-orange-pale px-3.5 py-1 text-xs font-bold text-brand-orange-dark hover:bg-brand-orange hover:text-white"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </section>
    </aside>
  );
}

function SectionHeader({
  title,
  sub,
  href,
  linkLabel = "View all",
}: {
  title: string;
  sub: string;
  href: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div>
        <h2 className="font-display text-base font-bold text-ink">{title}</h2>
        <p className="text-xs text-ink-muted">{sub}</p>
      </div>
      <Link
        href={href}
        className="flex shrink-0 items-center gap-1 text-xs font-semibold text-teal-link hover:text-teal-dark"
      >
        {linkLabel}
        <ArrowRightIcon className="h-3.5 w-3.5 stroke-current" />
      </Link>
    </div>
  );
}
