"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";

  const base =
    "fixed top-0 left-0 w-full flex justify-between items-center px-5 md:px-10 py-4 z-50 transition-all duration-300";
  const transparent =
    "bg-transparent text-white " + (isScrolled ? "backdrop-blur-sm bg-black/40" : "");
  const solid = "bg-white text-acc shadow-md";

  return (
    <nav className={`${base} ${isHome ? transparent : solid}`}>
      {/* LOGO */}
      <h1
        className={`text-xl sm:text-2xl font-semibold tracking-tight ${
          isHome ? "text-white" : "text-bluMeccanico"
        }`}
      >
        <Link href="/">
          Officina{" "}
          <span className={isHome ? "text-blue-400" : "text-rossoAttrezzi"}>
            Morgillo
          </span>
        </Link>
      </h1>

      {/* MENU DESKTOP */}
      <ul className="hidden md:flex gap-6 text-sm font-medium">
        {["servizi", "chi-siamo", "vetrina", "gallery", "contatti"].map((p) => (
          <li key={p}>
            <Link href={`/${p}`} className="hover:text-blue-400 transition">
              {p.charAt(0).toUpperCase() + p.slice(1).replace("-", " ")}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA DESKTOP */}
      <Link
        href="/contatti"
        className={`hidden md:inline border px-6 py-2 rounded-full transition font-medium ${
          isHome
            ? "border-white hover:bg-white hover:text-black"
            : "border-bluMeccanico text-bluMeccanico hover:bg-bluMeccanico hover:text-white"
        }`}
      >
        Prenota ora
      </Link>

      {/* HAMBURGER MOBILE */}
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className="md:hidden text-2xl focus:outline-none"
        aria-label="Apri/chiudi menu"
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      {/* DRAWER MOBILE */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0d0f12] text-white flex flex-col items-center gap-4 py-6 md:hidden z-40">
          {["servizi", "chi-siamo", "vetrina", "gallery", "contatti"].map((p) => (
            <Link
              key={p}
              href={`/${p}`}
              className="text-lg font-medium hover:text-blue-400"
              onClick={() => setMenuOpen(false)}
            >
              {p.charAt(0).toUpperCase() + p.slice(1).replace("-", " ")}
            </Link>
          ))}
          <Link
            href="/contatti"
            onClick={() => setMenuOpen(false)}
            className="bg-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-700"
          >
            Prenota ora
          </Link>
        </div>
      )}
    </nav>
  );
}
