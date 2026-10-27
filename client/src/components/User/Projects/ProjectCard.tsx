
    
  
import Link from "next/link";
import { ArrowRight, FolderKanban, Users } from "lucide-react";
import Avatar from "./Avtar";

type ProjectCardItem = {
  id: string;
  status: string;
  title: string;
  description?: string;
  imageUrl?: string;
  currentMembers: number;
  requiredMembers: number;
  spotsAvailable: number;
  owner: {
    profilePhoto?: string;
    FirstName?: string;
    LastName?: string;
  };
};

function ProjectCard({ project }: { project: ProjectCardItem }) {

  const isOpen = project.status === "OPEN";

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white shadow-[0_2px_5px_rgba(0,0,0,0.04)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(0,0,0,0.08)]"
    >
      <div className="relative m-2.5 mb-0 h-40 overflow-hidden rounded-[15px] bg-[#efebe5] sm:h-44">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#f4f0ea]">
            <FolderKanban size={42} className="text-[#2d403d]/35" />
          </div>
        )}

        <div className="absolute left-3 top-3 rounded-full border border-[#d9d3ce] bg-[#f3f1ee] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] shadow-sm">
          <span className={isOpen ? "text-[#1f2e2b]" : "text-[#5f5b57]"}>
            {project.status}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-0 pt-3.5 sm:px-[18px]">
        <div className="mb-2.5 flex items-center justify-between gap-3">
          <span className="inline-flex max-w-[70%] items-center truncate rounded-lg border border-[#e7d1b0] bg-[#fff7ef] px-2 py-1 text-[11px] font-medium text-[#d9730a]">
            Project
          </span>
          <span className="flex shrink-0 items-center gap-1 text-[11px] text-ink-muted">
            <Users size={13} className="text-[#1f5f56]" />
            {project.currentMembers}/{project.requiredMembers}
          </span>
        </div>

        <h2 className="line-clamp-2 text-[17px] font-bold leading-[1.25] tracking-[-0.02em] text-ink sm:text-[18px]">
          {project.title}
        </h2>

        <p className="mt-1.5 line-clamp-3 min-h-[54px] text-[13px] font-medium leading-[1.45] text-ink-soft">
          {project.description || "No project description provided."}
        </p>

        <div className="mt-3 flex items-center justify-between gap-2 pb-3.5">
          <div className="flex min-w-0 items-center gap-2 text-xs font-semibold text-ink-muted">
            <Users size={16} className="shrink-0 text-ink-muted" />
            <span className="truncate">
              {project.currentMembers}/{project.requiredMembers} members
            </span>
          </div>

          {project.spotsAvailable > 0 && project.status === "OPEN" && (
            <span className="shrink-0 text-[11px] font-bold text-[#d9690a]">
              {project.spotsAvailable} {project.spotsAvailable === 1 ? "spot" : "spots"} left
            </span>
          )}
        </div>

        <div className="-mx-4 mt-auto flex items-center justify-between border-t border-line px-4 py-3 sm:-mx-[18px] sm:px-[18px]">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="shrink-0">
              <Avatar
                src={project.owner.profilePhoto}
                name={`${project.owner.FirstName} ${project.owner.LastName}`}
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-bold text-ink">
                {project.owner.FirstName} {project.owner.LastName}
              </p>
              <p className="mt-0.5 text-[11px] text-ink-muted">Project Creator</p>
            </div>
          </div>
          <span className="ml-2 shrink-0 rounded-full bg-brand-orange px-4 py-2 text-[11px] font-semibold text-white transition group-hover:bg-brand-orange-dark">
            View project <ArrowRight size={12} className="ml-1 inline" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;

