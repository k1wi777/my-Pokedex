import Link from "next/link";

export default function GameNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-bold text-white">Juego no encontrado</h1>
      <p className="text-stone-400">
        No existe un juego con ese identificador en la Pokédex.
      </p>
      <Link
        href="/games"
        className="rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-5 py-2 text-sm font-bold text-white"
      >
        Volver a juegos
      </Link>
    </div>
  );
}
