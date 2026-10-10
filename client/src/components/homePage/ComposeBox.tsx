import Image from "next/image";
import { ImageIcon, DocIcon, PollIcon, ExperienceIcon } from "./icons";

const ACTIONS = [
  { label: "Photo", icon: ImageIcon },
  { label: "Project", icon: DocIcon },
  { label: "Poll", icon: PollIcon },
  { label: "Experience", icon: ExperienceIcon },
];

export default function ComposeBox({ name = "Kundan" }: { name?: string }) {
  return (
    <div className="rounded-card bg-white p-4 shadow-card sm:p-5">
      <div className="flex items-center gap-3">
        <Image
          src="/images/avatar-kundan.jpg"
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
        <label className="relative block w-full">
          <span className="sr-only">What&rsquo;s on your mind, {name}?</span>
          <input
            type="text"
            placeholder={`What's on your mind, ${name}?`}
            className="w-full rounded-pill bg-page px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:bg-white focus:outline focus:outline-2 focus:outline-brand-orange"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          {ACTIONS.map((action) => (
            <button
              key={action.label}
              type="button"
              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:bg-page hover:text-ink"
            >
              <action.icon className="h-[18px] w-[18px] stroke-current" />
              {action.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="rounded-pill bg-brand-orange px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-orange-dark"
        >
          Post
        </button>
      </div>
    </div>
  );
}
