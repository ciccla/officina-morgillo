"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stile dinamico
  const isHome = pathname === "/";
  const baseClasses =
    "fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-6 z-50 transition-all duration-300";
  const transparent =
    "bg-transparent text-white " + (isScrolled ? "backdrop-blur-sm bg-black/30" : "");
  const solid = "bg-white text-[#0d0f12] shadow-md";

  return (
    <nav className={`${baseClasses} ${isHome ? transparent : solid}`}>
      {/* LOGO */}
      <h1
        className={`text-2xl font-semibold tracking-tight ${
          isHome ? "text-white" : "text-blue-600"
        }`}
      >
        <Link href="/">
          Officina{" "}
          <span className={isHome ? "text-blue-400" : "text-blue-600"}>
            Morgillo
          </span>
        </Link>
      </h1>

      {/* MENU DESKTOP */}
      <ul className="hidden md:flex gap-8 text-sm font-medium">
        <li><Link href="/servizi" className="hover:text-blue-400 transition">Servizi</Link></li>
        <li><Link href="/chi-siamo" className="hover:text-blue-400 transition">Chi siamo</Link></li>
        <li><Link href="/vetrina" className="hover:text-blue-400 transition">Vetrina</Link></li>
        <li><Link href="/gallery" className="hover:text-blue-400 transition">Gallery</Link></li>
        <li><Link href="/contatti" className="hover:text-blue-400 transition">Contatti</Link></li>
      </ul>

      {/* TASTO DESTRA DESKTOP */}
      {isHome ? (
        <Link
          href="/contatti"
          className="hidden md:inline-block border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition font-medium"
        >
          Prenota ora
        </Link>
      ) : (
        <div className="hidden md:block"></div> // niente tasto nelle pagine interne
      )}

      {/* MENU MOBILE */}
      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* OVERLAY MENU MOBILE */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0d0f12] text-white flex flex-col items-center gap-6 py-8 md:hidden shadow-lg z-40">
          <Link href="/servizi" onClick={() => setMenuOpen(false)}>Servizi</Link>
          <Link href="/chi-siamo" onClick={() => setMenuOpen(false)}>Chi siamo</Link>
          <Link href="/vetrina" onClick={() => setMenuOpen(false)}>Vetrina</Link>
          <Link href="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
          <Link href="/contatti" onClick={() => setMenuOpen(false)}>Contatti</Link>
        </div>
      )}
    </nav>
  );
}
