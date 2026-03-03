import TypeRow from "./components/TypeRow";

export default function TypeEffectCard({ defensive, offensive }) {
  return (
    <div className="flex flex-col  items-center    h-full">
      <h3
        className="  font-black tracking-wider
  text-yellow-400
  drop-shadow-lg
  border-b border-yellow-500/40
  pb-2
  mb-2"
      >
        Type Matchups
      </h3>

      {/* Content */}
      <div className="relative z-10 text-[0.8em] flex flex-col xl:flex-row gap-3 h-full">
        {/* DEFENSIVE */}
        <div
          className="
  relative
  rounded-2xl
  bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent
  border border-red-400/20
  backdrop-blur-md
  py-2 px-3
  shadow-[0_0_30px_rgba(255,0,0,0.08)] xl:w-1/2"
        >
          <h4
            className=" font-bold
  text-red-400
  tracking-wide
  mb-2
  uppercase "
          >
            🛡 Defensive
          </h4>
          <div className="px-3">
            <TypeRow title="Weak To" types={defensive.weaknesses} />
            <TypeRow title="Resistant To" types={defensive.resistances} />
            <TypeRow title="Immune To" types={defensive.immunities} />
          </div>
        </div>

        {/* OFFENSIVE */}
        <div
          className="relative
rounded-2xl
bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent
border border-green-400/20
backdrop-blur-md
py-2 px-3
shadow-[0_0_30px_rgba(0,255,120,0.08)] xl:w-1/2"
        >
          <h4
            className="font-bold
  text-green-400
  tracking-wide
  mb-2
  uppercase"
          >
            ⚔ Offensive
          </h4>
          <div className="px-3">
            <TypeRow title="Strong Against" types={offensive.strong} />
            <TypeRow title="Not Effective" types={offensive.weak} />
            <TypeRow title="No Effect" types={offensive.noEffect} />
          </div>
        </div>
      </div>
    </div>
  );
}
