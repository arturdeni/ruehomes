// api/send-email.js
// Vercel Serverless Function para enviar emails a través de Brevo API

/* eslint-env node */

export default async function handler(req, res) {
  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Método no permitido. Use POST.'
    });
  }

  // Extraer datos del body
  const {
    name,
    email,
    phone,
    message,
    subject,
    type, // 'contact' | 'property'
    propertyTitle,
    propertyId,
    propertyReference,
    propertyPrice,
    propertyAddress,
    propertyCity,
    propertyType,
  } = req.body;

  // Validar campos requeridos
  if (!name || !email || !phone || !message) {
    return res.status(400).json({
      success: false,
      error: 'Faltan campos obligatorios: name, email, phone, message'
    });
  }

  // Validar formato de email básico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'El formato del email no es válido'
    });
  }

  // Obtener credenciales de Brevo desde variables de entorno
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'info@ruehomes.com';
  const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || 'RueHomes';

  // Verificar que la API key esté configurada
  if (!BREVO_API_KEY) {
    console.error('BREVO_API_KEY no está configurada en las variables de entorno');
    return res.status(500).json({
      success: false,
      error: 'El servicio de email no está configurado correctamente'
    });
  }

  try {
    // Construir el contenido HTML del email según el tipo
    let emailHtml;
    let emailSubject;

    if (type === 'property' && propertyTitle) {
      // Email de consulta sobre propiedad específica
      emailSubject = subject || `Consulta sobre: ${propertyTitle}${propertyReference ? ` (REF-${propertyReference})` : ''}`;

      emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            h2 { color: #9a744e; border-bottom: 2px solid #9a744e; padding-bottom: 10px; }
            h3 { color: #5d433a; margin-top: 20px; }
            ul { list-style: none; padding: 0; }
            li { padding: 8px 0; border-bottom: 1px solid #f0e5d5; }
            strong { color: #5d433a; }
            .message-box { background: #f0e5d5; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Nueva Consulta sobre Propiedad desde RueHomes</h2>

            <h3>Propiedad de interés:</h3>
            <ul>
              <li><strong>Título:</strong> ${propertyTitle}</li>
              ${propertyReference ? `<li><strong>Referencia:</strong> REF-${propertyReference}</li>` : ''}
              ${propertyId ? `<li><strong>ID:</strong> ${propertyId}</li>` : ''}
              ${propertyPrice ? `<li><strong>Precio:</strong> ${new Intl.NumberFormat('es-ES').format(propertyPrice)}€</li>` : ''}
              ${propertyAddress && propertyCity ? `<li><strong>Ubicación:</strong> ${propertyAddress}, ${propertyCity}</li>` : ''}
              ${propertyType ? `<li><strong>Tipo:</strong> ${propertyType}</li>` : ''}
            </ul>

            <h3>Datos del contacto:</h3>
            <ul>
              <li><strong>Nombre:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Teléfono:</strong> ${phone}</li>
            </ul>

            <h3>Mensaje:</h3>
            <div class="message-box">
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>

            <div class="footer">
              <p>Este mensaje fue enviado desde el formulario de consulta de propiedad de RueHomes.</p>
              <p>Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}</p>
            </div>
          </div>
        </body>
        </html>
      `;
    } else {
      // Email de contacto general
      emailSubject = subject || `Nuevo mensaje de contacto de ${name}`;

      emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            h2 { color: #9a744e; border-bottom: 2px solid #9a744e; padding-bottom: 10px; }
            h3 { color: #5d433a; margin-top: 20px; }
            ul { list-style: none; padding: 0; }
            li { padding: 8px 0; border-bottom: 1px solid #f0e5d5; }
            strong { color: #5d433a; }
            .message-box { background: #f0e5d5; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Nuevo Mensaje de Contacto desde RueHomes</h2>

            <h3>Datos del contacto:</h3>
            <ul>
              <li><strong>Nombre:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Teléfono:</strong> ${phone}</li>
            </ul>

            <h3>Mensaje:</h3>
            <div class="message-box">
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>

            <div class="footer">
              <p>Este mensaje fue enviado desde el formulario de contacto de RueHomes.</p>
              <p>Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}</p>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    // Enviar email usando Brevo API
    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: BREVO_SENDER_NAME,
          email: BREVO_SENDER_EMAIL,
        },
        to: [
          {
            email: 'info@ruehomes.com',
            name: 'RueHomes',
          },
        ],
        subject: emailSubject,
        htmlContent: emailHtml,
        replyTo: {
          email: email,
          name: name,
        },
      }),
    });

    // Verificar respuesta de Brevo
    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json().catch(() => ({}));
      console.error('Error de Brevo API:', errorData);

      return res.status(500).json({
        success: false,
        error: 'Error al enviar el email. Por favor, inténtelo de nuevo más tarde.'
      });
    }

    const responseData = await brevoResponse.json();

    // Email enviado exitosamente
    return res.status(200).json({
      success: true,
      message: 'Email enviado correctamente',
      messageId: responseData.messageId
    });

  } catch (error) {
    console.error('Error en send-email API:', error);

    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor al procesar el email'
    });
  }
}
