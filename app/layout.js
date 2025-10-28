import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "./components/Navbar"; // ✅ importa la Navbar

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Officina Morgillo",
  description: "Tecnologia e passione per la tua auto.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body
        className={`${poppins.className} bg-biancoTec text-acc min-h-screen flex flex-col`}
      >
        {/* ✅ NAVBAR GLOBALE */}
        <Navbar />

        {/* CONTENUTO DELLE PAGINE */}
        <main className="flex-grow">{children}</main>
<head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    integrity="sha512-pVnT3R1B+V9aZ1RCiCqP8yLLDlA9PoYxHqBYvT3M9k0Fj6dYh+2EwrOahHkJczUR3eVZyLCPZqHYwZLQJx04kA=="
    crossOrigin="anonymous"
    referrerPolicy="no-referrer"
  />
</head>

       {/* FOOTER PROFESSIONALE */}
<footer className="bg-[#0d0f12] text-gray-300 py-12 px-6 border-t border-gray-800">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
    
    {/* COLONNA 1 */}
    <div>
      <h2 className="text-2xl font-semibold text-white mb-3">
        Officina <span className="text-blue-400">Morgillo</span>
      </h2>
      <p className="text-sm text-gray-400 leading-relaxed">
        Tecnologia e passione per la tua auto.  
        Diagnosi elettronica, manutenzione e assistenza completa su auto tradizionali, ibride ed elettriche.
      </p>

      {/* SOCIAL ICONS */}
      <div className="flex gap-4 mt-5">
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-400 transition text-xl"
          aria-label="Instagram"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://www.tiktok.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-400 transition text-xl"
          aria-label="TikTok"
        >
          <i className="fab fa-tiktok"></i>
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-400 transition text-xl"
          aria-label="Facebook"
        >
          <i className="fab fa-facebook"></i>
        </a>
      </div>
    </div>

    {/* COLONNA 2 */}
    <div>
      <h3 className="text-white font-semibold text-lg mb-3">Contatti</h3>
      <ul className="space-y-1 text-sm">
        <li>📍 Via Voscone 24, Sarno (SA) — CAP 84087</li>
        <li>📞 <a href="tel:+390811234567" className="hover:text-blue-400 transition">+39 081 123 4567</a></li>
        <li>✉️ <a href="mailto:info@officinamorgillo.com" className="hover:text-blue-400 transition">info@officinamorgillo.com</a></li>
        <li>📬 <a href="mailto:mservicessrl2022@pec.it" className="hover:text-blue-400 transition">mservicessrl2022@pec.it</a></li>
        <li>🕒 Lun–Ven: 8:30–18:30 | Sab: 8:30–13:00</li>
      </ul>
    </div>

    {/* COLONNA 3 */}
    <div>
      <h3 className="text-white font-semibold text-lg mb-3">Informazioni legali</h3>
      <ul className="space-y-1 text-sm">
        <li><strong>M.R. SERVICES s.r.l.</strong></li>
        <li>P.IVA: 06092040655</li>
        <li>Sede legale: Via Voscone 24, 84087 Sarno (SA)</li>
        <li>Iscritta al Registro Imprese di Salerno</li>
      </ul>
    </div>
  </div>

  {/* LINEA DIVISORIA */}
  <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
    <p>
      © {new Date().getFullYear()} M.R. SERVICES s.r.l. — Tutti i diritti riservati  
      <br />
      Realizzato con ❤️ da Officina Morgillo
    </p>
  </div>
</footer>
      </body>
    </html>
  );
}
