import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, projectType, message } = body;

    console.log('📩 Contact form received:', body);

    // Validate required fields
    if (!name || !email || !message || !projectType) {
      console.warn('⚠️ Missing required fields:', body);
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const html = `
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
    `;

    const { data, error } = await resend.emails.send({
      from:
        process.env.EMAIL_FROM ??
        'LOS ALTOS <onboarding@resend.dev>', // mientras verificas dominio
      to: [process.env.CONTACT_EMAIL ?? 'fernando.rabago05@gmail.com'],
      replyTo: email,
      subject: `Nueva Consulta: ${projectType} - ${name}`,
      html,
    });

    console.log('📨 Resend response:', { data, error });

    if (error) {
      console.error('❌ Resend error:', error);
      return NextResponse.json(
        {
          error: 'Error sending email',
          details: error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
        id: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('🔥 Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

