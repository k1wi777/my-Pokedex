"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkStyle = (path) =>
    `
    block px-6 py-3 rounded-2xl font-semibold
    transition-all duration-300
    ${pathname === path
      ? "text-white bg-gradient-to-r from-red-500 to-orange-500 shadow-lg shadow-red-500/30"
      : "text-stone-300 hover:text-white hover:bg-white/10"
    }
  `;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
      
      <div className="flex items-center justify-between px-6 h-20 md:h-24">
        
        {/* Logo */}
        <Image
          width={200}
          height={80}
          src="/pokedex-title.png"
          alt="pokedex title"
          className="w-32 md:w-40 drop-shadow-[0_0_7px_rgba(0,255,255,0.35)]"
        />

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 text-lg">
          <li>
            <Link href="/" className={linkStyle("/")}>
              Inicio
            </Link>
          </li>

          <li>
            <Link href="/pokemons" className={linkStyle("/pokemons")}>
              Pokédex
            </Link>
          </li>
        </ul>

        {/* Desktop GitHub */}
        <a
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex"
        >
           <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="w-8 h-8 drop-shadow-[0_0_7px_rgba(0,255,255,0.35)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.50)] transition-all duration-200" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" /></svg>
        </a>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col px-6 pb-2 gap-3 ">
          <Link href="/" className={linkStyle("/")}>
            Inicio
          </Link>
          <Link href="/pokemons" className={linkStyle("/pokemons")}>
            Pokédex
          </Link>
        </div>
      )}
    </nav>
  );
}