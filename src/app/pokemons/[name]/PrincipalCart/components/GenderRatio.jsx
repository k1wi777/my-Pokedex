export default function GenderRatio({ rate }) {
  if (rate === -1) {
    return <span className="italic text-gray-500 py-2 text-md ">Genderless</span>;
  }

  const female = (rate / 8) * 100;
  const male = 100 - female;

  return (
    <div className="space-y-1 ">
      <div className="">

        <div className="w-full h-1  rounded-full overflow-hidden flex ">
          <div
            className="bg-blue-500 transition-all duration-500 h-full"
            style={{ width: `${male}%` }}
          />
          <div
            className="bg-pink-500 transition-all duration-500"
            style={{ width: `${female}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between text-[0.8em] ">
        <span className="text-blue-600 font-black">♂ {male.toFixed(0)}%</span>
        <span className="text-pink-600 font-black">♀ {female.toFixed(0)}%</span>
      </div>
    </div>
  );
}