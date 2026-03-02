'use client'
import { useRouter } from "next/navigation";
import { useRef } from "react"


export default function Search({small= false, placeholder='ej. Pikachu o 25'}){
    const inputRef =useRef()
    const router = useRouter()
    
    function handleSubmit(e){
        e.preventDefault()
        const value = inputRef.current.value;
        const valueParsed =value.replaceAll(' ', '-')
        router.push(`/pokemons/${valueParsed}`)

    }

    return <form onSubmit={handleSubmit} className={small ?``:``}>
          <div className="
          w-ful 
      border-2 border-black
      flex
      rounded-full
      overflow-hidden
      bg-gray-800
      shadow-lg
    ">
            <input
            ref={inputRef}
              type="text"
              placeholder={placeholder}
              className="
          bg-white/70
          py-2 px-3
          text-black
          text-sm
          font-bold
          w-full
          outline-none
        "
            />

            <button
              type="submit"
              className="
          bg-purple-600
          hover:bg-purple-700
          transition
          px-6
          font-black
          tracking-wide
          text-white
        "
            >
              <img src="/icons/buscar.svg" alt="icon search"  className='w-8 md:w-12 drop-shadow-[0_0_10px_rgba(0,255,255,0.35)]'/>
            </button>
          </div>
        </form>
}