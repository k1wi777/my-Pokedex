import type { Metadata } from "next";

import "./globals.css";
import NavBar from '@/app/components/NavBar'
import { Nunito } from "next/font/google";
import Footer from "./components/Footer";

export const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

// metadata para visualizacion

export const metadata: Metadata = {
  title: {
    default: "Pokédex | K1wi",
    template: "%s | Pokédex",
  },
  description:
    "Explora información detallada de Pokémon, tipos, evoluciones y Pokéballs en esta Pokédex interactiva.",
  icons: {
    icon: "/pokeball-color.svg",
  },
  openGraph: {
    title: "Pokédex | k1wi",
    description:
      "Explora información detallada de Pokémon, tipos y evoluciones.",
    images: ["/preview.png"],
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`h-full ${nunito.className}`}
      >
        
        <NavBar/>
        <main className="fade-in">
        {children}

        </main>
        <Footer/>
      </body>
    </html>
  );
}
