import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// —— Configura qui i tuoi riferimenti
const BRAND = {
  name: "Officina Morgillo",
  from: "Officina Morgillo <info@officinamorgillo.com>",
  to: "info@officinamorgillo.com",             // ricezione interna
  siteUrl: "https://officinamorgillo.com",     // se vuoi, metti il tuo dominio
  phone: "+39 340 000 0000",
  whatsapp: "https://wa.me/393400000000?text=Ciao%20Officina%20Morgillo%2C%20ho%20bisogno%20di%20assistenza!",
  address: "Via Voscone 24, 84087 Sarno (SA)",
  colorPrimary: "#2563EB",  // blu
  bgDark: "#0d0f12",
  cardDark: "#1a1e23",
};

function esc(v) {
  if (v === undefined || v === null) return "";
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fieldRow(label, value) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #232832;color:#cdd6e5;width:42%;font-weight:600;">${label}</td>
      <td style="padding:12px 16px;border-bottom:1px solid #232832;color:#e6edf7;">${esc(value)}</td>
    </tr>
  `;
}

function baseShell({ title, subtitle, content, footerNote }) {
  const gradient =
    "linear-gradient(135deg, rgba(37,99,235,0.18) 0%, rgba(2,6,23,0.8) 60%, rgba(13,15,18,1) 100%)";
  return `
  <!doctype html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>${esc(title)}</title>
    <style>
      @media (max-width: 640px) {
        .container { padding: 16px !important; }
        .card { padding: 20px !important; }
        h1 { font-size: 24px !important; }
        .cta { display:block !important; width:100% !important; text-align:center !important; margin-bottom:8px !important; }
      }
      a:hover { opacity: .92 !important; }
    </style>
  </head>
  <body style="margin:0;background:${BRAND.bgDark};font-family:ui-sans-serif, -apple-system, Segoe UI, Roboto, Helvetica, Arial;color:#e6edf7;">
    <div style="background:${gradient};padding:36px 0;">
      <div class="container" style="max-width:680px;margin:0 auto;padding:0 24px;">
        
        <!-- Header / Logo testuale -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:18px">
          <tr>
            <td style="text-align:left">
              <div style="display:inline-block;padding:10px 14px;border:1px solid rgba(255,255,255,.12);border-radius:14px;background:rgba(255,255,255,.04);backdrop-filter:blur(4px);">
                <span style="font-weight:800;letter-spacing:.3px;font-size:14px;color:#ffffff;">Officina <span style="color:${BRAND.colorPrimary}">Morgillo</span></span>
              </div>
            </td>
            <td style="text-align:right;color:#9aa4b2;font-size:12px;">
              ${esc(BRAND.address)}
            </td>
          </tr>
        </table>

        <!-- Card -->
        <div class="card" style="background:${BRAND.cardDark};border:1px solid #212631;border-radius:18px;padding:28px;box-shadow:0 10px 30px rgba(2,6,23,.5)">
          <h1 style="margin:0 0 8px 0;font-size:28px;line-height:1.25;color:#ffffff;">${esc(title)}</h1>
          <p style="margin:0 0 18px 0;color:#a9b4c4;font-size:15px;line-height:1.6">${esc(subtitle || "")}</p>

          ${content}

          <div style="margin-top:26px;border-top:1px dashed #2a3140;padding-top:18px;color:#93a1b6;font-size:12px;line-height:1.6">
            ${footerNote || ""}
          </div>
        </div>

        <!-- Footer -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:18px 0 6px 0">
          <tr>
            <td style="text-align:center;color:#7f8aa3;font-size:12px">
              © ${new Date().getFullYear()} ${BRAND.name} — ${esc(BRAND.address)} • ${esc(BRAND.phone)}
              <br />
              Questo messaggio può contenere informazioni riservate. Se non sei il destinatario ignora e cancella.
            </td>
          </tr>
        </table>
      </div>
    </div>
  </body>
  </html>
  `;
}

function emailToOffice(data) {
  const table = `
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border:1px solid #232832;border-radius:14px;overflow:hidden">
      ${fieldRow("Nome", data.nome)}
      ${fieldRow("Email", data.email)}
      ${fieldRow("Telefono", data.telefono)}
      ${fieldRow("Oggetto", data.oggetto)}
      ${fieldRow("Servizio", data.servizio)}
      ${fieldRow("Marca", data.marca)}
      ${fieldRow("Modello", data.modello)}
      ${fieldRow("Targa", data.targa)}
      ${fieldRow("Data richiesta", data.data)}
      ${fieldRow("Fascia oraria", data.fascia_oraria)}
      ${
        data.messaggio
          ? `<tr><td colspan="2" style="padding:16px;border-top:1px solid #232832;color:#cdd6e5;">
              <div style="font-weight:600;margin-bottom:6px;">Messaggio</div>
              <div style="white-space:pre-wrap;color:#e6edf7;line-height:1.7">${esc(data.messaggio)}</div>
            </td></tr>`
          : ""
      }
    </table>
    <div style="margin-top:18px">
      <a class="cta" href="mailto:${encodeURIComponent(data.email || "noreply@invalid")}" 
         style="display:inline-block;background:${BRAND.colorPrimary};color:#fff;text-decoration:none;padding:12px 18px;border-radius:999px;font-weight:700;font-size:14px;margin-right:8px">
         Rispondi al cliente
      </a>
      <a class="cta" href="${BRAND.whatsapp}" 
         style="display:inline-block;border:1px solid #2b7a4b;color:#d5fbe1;background:rgba(16,185,129,.08);text-decoration:none;padding:12px 18px;border-radius:999px;font-weight:700;font-size:14px">
         Apri WhatsApp
      </a>
    </div>
  `;

  return baseShell({
    title: "Nuova richiesta dal sito",
    subtitle:
      "Hai ricevuto un nuovo contatto dal form 'Contattaci'. Di seguito i dettagli completi.",
    content: table,
    footerNote:
      "Suggerimento: rispondi direttamente a questa mail per contattare il cliente. La richiesta è stata registrata automaticamente.",
  });
}

function emailToCustomer(data) {
  const intro = `
    <p style="margin:0 0 14px 0;color:#dbe6ff;font-weight:600">Ciao ${esc(
      data.nome || "👋"
    )},</p>
    <p style="margin:0 0 18px 0;color:#b8c4d9">
      Grazie per aver contattato <strong style="color:#fff">${BRAND.name}</strong>!
      Abbiamo ricevuto la tua richiesta e ti risponderemo il prima possibile.
      Intanto trovi qui un riepilogo:
    </p>
  `;

  const table = `
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border:1px solid #232832;border-radius:14px;overflow:hidden;margin:10px 0 16px 0">
      ${fieldRow("Oggetto", data.oggetto)}
      ${fieldRow("Servizio", data.servizio)}
      ${fieldRow("Marca", data.marca)}
      ${fieldRow("Modello", data.modello)}
      ${fieldRow("Targa", data.targa)}
      ${fieldRow("Data", data.data)}
      ${fieldRow("Fascia oraria", data.fascia_oraria)}
    </table>
  `;

  const ctas = `
    <div style="margin-top:12px">
      <a class="cta" href="${BRAND.whatsapp}" 
         style="display:inline-block;background:${BRAND.colorPrimary};color:#fff;text-decoration:none;padding:12px 18px;border-radius:999px;font-weight:800;font-size:14px;margin-right:8px">
         Scrivici su WhatsApp
      </a>
      <a class="cta" href="tel:${BRAND.phone.replace(/\s|\+/g,'')}" 
         style="display:inline-block;border:1px solid #2b7a4b;color:#d5fbe1;background:rgba(16,185,129,.08);text-decoration:none;padding:12px 18px;border-radius:999px;font-weight:800;font-size:14px">
         Chiama l'officina
      </a>
    </div>
  `;

  return baseShell({
    title: "Abbiamo ricevuto la tua richiesta ✅",
    subtitle:
      "Questo è un messaggio di conferma automatico. Ti ricontatteremo a breve con tutti i dettagli.",
    content: `${intro}${table}${ctas}`,
    footerNote:
      `Se hai urgenza, chiamaci al ${esc(BRAND.phone)} o vieni a trovarci: ${esc(BRAND.address)}.`,
  });
}

export async function POST(req) {
  try {
    const data = await req.json();

    // Invia all'officina
    const adminPromise = resend.emails.send({
      from: BRAND.from,
      to: [BRAND.to],
      subject: `📩 Nuova richiesta da ${data.nome || "Sito"}`,
      html: emailToOffice(data),
      reply_to: data.email ? [data.email] : undefined,
    });

    // Conferma al cliente (se ha email)
    const customerPromise = data.email
      ? resend.emails.send({
          from: BRAND.from,
          to: [data.email],
          subject: "Abbiamo ricevuto la tua richiesta — Officina Morgillo",
          html: emailToCustomer(data),
        })
      : Promise.resolve();

    await Promise.all([adminPromise, customerPromise]);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Errore invio email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error?.message || "Mail error" }),
      { status: 500 }
    );
  }
}
