import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Officina Morgillo" <info@officinamorgillo.com>`,
      to: "info@officinamorgillo.com",
      subject: `📩 Nuova richiesta da ${data.nome}`,
      html: `
        <h2>Hai ricevuto una nuova richiesta dal sito</h2>
        <p><strong>Nome:</strong> ${data.nome}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefono:</strong> ${data.telefono || "N/A"}</p>
        <p><strong>Oggetto:</strong> ${data.oggetto}</p>
        ${
          data.servizio
            ? `<p><strong>Servizio:</strong> ${data.servizio}</p>`
            : ""
        }
        ${
          data.marca
            ? `<p><strong>Marca / Modello:</strong> ${data.marca} ${data.modello}</p>`
            : ""
        }
        ${data.targa ? `<p><strong>Targa:</strong> ${data.targa}</p>` : ""}
        ${data.data ? `<p><strong>Data richiesta:</strong> ${data.data}</p>` : ""}
        ${
          data.fascia_oraria
            ? `<p><strong>Fascia oraria:</strong> ${data.fascia_oraria}</p>`
            : ""
        }
        <p><strong>Messaggio:</strong><br/>${data.messaggio}</p>
        <hr>
        <p style="font-size:0.9em;color:#555;">Email inviata automaticamente dal sito officinamorgillo.com</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Errore invio email:", error);
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
    });
  }
}
