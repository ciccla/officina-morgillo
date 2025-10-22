import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";

export default function GalleriaPage() {
  // Percorsi alle cartelle pubbliche
  const fotoDir = path.join(process.cwd(), "public", "galleria", "foto");
  const videoDir = path.join(process.cwd(), "public", "galleria", "video");

  // Legge i file presenti nelle cartelle
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
      <section className="relative h-[70vh] flex flex-col justify-center items-center text-center overflow-hidden">
        <Image
          src="/servizi-hero.jpg"
          alt="Officina Morgillo - Galleria lavori"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        {/* NAVBAR immersiva */}
        <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-10 py-6 z-20">
          <h1 className="text-2xl font-semibold tracking-tight">
            <Link href="/">
              Officina <span className="text-blue-400">Morgillo</span>
            </Link>
          </h1>

          <ul className="hidden md:flex gap-8 text-sm font-medium">
            <li><Link href="/servizi" className="hover:text-blue-400 transition">Servizi</Link></li>
            <li><Link href="/chi-siamo" className="hover:text-blue-400 transition">Chi siamo</Link></li>
            <li><Link href="/vetrina" className="hover:text-blue-400 transition">Vetrina</Link></li>
            <li><Link href="/gallery" className="text-blue-400 font-semibold">Gallery</Link></li>
            <li><Link href="/contatti" className="hover:text-blue-400 transition">Contatti</Link></li>
          </ul>

          <Link
            href="/contatti"
            className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition font-medium"
          >
            Prenota ora
          </Link>
        </nav>

        {/* Testo centrale */}
        <div className="relative z-10 px-6 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            La <span className="text-blue-400">galleria</span> dei nostri lavori
          </h1>
          <p className="text-gray-200 text-lg md:text-xl">
            Scatti e video reali della nostra officina, dei nostri clienti e delle lavorazioni quotidiane.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#0d0f12]" />
      </section>

      {/* FOTO */}
      {foto.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            📸 <span className="text-white">Le nostre</span>{" "}
            <span className="text-blue-400 uppercase">FOTO</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {foto.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[9/16] overflow-hidden rounded-2xl shadow-lg hover:scale-[1.03] transition-transform duration-300"
              >
                <Image
                  src={src}
                  alt={`Foto ${i + 1}`}
                  fill
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* VIDEO */}
      {video.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            🎥 <span className="text-white">I nostri</span>{" "}
            <span className="text-blue-400 uppercase">VIDEO</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {video.map((src, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-[#1a1e23] shadow-lg hover:scale-[1.02] transition-transform"
              >
                <video
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-auto object-cover rounded-2xl"
                >
                  <source src={src} type="video/mp4" />
                  <source src={src} type="video/webm" />
                  <source src={src} type="video/quicktime" />
                </video>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-700 to-blue-600 text-white">
        <h2 className="text-3xl font-semibold mb-4">
          Seguici per vedere altri lavori
        </h2>
        <p className="text-gray-100 mb-8">
          Aggiorniamo costantemente la nostra galleria con i lavori più recenti.
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
