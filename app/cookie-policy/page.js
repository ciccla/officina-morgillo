export const metadata = {
  title: "Cookie Policy | Officina Morgillo",
};

export default function CookiePolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-white">
      <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>

      <p className="text-gray-300 mb-6">
        La presente informativa è resa ai sensi delle Linee guida cookie del
        Garante per la protezione dei dati personali (10 giugno 2021).
      </p>

      <h2 className="text-xl font-semibold text-white mt-8 mb-2">
        Tipologie di cookie
      </h2>

      <ul className="text-gray-300 list-disc pl-6 space-y-1">
        <li>
          <strong>Cookie tecnici</strong>: necessari al funzionamento del sito
        </li>
        <li>
          <strong>Cookie di analisi</strong>: raccolgono dati statistici in forma
          aggregata, solo previo consenso
        </li>
        <li>
          <strong>Cookie di marketing</strong>: utilizzati per misurare le
          campagne pubblicitarie, solo previo consenso
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-white mt-8 mb-2">
        Gestione del consenso
      </h2>
      <p className="text-gray-300">
        L’utente può esprimere o revocare il consenso in qualsiasi momento
        tramite il banner cookie o il pulsante “Gestisci cookie” presente nel
        footer del sito.
      </p>
    </main>
  );
}
