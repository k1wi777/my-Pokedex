export default function Footer() {
  return (
    <footer className="
      relative
      mt-16
      bg-gradient-to-b from-[#1f1f1f] to-[#141414]
      border-t border-white/10
      backdrop-blur-xl
      text-white/70
      w-full overflow-hidden
    ">

      {/* Background pokeball sutil */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "url('/pokeballs/noun-masterball.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
          transform: "rotate(-10deg) scale(1.2)"
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* Proyecto */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">
            Pokédex Project
          </h3>

          <p className="text-sm leading-relaxed">
            Aplicación desarrollada como proyecto personal para explorar
            diseño UI avanzado con animaciones 3D, datos dinámicos y
            experiencia interactiva inspirada en el universo Pokémon.
          </p>
        </div>

        {/* Atribuciones */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">
            Atribuciones
          </h3>

          <ul className="text-sm space-y-2">
            <li>
              Datos obtenidos desde{" "}
              <a
                href="https://pokeapi.co/"
                target="_blank"
                className="hover:text-yellow-400 transition-colors"
              >
                PokéAPI
              </a>
            </li>

            <li>
              Iconos cortesía de{" "}
              <a
                href="https://thenounproject.com/"
                target="_blank"
                className="hover:text-yellow-400 transition-colors"
              >
                The Noun Project
              </a>
            </li>

            <li>
              Fuentes generadas con{" "}
              <a
                href="https://es.textstudio.com/"
                target="_blank"
                className="hover:text-yellow-400 transition-colors"
              >
                Generador de fuentes
              </a>
            </li>
          </ul>
        </div>

        {/* Autor */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">
            Desarrollado por
          </h3>

          <div className="flex items-center gap-4">
            
            {/*  AQUÍ VA TU FIRMA */}
            <div className="
              w-24 h-24
              rounded-full
              border border-[rgb(82,55,133)]
              shadow-[0_0_10px_rgba(84,54,140,0.1)] bg-[rgba(82,55,133,0.2)]
            ">
              <img
                src="/logo-gengar.png"
                alt="Firma del creador"
                className="w-full h-full object-cover drop-shadow-[0_0_12px_rgba(122,85,190,0.50)]"
              />
            </div>

            <div>
              <p className="font-semibold text-white">
                Jose Padilla
              </p>
              <p className="text-sm">
                Frontend Developer
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Línea inferior */}
      <div className="
        border-t border-white/10
        text-center
        py-4
        text-xs
        text-white/40
      ">
        © {new Date().getFullYear()} Jose — Proyecto educativo sin fines comerciales.
        Pokémon y todos los nombres relacionados son propiedad de Nintendo y Game Freak.
      </div>

    </footer>
  );
}