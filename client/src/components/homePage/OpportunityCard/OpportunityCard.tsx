import { BriefcaseBusiness } from "lucide-react";
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
  return (
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

      <button className="ui-button-secondary mt-4 flex w-full items-center justify-between px-3 py-2 text-xs font-medium">
        View opportunity
        <ArrowRight size={13} />
      </button>
    </div>
  );
}

export default OpportunityCard;