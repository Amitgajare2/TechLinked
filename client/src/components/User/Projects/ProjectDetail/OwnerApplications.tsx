import { useAcceptApplication, useProjectApplications, useRejectApplication } from "@/src/hooks/Project/useProjects";
import { MessageCircle } from "lucide-react";
import ApplicationCard from "./ApplicationCard";

const OwnerApplications = ({
  projectId,
}: {
  projectId: string;
}) =>{
  const {
    data: applications,
    isLoading,
  } = useProjectApplications(projectId);

  const acceptMutation =
    useAcceptApplication();

  const rejectMutation =
    useRejectApplication();

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white p-6">
        <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
      </div>
    );
  }

  const pendingApplications =
    applications?.filter(
      (application: any) =>
        application.status === "PENDING"
    ) || [];

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-900">
            Join requests
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Review students who want to join.
          </p>
        </div>

        {pendingApplications.length > 0 && (
          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
            {pendingApplications.length} pending
          </span>
        )}
      </div>

      {pendingApplications.length === 0 ? (
        <div className="mt-6 rounded-xl bg-gray-50 p-6 text-center">
          <MessageCircle
            size={24}
            className="mx-auto text-gray-300"
          />

          <p className="mt-2 text-sm font-medium text-gray-700">
            No pending requests
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Applications will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {pendingApplications.map(
            (application: any) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onAccept={() =>
                  acceptMutation.mutate({
                    projectId,
                    applicationId:
                      application.id,
                  })
                }
                onReject={() =>
                  rejectMutation.mutate({
                    projectId,
                    applicationId:
                      application.id,
                  })
                }
                accepting={
                  acceptMutation.isPending
                }
                rejecting={
                  rejectMutation.isPending
                }
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default OwnerApplications;
