import Link from "next/link";

export default function PokemonNotFound() {
    return (
        <div className="
      relative
      w-full
      h-dvh
      flex flex-col
      items-center
      justify-center
      overflow-hidden
      bg-gradient-to-b from-[#1a0000] via-[#140000] to-black
      text-red-500 
    ">

            {/* Scanlines */}
            <div className="scanlines pointer-events-none absolute inset-0" />

            {/* Contenido */}
            <div className="relative z-10 text-center space-y-6">

                <h1
                    className="glitch text-6xl font-black tracking-widest "
                    data-text="ENTRY NOT FOUND"
                >
                    ENTRY NOT FOUND
                </h1>

                <p className="text-red-300/70 text-lg max-w-md mx-auto z-20">
                    El sistema de la Pokédex no pudo localizar el Pokémon solicitado.
                </p>

                <Link
                    href="/"
                    className="
            inline-block
            mt-6
            px-6 py-3
            bg-red-700
            hover:bg-red-600
            rounded-xl
            font-semibold
            transition-all
            shadow-[0_0_15px_rgba(255,0,0,0.4)]
          "
                >
                    ← Volver al inicio
                </Link>
            </div>
        </div>
    );
}