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
  const Icon = activity.icon;

  return (
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

      <button className="ui-button-secondary mt-3 flex w-full items-center justify-between px-3 py-2 text-xs">
        View activity
        <ArrowRight size={13} />
      </button>
    </div>
  );
}

export default ActivityCard;