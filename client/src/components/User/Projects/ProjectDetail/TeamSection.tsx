import { Users } from "lucide-react";
import TeamMember from "./TeamMember";

const TeamSection = ({
  project,
}: {
  project: any;
})=> {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-900">
            Project team
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {project.currentMembers} of{" "}
            {project.requiredMembers} spots filled
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-sm font-semibold text-[#397A68]">
          <Users size={17} />

          {project.currentMembers}/
          {project.requiredMembers}
        </div>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-[#397A68]"
          style={{
            width: `${Math.min(
              (project.currentMembers /
                project.requiredMembers) *
                100,
              100
            )}%`,
          }}
        />
      </div>

      <div className="mt-6 space-y-3">
        <TeamMember
          user={project.owner}
          label="Project owner"
        />

        {project.members.map(
          (member: any) => (
            <TeamMember
              key={member.id}
              user={member.user}
              label="Member"
            />
          )
        )}
      </div>
    </div>
  );
}

export default TeamSection;