export default function GrowthRateBadge({ value }) {
  const styles = {
    fast: "bg-green-500/20 text-green-600 border-green-500",
    medium: "bg-yellow-500/20 text-yellow-600 border-yellow-500",
    slow: "bg-red-500/20 text-red-600 border-red-500",
    fluctuating: "bg-purple-500/20 text-purple-600 border-purple-500",
    erratic: "bg-pink-500/20 text-pink-600 border-pink-500",
  };

  return (
    <span
      className={`px-2 md:px-4 xl:px-5 lg:ml-2 xl:ml-4 rounded-full  border-2 font-semibold capitalize 
hover:scale-105
transition-transform duration-300 text-[0.9em] ${styles[value] || "bg-gray-500/20 text-gray-600"
        }`}
    >
      {value}
    </span>
  );
}