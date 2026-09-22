import { FolderKanban } from "lucide-react";

interface ProjectsProps {
  setCreateProjectModal: (value?: boolean) => void;
}

const EmptyProjects = ({ setCreateProjectModal }: ProjectsProps) => {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center text-center">

      <div className="mb-4 rounded-2xl bg-[#e9f0ed] p-4">

        <FolderKanban
          size={32}
          className="text-[#397A68]"
        />

      </div>

      <h2 className="text-lg font-semibold text-gray-900">
        No projects yet
      </h2>

      <p className="mt-1 max-w-sm text-sm text-gray-500">
        Be the first person to create a project
        and find collaborators.
      </p>

      <button
        onClick={() => setCreateProjectModal(true)}
        className="
          mt-5
          rounded-xl
          bg-[#397A68]
          px-4
          py-2.5
          text-sm
          font-semibold
          text-white
        "
      >
        Create Project
      </button>

    </div>
  );
}

export default EmptyProjects;