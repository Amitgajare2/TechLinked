"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Users } from "lucide-react";

import { createProject } from "../../../src/API/User/Project/project.api";


export default function CreateProjectPage() {

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [requiredMembers, setRequiredMembers] =
    useState(1);

  const [githubUrl, setGithubUrl] =
    useState("");

  const [projectUrl, setProjectUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  const handleSubmit = async (
    e: FormEvent
  ) => {

    e.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Project title is required");
      return;
    }

    try {

      setLoading(true);

      const project = await createProject({
        title: title.trim(),
        description: description.trim(),
        requiredMembers,
        githubUrl: githubUrl.trim() || undefined,
        projectUrl: projectUrl.trim() || undefined,
      });

      router.push(
        `/projects/${project.id}`
      );

    } catch (err: any) {

      setError(
        err?.response?.data?.message ||
          "Failed to create project"
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <main onClick={(e)=>e.stopPropagation()}>

      <div className="mx-auto max-w-2xl px-4 py-8 md:px-6">

        {/* <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-500"
        >
          <ArrowLeft size={17} />
          Back
        </button> */}


        <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6 md:p-8">

          <h1 className="text-2xl font-bold text-gray-900">
            Create a project
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Tell the community what you're building
            and find people to work with.
          </p>


          {error && (

            <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>

          )}


          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >

            <div>

              <label className="text-sm font-medium text-gray-800">
                Project title
              </label>

              <input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="e.g. Build a food delivery app"
                className="
                  mt-2
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  px-4
                  py-3
                  text-sm
                  outline-none
                  focus:border-[#397A68]
                "
              />

            </div>

            <div>

              <label className="text-sm font-medium text-gray-800">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                placeholder="What are you building? What kind of people are you looking for?"
                className="
                  mt-2
                  min-h-[150px]
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-gray-200
                  px-4
                  py-3
                  text-sm
                  outline-none
                  focus:border-[#397A68]
                "
              />

            </div>


            {/* MEMBERS */}

            <div>

              <label className="text-sm font-medium text-gray-800">
                How many collaborators do you need?
              </label>

              <div className="mt-2 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e9f0ed] text-[#397A68]">
                  <Users size={19} />
                </div>

                <input
                  type="number"
                  min={1}
                  value={requiredMembers}
                  onChange={(e) =>
                    setRequiredMembers(
                      Math.max(
                        1,
                        Number(e.target.value)
                      )
                    )
                  }
                  className="
                    w-24
                    rounded-xl
                    border
                    border-gray-200
                    px-4
                    py-3
                    text-sm
                    outline-none
                    focus:border-[#397A68]
                  "
                />

                <span className="text-sm text-gray-500">
                  additional collaborators
                </span>

              </div>

            </div>


            {/* GITHUB */}

            <div>

              <label className="text-sm font-medium text-gray-800">
                GitHub URL
                <span className="ml-1 text-gray-400">
                  (optional)
                </span>
              </label>

              <input
                value={githubUrl}
                onChange={(e) =>
                  setGithubUrl(e.target.value)
                }
                placeholder="https://github.com/..."
                className="
                  mt-2
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  px-4
                  py-3
                  text-sm
                  outline-none
                  focus:border-[#397A68]
                "
              />

            </div>


            {/* PROJECT URL */}

            <div>

              <label className="text-sm font-medium text-gray-800">
                Live project URL
                <span className="ml-1 text-gray-400">
                  (optional)
                </span>
              </label>

              <input
                value={projectUrl}
                onChange={(e) =>
                  setProjectUrl(e.target.value)
                }
                placeholder="https://..."
                className="
                  mt-2
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  px-4
                  py-3
                  text-sm
                  outline-none
                  focus:border-[#397A68]
                "
              />

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="
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
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading
                ? "Creating..."
                : "Create Project"}
            </button>

          </form>

        </div>

      </div>

    </main>
  );
}