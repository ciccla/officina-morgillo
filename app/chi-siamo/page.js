"use client";
import Image from "next/image";
import Link from "next/link";
import { Wrench, Sparkles, Shield, Heart } from "lucide-react";

export default function ChiSiamoPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#0d0f12] text-white">
      {/* HERO */}
      <section className="relative h-[85vh] flex flex-col justify-center items-center text-center overflow-hidden">
        <Image
          src="/chi-siamo-hero.jpg"
          alt="Officina Morgillo - Chi siamo"
          fill
          priority
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        {/* TESTO HERO */}
        <div className="relative z-10 px-6 max-w-3xl mx-auto mt-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)]">
            Chi <span className="text-blue-400">siamo</span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
            Dal 2010, la nostra officina &egrave; sinonimo di qualit&agrave;, tecnologia e fiducia.
          </p>
        </div>

        {/* sfumatura verso la sezione successiva */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-[#0d0f12]" />
      </section>

      {/* STORIA */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-20 text-center">
        <h2 className="text-3xl font-semibold mb-6 text-blue-400">La nostra storia</h2>
        <p className="text-gray-300 leading-relaxed max-w-4xl mx-auto text-lg">
          Nata come piccola realt&agrave; artigianale a Sarno,{" "}
          <strong>Officina Morgillo</strong> &egrave; cresciuta nel tempo grazie
          alla dedizione e alla fiducia dei clienti.
          Oggi siamo un punto di riferimento per la manutenzione meccanica, la diagnostica elettronica
          e l&apos;assistenza su veicoli moderni, inclusi ibridi ed elettrici.
          La nostra missione &egrave; unire{" "}
          <span className="text-blue-400">competenza tecnica</span> e{" "}
          <span className="text-blue-400">attenzione umana</span>,
          offrendo un servizio su misura per ogni cliente.
        </p>
      </section>

      {/* VALORI */}
      <section className="bg-[#111418] py-20 px-6 md:px-12">
        <h2 className="text-3xl font-semibold text-center mb-12">I nostri valori</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          <div className="text-center">
            <Wrench className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Affidabilità</h3>
            <p className="text-gray-400 text-sm">
              Ogni intervento &egrave; eseguito con precisione e trasparenza, garantendo sicurezza e fiducia.
            </p>
          </div>
          <div className="text-center">
            <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Innovazione</h3>
            <p className="text-gray-400 text-sm">
              Strumentazioni di ultima generazione e aggiornamento continuo per affrontare ogni sfida tecnica.
            </p>
          </div>
          <div className="text-center">
            <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Professionalità</h3>
            <p className="text-gray-400 text-sm">
              Un team qualificato, formato e appassionato, che mette al centro la qualit&agrave; del servizio.
            </p>
          </div>
          <div className="text-center">
            <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Passione</h3>
            <p className="text-gray-400 text-sm">
              Amiamo ci&ograve; che facciamo e trattiamo ogni veicolo come se fosse il nostro.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 text-center">
  <h2 className="text-3xl font-semibold mb-10 text-blue-400">
    Il nostro team
  </h2>

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">

    {/* Team 1 */}
    <div className="bg-[#1a1e23] rounded-2xl overflow-hidden shadow-lg">
      <div className="relative w-full h-72">
        <Image
          src="/team/team1.jpg"
          alt="Responsabile Tecnico Officina Morgillo"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold text-white">
          Titolare & Responsabile Tecnico
        </h3>
        <p className="text-gray-400 text-sm">
          Specializzato in meccanica avanzata e veicoli elettrici, con costante
          aggiornamento sulle nuove tecnologie automotive.
        </p>
      </div>
    </div>

    {/* Team 2 */}
    <div className="bg-[#1a1e23] rounded-2xl overflow-hidden shadow-lg">
      <div className="relative w-full h-72">
        <Image
          src="/team/team2.jpg"
          alt="Responsabile Officina Officina Morgillo"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold text-white">
          Responsabile Officina
        </h3>
        <p className="text-gray-400 text-sm">
          Specialista in cambi automatici, diagnostica professionale e gestione
          degli interventi complessi.
        </p>
      </div>
    </div>

    {/* Cresci con noi */}
    <div className="bg-[#1a1e23] rounded-2xl overflow-hidden shadow-lg border border-dashed border-blue-500/40">
      <div className="relative w-full h-72 flex items-center justify-center bg-[#111418]">
        <Sparkles className="w-14 h-14 text-blue-400 opacity-80" />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold text-white">
          Cresci con noi
        </h3>
        <p className="text-gray-400 text-sm">
          Siamo alla continua ricerca di personale specializzato o di giovani
          motivati da formare e far crescere insieme a noi.
        </p>
      </div>
    </div>

  </div>
</section>

      {/* CTA */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-700 to-blue-600 text-white">
        <h2 className="text-3xl font-semibold mb-4">Vuoi conoscerci meglio?</h2>
        <p className="text-gray-100 mb-8">
          Vieni a trovarci in officina o contattaci per un appuntamento personalizzato.
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
