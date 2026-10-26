import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  FolderKanban,
  Plus,
  Users,
} from "lucide-react";
import Avatar from "./Avtar";

function ProjectCard({
  project,
}: {
  project: any;
}) {

  const isOpen = project.status === "OPEN";

  return (

    <Link
      href={`/projects/${project.id}`}
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-border
        bg-surface
        shadow-sm
        transition
        hover:-translate-y-1
        hover:border-primary-border
        hover:shadow-md
      "
    >

      {/* IMAGE */}

      <div className="relative h-44 overflow-hidden bg-surface-2">

        {project.imageUrl ? (

          <img
            src={project.imageUrl}
            alt={project.title}
            className="
              h-full
              w-full
              object-cover
              transition
              duration-500
              group-hover:scale-105
            "
          />

        ) : (

          <div className="flex h-full items-center justify-center">

            <FolderKanban
              size={42}
              className="text-primary/30"
            />

          </div>

        )}


        <div
          className="
            absolute
            left-3
            top-3
            rounded-full
            bg-surface
            px-3
            py-1
            text-xs
            font-semibold
            shadow-sm
          "
        >
          <span
            className={
              isOpen
                ? "text-primary"
                : "text-text-muted"
            }
          >
            {project.status}
          </span>
        </div>

      </div>


      {/* CONTENT */}

      <div className="p-5">

        <h2 className="line-clamp-1 text-lg font-semibold tracking-[-0.02em] text-text-primary">
          {project.title}
        </h2>

        <p className="mt-2 line-clamp-2 min-h-[42px] text-sm leading-5 text-text-muted">
          {project.description ||
            "No project description provided."}
        </p>


        {/* OWNER */}

        <div className="mt-4 flex items-center gap-2">

          <Avatar
            src={project.owner.profilePhoto}
            name={`${project.owner.FirstName} ${project.owner.LastName}`}
          />

          <div>

            <p className="text-xs font-medium text-text-primary">
              {project.owner.FirstName}{" "}
              {project.owner.LastName}
            </p>

            <p className="text-[11px] text-text-subtle">
              Project creator
            </p>

          </div>

        </div>


        {/* FOOTER */}

        <div
          className="
            mt-5
            flex
            items-center
            justify-between
            border-t
            border-black/5
            pt-4
          "
        >

          <div className="flex items-center gap-1.5 text-xs text-text-muted">

            <Users size={15} />

            <span>
              {project.currentMembers}/
              {project.requiredMembers}
            </span>

            <span>members</span>

          </div>


          {project.spotsAvailable > 0 &&
            project.status === "OPEN" && (

              <span className="text-xs font-semibold text-primary">
                {project.spotsAvailable}{" "}
                {project.spotsAvailable === 1
                  ? "spot"
                  : "spots"}{" "}
                left
              </span>

            )}

        </div>

      </div>

    </Link>
  );
}

export default ProjectCard;