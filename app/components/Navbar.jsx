"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // rileva scroll per aggiungere sfondo anche in home
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Se siamo sulla home
  const isHome = pathname === "/";

  // Stile dinamico
  const baseClasses =
    "fixed top-0 left-0 w-full flex justify-between items-center px-10 py-6 z-50 transition-all duration-300";
  const transparent =
    "bg-transparent text-white " + (isScrolled ? "backdrop-blur-sm bg-black/30" : "");
  const solid =
    "bg-white text-acc shadow-md";

  return (
    <nav className={`${baseClasses} ${isHome ? transparent : solid}`}>
      <h1
        className={`text-2xl font-semibold tracking-tight ${
          isHome ? "text-white" : "text-bluMeccanico"
        }`}
      >
        <Link href="/">
          Officina <span className={isHome ? "text-blue-400" : "text-rossoAttrezzi"}>Morgillo</span>
        </Link>
      </h1>

      <ul className="hidden md:flex gap-8 text-sm font-medium">
        <li>
          <Link href="/servizi" className="hover:text-blue-400 transition">
            Servizi
          </Link>
        </li>
        <li>
          <Link href="/chi-siamo" className="hover:text-blue-400 transition">
            Chi siamo
          </Link>
        </li>
        <li>
          <Link href="/vetrina" className="hover:text-blue-400 transition">
            Vetrina
          </Link>
        </li>
        <li>
          <Link href="/gallery" className="hover:text-blue-400 transition">
            Gallery
          </Link>
        </li>
        <li>
          <Link href="/contatti" className="hover:text-blue-400 transition">
            Contatti
          </Link>
        </li>
      </ul>

      <Link
        href="/contatti"
        className={`border px-6 py-2 rounded-full transition font-medium ${
          isHome
            ? "border-white hover:bg-white hover:text-black"
            : "border-bluMeccanico text-bluMeccanico hover:bg-bluMeccanico hover:text-white"
        }`}
      >
        Prenota ora
      </Link>
    </nav>
  );
}
