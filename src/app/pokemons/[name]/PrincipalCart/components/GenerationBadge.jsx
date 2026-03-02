import {getRegionCardBackground,getRegionShadow,getRegionStyle} from '@/app/utils/styles'

export default async  function GenerationBadge({ generation ,getMain_region}) {
  const regionStyle = getRegionStyle(generation);
  const bgRegion = getRegionCardBackground(generation);
  const regionShadow = getRegionShadow(generation);
    const main_region= await getMain_region()
  return (
    <div className={`md:col-span-2
  relative
  bg-gradient-to-br ${bgRegion}
  border ${regionStyle}
  ${regionShadow}
  rounded-xl
  px-1 py-1 md:px-6 md:py-2
  overflow-hidden
`}
>
  <div className="absolute inset-0 bg-gradient-to-r 
  from-transparent via-purple-500/10 to-transparent 
  animate-pulse opacity-40 pointer-events-none"
/>


          <span className="font-black opacity-60 mb-px md:mb-3 block border-b-2 text-sky-600 border-sky-700 w-fit text-black/40">
            Origin - Region
          </span>

          <div className="flex items-center gap-2 md:gap-4 flex-wrap relative z-10 text-[0.8em]">

            {/* Generation Badge */}
            <span className="px-1 md:px-4 py-1 bg-indigo-500/20 text-indigo-600 rounded-full font-bold uppercase border border-indigo-500">
              {generation.replace("generation-", "Gen ")}
            </span>

            {/* Region Badge */}
            <span className={`px-1 md:px-4 py-1 rounded-full font-bold border bg-gradient-to-r ${regionStyle}`}>
              {main_region}
            </span>

          </div>

        </div>
  );
}
