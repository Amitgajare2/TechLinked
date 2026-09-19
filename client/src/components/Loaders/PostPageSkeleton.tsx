function PostPageSkeleton() {
  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-[1360px] px-4 py-8 lg:px-6">

        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-[260px_minmax(0,680px)_320px]
          "
        >

          <div className="hidden lg:block">
            <div className="h-[394px] animate-pulse rounded-2xl bg-surface-2" />
          </div>

          <div>
            <div className="h-[324px] animate-pulse rounded-2xl bg-surface-2" />
          </div>

          <div className="hidden lg:block">
            <div className="h-[624px] animate-pulse rounded-2xl bg-surface-2" />
          </div>

        </div>
      </div>
    </main>
  );
}

export default PostPageSkeleton