import { useState } from "react";
import { BriefcaseBusiness, X } from "lucide-react";
import { ArrowRight } from "reicon-react";

const opportunities = [
  {
    type: "INTERNSHIP",
    title: "Front Office Trainee",
    company: "Regal Grand Pune",
    location: "Pune",
    meta: "3 months",
  },
  {
    type: "FULL-TIME",
    title: "F&B Associate",
    company: "Sahara Business Hotel",
    location: "Mumbai",
    meta: "Entry level",
  },
];

function OpportunityCard({
  item,
}: {
  item: (typeof opportunities)[number];
}) {
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <>
      <div className="group rounded-2xl border border-border bg-surface p-4 transition duration-200 hover:border-primary-border">
        <div className="flex items-center justify-between">
          <span className="rounded-md bg-surface-2 px-2 py-1 text-[9px] font-semibold tracking-[0.12em] text-primary">
            {item.type}
          </span>

          <BriefcaseBusiness
            size={15}
            className="text-text-subtle group-hover:text-primary"
          />
        </div>

        <h3 className="mt-4 text-sm font-semibold">
          {item.title}
        </h3>

        <p className="mt-1 text-xs text-text-secondary">
          {item.company}
        </p>

        <div className="mt-3 flex items-center justify-between text-[11px] text-text-subtle">
          <span>{item.location}</span>
          <span>{item.meta}</span>
        </div>

        <button
          type="button"
          onClick={() => setShowComingSoon(true)}
          className="ui-button-secondary mt-4 flex w-full items-center justify-between px-3 py-2 text-xs font-medium"
        >
          View opportunity
          <ArrowRight size={13} />
        </button>
      </div>

      {showComingSoon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-5 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                  Opportunity
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
              This opportunity section is not live yet. It will be available soon.
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

export default OpportunityCard;