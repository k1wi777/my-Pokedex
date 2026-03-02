
export function getRegionStyle(gen) {
  const styles = {
    "generation-i": "from-red-500/30 to-orange-500/30 text-red-700 border-red-500",
    "generation-ii": "from-yellow-400/30 to-amber-500/30 text-amber-700 border-amber-500",
    "generation-iii": "from-blue-500/30 to-cyan-400/30 text-blue-700 border-blue-500",
    "generation-iv": "from-gray-400/30 to-slate-500/30 text-slate-700 border-slate-500",
    "generation-v": "from-gray-700/30 to-gray-900/30 text-gray-800 border-gray-700",
    "generation-vi": "from-sky-400/30 to-cyan-300/30 text-sky-700 border-sky-500",
    "generation-vii": "from-orange-400/30 to-red-400/30 text-orange-700 border-orange-500",
    "generation-viii": "from-purple-500/30 to-indigo-500/30 text-purple-700 border-purple-500",
    "generation-ix": "from-teal-400/30 to-emerald-400/30 text-teal-700 border-teal-500",
  };

  return styles[gen] || "from-gray-300/30 to-gray-400/30 text-gray-700 border-gray-400";
}
export function getRegionCardBackground(gen) {
  const backgrounds = {
    "generation-i": "from-red-500/20 via-white/10 /80 to-orange-500/20",
    "generation-ii": "from-yellow-400/20 via-white/10 /80 to-amber-500/20",
    "generation-iii": "from-blue-500/20 via-white/10 /80 to-cyan-400/20",
    "generation-iv": "from-indigo-400/20 via-white/10 /80 to-purple-400/20",
    "generation-v": "from-gray-700/30 via-white/10 /80 to-gray-900/30",
    "generation-vi": "from-sky-400/20 via-white/10 /80 to-cyan-300/20",
    "generation-vii": "from-orange-400/20 via-white/10 /80 to-red-400/20",
    "generation-viii": "from-purple-500/20 via-white/10 /80 to-indigo-500/20",
    "generation-ix": "from-teal-400/20 via-white/10 /80 to-emerald-400/20",
  };

  return backgrounds[gen] || "from-gray-500/20 via-zinc-900/80 to-gray-700/20";
}
export function getRegionShadow(gen) {
  const shadows = {
    "generation-i": "shadow-[0_0_20px_rgba(239,68,68,0.35)]",
    "generation-ii": "shadow-[0_0_20px_rgba(234,179,8,0.35)]",
    "generation-iii": "shadow-[0_0_20px_rgba(59,130,246,0.35)]",
    "generation-iv": "shadow-[0_0_20px_rgba(99,102,241,0.35)]",
    "generation-v": "shadow-[0_0_20px_rgba(75,85,99,0.35)]",
    "generation-vi": "shadow-[0_0_20px_rgba(14,165,233,0.35)]",
    "generation-vii": "shadow-[0_0_20px_rgba(249,115,22,0.35)]",
    "generation-viii": "shadow-[0_0_20px_rgba(168,85,247,0.35)]",
    "generation-ix": "shadow-[0_0_20px_rgba(20,184,166,0.35)]",
  };

  return shadows[gen] || "shadow-[0_0_50px_rgba(255,255,255,0.2)]";
}