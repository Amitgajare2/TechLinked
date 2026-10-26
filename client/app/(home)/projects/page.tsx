"use client";
import {
  FolderKanban,
  Plus,
} from "lucide-react";

// import { useProjects } from "../../../src/hooks/Project/useProjects";
import ProjectLoader from "@/src/components/User/Projects/ProjectLoader";
import ProjectCard from "@/src/components/User/Projects/ProjectCard";
import { useState } from "react";
import EmptyProjects from "@/src/components/User/Projects/EmptyProject";
import CreateProjectPage from "@/src/components/Models/CreateProjectModal";


export default function ProjectsPage() {
  // const {
  //   data: projects,
  //   isLoading,
  //   isError,
  // } = useProjects();

  const projects = [
    {
      id: "project-1",
      title: "Hospitality Guest Experience Dashboard",
      description: "A collaborative project to design a guest feedback dashboard for boutique hotels.",
      category: "Product Design",
      members: 5,
      createdAt: "2026-10-23T00:00:00.000Z",
      imageUrl: "",
      status: "OPEN",
      currentMembers: 3,
      requiredMembers: 5,
      spotsAvailable: 2,
      owner: {
        FirstName: "Ananya",
        LastName: "Deshmukh",
        profilePhoto: "",
      },
    },
    {
      id: "project-2",
      title: "Smart Room Service Workflow",
      description: "Improving room service coordination and guest response speed using a simple digital workflow.",
      category: "Operations",
      members: 4,
      createdAt: "2026-10-20T00:00:00.000Z",
      imageUrl: "",
      status: "OPEN",
      currentMembers: 2,
      requiredMembers: 4,
      spotsAvailable: 2,
      owner: {
        FirstName: "Rohan",
        LastName: "Mehta",
        profilePhoto: "",
      },
    },
  ];

  const [createProjectModal,setCreateProjectModal] = useState(false);

  const handleCreateProject = (data:any) => {
    setCreateProjectModal(data);
  };


  // if (isLoading) {
  //   return <ProjectLoader/>
  // }


  // if (isError) {
  //   return (
  //     <div className="flex min-h-[60vh] items-center justify-center">
  //       <p className="text-sm text-red-500">
  //         Failed to load projects. Please try again.
  //       </p>
  //     </div>
  //   );
  // }


  return (
    <main className="min-h-screen bg-background text-text-primary">

      {/* HEADER */}

      <section className="border-b border-border bg-surface">

        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">

          <div className="flex items-center justify-between gap-4">

            <div>

              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                <FolderKanban size={17} />
                <span>Projects</span>
              </div>

              <h1 className="text-2xl font-bold tracking-[-0.03em] text-text-primary md:text-3xl">
                Build something together
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-text-muted">
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
                bg-primary
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-primary/90
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
          <div className="h-screen w-full fixed top-0 bg-black/30" onClick={()=>{setCreateProjectModal(false)}}>
            <div>
              <CreateProjectPage/>
            </div>
          </div>
        )
      }

    </main>
  );
}

