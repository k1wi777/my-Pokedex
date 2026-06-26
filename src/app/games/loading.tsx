export default function GamesLoading() {
  return (
    <div className="min-h-screen px-6 py-8 sm:px-10 md:px-12">
      <div className="mx-auto max-w-7xl space-y-8 animate-pulse">
        <div className="h-10 w-64 rounded-lg bg-white/10" />
        <div className="h-4 w-96 max-w-full rounded bg-white/5" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-8 w-24 rounded-full bg-white/10" />
          ))}
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="h-6 w-48 rounded bg-white/10" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, j) => (
                <div key={j} className="aspect-[2/3] rounded-2xl bg-white/10" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
