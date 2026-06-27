import GamesPageBackground from "@/app/games/components/GamesPageBackground";

function SkeletonBar({ className = "" }: { className?: string }) {
  return <div className={`rounded bg-white/10 ${className}`} />;
}

export default function GameDetailLoading() {
  return (
    <>
      <GamesPageBackground />
      <div className="animate-pulse">
        <div className="relative h-[240px] w-full overflow-hidden rounded-b-4xl bg-white/5 sm:h-[300px] md:h-[360px]">
          <SkeletonBar className="absolute left-4 top-4 h-9 w-24 sm:left-8 sm:top-6" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 md:p-10">
            <SkeletonBar className="h-9 w-2/3 max-w-md" />
            <div className="mt-3 flex gap-2">
              <SkeletonBar className="h-7 w-7 rounded-md" />
              <SkeletonBar className="h-7 w-7 rounded-md" />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 md:px-12 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_260px] lg:gap-12">
            <section className="min-w-0">
              <div className="mb-5 border-b border-white/10 pb-3">
                <SkeletonBar className="h-6 w-24" />
              </div>
              <SkeletonBar className="aspect-video w-full rounded-xl" />
              <div className="mt-3 flex gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <SkeletonBar
                    key={index}
                    className="h-16 w-28 shrink-0 rounded-lg"
                  />
                ))}
              </div>
            </section>

            <aside className="w-full lg:w-[260px]">
              <SkeletonBar className="mx-auto h-[300px] w-[200px] rounded-xl lg:mx-0" />
              <SkeletonBar className="mt-6 h-24 w-full rounded-xl" />
              <div className="mt-6">
                <SkeletonBar className="mb-3 h-3 w-36" />
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex justify-between gap-4 border-b border-white/8 py-2.5"
                  >
                    <SkeletonBar className="h-4 w-24" />
                    <SkeletonBar className="h-4 w-20" />
                  </div>
                ))}
              </div>
            </aside>

            <div className="space-y-12 lg:col-span-2">
              <section>
                <div className="mb-5 border-b border-white/10 pb-3">
                  <SkeletonBar className="h-6 w-36" />
                </div>
                <div className="space-y-2">
                  <SkeletonBar className="h-4 w-full" />
                  <SkeletonBar className="h-4 w-full" />
                  <SkeletonBar className="h-4 w-3/4" />
                </div>
              </section>

              <section>
                <div className="mb-5 border-b border-white/10 pb-3">
                  <SkeletonBar className="h-6 w-28" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <SkeletonBar key={index} className="h-20 rounded-xl" />
                  ))}
                </div>
              </section>

              <section className="border-t border-white/10 pt-10">
                <div className="mb-5 border-b border-white/10 pb-3">
                  <SkeletonBar className="h-6 w-52" />
                </div>
                <div className="flex gap-4 overflow-hidden">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <SkeletonBar
                      key={index}
                      className="h-36 w-48 shrink-0 rounded-xl"
                    />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
