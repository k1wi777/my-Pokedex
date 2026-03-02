import Image from "next/image";

function getBallByCaptureRate(rate) {
if (rate >= 150) return "/pokeballs/noun-pokeball.svg";
if (rate >= 100) return "/pokeballs/noun-superball.svg";
if (rate >= 45) return "/pokeballs/noun-ultraball.svg";
return "/pokeballs/noun-masterball.svg";
} 

export default function CaptureRateBar({ rate }) {
    
  const percentage = (rate / 255) * 100;

  let color = "bg-green-500";
  let difficulty = "Easy";
  let textColor = 'text-green-500';
  

  if (rate < 100) {
    color = "bg-yellow-500";
    difficulty = "Medium";
    textColor = 'text-yellow-500';
  }

  if (rate < 45) {
    color = "bg-red-500";
    difficulty = "Very Hard";
    textColor = 'text-red-500';
    ;
  }

  const ballIcon = getBallByCaptureRate(rate);

  return (
    <div className="md:space-y-2 relative ">

      {/* Poké Ball background */}
      <Image
        src={ballIcon}
        alt="pokeball"
        width={100}
        height={100}
        className="absolute right-0 md:right-4 top-0 opacity-60 pointer-events-none z-10  w-[20%]"
      />

      <div className="w-[70%] h-2 bg-zinc-700/40 rounded-full  relative   ">
        <div
          className={`${color} h-full transition-all duration-500  rounded-full
  shadow-[0_0_12px_rgba(255,255,255,0.4)] ${textColor}
`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <span className="text-[0.8em] opacity-70 relative z-10 ">
        Difficulty: <span className={`${textColor} font-black`}>{difficulty}</span>
      </span>
    </div>
  );
}