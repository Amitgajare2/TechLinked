import { MapPin } from "lucide-react";
import Avatar from "./Avatar";

function TeamMember({
  user,
  label,
}: {
  user: any;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar
          src={user.profilePhoto}
          name={`${user.FirstName} ${user.LastName}`}
        />

        <div>
          <p className="text-sm font-medium text-gray-900">
            {user.FirstName} {user.LastName}
          </p>

          <p className="text-xs text-gray-400">
            {label}
          </p>
        </div>
      </div>

      {user.location && (
        <div className="hidden items-center gap-1 text-xs text-gray-400 sm:flex">
          <MapPin size={13} />
          {user.location}
        </div>
      )}
    </div>
  );
}

export default TeamMember;