export default function Loading() {
  return (
    <>
      {/* 🔎 Panel superior skeleton */}
      <div
        className="
        relative
        bg-gradient-to-b from-[#3a3a3a] to-[#2a2a2a]
        pt-10 pb-10 px-14
        shadow-inner
        border-t-4 border-black
        [clip-path:polygon(0_0,100%_0,100%_75%,50%_75%,45%_100%,0_100%)]
        flex flex-col gap-5
        animate-pulse
      "
      >
        <div className="absolute right-6 top-6 w-4 h-4 bg-blue-400 rounded-full opacity-40" />
        <div className="absolute right-14 top-6 w-4 h-4 bg-green-400 rounded-full opacity-40" />
        <div className="absolute top-0 left-0 w-full h-2 bg-red-600" />

        <div className="h-8 w-[15%] bg-yellow-400/30 rounded-lg" />
        <div className="h-12 w-[90%] bg-gray-600 rounded-xl" />
        <div className="h-4 w-[20%] bg-gray-500 rounded-md" />
      </div>

      {/* 🧩 Grid Skeleton */}
      <div className="w-full py-10
    px-4
    sm:px-6
    md:px-10
    lg:px-16
    xl:px-20

    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5

    gap-6  ">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="
              bg-gradient-to-b from-[#2f2f2f] to-[#1f1f1f]
              rounded-xl
              p-6
              flex flex-col items-center
              gap-6
              shadow-lg
              animate-pulse
              w-full aspect-7/8
            "
          >
            <div className="w-[70%] aspect-square bg-gray-600 rounded-full" />
            <div className="h-6 w-[80%] bg-gray-500 rounded" />
            <div className="h-4 w-[50] bg-gray-600 rounded" />
          </div>
        ))}
      </div>
    </>
  );
}