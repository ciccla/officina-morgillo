export const metadata = {
  title: "Privacy Policy | Officina Morgillo",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-white">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <p className="text-gray-300 mb-6">
        La presente informativa è resa ai sensi dell’art. 13 del Regolamento (UE)
        2016/679 (GDPR).
      </p>

      <h2 className="text-xl font-semibold text-white mt-8 mb-2">
        1. Titolare del trattamento
      </h2>
      <p className="text-gray-300">
        Il Titolare del trattamento è <strong>M.R. SERVICES s.r.l.</strong>, con
        sede legale in Via Voscone 24, 84087 Sarno (SA), P.IVA 06092040655,
        contattabile all’indirizzo email{" "}
        <a
          href="mailto:info@officinamorgillo.com"
          className="text-blue-400 hover:underline"
        >
          info@officinamorgillo.com
        </a>.
      </p>

      <h2 className="text-xl font-semibold text-white mt-8 mb-2">
        2. Tipologie di dati trattati
      </h2>
      <p className="text-gray-300">
        Il sito tratta dati di navigazione, dati forniti volontariamente
        dall’utente e dati raccolti tramite cookie e strumenti di tracciamento,
        esclusivamente previo consenso.
      </p>

      <h2 className="text-xl font-semibold text-white mt-8 mb-2">
        3. Finalità e base giuridica
      </h2>
      <ul className="text-gray-300 list-disc pl-6 space-y-1">
        <li>Funzionamento tecnico del sito (interesse legittimo)</li>
        <li>Gestione richieste utente (misure precontrattuali)</li>
        <li>Analisi statistiche e marketing (consenso)</li>
      </ul>

      <h2 className="text-xl font-semibold text-white mt-8 mb-2">
        4. Diritti dell’interessato
      </h2>
      <p className="text-gray-300">
        L’utente può esercitare i diritti previsti dagli artt. 15–22 GDPR
        scrivendo a info@officinamorgillo.com. È inoltre possibile proporre
        reclamo al Garante per la protezione dei dati personali.
      </p>
    </main>
  );
}
