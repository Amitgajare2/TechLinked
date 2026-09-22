import { MapPin } from "lucide-react";
import Avatar from "./Avatar";

const OwnerCard = ({
  project,
}: {
  project: any;
}) =>{
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        Created by
      </p>

      <div className="mt-4 flex items-center gap-3">
        <Avatar
          src={project.owner.profilePhoto}
          name={`${project.owner.FirstName} ${project.owner.LastName}`}
        />

        <div>
          <p className="font-semibold text-gray-900">
            {project.owner.FirstName}{" "}
            {project.owner.LastName}
          </p>

          {project.owner.location && (
            <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
              <MapPin size={12} />
              {project.owner.location}
            </p>
          )}
        </div>
      </div>

      {project.owner.bio && (
        <p className="mt-4 text-sm leading-6 text-gray-500">
          {project.owner.bio}
        </p>
      )}
    </div>
  );
}

export default OwnerCard;