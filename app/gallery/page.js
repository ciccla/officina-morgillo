"use client";
import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import GalleryClient from "./GalleryClient";

export default function GalleriaPage() {
  // Percorsi alle cartelle pubbliche
  const fotoDir = path.join(process.cwd(), "public", "galleria", "foto");
  const videoDir = path.join(process.cwd(), "public", "galleria", "video");

  // Legge i file presenti nelle cartelle (solo lato server)
  const fotoFiles = fs.existsSync(fotoDir)
    ? fs.readdirSync(fotoDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    : [];

  const videoFiles = fs.existsSync(videoDir)
    ? fs.readdirSync(videoDir).filter(v => /\.(mp4|mov|webm)$/i.test(v))
    : [];

  // Percorsi pubblici
  const foto = fotoFiles.map(name => `/galleria/foto/${name}`);
  const video = videoFiles.map(name => `/galleria/video/${name}`);

  return (
    <main className="relative w-full min-h-screen bg-[#0d0f12] text-white">
      
      {/* HERO */}
      <section className="relative h-[80vh] flex flex-col justify-center items-center text-center overflow-hidden">
        <Image
          src="/servizi-hero.jpg"
          alt="Officina Morgillo - Galleria lavori"
          fill
          priority
          className="object-cover object-center opacity-70"
        />
        {/* overlay */}
        <div className="absolute inset-0 bg-black/45"></div>

        {/* TESTO CENTRALE */}
        <div className="relative z-10 px-6 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)]">
            La <span className="text-blue-400">galleria</span> dei nostri lavori
          </h1>
          <p className="text-gray-200 text-lg md:text-xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
            Scatti e video reali della nostra officina, dei nostri clienti e
            delle lavorazioni quotidiane.
          </p>
        </div>

        {/* sfumatura verso la sezione successiva */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#0d0f12]" />
      </section>

      {/* SEZIONE GALLERIA */}
      <section className="relative py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-semibold text-blue-400 mb-3">
            I nostri migliori lavori
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Un viaggio tra interventi di meccanica, manutenzioni e restauri.
            Tutte le immagini provengono direttamente dalla nostra officina.
          </p>
        </div>

        {/* FOTO + VIDEO */}
        <GalleryClient foto={foto} video={video} />
      </section>

      {/* CTA INTERMEDIA */}
      <section className="relative text-center py-20 bg-[#111418] px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4 text-white">
            Professionalità e passione ogni giorno
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Ogni lavoro racconta una storia di dedizione e precisione. Dalla diagnosi
            all’intervento, ogni dettaglio è curato per offrire prestazioni eccellenti.
          </p>
          <Link
            href="/servizi"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition"
          >
            Scopri i nostri servizi
          </Link>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-700 to-blue-600 text-white">
        <h2 className="text-3xl font-semibold mb-4">
          Seguici per vedere altri lavori
        </h2>
        <p className="text-gray-100 mb-8">
          Aggiorniamo costantemente la nostra galleria con i lavori più
          recenti e le novità dal mondo dell’auto.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-700 hover:bg-blue-800 hover:text-white px-8 py-3 rounded-full text-lg font-medium transition"
          >
            Instagram
          </a>
          <a
            href="https://www.tiktok.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white hover:bg-white hover:text-black px-8 py-3 rounded-full text-lg font-medium transition"
          >
            TikTok
          </a>
        </div>
      </section>
    </main>
  );
}
