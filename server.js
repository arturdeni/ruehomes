import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env.local
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Instagram API endpoint
app.get('/api/instagram', async (req, res) => {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    if (!accessToken || !userId) {
      return res.status(500).json({
        success: false,
        error: 'Missing Instagram credentials',
        message: 'Please configure INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID in .env.local file'
      });
    }

    // Obtener posts del usuario usando Instagram Graph API
    const response = await fetch(
      `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,like_count,timestamp&limit=4&access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`);
    }

    const data = await response.json();

    // Transformar los datos al formato esperado por el frontend
    const posts = data.data.map(post => ({
      id: post.id,
      thumbnail: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
      caption: post.caption || '',
      link: post.permalink,
      likes: Math.floor(Math.random() * 300) + 100, // Instagram Basic API no da likes reales
      type: post.media_type.toLowerCase()
    }));

    res.json({ success: true, posts });
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch Instagram posts',
      message: error.message
    });
  }
});

// Email sending endpoint (Brevo)
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, phone, message, subject, type, propertyTitle, propertyId, propertyReference, propertyPrice, propertyAddress, propertyCity, propertyType } = req.body;

    // Validar campos requeridos
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        error: 'Faltan campos obligatorios: name, email, phone, message'
      });
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'info@ruehomes.com';
    const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || 'RueHomes';

    if (!BREVO_API_KEY) {
      console.error('BREVO_API_KEY not configured');
      return res.status(500).json({
        success: false,
        error: 'El servicio de email no está configurado correctamente'
      });
    }

    // Construir el contenido HTML del email
    let emailHtml;
    let emailSubject;

    if (type === 'property' && propertyTitle) {
      emailSubject = subject || `Consulta sobre: ${propertyTitle}${propertyReference ? ` (REF-${propertyReference})` : ''}`;
      emailHtml = `
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
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Este mensaje fue enviado desde el formulario de consulta de propiedad de RueHomes.</small></p>
      `;
    } else {
      emailSubject = subject || `Nuevo mensaje de contacto de ${name}`;
      emailHtml = `
        <h2>Nuevo Mensaje de Contacto desde RueHomes</h2>
        <h3>Datos del contacto:</h3>
        <ul>
          <li><strong>Nombre:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Teléfono:</strong> ${phone}</li>
        </ul>
        <h3>Mensaje:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Este mensaje fue enviado desde el formulario de contacto de RueHomes.</small></p>
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
        to: [{ email: 'info@ruehomes.com', name: 'RueHomes' }],
        subject: emailSubject,
        htmlContent: emailHtml,
        replyTo: { email: email, name: name },
      }),
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json().catch(() => ({}));
      console.error('Brevo API error:', errorData);
      return res.status(500).json({
        success: false,
        error: 'Error al enviar el email. Por favor, inténtelo de nuevo más tarde.'
      });
    }

    const responseData = await brevoResponse.json();
    res.json({
      success: true,
      message: 'Email enviado correctamente',
      messageId: responseData.messageId
    });

  } catch (error) {
    console.error('Error in send-email API:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor al procesar el email'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
