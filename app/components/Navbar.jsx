"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // effetto scroll per sfumatura dinamica
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // logica pagina
  const isHome = pathname === "/";

  // base style sempre fixed e centrata
  const baseClasses =
    "fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-6 z-50 transition-all duration-500";

  // variazione di sfondo in base alla pagina e allo scroll
  const dynamicStyle = isHome
    ? isScrolled
      ? "bg-black/60 backdrop-blur-sm text-white shadow-md"
      : "bg-transparent text-white"
    : isScrolled
      ? "bg-[#0d0f12]/90 backdrop-blur-md text-white shadow-md"
      : "bg-[#0d0f12]/70 text-white";

  return (
    <nav className={`${baseClasses} ${dynamicStyle}`}>
      {/* LOGO */}
      <h1 className="text-2xl font-semibold tracking-tight">
        <Link href="/" onClick={() => setMenuOpen(false)}>
          Officina <span className="text-blue-400">Morgillo</span>
        </Link>
      </h1>

      {/* MENU DESKTOP */}
      <ul className="hidden md:flex gap-8 text-sm font-medium">
        <li>
          <Link
            href="/servizi"
            className={`hover:text-blue-400 transition ${
              pathname === "/servizi" ? "text-blue-400" : ""
            }`}
          >
            Servizi
          </Link>
        </li>
        <li>
          <Link
            href="/chi-siamo"
            className={`hover:text-blue-400 transition ${
              pathname === "/chi-siamo" ? "text-blue-400" : ""
            }`}
          >
            Chi siamo
          </Link>
        </li>
        <li>
          <Link
            href="/vetrina"
            className={`hover:text-blue-400 transition ${
              pathname === "/vetrina" ? "text-blue-400" : ""
            }`}
          >
            Vetrina
          </Link>
        </li>
        <li>
          <Link
            href="/gallery"
            className={`hover:text-blue-400 transition ${
              pathname === "/gallery" ? "text-blue-400" : ""
            }`}
          >
            Gallery
          </Link>
        </li>
        <li>
          <Link
            href="/contatti"
            className={`hover:text-blue-400 transition ${
              pathname === "/contatti" ? "text-blue-400" : ""
            }`}
          >
            Contatti
          </Link>
        </li>
      </ul>

      {/* DESTRA — logica dinamica */}
      <div className="flex items-center gap-4">
        {/* HOME → Bottone Prenota ora */}
        {isHome && (
          <Link
            href="/contatti"
            className="hidden md:inline-block border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition font-medium"
          >
            Prenota ora
          </Link>
        )}

        {/* ALTRE PAGINE → solo hamburger su mobile */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0d0f12]/95 text-white flex flex-col items-center gap-6 py-8 md:hidden shadow-lg z-40">
          <Link href="/servizi" onClick={() => setMenuOpen(false)}>
            Servizi
          </Link>
          <Link href="/chi-siamo" onClick={() => setMenuOpen(false)}>
            Chi siamo
          </Link>
          <Link href="/vetrina" onClick={() => setMenuOpen(false)}>
            Vetrina
          </Link>
          <Link href="/gallery" onClick={() => setMenuOpen(false)}>
            Gallery
          </Link>
          <Link href="/contatti" onClick={() => setMenuOpen(false)}>
            Contatti
          </Link>
        </div>
      )}
    </nav>
  );
}
