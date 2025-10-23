"use client";
import Image from "next/image";
import Link from "next/link";
import { Wrench, Zap, Cog, Car } from "lucide-react";
import Navbar from "../components/Navbar"; // ✅ importa la navbar

export default function ServiziPage() {
  return (
    <main className="relative w-full text-white bg-[#111418]">
      
      {/* HERO */}
      <section className="relative h-[85vh] flex flex-col justify-center items-center text-center">
        <Image
          src="/servizi-hero.jpg"
          alt="Officina Morgillo - Servizi di manutenzione e diagnosi auto"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        {/* ✅ Navbar richiamata come componente */}
        <Navbar />

        {/* TESTO HERO */}
        <div className="relative z-10 px-6 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)]">
            I nostri <span className="text-blue-400">servizi</span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
            Tecnologia, precisione e passione per la tua auto.<br />
            Dal 2010 al servizio della qualità e dell’innovazione.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-[#111418]"></div>
      </section>

      {/* SEZIONE SERVIZI */}
      <section className="relative text-gray-100 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Meccanica generale */}
          <div className="bg-[#1A1E23] rounded-2xl shadow-xl p-8 text-center transition-transform hover:-translate-y-2 hover:shadow-2xl border-t-4 border-transparent hover:border-blue-500">
            <Wrench className="w-14 h-14 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-white">Meccanica generale</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Riparazioni e manutenzioni complete: motore, freni, sospensioni,
              trasmissione e diagnosi elettronica computerizzata.
            </p>
          </div>

          {/* Auto elettriche */}
          <div className="bg-[#1A1E23] rounded-2xl shadow-xl p-8 text-center transition-transform hover:-translate-y-2 hover:shadow-2xl border-t-4 border-transparent hover:border-yellow-400">
            <Zap className="w-14 h-14 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-white">Auto elettriche e ibride</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tecnici qualificati per manutenzione e diagnosi di veicoli elettrici e ibridi.
              Interventi sicuri sui sistemi ad alta tensione.
            </p>
          </div>

          {/* Cambi automatici */}
          <div className="bg-[#1A1E23] rounded-2xl shadow-xl p-8 text-center transition-transform hover:-translate-y-2 hover:shadow-2xl border-t-4 border-transparent hover:border-red-500">
            <Cog className="w-14 h-14 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-white">Cambi automatici</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Revisione e manutenzione professionale dei cambi automatici.
              Oli e componenti certificati per prestazioni durature.
            </p>
          </div>

          {/* Soccorso stradale */}
          <div className="bg-[#1A1E23] rounded-2xl shadow-xl p-8 text-center transition-transform hover:-translate-y-2 hover:shadow-2xl border-t-4 border-transparent hover:border-green-500">
            <Car className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-white">Soccorso stradale</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Carroattrezzi diretto dall’officina, 24 ore su 24.
              Recupero veicoli in panne e trasporto sicuro nella nostra sede.
            </p>
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-700 to-blue-600 text-white">
        <h2 className="text-3xl font-semibold mb-4">Hai bisogno di assistenza immediata?</h2>
        <p className="text-gray-100 mb-8">
          Contattaci subito per un preventivo gratuito o prenota un intervento con i nostri tecnici.
        </p>
        <Link
          href="/contatti"
          className="bg-white text-blue-700 hover:bg-blue-800 hover:text-white px-8 py-3 rounded-full text-lg font-medium transition"
        >
          Prenota un intervento
        </Link>
      </section>
    </main>
  );
}
