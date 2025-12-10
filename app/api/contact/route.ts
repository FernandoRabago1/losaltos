import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, projectType, message } = body;

    // Validación básica
    if (!name || !email || !message || !projectType) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const htmlContent = `
      <h2>Nueva consulta desde el sitio web LOS ALTOS</h2>

      <h3>Información del cliente</h3>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone || "No proporcionado"}</p>
      <p><strong>Tipo de proyecto:</strong> ${projectType}</p>

      <h3>Mensaje</h3>
      <p>${message}</p>

      <hr />
      <p>Este mensaje fue enviado desde el formulario de contacto de <a href="https://losaltos-constructora.com">losaltos-constructora.com</a></p>
    `;

    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM!,                     // Ej: "LOS ALTOS <contacto@losaltos-constructora.com>"
      to: ["fernando.rabago05@gmail.com"],               // 👈 Aquí te llegan los correos
      replyTo: email,                                    // 👈 Para que al responder, le respondas al cliente
      subject: `Nueva consulta: ${projectType} - ${name}`,
      html: htmlContent,
    });

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en /api/contact:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

