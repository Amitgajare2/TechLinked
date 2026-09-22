const ProjectLoader = ()=> {

  return (

    <main className="min-h-screen bg-[#f8f5f1]">

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">

        <div className="mb-8">

          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

          <div className="mt-3 h-8 w-72 animate-pulse rounded bg-gray-200" />

          <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-gray-200" />

        </div>


        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

          {[1, 2, 3, 4, 5, 6].map((item) => (

            <div
              key={item}
              className="overflow-hidden rounded-2xl bg-white"
            >

              <div className="h-44 animate-pulse bg-gray-200" />

              <div className="space-y-3 p-5">

                <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />

                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />

                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />

                <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}

export default ProjectLoader;