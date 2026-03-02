export default function ExperienceBadge({ value }) {
  return (
    <div className="ml-3 inline-flex items-center gap-2  text-green-800 px-2 md:px-4 lg:px-5 py-1 rounded-full font-semibold bg-emerald-500/20
border border-emerald-400/40
shadow-[0_0_10px_rgba(16,185,129,0.4)] text-[0.8em]">

      <p>{value} <span className="font-black">XP</span> </p>
    </div>
  );
}