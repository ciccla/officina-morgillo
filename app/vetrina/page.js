"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function VetrinaPage() {
  const [vetrinaData, setVetrinaData] = useState([]);
  const [selected, setSelected] = useState(null); // immagine zoom
  const [dettaglio, setDettaglio] = useState(null); // dettagli prodotto

  useEffect(() => {
    fetch("/data/vetrina.json")
      .then((res) => res.json())
      .then((data) => setVetrinaData(data))
      .catch((err) =>
        console.error("Errore nel caricamento della vetrina:", err)
      );
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-[#0d0f12] text-white">
      {/* HERO */}
      <section className="relative h-[80vh] flex flex-col justify-center items-center text-center overflow-hidden">
        <Image
          src="/vetrina/vetrina-hero.jpg"
          alt="Officina Morgillo - Vetrina auto e ricambi"
          fill
          priority
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        {/* TESTO HERO */}
        <div className="relative z-10 px-6 max-w-3xl mx-auto mt-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)]">
            La <span className="text-blue-400">vetrina</span> dell&apos;Officina
            Morgillo
          </h1>
          <p className="text-gray-200 text-lg md:text-xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
            Scopri auto, ricambi e offerte speciali disponibili per vendita e
            noleggio.
          </p>
        </div>

        {/* sfumatura verso la sezione successiva */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#0d0f12]" />
      </section>

      {/* GRIGLIA PRODOTTI */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(vetrinaData) && vetrinaData.length > 0 ? (
          vetrinaData.map((prod) => (
            <div
              key={prod.id}
              className="bg-[#1a1e23] rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform"
            >
              <div
                className="relative w-full h-60 cursor-pointer"
                onClick={() => setSelected(prod.img)}
              >
                <Image
                  src={prod.img}
                  alt={prod.nome}
                  fill
                  className="object-cover"
                />

                {/* BADGE TIPO */}
                <span
                  className={`absolute top-3 left-3 px-3 py-1 text-xs rounded-full ${
                    prod.tipo === "vendita"
                      ? "bg-green-600"
                      : prod.tipo === "noleggio"
                      ? "bg-yellow-600"
                      : "bg-blue-600"
                  }`}
                >
                  {prod.tipo.toUpperCase()}
                </span>

                {/* BADGE STATO */}
                {prod.dettagli?.stato && (
                  <span
                    className={`absolute top-3 right-3 px-3 py-1 text-xs rounded-full font-semibold text-white ${
                      prod.dettagli.stato.toLowerCase().includes("offerta")
                        ? "bg-red-600 animate-pulse shadow-[0_0_12px_#f87171]"
                        : prod.dettagli.stato.toLowerCase().includes("usato")
                        ? "bg-orange-500"
                        : "bg-green-600"
                    }`}
                  >
                    {prod.dettagli.stato.toUpperCase()}
                  </span>
                )}
              </div>

              <div className="p-6 flex flex-col justify-between h-[240px]">
                <div>
                  <h3 className="text-xl font-semibold text-blue-400">
                    {prod.nome}
                  </h3>
                  <p className="text-gray-300 text-sm mt-2">
                    {prod.descrizione}
                  </p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-white font-medium">{prod.prezzo}</span>
                  <button
                    onClick={() => setDettaglio(prod)}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    Dettagli
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            Nessun elemento in vetrina al momento.
          </p>
        )}
      </section>

      {/* MODALE IMMAGINE */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 cursor-zoom-out"
        >
          <Image
            src={selected}
            alt="Zoom"
            width={900}
            height={600}
            className="rounded-lg object-contain"
          />
        </div>
      )}

      {/* MODALE DETTAGLI */}
      {dettaglio && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 px-4">
          <div className="bg-[#1a1e23] rounded-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setDettaglio(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>
            <h3 className="text-2xl font-semibold text-blue-400 mb-4">
              {dettaglio.nome}
            </h3>
            <ul className="text-sm text-gray-300 space-y-1 mb-4">
              {Object.entries(dettaglio.dettagli).map(([key, val]) => (
                <li key={key}>
                  <span className="capitalize text-gray-400">{key}:</span> {val}
                </li>
              ))}
            </ul>
            <p className="text-gray-200 mb-4">{dettaglio.descrizione}</p>
            <Link
              href="/contatti"
              className="bg-blue-600 hover:bg-blue-700 w-full block text-center py-2 rounded-full font-medium"
            >
              Richiedi informazioni
            </Link>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-700 to-blue-600 text-white">
        <h2 className="text-3xl font-semibold mb-4">
          Vuoi vendere o noleggiare la tua auto?
        </h2>
        <p className="text-gray-100 mb-8">
          Contattaci per inserire il tuo annuncio nella nostra vetrina o
          richiedere un preventivo personalizzato.
        </p>
        <Link
          href="/contatti"
          className="bg-white text-blue-700 hover:bg-blue-800 hover:text-white px-8 py-3 rounded-full text-lg font-medium transition"
        >
          Contattaci ora
        </Link>
      </section>
    </main>
  );
}
