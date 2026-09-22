"use client";
import {
  FolderKanban,
  Plus,
} from "lucide-react";

import { useProjects } from "../../../src/hooks/Project/useProjects";
import ProjectLoader from "@/src/components/User/Projects/ProjectLoader";
import ProjectCard from "@/src/components/User/Projects/ProjectCard";
import { useState } from "react";
import EmptyProjects from "@/src/components/User/Projects/EmptyProject";
import CreateProjectPage from "@/src/components/Models/CreateProjectModal";


export default function ProjectsPage() {
  const {
    data: projects,
    isLoading,
    isError,
  } = useProjects();

  const [createProjectModal,setCreateProjectModal] = useState(false);

  const handleCreateProject = (data:any) => {
    setCreateProjectModal(data);
  };


  if (isLoading) {
    return <ProjectLoader/>
  }


  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-red-500">
          Failed to load projects. Please try again.
        </p>
      </div>
    );
  }


  return (
    <main className="min-h-screen bg-[#f8f5f1]">

      {/* HEADER */}

      <section className="border-b border-black/5 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">

          <div className="flex items-center justify-between gap-4">

            <div>

              <div className="mb-2 flex items-center gap-2 text-sm text-[#397A68]">
                <FolderKanban size={17} />
                <span>Projects</span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Build something together
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                Discover projects created by students and
                join teams where you can contribute your skills.
              </p>

            </div>


            <button
            onClick={()=>{setCreateProjectModal(true)}}
              className="
                flex
                shrink-0
                items-center
                gap-2
                rounded-xl
                bg-[#397A68]
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#2f6657]
              "
            >
              <Plus size={18} />
              <span className="hidden sm:block">
                Create Project
              </span>
            </button>

          </div>

        </div>

      </section>


      {/* PROJECT LIST */}

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">

        {!projects?.length ? (
          <EmptyProjects
          setCreateProjectModal={handleCreateProject}
           />
        ) : (

          <div
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
              lg:grid-cols-3
            "
          >

            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}

          </div>

        )}

      </section>

      {
        createProjectModal && (
          <div className="h-screen w-full fixed top-0 left-0 bg-black/30" onClick={()=>{setCreateProjectModal(false)}}>
            <CreateProjectPage/>
          </div>
        )
      }

    </main>
  );
}

