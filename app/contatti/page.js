"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import emailjs from "@emailjs/browser";

export default function ContattiPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefono: "",
    oggetto: "",
    messaggio: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          nome: formData.nome,
          email: formData.email,
          telefono: formData.telefono,
          oggetto: formData.oggetto,
          messaggio: formData.messaggio,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          setSuccess(true);
          setFormData({
            nome: "",
            email: "",
            telefono: "",
            oggetto: "",
            messaggio: "",
          });
        },
        (error) => {
          console.error("Errore:", error);
          setLoading(false);
          setSuccess(false);
        }
      );
  };

  return (
    <main className="relative w-full min-h-screen bg-[#0d0f12] text-white">
      {/* HERO */}
      <section className="relative h-[70vh] flex flex-col justify-center items-center text-center overflow-hidden">
        <Image
          src="/contatti-hero.jpg"
          alt="Officina Morgillo - Contatti"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        {/* NAVBAR */}
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
            <li><Link href="/gallery" className="hover:text-blue-400 transition">Gallery</Link></li>
            <li><Link href="/contatti" className="text-blue-400 font-semibold">Contatti</Link></li>
          </ul>
          <Link
            href="/contatti"
            className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition font-medium"
          >
            Prenota ora
          </Link>
        </nav>

        <div className="relative z-10 px-6 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Contattaci
          </h1>
          <p className="text-gray-200 text-lg md:text-xl">
            Siamo sempre a disposizione per richieste, preventivi o assistenza.
          </p>
        </div>
      </section>

      {/* SEZIONE INFO */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6 py-20 text-center">
        <div>
          <h3 className="text-blue-400 text-xl font-semibold mb-2">📍 Indirizzo</h3>
          <p className="text-gray-300">
            Via Roma 123, Sarno (SA) <br /> 84087 – Italia
          </p>
        </div>
        <div>
          <h3 className="text-blue-400 text-xl font-semibold mb-2">📞 Telefono / WhatsApp</h3>
          <p className="text-gray-300">
            <a href="tel:+390811234567" className="hover:text-blue-400 transition">
              +39 081 123 4567
            </a>
            <br />
            <a href="https://wa.me/390811234567" target="_blank" className="hover:text-blue-400 transition">
              Chatta su WhatsApp
            </a>
          </p>
        </div>
        <div>
          <h3 className="text-blue-400 text-xl font-semibold mb-2">⏰ Orari</h3>
          <p className="text-gray-300">
            Lun - Ven: 8:30 – 18:30 <br /> Sabato: 8:30 – 13:00
          </p>
        </div>
      </section>

      {/* FORM CONTATTO */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-semibold text-blue-400 mb-8 text-center">
          Inviaci un messaggio
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              placeholder="Nome e cognome"
              className="w-full p-3 rounded-lg bg-[#1a1e23] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-[#1a1e23] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Telefono (facoltativo)"
            className="w-full p-3 rounded-lg bg-[#1a1e23] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="oggetto"
            value={formData.oggetto}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-[#1a1e23] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Seleziona il motivo del contatto --</option>
            <option value="preventivo">Richiesta preventivo</option>
            <option value="prenotazione">Prenotazione intervento</option>
            <option value="info">Informazioni generali</option>
            <option value="altro">Altro</option>
          </select>
          <textarea
            name="messaggio"
            value={formData.messaggio}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Scrivi qui il tuo messaggio..."
            className="w-full p-3 rounded-lg bg-[#1a1e23] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-full font-semibold"
          >
            {loading ? "Invio in corso..." : "Invia messaggio"}
          </button>

          {success === true && (
            <p className="text-green-500 text-center mt-4">
              ✅ Messaggio inviato con successo! Ti ricontatteremo a breve.
            </p>
          )}
          {success === false && (
            <p className="text-red-500 text-center mt-4">
              ❌ Errore durante l&apos;invio. Riprova più tardi.
            </p>
          )}
        </form>
      </section>

      {/* MAPPA */}
      <section className="w-full">
        <iframe
          title="Officina Morgillo - Mappa"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3018.7499099753633!2d14.62243691561872!3d40.8099638793211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b0e0184fd7a33%3A0x12a7c43b1e985a57!2sSarno%2C%20SA!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit"
          width="100%"
          height="400"
          allowFullScreen
          loading="lazy"
          className="border-0"
        ></iframe>
      </section>
    </main>
  );
}
