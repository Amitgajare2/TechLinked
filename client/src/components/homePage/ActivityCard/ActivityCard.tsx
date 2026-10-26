import { useState } from "react";
import { X } from "lucide-react";
import { ArrowRight, Clock3,Trophy,Flame } from "reicon-react";

const activities = [
  {
    icon: Trophy,
    title: "Inter-College Culinary Challenge",
    organizer: "IHM Pune",
    info: "24 participants · Applications open",
    deadline: "28 Sep",
  },
  {
    icon: Flame,
    title: "Hospitality Innovation Challenge",
    organizer: "Hotel Leaders Network",
    info: "Team challenge · Open now",
    deadline: "04 Oct",
  },
];




function ActivityCard({
  activity,
}: {
  activity: (typeof activities)[number];
}) {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const Icon = activity.icon;

  return (
    <>
      <div className="rounded-2xl border border-border bg-surface p-4 transition hover:border-border-hover">
        <div className="flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-2">
            <Icon size={16} className="text-primary" />
          </div>

          <div className="min-w-0">
            <h3 className="text-xs font-semibold leading-5">
              {activity.title}
            </h3>

            <p className="mt-1 text-[11px] text-text-muted">
              {activity.organizer}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-[10px] text-text-subtle">
            {activity.info}
          </p>

          <span className="flex items-center gap-1 text-[10px] text-text-muted">
            <Clock3 size={11} />
            {activity.deadline}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowComingSoon(true)}
          className="ui-button-secondary mt-3 flex w-full items-center justify-between px-3 py-2 text-xs"
        >
          View activity
          <ArrowRight size={13} />
        </button>
      </div>

      {showComingSoon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-5 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                  Activity
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  Coming Soon
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowComingSoon(false)}
                className="rounded-full p-1 text-text-subtle transition hover:bg-surface-2 hover:text-foreground"
                aria-label="Close coming soon"
              >
                <X size={16} />
              </button>
            </div>

            <p className="mt-3 text-sm text-text-muted">
              This activity section is not live yet. It will be available soon.
            </p>

            <button
              type="button"
              onClick={() => setShowComingSoon(false)}
              className="mt-5 w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ActivityCard;