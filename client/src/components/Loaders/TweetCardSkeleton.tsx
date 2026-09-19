const TweetCardSkeleton = () => {
  return (
    <article className="w-full max-w-2xl rounded-3xl border border-border bg-surface p-5 shadow-[0_10px_40px_rgba(22,56,46,0.06)]">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 shrink-0 animate-pulse rounded-full bg-surface-2" />

        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-3.5 w-32 animate-pulse rounded-md bg-surface-2" />
          <div className="h-3 w-20 animate-pulse rounded-md bg-surface-2" />
        </div>
      </div>
      <div className="mt-4 overflow-hidden rounded-2xl">
        <div className="aspect-[16/9] w-full animate-pulse bg-surface-2" />
      </div>

      <div className="mt-4 space-y-2">
        <div className="h-3.5 w-full animate-pulse rounded-md bg-surface-2" />
        <div className="h-3.5 w-[92%] animate-pulse rounded-md bg-surface-2" />
        <div className="h-3.5 w-[60%] animate-pulse rounded-md bg-surface-2" />
      </div>

      <div className="mt-4 border-t border-border pt-3">
        <div className="flex items-center gap-6">

          <div className="flex items-center gap-2">
            <div className="h-9 w-20 animate-pulse rounded-xl bg-surface-2" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-12 animate-pulse rounded-md bg-surface-2" />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-9 w-16 animate-pulse rounded-xl bg-surface-2" />
          </div>

        </div>
      </div>
    </article>
  );
};

export default TweetCardSkeleton;