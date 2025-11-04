import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // deve restare false per porta 587
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
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #0d0f12; color: #fff; padding: 40px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 35px;">
            <img src="https://officinamorgillo.vercel.app/officina%20morhillo%20logo%20-%20Modificata.png" alt="Officina Morgillo" style="width:150px; margin-bottom:10px;">
            <h2 style="color:#3b82f6; font-size:22px; margin:0;">Nuova richiesta dal sito</h2>
            <p style="color:#bbb; font-size:14px; margin-top:6px;">officinamorgillo.com</p>
          </div>

          <div style="background-color:#1a1e23; padding:25px; border-radius:10px; border:1px solid #222; line-height:1.6;">
            <p><strong style="color:#3b82f6;">Nome:</strong> ${data.nome}</p>
            <p><strong style="color:#3b82f6;">Email:</strong> <a href="mailto:${data.email}" style="color:#fff; text-decoration:none;">${data.email}</a></p>
            <p><strong style="color:#3b82f6;">Telefono:</strong> ${data.telefono || "N/A"}</p>
            <p><strong style="color:#3b82f6;">Oggetto:</strong> ${data.oggetto}</p>
            ${
              data.servizio
                ? `<p><strong style="color:#3b82f6;">Servizio:</strong> ${data.servizio}</p>`
                : ""
            }
            ${
              data.marca
                ? `<p><strong style="color:#3b82f6;">Marca / Modello:</strong> ${data.marca} ${data.modello}</p>`
                : ""
            }
            ${data.targa ? `<p><strong style="color:#3b82f6;">Targa:</strong> ${data.targa}</p>` : ""}
            ${data.data ? `<p><strong style="color:#3b82f6;">Data richiesta:</strong> ${data.data}</p>` : ""}
            ${
              data.fascia_oraria
                ? `<p><strong style="color:#3b82f6;">Fascia oraria:</strong> ${data.fascia_oraria}</p>`
                : ""
            }
            ${
              data.messaggio
                ? `<p><strong style="color:#3b82f6;">Messaggio:</strong><br><span style="color:#ddd;">${data.messaggio}</span></p>`
                : ""
            }
          </div>

          <div style="text-align:center; margin-top:35px; font-size:13px; color:#aaa;">
            <p style="margin:4px 0;">Email inviata automaticamente dal sito 
              <a href="https://officinamorgillo.com" style="color:#3b82f6; text-decoration:none;">officinamorgillo.com</a>
            </p>
            <p style="margin:4px 0;">© ${new Date().getFullYear()} Officina Morgillo — Tecnologia e passione per la tua auto</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("🔥 Errore invio email dettagliato:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
