import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "./components/Navbar";

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
      <body className={`${poppins.className} bg-biancoTec text-acc min-h-screen flex flex-col`}>
        {/* NAVBAR GLOBALE */}
        <Navbar />

        {/* CONTENUTO DELLE PAGINE */}
        <main className="flex-grow">{children}</main>

        {/* FOOTER */}
        <footer className="bg-acc text-white py-6 text-center text-sm">
          © {new Date().getFullYear()} Officina Morgillo — Tutti i diritti riservati
        </footer>
      </body>
    </html>
  );
}
