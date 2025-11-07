"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaWhatsapp,
  FaClock,
  FaMapMarkerAlt,
  FaArrowRight,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";

export default function ContattiPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    oggetto: "",
    servizio: "",
    marca: "",
    modello: "",
    targa: "",
    data: "",
    fascia_oraria: "",
    messaggio: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      const res = await fetch("/api/mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Errore invio email");

      setSuccess(true);
      setShowOverlay(true);
      setFormData({
        nome: "",
        email: "",
        telefono: "",
        oggetto: "",
        servizio: "",
        marca: "",
        modello: "",
        targa: "",
        data: "",
        fascia_oraria: "",
        messaggio: "",
      });
      setStep(1);
    } catch (err) {
      console.error(err);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  // Nasconde overlay dopo 2.5s
  useEffect(() => {
    if (showOverlay) {
      const timer = setTimeout(() => setShowOverlay(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showOverlay]);

  const progressWidth = step === 1 ? "50%" : "100%";

  return (
    <main className="relative w-full min-h-screen bg-[#0d0f12] text-white overflow-hidden">
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
            Prenota un intervento, richiedi un preventivo o segnala un guasto.
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
            <FaWhatsapp size={22} /> WhatsApp
          </h3>
          <p className="text-gray-300">
            <a
              href="https://wa.me/393508754465?text=Ciao%20Officina%20Morgillo,%20ho%20bisogno%20di%20assistenza!"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition"
            >
              Chatta con noi su WhatsApp
            </a>
            <br />
            <span className="text-gray-400">+39 350 875 4465</span>
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

      {/* FORM MULTI-STEP */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-semibold text-blue-400 mb-8 text-center">
          Invia la tua richiesta
        </h2>

        {/* Progress bar */}
        <div className="w-full bg-[#1a1e23] rounded-full h-2 mb-6">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: progressWidth }}
          ></div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-[#1a1e23] p-8 rounded-2xl shadow-lg border border-[#222]"
        >
         {step === 1 && (
  <div className="space-y-5 animate-fadeIn">
    {/* NOME */}
    <input
      type="text"
      name="nome"
      value={formData.nome}
      onChange={handleChange}
      required
      placeholder="Nome"
      className="w-full p-3 rounded-lg bg-[#0d0f12] border border-[#2a2e35] text-white focus:ring-2 focus:ring-blue-500"
      pattern="^[A-Za-zÀ-ÿ\s]{2,}$"
      title="Inserisci solo lettere (almeno 2 caratteri)"
    />

    {/* COGNOME */}
    <input
      type="text"
      name="cognome"
      value={formData.cognome || ""}
      onChange={handleChange}
      required
      placeholder="Cognome"
      className="w-full p-3 rounded-lg bg-[#0d0f12] border border-[#2a2e35] text-white focus:ring-2 focus:ring-blue-500"
      pattern="^[A-Za-zÀ-ÿ\s]{2,}$"
      title="Inserisci solo lettere (almeno 2 caratteri)"
    />

    {/* EMAIL */}
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
      placeholder="Email (es. nome@email.com)"
      className="w-full p-3 rounded-lg bg-[#0d0f12] border border-[#2a2e35] text-white focus:ring-2 focus:ring-blue-500"
    />

    {/* TELEFONO */}
    <div className="flex items-center bg-[#0d0f12] border border-[#2a2e35] rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
      <span className="px-3 text-gray-400 select-none">+39</span>
      <input
        type="tel"
        name="telefono"
        value={formData.telefono}
        onChange={(e) => {
          const value = e.target.value.replace(/[^0-9]/g, "");
          setFormData({ ...formData, telefono: value });
        }}
        required
        placeholder="Numero di telefono"
        className="flex-1 p-3 bg-transparent text-white outline-none"
        pattern="^[0-9]{8,12}$"
        title="Inserisci un numero valido (8-12 cifre)"
      />
    </div>

    {/* AVANTI */}
    <button
      type="button"
      onClick={() => setStep(2)}
      disabled={
        !formData.nome ||
        !formData.cognome ||
        !formData.email ||
        !formData.telefono.match(/^[0-9]{8,12}$/)
      }
      className={`w-full transition py-3 rounded-full font-semibold flex justify-center items-center gap-2 ${
        !formData.nome ||
        !formData.cognome ||
        !formData.email ||
        !formData.telefono.match(/^[0-9]{8,12}$/)
          ? "bg-gray-600 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
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
                className="w-full p-3 rounded-lg bg-[#0d0f12] text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Seleziona il tipo di richiesta --</option>
                <option value="preventivo">Richiesta preventivo</option>
                <option value="prenotazione">Prenotazione intervento</option>
                <option value="guasto">Segnalazione guasto</option>
                <option value="info">Informazioni generali</option>
              </select>

              {(formData.oggetto === "prenotazione" ||
                formData.oggetto === "guasto") && (
                <>
                  <input
                    type="text"
                    name="marca"
                    placeholder="Marca veicolo (es. BMW)"
                    value={formData.marca}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-[#0d0f12] text-white focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="modello"
                    placeholder="Modello veicolo (es. Serie 3)"
                    value={formData.modello}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-[#0d0f12] text-white focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="targa"
                    placeholder="Targa (es. AB123CD)"
                    value={formData.targa}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-[#0d0f12] text-white focus:ring-2 focus:ring-blue-500"
                  />

                  {formData.oggetto === "guasto" && (
                    <select
                      name="servizio"
                      value={formData.servizio}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded-lg bg-[#0d0f12] text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">
                        -- Tipo di intervento richiesto --
                      </option>
                      <option value="Soccorso stradale">
                        Soccorso stradale
                      </option>
                      <option value="Traino in officina">
                        Traino in officina
                      </option>
                      <option value="Riparazione sul posto">
                        Riparazione sul posto
                      </option>
                      <option value="Diagnosi in sede">Diagnosi in sede</option>
                    </select>
                  )}

                  <input
                    type="date"
                    name="data"
                    value={formData.data}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-[#0d0f12] text-white focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    name="fascia_oraria"
                    value={formData.fascia_oraria}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-[#0d0f12] text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Fascia oraria preferita --</option>
                    <option value="Mattina (8:30 - 12:30)">
                      Mattina (8:30 - 12:30)
                    </option>
                    <option value="Pomeriggio (14:00 - 18:00)">
                      Pomeriggio (14:00 - 18:00)
                    </option>
                  </select>
                </>
              )}

              {formData.oggetto === "preventivo" && (
                <>
                  <input
                    type="text"
                    name="servizio"
                    placeholder="Tipo di intervento (es. tagliando, cambio olio...)"
                    value={formData.servizio}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-[#0d0f12] text-white focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="modello"
                    placeholder="Modello veicolo"
                    value={formData.modello}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#0d0f12] text-white focus:ring-2 focus:ring-blue-500"
                  />
                </>
              )}

              <textarea
                name="messaggio"
                rows="5"
                value={formData.messaggio}
                onChange={handleChange}
                placeholder="Note o messaggio aggiuntivo..."
                className="w-full p-3 rounded-lg bg-[#0d0f12] text-white focus:ring-2 focus:ring-blue-500"
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
                    "Invia richiesta"
                  )}
                </button>
              </div>
            </div>
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

      {/* ✅ OVERLAY SUCCESSO ANIMATO */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
          <div className="relative flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-blue-600/30 border-4 border-blue-400 animate-ping absolute"></div>
            <FaCheckCircle
              className="text-green-500 z-10 animate-scaleIn"
              size={64}
            />
            <p className="mt-6 text-lg text-gray-200 font-medium animate-fadeIn">
              Richiesta inviata con successo!
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease forwards;
        }
      `}</style>
    </main>
  );
}
