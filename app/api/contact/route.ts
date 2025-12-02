import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, projectType, message } = body;

    // Validate required fields
    if (!name || !email || !message || !projectType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter with Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to yourself
      replyTo: email, // User's email so you can reply directly
      subject: `Nueva Consulta: ${projectType} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #18181b; border-bottom: 2px solid #18181b; padding-bottom: 10px;">
            Nueva Consulta de Proyecto
          </h2>

          <div style="margin: 20px 0;">
            <h3 style="color: #52525b; margin-bottom: 5px;">Información del Cliente</h3>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
            <p><strong>Tipo de Proyecto:</strong> ${projectType}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #52525b; margin-bottom: 5px;">Mensaje</h3>
            <div style="background: #f4f4f5; padding: 15px; border-radius: 8px; white-space: pre-wrap;">
              ${message}
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e4e4e7; color: #71717a; font-size: 12px;">
            <p>Este mensaje fue enviado desde el formulario de contacto del sitio web.</p>
            <p>Responde directamente a este email para contactar al cliente.</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
