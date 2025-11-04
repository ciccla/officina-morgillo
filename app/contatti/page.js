"use client";
import { useState } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import {
  FaWhatsapp,
  FaClock,
  FaMapMarkerAlt,
  FaArrowRight,
  FaSpinner,
} from "react-icons/fa";

export default function ContattiPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefono: "",
    oggetto: "",
    servizio: "",
    data: "",
    messaggio: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      // 1️⃣ Invia email all'officina
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        "template_officina",
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      // 2️⃣ Prepara risposta automatica per il cliente
      let messaggio_risposta = "";
      switch (formData.oggetto) {
        case "preventivo":
          messaggio_risposta =
            "Grazie per la tua richiesta di preventivo! Ti invieremo una proposta personalizzata entro 24 ore.";
          break;
        case "prenotazione":
          messaggio_risposta =
            "Grazie per aver richiesto una prenotazione! Ti contatteremo a breve per confermare data e orario dell’intervento.";
          break;
        case "guasto":
          messaggio_risposta =
            "Abbiamo ricevuto la segnalazione del guasto. Ti ricontatteremo al più presto per valutare l’intervento più rapido e conveniente.";
          break;
        default:
          messaggio_risposta =
            "Grazie per averci contattato. Il nostro team ti risponderà al più presto!";
          break;
      }

      // 3️⃣ Invia risposta automatica al cliente
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        "template_cliente",
        {
          nome: formData.nome,
          email: formData.email,
          oggetto: formData.oggetto,
          messaggio_risposta,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setLoading(false);
      setSuccess(true);
      setFormData({
        nome: "",
        email: "",
        telefono: "",
        oggetto: "",
        servizio: "",
        data: "",
        messaggio: "",
      });
      setStep(1);
    } catch (error) {
      console.error("Errore:", error);
      setLoading(false);
      setSuccess(false);
    }
  };

  return (
    <main className="relative w-full min-h-screen bg-[#0d0f12] text-white">
      {/* HERO */}
      <section className="relative h-[80vh] flex flex-col justify-center items-center text-center overflow-hidden">
        <Image
          src="/contatti-hero.jpg"
          alt="Officina Morgillo - Contatti"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 px-6 max-w-3xl mx-auto mt-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)]">
            Contattaci
          </h1>
          <p className="text-gray-200 text-lg md:text-xl">
            Il modo più veloce per ricevere assistenza, preventivi o prenotare
            un intervento.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-[#0d0f12]" />
      </section>

      {/* CONTATTI RAPIDI */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6 py-20 text-center">
        <div>
          <h3 className="flex justify-center items-center gap-2 text-blue-400 text-xl font-semibold mb-2">
            <FaMapMarkerAlt size={22} /> Dove siamo
          </h3>
          <p className="text-gray-300">
            <a
              href="https://maps.app.goo.gl/d9BdrHYbug1YMXv88"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              Via Voscone 24, Sarno (SA)
            </a>
            <br /> 84087 – Italia
          </p>
        </div>
        <div>
          <h3 className="flex justify-center items-center gap-2 text-green-500 text-xl font-semibold mb-2">
            WhatsApp
          </h3>
          <p className="text-gray-300">
            <a
              href="https://wa.me/393400000000?text=Ciao%20Officina%20Morgillo,%20ho%20bisogno%20di%20assistenza!"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition"
            >
              Chatta con noi su WhatsApp
            </a>
            <br />
            <span className="text-gray-400">+39 340 000 0000</span>
          </p>
        </div>
        <div>
          <h3 className="flex justify-center items-center gap-2 text-blue-400 text-xl font-semibold mb-2">
            <FaClock size={22} /> Orari
          </h3>
          <p className="text-gray-300">
            Lun - Ven: 8:30 – 18:30 <br /> Sabato: 8:30 – 13:00
          </p>
        </div>
      </section>

      {/* FORM MODERNO MULTI-STEP */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-semibold text-blue-400 mb-8 text-center">
          Invia la tua richiesta
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-[#1a1e23] p-8 rounded-2xl shadow-lg border border-[#222]"
        >
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder="Nome e cognome"
                className="w-full p-3 rounded-lg bg-[#0d0f12] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-[#0d0f12] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Telefono (facoltativo)"
                className="w-full p-3 rounded-lg bg-[#0d0f12] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-full font-semibold flex justify-center items-center gap-2"
              >
                Avanti <FaArrowRight />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <select
                name="oggetto"
                value={formData.oggetto}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-[#0d0f12] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Seleziona il tipo di richiesta --</option>
                <option value="preventivo">Richiesta preventivo</option>
                <option value="prenotazione">Prenotazione intervento</option>
                <option value="guasto">Segnalazione guasto</option>
                <option value="info">Informazioni generali</option>
              </select>

              {formData.oggetto === "preventivo" && (
                <input
                  type="text"
                  name="servizio"
                  placeholder="Tipo di intervento (es. tagliando, cambio olio...)"
                  value={formData.servizio}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg bg-[#0d0f12] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              {formData.oggetto === "prenotazione" && (
                <>
                  <input
                    type="text"
                    name="servizio"
                    placeholder="Servizio richiesto"
                    value={formData.servizio}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-[#0d0f12] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    name="data"
                    value={formData.data}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-[#0d0f12] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </>
              )}

              <textarea
                name="messaggio"
                rows="5"
                value={formData.messaggio}
                onChange={handleChange}
                placeholder="Scrivi qui il tuo messaggio..."
                className="w-full p-3 rounded-lg bg-[#0d0f12] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-full bg-gray-600 hover:bg-gray-700 transition font-semibold"
                >
                  Indietro
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 transition font-semibold flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" /> Invio...
                    </>
                  ) : (
                    "Invia messaggio"
                  )}
                </button>
              </div>
            </div>
          )}

          {success === true && (
            <p className="text-green-500 text-center mt-4 animate-fadeIn">
              ✅ Messaggio inviato con successo! Ti contatteremo al più presto.
            </p>
          )}
          {success === false && (
            <p className="text-red-500 text-center mt-4 animate-fadeIn">
              ❌ Errore durante l’invio. Riprova tra qualche minuto.
            </p>
          )}
        </form>
      </section>

      {/* MAPPA */}
      <section className="w-full">
        <iframe
          title="Officina Morgillo - Mappa"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3018.695992770431!2d14.6205314!3d40.8109356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b0e01b7e9bba7%3A0xe90cb3b9dc0f7e12!2sVia%20Voscone%2C%2024%2C%2084087%20Sarno%20SA!5e0!3m2!1sit!2sit!4v1730130000000!5m2!1sit!2sit"
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
