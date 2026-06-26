export default function GamesPageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#171717]" />

      <div className="absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-[120px]" />
      <div className="absolute top-1/3 -right-20 h-[380px] w-[380px] rounded-full bg-red-500/10 blur-[100px]" />
      <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-cyan-500/8 blur-[90px]" />
    </div>
  );
}
