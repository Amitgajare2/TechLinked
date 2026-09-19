import { ChevronRight } from "reicon-react";

function ExploreItem({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: any;
  title: string;
  subtitle: string;
}) {
  return (
    <button className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-surface">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-primary transition group-hover:bg-surface-2">
        <Icon size={16} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">
          {title}
        </p>

        <p className="mt-0.5 text-[11px] text-text-subtle">
          {subtitle}
        </p>
      </div>

      <ChevronRight
        size={15}
        className="text-text-subtle transition group-hover:translate-x-1 group-hover:text-primary"
      />
    </button>
  );
}

export default ExploreItem;