import Image from "next/image";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Officina Morgillo | Meccanica e Tecnologia",
  description:
    "Esperienza, tecnologia e passione al servizio della tua auto. Officina Morgillo è specializzata in meccanica moderna, auto elettriche e cambi automatici.",
};

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden text-white">
      {/* SFONDO */}
      <Image
        src="/garage.jpg"
        alt="Officina Morgillo - officina meccanica moderna"
        fill
        priority
        className="object-cover"
      />

      {/* FILTRO SCURO */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* NAVBAR DINAMICA */}
      <Navbar />

      {/* TESTO CENTRALE */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          Benvenuti in <span className="text-blue-400">Officina Morgillo</span>
        </h2>

        <p className="max-w-2xl text-gray-200 mb-10 text-lg drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
          Esperienza, tecnologia e passione al servizio della tua auto. <br />
          Diagnosi elettronica, manutenzione e preparazioni professionali.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/servizi"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition"
          >
            I nostri servizi
          </a>
          <a
            href="/contatti"
            className="border border-white hover:bg-white hover:text-black px-8 py-3 rounded-full text-lg font-medium transition"
          >
            Contattaci
          </a>
        </div>
      </div>
    </main>
  );
}
