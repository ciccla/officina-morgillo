"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Rileva lo scroll per applicare l’effetto fumo
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Chiude il menu mobile al cambio pagina
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Base della navbar (sempre sopra tutto)
  const base =
    "fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-5 z-50 transition-all duration-500 ease-in-out";

  // Effetto “fumo”: trasparente all’inizio, leggero blur e opacità su scroll
  const navbarStyle = isScrolled
    ? "backdrop-blur-md bg-black/40 text-white shadow-[0_0_20px_rgba(0,0,0,0.2)]"
    : "backdrop-blur-md bg-black/20 text-white";

  return (
    <nav className={`${base} ${navbarStyle}`}>
      {/* LOGO */}
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
        <Link href="/" onClick={() => setMenuOpen(false)}>
          Officina <span className="text-blue-400">Morgillo</span>
        </Link>
      </h1>

      {/* MENU DESKTOP */}
      <ul className="hidden md:flex gap-8 text-base font-medium text-white">
        {["servizi", "chi-siamo", "vetrina", "gallery", "contatti"].map((p) => (
          <li key={p}>
            <Link
              href={`/${p}`}
              className="hover:text-blue-400 transition-colors duration-200"
            >
              {p.charAt(0).toUpperCase() + p.slice(1).replace("-", " ")}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA DESKTOP */}
      <Link
        href="/contatti"
        className="hidden md:inline border border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-full transition font-medium"
      >
        Prenota ora
      </Link>

      {/* HAMBURGER MOBILE */}
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className="md:hidden text-3xl text-white focus:outline-none"
        aria-label="Apri o chiudi menu"
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      {/* DRAWER MOBILE */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/40 backdrop-blur-md text-white flex flex-col items-center gap-6 py-8 md:hidden transition-all duration-300">
          {["servizi", "chi-siamo", "vetrina", "gallery", "contatti"].map(
            (p) => (
              <Link
                key={p}
                href={`/${p}`}
                className="text-lg font-medium hover:text-blue-400 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {p.charAt(0).toUpperCase() + p.slice(1).replace("-", " ")}
              </Link>
            )
          )}
          <Link
            href="/contatti"
            onClick={() => setMenuOpen(false)}
            className="bg-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Prenota ora
          </Link>
        </div>
      )}
    </nav>
  );
}
