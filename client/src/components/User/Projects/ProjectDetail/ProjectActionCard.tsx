import { useApplyToProject, useWithdrawApplication } from "@/src/hooks/Project/useProjects";
import { Check, Clock3, Users } from "lucide-react";
import { useState } from "react";

function ProjectActionCard({
  project,
}: {
  project: any;
}) {
  const [message, setMessage] = useState("");
  const [showApplyBox, setShowApplyBox] = useState(false);

  const applyMutation = useApplyToProject();

  const {
    mutate: withdrawApplication,
    isPending: isWithdrawing,
  } = useWithdrawApplication();

  const handleApply = () => {
    applyMutation.mutate({
      projectId: project.id,
      message,
    });
  };

  /* OWNER */
  if (project.viewer.isOwner) {
    return (
      <div className="rounded-2xl border border-black/5 bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          Your project
        </p>

        <h3 className="mt-2 font-semibold text-gray-900">
          Manage your project
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Review applications and build your team.
        </p>
      </div>
    );
  }

  /* MEMBER */
  if (project.viewer.isMember) {
    return (
      <div className="rounded-2xl border border-[#397A68]/20 bg-white p-5">
        <div className="flex items-center gap-2 text-[#397A68]">
          <Check size={19} />

          <span className="font-semibold">
            You're part of this project
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          You have been accepted as a project member.
        </p>
      </div>
    );
  }

  /* PENDING */
  if (
    project.viewer.applicationStatus ===
    "PENDING"
  ) {
    const handleWithdraw = () => {
      const confirmed = window.confirm(
        "Are you sure you want to withdraw your application?"
      );

      if (!confirmed) {
        return;
      }

      withdrawApplication(project.id);
    };

    return (
      <div className="rounded-2xl border border-black/5 bg-white p-5">
        <div className="flex items-center gap-2 text-orange-500">
          <Clock3 size={18} />

          <span className="font-semibold">
            Application pending
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          The project owner will review your request.
        </p>

        <button
          type="button"
          onClick={handleWithdraw}
          disabled={isWithdrawing}
          className="
            mt-5
            w-full
            rounded-xl
            border
            border-red-200
            px-4
            py-2.5
            text-sm
            font-semibold
            text-red-600
            transition
            hover:bg-red-50
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {isWithdrawing
            ? "Withdrawing..."
            : "Withdraw Application"}
        </button>
      </div>
    );
  }

  /* FULL */
  if (
    project.status !== "OPEN" ||
    project.spotsAvailable <= 0
  ) {
    return (
      <div className="rounded-2xl border border-black/5 bg-white p-5">
        <div className="flex items-center gap-2 text-gray-500">
          <Users size={18} />

          <span className="font-semibold">
            Project is full
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          This project is no longer accepting members.
        </p>
      </div>
    );
  }

  /* APPLY */
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5">
      <h3 className="font-semibold text-gray-900">
        Interested in joining?
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        Introduce yourself to the project owner.
      </p>

      {!showApplyBox ? (
        <button
          type="button"
          onClick={() => setShowApplyBox(true)}
          className="
            mt-5
            w-full
            rounded-xl
            bg-[#397A68]
            px-4
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-[#2f6657]
          "
        >
          Apply to Join
        </button>
      ) : (
        <div className="mt-5">
          <textarea
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Why would you like to join this project?"
            className="min-h-[110px] w-full resize-none rounded-xl border border-gray-200 p-3 text-sm outline-none  focus:border-[#397A68]"/>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() =>
                setShowApplyBox(false)
              }
              className="
                flex-1
                rounded-xl
                border
                border-gray-200
                px-3
                py-2.5
                text-sm
                font-medium
              "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleApply}
              disabled={applyMutation.isPending}
              className="
                flex-1
                rounded-xl
                bg-[#397A68]
                px-3
                py-2.5
                text-sm
                font-semibold
                text-white
                disabled:opacity-50
              "
            >
              {applyMutation.isPending
                ? "Sending..."
                : "Send Application"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectActionCard;