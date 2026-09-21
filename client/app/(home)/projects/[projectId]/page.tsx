"use client";
import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  ExternalLink,
  GitBranch,
} from "lucide-react";

import {
  useProject,
} from "../../../../src/hooks/Project/useProjects";
import ProjectDetailSkeleton from "@/src/components/User/Projects/ProjectDetail/ProjectDetailSkeleton";
import TeamSection from "@/src/components/User/Projects/ProjectDetail/TeamSection";
import OwnerApplications from "@/src/components/User/Projects/ProjectDetail/OwnerApplications";
import ProjectActionCard from "@/src/components/User/Projects/ProjectDetail/ProjectActionCard";
import OwnerCard from "@/src/components/User/Projects/ProjectDetail/OwnerCard";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();

  const projectId = params.projectId as string;

  const {
    data: project,
    isLoading,
    isError,
  } = useProject(projectId);

  if (isLoading) {
    return <ProjectDetailSkeleton />;
  }

  if (isError || !project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f5f1]">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Project not found
          </h2>

          <button
            onClick={() => router.back()}
            className="mt-4 text-sm font-medium text-[#397A68]"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f5f1]">
      {/* TOP */}
      <div className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 md:px-6">
          <button
            onClick={() => router.back()}
            className="
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-gray-500
              hover:text-gray-900
            "
          >
            <ArrowLeft size={17} />
            Back to projects
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* PROJECT HEADER */}
            <div className="overflow-hidden rounded-2xl border border-black/5 bg-white">
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-64 w-full object-cover md:h-80"
                />
              )}

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span
                      className="
                        rounded-full
                        bg-[#e9f0ed]
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-[#397A68]
                      "
                    >
                      {project.status}
                    </span>

                    <h1 className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl">
                      {project.title}
                    </h1>
                  </div>
                </div>

                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-gray-600">
                  {project.description ||
                    "No description provided."}
                </p>

                {(project.githubUrl ||
                  project.projectUrl) && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          flex
                          items-center
                          gap-2
                          rounded-lg
                          border
                          border-gray-200
                          px-3
                          py-2
                          text-sm
                          font-medium
                          text-gray-700
                          hover:bg-gray-50
                        "
                      >
                        <GitBranch size={16} />
                        GitHub
                        <ExternalLink size={13} />
                      </a>
                    )}

                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          flex
                          items-center
                          gap-2
                          rounded-lg
                          border
                          border-gray-200
                          px-3
                          py-2
                          text-sm
                          font-medium
                          text-gray-700
                          hover:bg-gray-50
                        "
                      >
                        <ExternalLink size={16} />
                        Project
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            <TeamSection project={project} />
            
            {project.viewer.isOwner && (
              <OwnerApplications
                projectId={project.id}
              />
            )}
          </div>

          {/* RIGHT */}
          <aside className="space-y-5">
            <ProjectActionCard project={project} />

            <OwnerCard project={project} />
          </aside>
        </div>
      </div>
    </main>
  );
}


