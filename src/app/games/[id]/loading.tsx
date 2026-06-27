export default function GameDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse space-y-8 px-6 py-8">
      <div className="h-8 w-32 rounded bg-white/10" />
      <div className="h-[280px] rounded-2xl bg-white/10" />
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex-1 space-y-6">
          <div className="aspect-video rounded-xl bg-white/10" />
          <div className="space-y-2">
            <div className="h-5 w-32 rounded bg-white/10" />
            <div className="h-20 rounded bg-white/5" />
          </div>
        </div>
        <div className="h-80 w-72 rounded-xl bg-white/10" />
      </div>
    </div>
  );
}
