"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "om_cookie_consent_v1";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (!saved) setOpen(true);
  }, []);

  const setConsent = (type) => {
    // type: "accept" | "reject"
    const consent = {
      necessary: true,
      analytics: type === "accept",
      marketing: type === "accept",
      ts: Date.now(),
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));

    // Aggiorna Google Consent Mode (gtag)
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: type === "accept" ? "granted" : "denied",
        ad_storage: type === "accept" ? "granted" : "denied",
        ad_user_data: type === "accept" ? "granted" : "denied",
        ad_personalization: type === "accept" ? "granted" : "denied",
      });
    }

    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4">
      <div className="mx-auto max-w-5xl rounded-2xl border border-[#222] bg-[#0d0f12]/95 backdrop-blur text-white shadow-xl">
        <div className="p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-sm text-gray-300 leading-relaxed">
            <p className="font-semibold text-white mb-1">Cookie e privacy</p>
            <p>
              Usiamo cookie tecnici necessari e, solo con il tuo consenso, cookie
              di analisi e marketing per migliorare l’esperienza e misurare le campagne.
              Leggi la{" "}
              <a href="/privacy" className="text-blue-400 hover:underline">
                Privacy Policy
              </a>{" "}
              e la{" "}
              <a href="/cookie-policy" className="text-blue-400 hover:underline">
                Cookie Policy
              </a>
              .
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={() => setConsent("reject")}
              className="px-5 py-2 rounded-full border border-gray-600 text-gray-200 hover:bg-white/5 transition"
            >
              Rifiuta
            </button>
            <button
              onClick={() => setConsent("accept")}
              className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition font-semibold"
            >
              Accetta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
