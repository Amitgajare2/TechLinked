const ProjectDetailSkeleton = () => {
  return (
    <main className="min-h-screen bg-[#f8f5f1]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="h-5 w-28 animate-pulse rounded bg-gray-200" />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-5">
            <div className="h-[450px] animate-pulse rounded-2xl bg-gray-200" />

            <div className="h-64 animate-pulse rounded-2xl bg-gray-200" />
          </div>

          <div className="h-52 animate-pulse rounded-2xl bg-gray-200" />
        </div>
      </div>
    </main>
  );
}

export default ProjectDetailSkeleton;